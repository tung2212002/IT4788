/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions, Keyboard } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import Color from '../utils/Color';
import PopupScreenComponent from '../components/PopupScreenCompopnent';
import PopupComponent from '../components/PopupComponent';
import ButtonComponent from '../components/ButtonComponent';
import ButtonIconComponent from '../components/ButtonIconComponent';
import SelectComponent from '../components/SelectComponent';
import {
    SVGTagUser,
    SVGCalendar,
    SVGFeeling,
    SVGCheckIn,
    SVGPhotos,
    SVGTextFormat,
    SVGCamera,
    SVGGifSymbol,
    SVGMusic,
    SVGLiveStreaming,
    images,
} from '../../assets';
import ChoiceFeelingComponent from '../components/ChoiceFeelingComponent';
import { useMediaPicker } from '../hooks/useMediaPicker';
import PhotoGrid from '../components/PhotoGridComponent/PhotoGrid';
import VideoComponent from '../components/PostComponent/VideoComponent';
import { editPostService } from '../services/postService';
import LoadingComponent from '../components/LoadingComponent';

const Container = styled(PopupScreenComponent)`
    background-color: ${Color.black};
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Header = styled.View`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
    background-color: ${Color.mainBackgroundColor};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const ViewTitle = styled.View`
    height: 50px;
    padding-top: 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TitleHeader = styled.Text`
    margin-left: 10px;
    font-size: 20px;
    font-family: Roboto-Bold;
    color: ${Color.black};
`;

const Content = styled.View`
    margin-top: 10px;
    width: 100%;
    height: 100%;
`;

const ContentHeader = styled.View`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-top: 5px;
`;

const ViewAvatar = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin: 10px;
    margin-right: 6px;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const Info = styled.View`
    display: flex;
    flex-direction: column;
`;

const Description = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    width: ${Dimensions.get('window').width - 60}px;
`;

const FullName = styled.Text`
    font-size: 16px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-left: 2px;
`;

const State = styled.Text`
    font-size: 14px;
    color: ${Color.gray};
`;

const StateBold = styled.Text`
    font-size: 14px;
    font-family: Roboto-Bold;
    color: ${Color.black};
`;

const ViewSelectScope = styled.View`
    width: 135px;
    display: flex;
    flex-direction: row;
    margin-top: 4px;
`;

const SelectScope = styled(ButtonIconComponent)`
    width: 50px;
    height: 20px;
`;

const Scope = styled(SelectComponent)`
    width: 100%;
    height: 100px;
`;

const HeaderPopup = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const TitlePopup = styled.Text`
    font-size: 18px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-left: 10px;
`;

const MessagePopup = styled.Text`
    font-size: 15px;
    color: ${Color.gray};
    margin-left: 10px;
`;

const InputText = styled.TextInput`
    width: 100%;
    font-size: 20px;
    color: ${Color.black};
    padding: 10px;
    margin-top: 10px;
`;

function EditPostScreen({
    navigation,
    setShowEditPost,
    showEditPost,
    user,
    imageFilesPostComposer = [],
    clearImagesPostComposer,
    handleCreatePost,
    post,
    setPost,
    handleRequestNewPost,
    handleUpdatePost,
}) {
    const [isLoad, setIsLoad] = useState(false);
    const [input, setInput] = useState(post?.described);
    const [scope, setScope] = useState('Công khai');
    const [showScope, setShowScope] = useState(false);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const [renderPopUpComponent2, setRenderPopUpComponent2] = useState(false);
    const [renderPopUpComponent3, setRenderPopUpComponent3] = useState(false);
    const [keyboardShow, setKeyboardShow] = useState(false);
    const [feelings, setFeelings] = useState('');
    const [activities, setActivities] = useState('');
    const [allImage, setAllImage] = useState(post?.image ? post?.image : []);
    const [allImageUrl, setAllImageUrl] = useState(post?.image ? post?.image : []);
    const [imageDel, setImageDel] = useState([]);
    const [loadingState, setLoadingState] = useState({ loading: false, message: '' });

    const [allVideo, setAllVideo] = useState(post?.video ? [{ uri: post?.video }] : []);
    const { mediaFiles, pickMedia, clearMedia } = useMediaPicker();

    const ButtonSubmit = styled(ButtonComponent)`
        position: absolute;
        right: 0px;
        top: 0px;
        background-color: ${input.length > 0 || allVideo.length > 0 ? Color.blueButtonColor : Color.lightGray};
        border-radius: 5px;
        margin-top: 20px;
        margin-right: 20px;
    `;

    const itemsScope = [
        {
            title: 'Công khai',
            nameIcon: 'earth',
            typeIcon: 'MaterialCommunityIcons',
            onPress: () => {
                setScope('Công khai');
                setShowScope(false);
            },
        },
        {
            title: 'Bạn bè',
            nameIcon: 'account-group',
            typeIcon: 'MaterialCommunityIcons',
            onPress: () => {
                setScope('Bạn bè');
                setShowScope(false);
            },
        },
        {
            title: 'Chỉ mình tôi',
            nameIcon: 'lock',
            typeIcon: 'MaterialCommunityIcons',
            onPress: () => {
                setScope('Chỉ mình tôi');
                setShowScope(false);
            },
        },
    ];

    const listItems = [
        {
            title: 'Ảnh/Video',
            SVGIcon: SVGPhotos,
            handlePress: () => {
                pickMedia();
            },
        },
        {
            title: 'Cảm xúc/Hoạt động',
            SVGIcon: SVGFeeling,
            handlePress: () => {
                setRenderPopUpComponent3(true);
            },
        },
        {
            title: 'Gắn thẻ người khác',
            SVGIcon: SVGTagUser,
        },
        {
            title: 'Check in',
            SVGIcon: SVGCheckIn,
        },
        {
            title: 'Live trực tiếp',
            SVGIcon: SVGLiveStreaming,
        },
        {
            title: 'Màu nền',
            SVGIcon: SVGTextFormat,
        },
        {
            title: 'Camera',
            SVGIcon: SVGCamera,
        },
        {
            title: 'File GIF',
            SVGIcon: SVGGifSymbol,
        },
        {
            title: 'Âm nhạc',
            SVGIcon: SVGMusic,
        },
        {
            title: 'Gắn thẻ sự kiện',
            SVGIcon: SVGCalendar,
        },
    ];

    const listItems2 = [
        {
            title: 'Lưu làm bản nháp',
            message: 'Bạn sẽ nhận được thông báo về bản nháp',
            nameIcon: 'bookmark-outline',
            typeIcon: 'Ionicons',
            onPress: () => {},
            colorStyle: Color.black,
        },
        {
            title: 'Bỏ bài viết',
            nameIcon: 'trash-outline',
            typeIcon: 'Ionicons',
            onPress: () => {
                setShowEditPost(false);
            },
            colorStyle: Color.black,
        },
        {
            title: 'Tiếp tục chỉnh sửa',
            nameIcon: 'check',
            typeIcon: 'Feather',
            onPress: () => {
                setRenderPopUpComponent2(false);
            },
            propsIcon: { color: Color.blueButtonColor },
            propsTitle: { color: Color.blueButtonColor },
        },
    ];

    const propsButton = {
        width: 100,
        height: 45,
        backgroundColor: Color.white,
        alignItems: 'center',
    };

    const propsIcon = {
        width: 40,
        height: 30,
        padding: 10,
    };

    const propsTitle = {
        size: 16,
        color: Color.black,
    };

    const propsTitle2 = {
        size: 16,
        color: Color.black,
    };

    const propsIcon2 = {
        size: 30,
        padding: 1,
    };

    const propsButton2 = {
        width: 90,
        height: 70,
        backgroundColor: Color.white,
        alignItems: 'center',
    };

    const propsMessage = {
        size: 14,
        color: Color.gray,
    };

    const headerPopup2 = (
        <HeaderPopup>
            <TitlePopup>Bạn muốn hoàn thành bài viết của mình sau?</TitlePopup>
            <MessagePopup>Lưu bản nháp hoặc bạn có thể tiếp tục chỉnh sửa</MessagePopup>
        </HeaderPopup>
    );

    const handleEditPost = () => {
        setLoadingState({ loading: true, message: 'Đang sửa bài viết' });

        if (input.length > 0) {
            const statusJson = {
                id: feelings?.id || activities?.id,
                title: feelings?.title || activities?.title,
                type: feelings ? 'feelings' : 'activities',
            };

            let allImageUpload = allImage.slice(post?.image?.length - imageDel.length, allImage.length);

            const formData = new FormData();
            formData.append('id', post?.id);
            formData.append('described', input);
            formData.append('status', JSON.stringify(statusJson));
            if (allImageUpload.length > 0) {
                allImageUpload.forEach((item) => {
                    formData.append('image', item.base64);
                });
            }
            if (allVideo.length > 0) {
                formData.append('video', allVideo[0].base64, allVideo[0].type);
            }

            if (imageDel.length > 0) {
                formData.append('image_del', imageDel.join(','));
            }

            let sortString = '';
            post?.image?.map((item) => {
                allImage.map((item2) => {
                    if (item.url === item2.url) {
                        sortString += `${item.id},`;
                    }
                });
            });

            for (let i = post?.image?.length + 1; i <= post?.image?.length + allImageUpload.length; i++) {
                sortString += `${i},`;
            }

            formData.append('image_sort', sortString.slice(0, sortString.length - 1));

            editPostService(formData)
                .then((res) => {
                    if (res.data.code === '1000') {
                        handleUpdatePost(res.data.data.id);
                        setShowEditPost(false);
                        setLoadingState({ loading: false, message: '' });
                    } else {
                        setLoadingState({ loading: false, message: '' });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingState({ loading: false, message: '' });
                });
        }
        return;
    };

    const handleDeleteImage = (url) => {
        post?.image?.map((image) => {
            if (image.url === url) {
                setImageDel([...imageDel, image.id]);
            }
        });
    };

    const handleInput = (text) => {
        if (text.length > 0) {
            // setIsCreatePost(true);
        } else {
            // setIsCreatePost(false);
        }
        setInput(text);
    };

    const handleBackdropPress = () => {
        // setIsCreatePost(false);
    };

    const handleClose = () => {
        setRenderPopUpComponent2(true);

        // if (input.length > 0 || allImage.length > 0 || allVideo.length > 0 || feelings || activities) {
        //     setRenderPopUpComponent2(true);
        // } else {
        //     clearMedia();
        //     clearImagesPostComposer();
        //     setShowEditPost(false);
        // }
    };

    useEffect(() => {
        setRenderPopUpComponent(true);
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setRenderPopUpComponent(false);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setRenderPopUpComponent(true);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (isLoad) {
            setAllImageUrl(allImage.map((item) => ({ url: item.uri ? item.uri : item.url })));
        }
    }, [allImage]);

    useEffect(() => {
        setIsLoad(true);
    }, []);

    useEffect(() => {
        if (mediaFiles.length > 0) {
            if (mediaFiles[0].type === 'video' && allVideo.length > 0) {
                Alert.alert('Thông báo', 'Bạn chỉ được chọn 1 video', [{ text: 'OK' }], { cancelable: false });
                clearMedia();
                return;
            } else if (mediaFiles[0].type === 'image' && allVideo.length > 0) {
                Alert.alert('Thông báo', 'Vui lòng bỏ video trước khi chọn ảnh', [{ text: 'OK' }], { cancelable: false });
            } else if (mediaFiles[0].type === 'video' && allImage.length > 0) {
                Alert.alert('Thông báo', 'Vui lòng bỏ ảnh trước khi chọn video', [{ text: 'OK' }], { cancelable: false });
            } else if (mediaFiles[0].type === 'video' && allImage.length === 0) {
                setAllVideo([mediaFiles[0]]);
            } else if (allVideo.length === 0 && mediaFiles[0].type === 'image') {
                setAllImage([...allImage, mediaFiles[0]]);
            }
            clearMedia();
            // }
            // else if (videoFiles.length === 0) {
            //     console.log('Thành công2');
            //     setAllVideo([...allVideo, videoFiles]);
            //     clearMedia();
            // }
        }
    }, [mediaFiles]);

    return (
        <Container
            renderPopUpComponent={showEditPost}
            setRenderPopUpComponent={setShowEditPost}
            onBackdropPress={handleBackdropPress}
            handleClose={handleClose}
        >
            <Header>
                <ViewTitle>
                    <TitleHeader>Sửa bài viết</TitleHeader>
                </ViewTitle>
                <ButtonSubmit
                    onPress={handleEditPost}
                    title={'Sửa'}
                    disabled={input.length > 0 || allVideo.length > 0 ? false : true}
                    size={16}
                    style={{ alignItems: 'center', justifyContent: 'center', height: 40, width: 70 }}
                />
            </Header>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Content>
                    <ContentHeader>
                        <ViewAvatar>
                            <Avatar source={user?.avatar === '' ? images.defaultAvatar : { uri: user.avatar }} />
                        </ViewAvatar>
                        <Info>
                            {!feelings && !activities && <FullName>{user?.username || 'Người dùng'}</FullName>}
                            {feelings && (
                                <Description>
                                    <FullName>{user?.username || 'Người dùng'}</FullName>
                                    <State> hiện đang </State>
                                    <View style={{ width: 20, height: 20, marginRight: 5 }}>
                                        <feelings.SVGIcon height={20} width={20} style={{ height: 20, width: 20 }} />
                                    </View>
                                    <State>cảm thấy </State>
                                    <StateBold>{feelings?.title}</StateBold>
                                </Description>
                            )}
                            {activities && (
                                <Description>
                                    <FullName>{user?.username || 'Người dùng'}</FullName>
                                    <State> đang </State>
                                    <View style={{ width: 20, height: 20, marginRight: 5 }}>
                                        <activities.SVGIcon height={20} width={20} style={{ height: 20, width: 20 }} />
                                    </View>
                                    <StateBold>{activities?.title}</StateBold>
                                </Description>
                            )}
                            <ViewSelectScope>
                                <SelectScope
                                    title={scope}
                                    propsButton={{
                                        padding: 1,
                                        height: 30,
                                        width: 90,
                                        backgroundColor: Color.lightBlue,
                                        borderRadius: 5,
                                        marginRight: 10,
                                        marginLeft: 2,
                                    }}
                                    nameIcon={scope === 'Công khai' ? 'earth' : scope === 'Bạn bè' ? 'account-group' : 'lock'}
                                    propsIcon={{
                                        size: 16,
                                        color: Color.blueButtonColor,
                                        padding: 1,
                                        marginRight: -10,
                                        backgroundColor: Color.lightBlue,
                                        marginLeft: 5,
                                    }}
                                    typeIcon={
                                        scope === 'Công khai'
                                            ? 'MaterialCommunityIcons'
                                            : scope === 'Bạn bè'
                                            ? 'MaterialCommunityIcons'
                                            : 'MaterialCommunityIcons'
                                    }
                                    propsTitle={{ size: 12, color: Color.blueButtonColor }}
                                    onPress={() => setShowScope(!showScope)}
                                    downIcon={true}
                                    propsDownIcon={{ color: Color.blueButtonColor }}
                                />
                                {showScope && (
                                    <Scope
                                        items={itemsScope}
                                        showMore={showScope}
                                        propsButton={{
                                            width: 100,
                                            height: 27,
                                            backgroundColor: Color.white,
                                            padding: 1,
                                            alignItems: 'center',
                                        }}
                                        propsIcon={{ size: 18, color: Color.gray, padding: 1 }}
                                        propsTitle={{ size: 14, color: Color.gray }}
                                        top={20}
                                    />
                                )}
                                <SelectScope
                                    title={'Album'}
                                    propsButton={{ padding: 1, height: 30, width: 65, backgroundColor: Color.lightBlue, borderRadius: 5 }}
                                    nameIcon={'plus'}
                                    propsIcon={{
                                        size: 16,
                                        color: Color.blueButtonColor,
                                        padding: 1,
                                        marginRight: -10,
                                        backgroundColor: Color.lightBlue,
                                        marginLeft: 5,
                                    }}
                                    typeIcon={'MaterialCommunityIcons'}
                                    propsTitle={{ size: 12, color: Color.blueButtonColor }}
                                    downIcon={true}
                                    propsDownIcon={{ color: Color.blueButtonColor }}
                                />
                            </ViewSelectScope>
                        </Info>
                    </ContentHeader>
                    <InputText
                        placeholder="Bạn đang nghĩ gì?"
                        onChangeText={(text) => handleInput(text)}
                        placeholderTextColor={Color.gray}
                        style={{ color: Color.black, zIndex: -1 }}
                        value={input}
                    />
                    {allImageUrl?.length > 0 && (
                        <PhotoGrid source={allImageUrl} canDelete={true} setAllImage={setAllImage} allImage={allImage} handleDeleteImage={handleDeleteImage} />
                    )}
                    {allVideo?.length > 0 && <VideoComponent uri={allVideo[0]?.uri} canDelete={true} setAllVideo={setAllVideo} allVideo={allVideo} />}
                </Content>
            </ScrollView>
            {renderPopUpComponent && (
                <PopupComponent
                    renderPopUpComponent={renderPopUpComponent}
                    setRenderPopUpComponent={setRenderPopUpComponent}
                    onBackdropPress={() => true}
                    coverScreen={false}
                    hasBackdrop={false}
                >
                    {listItems.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            SVGIcon={item.SVGIcon}
                            propsButton={propsButton}
                            propsIcon={propsIcon}
                            propsTitle={propsTitle}
                            onPress={item.handlePress}
                        />
                    ))}
                </PopupComponent>
            )}
            {!renderPopUpComponent && (
                <PopupComponent
                    renderPopUpComponent={!renderPopUpComponent}
                    setRenderPopUpComponent={setRenderPopUpComponent}
                    onBackdropPress={() => true}
                    coverScreen={false}
                    hasBackdrop={false}
                    {...(!keyboardShow && { handleScrollToTop: () => setRenderPopUpComponent(true) })}
                    disableHandleSwipeMoveBottom={true}
                >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {listItems.map((item, index) => (
                            <ButtonIconComponent
                                key={index}
                                SVGIcon={item.SVGIcon}
                                propsButton={{ width: 8, height: 40, marginBottom: 10 }}
                                propsIcon={propsIcon}
                                onPress={item.handlePress}
                            />
                        ))}
                    </ScrollView>
                </PopupComponent>
            )}

            {renderPopUpComponent2 && (
                <PopupComponent
                    renderPopUpComponent={renderPopUpComponent2}
                    setRenderPopUpComponent={setRenderPopUpComponent2}
                    onBackdropPress={() => true}
                    headerItem={headerPopup2}
                >
                    {listItems2.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            message={item.message}
                            nameIcon={item.nameIcon}
                            typeIcon={item.typeIcon}
                            propsButton={propsButton2}
                            propsIcon={{ ...propsIcon2, ...item.propsIcon }}
                            propsTitle={{ ...propsTitle2, ...item.propsTitle }}
                            propsMessage={propsMessage}
                            onPress={item.onPress}
                        />
                    ))}
                </PopupComponent>
            )}

            {renderPopUpComponent3 && (
                <PopupScreenComponent
                    renderPopUpComponent={renderPopUpComponent3}
                    setRenderPopUpComponent={setRenderPopUpComponent3}
                    onBackdropPress={() => true}
                    coverScreen={false}
                    hasBackdrop={false}
                >
                    <ChoiceFeelingComponent
                        navigation={navigation}
                        setFeelings={setFeelings}
                        feelings={feelings}
                        activities={activities}
                        setActivities={setActivities}
                        setRenderPopUpComponent={setRenderPopUpComponent3}
                        renderPopUpComponent={renderPopUpComponent3}
                        user={user}
                    />
                </PopupScreenComponent>
            )}
            <LoadingComponent visible={loadingState.loading} message={loadingState.message} />
        </Container>
    );
}

export default EditPostScreen;
