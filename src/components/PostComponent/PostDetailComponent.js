/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
// import Video, { VideoRef } from 'react-native-video';
import { Video } from 'expo-av';
import * as Clipboard from 'expo-clipboard';

import convertTimeAgo from '../../utils/convertTimeAgo';
import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import PopupComponent from '../PopupComponent';
import { useState } from 'react';
import ButtonIconComponent from '../ButtonIconComponent';
import { Button, Dimensions, View } from 'react-native';
import { images } from '../../../assets';
import { deletePostService, getPostService } from '../../services/postService';
import { useDispatch, useSelector } from 'react-redux';
import { logout, mergeUser, selectUser } from '../../redux/features/auth/authSlice';
import { Alert } from 'react-native';
import { SVGSad2, SVGHaha2 } from '../../../assets';
import { listActivity, listFeeling } from '../../constants/listItem';
import ButtonComponent from '../ButtonComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import { Pressable } from 'react-native';
// import GridImageView from './GridImage/GridImageView';
// import ReactionBox from './ReactsComponent';
import FeelComponent from './FeelComponent';
// import FbImages from './PhotoGridComponent2/PhotoGrid';
import PhotoGrid from '../PhotoGridComponent/PhotoGrid';
import { StatusBar } from 'expo-status-bar';
import EditPostScreen from '../../screens/EditPostScreen';
import { deletePost, updatePost } from '../../redux/features/post/postSlice';
import { removeDataByIdAsyncStorage } from '../../utils/asyncCacheStorage';
import { setNoti } from '../../redux/features/noti/notiSlice';
import CachedImage from '../CachedImage';
// import VideoPlayer from 'react-native-video-player';
// import PhotoGrid from './PhotoGridComponent2/PhotoGrid';
// import GridImageView from './GridImageView';

const ShadowSurface = styled(Surface)`
    width: 100%;
    elevation: 4;
`;

// align-items: center;
const PostContainer = styled.ScrollView`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 8px;
    background-color: ${Color.white};
`;

const PaddingBottom = styled.View`
    width: 100%;
    height: 80px;
    background-color: ${Color.white};
`;

const PostHeader = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PostAuthor = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const PostAuthorAvatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    resize-mode: cover;
    margin-left: 12px;
    margin-right: 6px;
`;

const PostTimeContainer = styled.View`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const PostTime = styled.Text`
    font-size: 13px;
    color: ${Color.gray};
`;

const ThreeDotsContainer = styled.Pressable`
    position: absolute;
    right: 0;
    top: -4px;
    border-radius: 10px;
    padding: 15px;
`;

const ThreeDots = styled(VectorIcon)``;

const PostContent = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
`;

const PostContentText = styled.Text`
    font-size: 16px;
    padding: 0 12px;
    margin-bottom: 8px;
    margin-top: 8px;
`;

const Info = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    width: ${Dimensions.get('window').width - 100}px;
    align-items: flex-end;
`;

const FooterPost = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
    padding-vertical: 2px;
    background-color: ${Color.white};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const Description = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
`;

const State = styled.Text`
    font-size: 14px;
    color: ${Color.gray};
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    margin-left: -2px;
`;

const PostDetailComponent = ({ item, user, navigation, post, setPost, handleRequestNewPost, cacheFolder = '' }) => {
    console.log('item', item);
    const dispatch = useDispatch();

    const userSelector = useSelector(selectUser);

    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    // const [itemPost, setItemPost] = useState(item);
    const [itemPost, setItemPost] = useState(item);
    // const [feel, setFeel] = useState(item.feel);
    // const [felt, setFelt] = useState(item.is_felt);
    const [state, setState] = useState({
        activitie: null,
        feel: null,
    });

    const handleDeletePost = () => {
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa bài viết này?', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xóa',
                onPress: () => {
                    deletePost1();
                },
            },
        ]);
    };

    const deletePost1 = () => {
        const data = {
            id: item.id,
        };

        deletePostService(data).then((res) => {
            setRenderPopUpComponent(false);
            if (res.data.code === '1000') {
                const newListPost = post.filter((ite) => ite.id !== item.id);
                mergeUser({ ...userSelector, coins: res.data.data.coins });
                // setPost(newListPost);
                dispatch(deletePost(item.id));
                dispatch(
                    setNoti({
                        show: true,
                        title: 'Xóa bài viết thành công',
                        iconName: 'check-circle',
                        iconType: 'Feather',
                        propsButton: { backgroundColor: Color.green, width: 95, marginRight: 10, marginLeft: 10, position: 'absolute', bottom: 50 },
                        propsIcon: { color: Color.white, size: 16, backgroundColor: Color.green, padding: 1 },
                        propsTitle: { color: Color.white, size: 16 },
                    }),
                );
                removeDataByIdAsyncStorage('homePosts', item.id);
            } else if (res.data.code === '9992') {
                Alert.alert(
                    'Thông báo',
                    'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                dispatch(logout());
                            },
                        },
                    ],
                    { cancelable: false },
                );
            }
        });
    };

    const handleUpdatePost = (id) => {
        console.log(id);
        const data = {
            id,
        };

        getPostService(data)
            .then((res) => {
                if (res.data.code === '1000') {
                    setItemPost(res.data.data);
                    // const newPost = res.data.data;
                    // const newL
                    dispatch(updatePost({ post: res.data.data, isVideo: res.data.data.video ? true : false }));
                    dispatch(
                        setNoti({
                            show: true,
                            title: 'Cập nhật bài viết thành công',
                            iconName: 'check-circle',
                            iconType: 'Feather',
                            propsButton: { backgroundColor: Color.green, width: 95, marginRight: 10, marginLeft: 10, position: 'absolute', bottom: 50 },
                            propsIcon: { color: Color.white, size: 16, backgroundColor: Color.green, padding: 1 },
                            propsTitle: { color: Color.white, size: 16 },
                        }),
                    );
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const listItems = [
        {
            title: 'Tắt thông báo bài viết này',
            name: 'bell-off',
            type: 'Feather',
            handlePress: () => {
                console.log(`Tắt thông báo bài viết này ${item.id}`);
            },
        },
        {
            title: 'Lưu bài viết',
            name: 'bookmark',
            type: 'Feather',
            handlePress: () => {
                console.log(`Lưu bài viết ${item.id}`);
            },
        },
        {
            title: 'Xóa bài viết',
            name: 'delete',
            type: 'AntDesign',
            handlePress: () => {
                handleDeletePost();
            },
        },
        {
            title: 'Chỉnh sửa bài viết',
            name: 'edit',
            type: 'Feather',
            handlePress: () => {
                setRenderPopUpComponent(false);
                setShowEditPost(true);
            },
        },
        {
            title: 'Sao chép liên kết',
            name: 'link',
            type: 'Feather',
            handlePress: () => {
                Clipboard.setStringAsync(`https://www.facebook.com/${item.id}`);
                setRenderPopUpComponent(false);
            },
        },
    ];
    useEffect(() => {
        try {
            const json = JSON.parse(item.state);
            const activitie = listActivity.find((it) => it.id === json.id && json.type === 'activities');
            const feel = listFeeling.find((it) => it.id === json.id && json.type === 'feelings');
            if (activitie || feel) {
                setState({ ...state, activitie, feel });
            }
        } catch (e) {
            return;
        }
    }, []);

    return (
        <ShadowSurface>
            <PostContainer>
                <PostHeader>
                    <Pressable
                        onPress={() => {
                            navigation.navigate(routes.PROFILE_SCREEN, { user_id: itemPost.author.id });
                        }}
                    >
                        {/* <PostAuthorAvatar source={itemPost.author?.avatar === '' ? images.defaultAvatar : { uri: itemPost.author?.avatar }} /> */}
                        {itemPost.author?.avatar === '' ? (
                            <PostAuthorAvatar source={images.defaultAvatar} />
                        ) : (
                            <CachedImage
                                image={true}
                                source={{ uri: itemPost.author?.avatar }}
                                style={{ width: 40, height: 40, borderRadius: 25, marginLeft: 12, marginRight: 6 }}
                                resizeMode="cover"
                                cacheFolder={'avatar'}
                                cacheKey={itemPost.author?.avatar.split('/').pop()}
                            />
                        )}
                    </Pressable>
                    <PostAuthor>
                        <Info>
                            <ButtonComponent
                                title={itemPost.author.name || 'Author'}
                                onPress={() => navigate(routes.PROFILE_SCREEN, { user_id: itemPost.author.id })}
                                color={Color.black}
                                fontWeight={'bold'}
                                size={16}
                                style={{
                                    backgroundColor: 'transparent',
                                    width: 'auto',
                                    height: 'auto',
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    marginBottom: 0,
                                    marginRight: 0,
                                    marginLeft: 0,
                                }}
                            />
                            {(state.activitie || state.feel) && (
                                <Description>
                                    <State> {state.activitie ? 'hiện' : 'hiện đang'} </State>
                                    <View style={{ width: 20, height: 20 }}>
                                        {state.activitie && <state.activitie.SVGIcon height={20} width={20} style={{ height: 20, width: 20 }} />}
                                        {state.feel && <state.feel.SVGIcon height={20} width={20} style={{ height: 20, width: 20 }} />}
                                    </View>
                                    <State>{state.activitie ? ' ' + state.activitie.title : ' cảm thấy ' + state.feel.title}</State>
                                </Description>
                            )}
                        </Info>

                        <PostTimeContainer>
                            <PostTime>{convertTimeAgo(itemPost.created)}</PostTime>
                            <VectorIcon nameIcon={'dot-single'} typeIcon={'Entypo'} color={Color.gray} size={10} />
                            {itemPost.state !== 'published' ? (
                                <VectorIcon nameIcon={'public'} typeIcon={'MaterialIcons'} color={Color.gray} size={16} />
                            ) : (
                                <VectorIcon nameIcon={'user-friends'} typeIcon={'FontAwesome5'} color={Color.gray} size={14} />
                            )}
                        </PostTimeContainer>
                    </PostAuthor>
                    <ThreeDotsContainer onPress={() => setRenderPopUpComponent(true)}>
                        <ThreeDots nameIcon={'dots-three-horizontal'} typeIcon={'Entypo'} size={20} color={Color.black} />
                    </ThreeDotsContainer>
                </PostHeader>
                <PostContent>
                    <PostContentText>{itemPost?.described}</PostContentText>

                    {itemPost?.image?.length > 0 &&
                        itemPost.image.map((it, index) => (
                            <PhotoGrid
                                key={index}
                                source={[it]}
                                onPressImage={(source) => this.showImage(source.uri)}
                                renderModalFooter={true}
                                renderMFooter={itemPost}
                                setItemPost={setItemPost}
                                cacheFolder={cacheFolder}
                            />
                        ))}
                    {/* <PhotoGrid
                        source={itemPost?.image}
                        onPressImage={(source) => this.showImage(source.uri)}
                        renderModalFooter={true}
                        renderMFooter={itemPost}
                        setItemPost={setItemPost}
                    /> */}
                    {itemPost.video && (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Color.black,
                                height: Dimensions.get('window').height * 0.6,
                            }}
                        >
                            <Video
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: item.video?.url }}
                                useNativeControls
                                resizeMode="contain"
                                isLooping
                                shouldPlay={false}
                            />
                        </View>
                    )}
                    <FooterPost>
                        <FeelComponent data={itemPost} setItemPost={setItemPost} />
                    </FooterPost>
                    {(itemPost.video || itemPost.image.length > 0) && <PaddingBottom />}
                </PostContent>
            </PostContainer>
            {renderPopUpComponent && (
                <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                    {listItems.map((button, index) =>
                        (button.title === 'Xóa bài viết' && itemPost.author.id === userSelector.id) ||
                        (button.title === 'Chỉnh sửa bài viết' && itemPost.can_edit === '1') ||
                        (button.title !== 'Xóa bài viết' && button.title !== 'Chỉnh sửa bài viết') ? (
                            <ButtonIconComponent
                                key={index}
                                title={button.title}
                                nameIcon={button.name}
                                typeIcon={button.type}
                                propsButton={{ height: 64 }}
                                propsIcon={{ size: 24, color: Color.black }}
                                propsTitle={{ size: 16, color: Color.black, fontWeight: 'normal' }}
                                onPress={button.handlePress}
                            />
                        ) : null,
                    )}
                </PopupComponent>
            )}
            {showEditPost && (
                <EditPostScreen
                    item={itemPost}
                    setShowEditPost={setShowEditPost}
                    navigation={navigation}
                    user={user}
                    post={itemPost}
                    setPost={setPost}
                    handleRequestNewPost={handleRequestNewPost}
                    handleUpdatePost={handleUpdatePost}
                />
            )}
        </ShadowSurface>
    );
};

export default PostDetailComponent;
