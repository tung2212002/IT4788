/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
import { Video } from 'expo-av';

import convertTimeAgo from '../../utils/convertTimeAgo';
import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import PopupComponent from '../PopupComponent';
import { useState } from 'react';
import ButtonIconComponent from '../ButtonIconComponent';
import { Dimensions, View } from 'react-native';
import { images } from '../../../assets';
import { deletePostService } from '../../services/postService';
import { useDispatch, useSelector } from 'react-redux';
import { logout, mergeUser, selectUser } from '../../redux/features/auth/authSlice';
import { Alert } from 'react-native';
import { SVGSad2 } from '../../../assets';
import { listActivity, listFeeling } from '../../constants/listItem';
import ButtonComponent from '../ButtonComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import { Pressable } from 'react-native';
import FeelComponent from './FeelComponent';
import { setRequestFriendService } from '../../services/friendService';
import { setBlockService } from '../../services/blockService';
import VideoComponent from './VideoComponent';
import PhotoGrid from '../PhotoGridComponent/PhotoGrid';
import { deletePost } from '../../redux/features/post/postSlice';
import { removeDataByIdAsyncStorage } from '../../utils/asyncCacheStorage';
import { setNoti } from '../../redux/features/noti/notiSlice';

const ShadowSurface = styled(Surface)`
    width: 100%;
    elevation: 4;
`;

const PostContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
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

const FeelView = styled.View`
    flex-direction: row;
    padding: 10px;
    margin-top: 10px;
`;

const Feel = styled.View`
    flex-direction: row;
    flex: 1;
`;

const CommentView = styled.View``;

const Comment = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${Color.gray};
`;

const FooterPost = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
    padding-vertical: 2px;
    background-color: ${Color.white};
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

const ButtonIcon = styled(ButtonIconComponent)``;

const SVGSad = styled(SVGSad2)`
    transform: translateX(4px);
    z-index: 1;
`;

const PostVideoComponent = ({ item, user, navigation, post, setPost }) => {
    const dispatch = useDispatch();

    const userSelector = useSelector(selectUser);

    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    // const [itemPost, setItemPost] = useState(item);
    const [itemPost, setItemPost] = useState(item);
    // const [feel, setFeel] = useState(item.feel);
    // const [felt, setFelt] = useState(item.is_felt);
    const [state, setState] = useState({
        activitie: null,
        feel: null,
    });

    const handleRequestFriend = () => {
        const body = {
            user_id: itemPost.author.id,
        };

        setRequestFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setUser({ ...user, is_friend: '2' });
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

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

    const handleBlockUser = () => {
        const body = {
            user_id: itemPost.author.id,
        };

        setBlockService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    const newListPost = post.filter((ite) => ite.author.id !== itemPost.author.id);
                    setPost(newListPost);
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const listItems = [
        {
            title: 'Báo cáo video',
            name: 'warning',
            type: 'AntDesign',
            handlePress: () => {
                console.log(`Báo cáo video ${item.id}`);
            },
        },
        {
            title: userSelector.id !== item.author.id ? 'Kết bạn với chủ bài viết' : 'Tắt thông báo từ bài viết này',
            name: userSelector.id !== item.author.id ? 'user-plus' : 'bell-off',
            type: 'Feather',
            handlePress: handleRequestFriend,
        },
        {
            title: userSelector.id === item.author.id ? 'Xóa bài viết' : 'Chặn chủ bài viết',
            name: userSelector.id === item.author.id ? 'delete' : 'block',
            type: userSelector.id === item.author.id ? 'AntDesign' : 'MaterialIcons',
            handlePress: userSelector.id === item.author.id ? handleDeletePost : handleBlockUser,
        },
        {
            title: 'Chỉnh sửa bài viết',
            name: 'edit',
            type: 'Feather',
            handlePress: () => {},
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
                        <PostAuthorAvatar source={itemPost.author?.avatar === '' ? images.defaultAvatar : { uri: itemPost.author?.avatar }} />
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
                    <PhotoGrid source={itemPost?.image} onPressImage={(source) => this.showImage(source.uri)} />
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
                                style={{ width: '100%', height: '100%', backgroundColor: Color.black, zIndex: 1000 }}
                                source={{ uri: item.video.url }}
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
        </ShadowSurface>
    );
};

export default PostVideoComponent;
