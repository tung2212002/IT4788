import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, FlatList, Platform, Pressable, RefreshControl, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

import Color from '../../utils/Color';
import PopupComponent from '../../components/PopupComponent';
import ButtonIconComponent from '../../components/ButtonIconComponent';
import { images } from '../../../assets';
import VectorIcon from '../../utils/VectorIcon';
import { useImagePicker } from '../../hooks/useImagePicker';
import { useVideoPicker } from '../../hooks/useVideoPicker';
import { useCameraPicker } from '../../hooks/useCameraPicker';
import { selectUser } from '../../redux/features/auth/authSlice';
import PopupScreenComponent from '../../components/PopupScreenCompopnent';
import ChangeAvatarScreen from './ChangeAvatarScreen';
import { navigate } from '../../navigation/RootNavigator';
import { getUserInfoService } from '../../services/profileService';
import { Alert } from 'react-native';
import { useMediaPicker } from '../../hooks/useMediaPicker';
import BioProfileComponent from '../../components/BioProfileComponent';
import { DelRequestFriendService, getUserFriendsService, setAcceptFriendService, setRequestFriendService, unfriendService } from '../../services/friendService';
import routes from '../../constants/route';
import PostComposerComponent from '../../components/PostComposerComponent';
import { getListPostsService, getPostService } from '../../services/postService';
import { getLocationStorage } from '../../utils/locationStorage';
import PostComponent from '../../components/PostComponent/PostComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { addListPostHomeEnd, addListPostUserEnd, addPost, selectUserPost, setListUserPost } from '../../redux/features/post/postSlice';

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${Color.grey4};
`;

const HeaderProfile = styled.View`
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: ${Color.white};
`;

const ItemRightComponent = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PressItem = styled.Pressable`
    margin-horizontal: 10px;
`;

const ProfileContainer = styled.View`
    margin-top: 50px;
    flex: 1;
    width: 100%;
    height: 100%;
    border-bottom-width: 2px;
    border-color: ${Color.grey5};
    background-color: ${Color.white};
`;

const BackGround = styled.ImageBackground`
    height: ${Dimensions.get('window').height * 0.3}px;
    align-items: flex-start;
    justify-content: flex-end;
`;

const AvatarContainer = styled.View`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border-width: 5px;
    border-color: ${Color.white};
    margin-left: 20px;
    background-color: ${Color.white};
    position: absolute;
    bottom: -50px;
`;

const AvatarIcon = styled.TouchableOpacity`
    border-radius: 20px;
    background-color: ${Color.lightGray};
    z-index: 1;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: 10px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    border-radius: 100px;
`;

const FullName = styled.Text`
    font-size: 30px;
    font-family: OpenSans-Bold;
    color: ${Color.black};
    margin-top: 10px;
    margin-left: 20px;
    position: absolute;
    bottom: -100px;
`;

const ButtonView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

const ButtonDot = styled(VectorIcon)`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    background-color: ${Color.lightGray};
    margin-left: ${Dimensions.get('window').width * 0.08 - 20}px;
`;

const FriendLabelContainer = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    width: 100%;
    background-color: ${Color.white};
    margin-top: 10px;
`;

const LabelFriend = styled.Text`
    font-size: 20px;
    color: ${Color.black};
    font-family: 'Roboto-Bold';
    margin-left: 10px;
`;

const Friend = styled.Text`
    font-size: 16px;
    color: ${Color.gray};
    margin-left: 10px;
    font-family: 'Roboto-Medium';
`;

const SeeAll = styled.Text`
    font-size: 16px;
    color: ${Color.blueButtonColor};
    font-family: 'Roboto-Medium';
`;

const ListFriend = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${Color.white};
    padding: 10px 5px;
`;

const FriendContainer = styled.Pressable`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: ${(Dimensions.get('window').width - 30) / 3}px;
    height: ${Dimensions.get('window').width * 0.45}px;
    background-color: ${Color.white};
    border-radius: 8px;
    margin-bottom: 20px;
`;

const FriendImage = styled.View`
    width: ${(Dimensions.get('window').width - 30) / 3}px;
    height: ${(Dimensions.get('window').width - 30) / 3}px;
    overflow: hidden;
`;

const FriendAvatar = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const FriendName = styled.Text`
    font-size: 15px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-top: 5px;
    margin-left: 5px;
    flex-wrap: wrap;
`;

const ItemSeparatorView = styled.View`
    height: 8px;
    background-color: ${Color.mainBackgroundHome};
`;

const Footer = styled.View`
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;
const ActivityIndicatorIcon = styled(ActivityIndicator)``;

const Modal = styled(PopupComponent)`
    width: 100%;
    height: 100%;
    paddiing-bottom: 20px;
`;

const Bio = styled(BioProfileComponent)``;

const CONTAINER_HEIGHT = 60;

function ProfileScreen({ route, navigation, props }) {
    const dispatch = useDispatch();

    const post = useSelector(selectUserPost);
    const userSelect = useSelector(selectUser);

    const [user, setUser] = useState({});
    const user_id = route.params?.user_id;
    // const [post, setPost] = useState([]);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const [renderPopUpComponent2, setRenderPopUpComponent2] = useState(false);
    const [renderPopUpComponent3, setRenderPopUpComponent3] = useState(false);
    const { imageFiles, pickImage, clearImages } = useImagePicker();
    const { videoFiles, pickVideo, clearVideos } = useVideoPicker();
    const { mediaFiles, pickMedia, clearMedias } = useMediaPicker();
    const { pickedImagePath, pickCamera } = useCameraPicker();
    const [lastAvatar, setLastAvatar] = useState(null);
    const count = 10;
    const [location, setLocation] = useState(null);
    const [friends, setFriends] = useState({
        total: 0,
        friends: [],
    });
    const [pagination, setPagination] = useState({
        index: 0,
        lastId: 0,
        isRefreshing: false,
        isLoadMore: false,
    });

    const HeaderTitle = styled.Text`
        font-size: 20px;
        font-family: OpenSans-Bold;
        color: ${Color.black};
        padding-left: ${userSelect.id === user_id || !user_id ? '45px' : '0px'};
    `;

    const listItems = [
        {
            title: 'Quay video đại diện mới',
            name: 'video',
            type: 'FontAwesome5',
            handlePress: pickCamera,
        },
        {
            title: 'Chọn video đại diện',
            name: 'folder-video',
            type: 'Entypo',
            handlePress: pickVideo,
        },
        {
            title: 'Chọn ảnh đại diện',
            name: 'images',
            type: 'Ionicons',
            handlePress: pickImage,
        },
    ];

    const propsButton = {
        backgroundColor: Color.white,
        width: 100,
        height: 80,
    };

    const propsIcon = {
        size: 26,
        color: Color.black,
        backgroundColor: Color.lightGray,
    };

    const propsTitle = {
        size: 20,
        color: Color.black,
    };

    const handleGetUserInfo = async () => {
        const body = {
            user_id: user_id,
        };
        getUserInfoService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    setUser(response.data.data);
                } else {
                    Alert.alert('Thông báo', 'Lỗi lấy thông tin người dùng', [{ text: 'OK', onPress: () => navigation.goBack() }], {
                        cancelable: false,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    const handleGetFriendInfo = async () => {
        const body = {
            index: 0,
            count: 6,
            user_id: user_id ? user_id : userSelect.id,
        };
        getUserFriendsService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    setFriends({
                        total: response.data.data.total,
                        friends: response.data.data.friends,
                    });
                } else {
                    Alert.alert('Thông báo', 'Lỗi, thử lại sau', [{ text: 'OK', onPress: () => navigation.goBack() }], {
                        cancelable: false,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    const handleRequestNewPost = (id) => {
        console.log(id);
        const data = {
            id,
        };

        getPostService(data)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setPost((prevPosts) => {
                    //     return prevPosts.map((post) => {
                    //         if (post.id === id) {
                    //             return { ...post, ...res.data.data };
                    //         }
                    //         return post;
                    //     });
                    // });
                    const newPost = res.data.data;
                    if (newPost.video) {
                        dispatch(addPost({ post: newPost, isVideo: true }));
                    } else {
                        dispatch(addPost({ post: newPost, isVideo: false }));
                    }
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (pickedImagePath) {
            setLastAvatar(pickedImagePath);
        }
    }, [pickedImagePath]);

    useEffect(() => {
        if (imageFiles.length === 0) {
            return;
        }
        setLastAvatar(imageFiles[0]);
        setRenderPopUpComponent(false);
        setRenderPopUpComponent2(true);
    }, [imageFiles]);

    useEffect(() => {
        setLastAvatar(videoFiles[0]);
    }, [videoFiles]);

    useEffect(() => {
        setLastAvatar(mediaFiles[0]);
    }, [mediaFiles]);

    useEffect(() => {
        if ((userSelect.avatar === '' && userSelect.id === user_id) || !user_id) {
            setUser(userSelect);
            // setRenderPopUpComponent(true);
        } else {
            handleGetUserInfo();
        }
    }, []);

    useEffect(() => {
        handleGetFriendInfo();
    }, []);

    const generateBoxShadowStyle = () => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 1.5,
            };
        } else {
            return {
                elevation: 5,
            };
        }
    };

    const onRefresh = () => {
        console.log('refresh....');
        setPagination({ ...pagination, isRefreshing: true, index: 0 });
    };

    const onLoadMore = () => {
        console.log('load more....');
        if (!pagination.lastId || pagination.isRefreshing) {
            return;
        }
        console.log('load more....');
        setPagination({ ...pagination, isLoadMore: true });
    };

    const handleLoadMore = () => {
        const data = {
            in_campaign: '1',
            campaign_id: '1',
            latitude: location.latitude,
            longitude: location.longitude,
            last_id: pagination.lastId,
            index: pagination.index,
            count: count,
            user_id: user_id ? user_id : userSelect.id,
        };
        getListPostsService(data)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data.post?.length !== 0 && response.data.data?.last_id !== pagination.lastId) {
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length + pagination.index,
                            isLoadMore: false,
                        });
                        // setPost((prev) => [...prev, ...response.data.data.post]);
                        dispatch(addListPostUserEnd(response.data.data.post));
                    } else {
                        setPagination({ ...pagination, isLoadMore: false });
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isLoadMore: false });
                console.log(e);
            });
    };

    const refreshControl = <RefreshControl refreshing={pagination.isRefreshing} onRefresh={onRefresh} progressViewOffset={CONTAINER_HEIGHT} />;

    const refreshData = () => {
        const data = {
            in_campaign: '1',
            campaign_id: '1',
            latitude: location.latitude,
            longitude: location.longitude,
            index: pagination.index,
            count: count,
            user_id: user_id ? user_id : userSelect.id,
        };
        getListPostsService(data)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data.post.length !== 0 && response.data.data.last_id !== pagination.lastId) {
                        // setPost(response.data.data.post);
                        dispatch(setListUserPost(response.data.data.post));
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length,
                            isRefreshing: false,
                        });
                    } else {
                        setPagination({ ...pagination, isRefreshing: false });
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isRefreshing: false });
                console.log(e);
            });
    };

    const handleRequestFriend = () => {
        const body = {
            user_id: user_id,
        };

        setRequestFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setUser({ ...user, is_friend: '2' });
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleDelRequestFriend = () => {
        const body = {
            user_id: user_id,
        };

        DelRequestFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setUser({ ...user, is_friend: '0' });
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleAcceptFriend = () => {
        const body = {
            user_id: user_id,
            is_accept: '1',
        };

        setAcceptFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setUser({ ...user, is_friend: '1' });
                    setRenderPopUpComponent3(false);
                } else {
                    setRenderPopUpComponent3(false);
                }
            })
            .catch((err) => {
                setRenderPopUpComponent3(false);
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleUnFriend = () => {
        const body = {
            user_id: user_id,
        };

        unfriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setUser({ ...user, is_friend: '0' });
                    setRenderPopUpComponent3(false);
                } else {
                    setRenderPopUpComponent3(false);
                }
            })
            .catch((err) => {
                setRenderPopUpComponent3(false);

                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleCancelRequestFriend = () => {
        const body = {
            user_id: user_id,
            is_accept: '0',
        };

        setAcceptFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setUser({ ...user, is_friend: '0' });
                    setRenderPopUpComponent3(false);
                } else {
                    setRenderPopUpComponent3(false);
                }
            })
            .catch((err) => {
                setRenderPopUpComponent3(false);

                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    useEffect(() => {
        if (pagination.isRefreshing && location) {
            refreshData();
        } else if (pagination.isLoadMore && location) {
            handleLoadMore();
        }
    }, [pagination]);

    useEffect(() => {
        getLocationStorage()
            .then((res) => {
                if (res) {
                    setLocation(res);
                    const data = {
                        in_campaign: '1',
                        campaign_id: '1',
                        latitude: res.latitude,
                        longitude: res.longitude,
                        index: pagination.index,
                        count: count,
                        user_id: user_id ? user_id : userSelect.id,
                    };

                    getListPostsService(data)
                        .then((response) => {
                            if (response.data.code === '1000') {
                                if (response.data.data.post.length !== 0) {
                                    setPagination({ ...pagination, lastId: response.data.data.last_id, index: response.data.data.post.length });
                                    // setPost(response.data.data.post);
                                    dispatch(setListUserPost(response.data.data.post));
                                } else {
                                    setPagination({ ...pagination, isRefreshing: false });
                                }
                            }
                        })
                        .catch((e) => {
                            setPagination({ ...pagination, isRefreshing: false });
                        });
                } else {
                    Alert.alert('Please turn on location');
                }
            })
            .catch((e) => {
                Alert.alert('Have error, please try again');
            });
    }, []);

    return (
        <Container>
            <HeaderProfile>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={30} color={Color.black} />
                </Pressable>
                <HeaderTitle> {user.username}</HeaderTitle>
                <ItemRightComponent>
                    {userSelect.id === user_id || !user_id ? (
                        <PressItem onPress={() => navigate('EditProfileScreen')}>
                            <VectorIcon nameIcon={'pencil'} typeIcon={'FontAwesome'} size={24} color={Color.black} />
                        </PressItem>
                    ) : null}
                    <PressItem onPress={() => navigate('SearchScreen')}>
                        <VectorIcon nameIcon={'search'} typeIcon={'FontAwesome'} size={24} color={Color.black} />
                    </PressItem>
                </ItemRightComponent>
            </HeaderProfile>
            <ScrollView
                style={{ flex: 1, backgroundColor: Color.white }}
                refreshing={pagination.isRefreshing}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                refreshControl={refreshControl}
                onScroll={({ nativeEvent }) => {
                    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
                        console.log('bottom');
                        onLoadMore();
                    }
                }}
                scrollEventThrottle={16}
            >
                <ProfileContainer>
                    <BackGround source={user.cover_image === '' || !user.cover_image ? images.defaultBackground : { uri: user.cover_image }}>
                        <AvatarContainer>
                            <Avatar
                                source={
                                    user_id === userSelect.id || !user_id
                                        ? userSelect.avatar === ''
                                            ? images.defaultAvatar
                                            : { uri: userSelect.avatar }
                                        : user.avatar === ''
                                        ? images.defaultAvatar
                                        : { uri: user.avatar }
                                }
                            />
                            {userSelect.id === user_id || !user_id ? (
                                <AvatarIcon onPress={() => setRenderPopUpComponent(true)}>
                                    <VectorIcon nameIcon="camera" typeIcon="FontAwesome5" size={22} color={Color.black} />
                                </AvatarIcon>
                            ) : null}
                        </AvatarContainer>

                        <FullName>{user_id === userSelect.id || !user_id ? userSelect.username : user.username}</FullName>
                    </BackGround>
                    <Bio user={user} friends={friends} />

                    {userSelect.id === user_id || !user_id ? (
                        <ButtonView>
                            <ButtonIconComponent
                                nameIcon={'plus'}
                                typeIcon={'Feather'}
                                title={'Thêm vào tin'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '95',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.blueButtonColor,
                                    borderRadius: 8,
                                    marginBottom: 20,
                                }}
                                propsIcon={{ color: Color.white, size: 24, backgroundColor: Color.blueButtonColor, padding: 1 }}
                                propsTitle={{ color: Color.white, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonIconComponent
                                nameIcon={'pencil'}
                                typeIcon={'FontAwesome'}
                                title={'Chỉnh sửa trang cá nhân'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '82',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.lightGray,
                                    borderRadius: 8,
                                }}
                                propsIcon={{ color: Color.black, size: 20, backgroundColor: Color.lightGray, padding: 1 }}
                                propsTitle={{ color: Color.black, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonDot nameIcon={'ellipsis-horizontal'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                        </ButtonView>
                    ) : user.is_friend === '1' ? (
                        <ButtonView>
                            <ButtonIconComponent
                                onPress={() => setRenderPopUpComponent3(true)}
                                nameIcon={'user-check'}
                                typeIcon={'FontAwesome5'}
                                title={'Bạn bè'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.lightGray,
                                    borderRadius: 8,
                                    marginBottom: 20,
                                }}
                                propsIcon={{ color: Color.black, size: 20, backgroundColor: Color.lightGray, padding: 1 }}
                                propsTitle={{ color: Color.black, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonIconComponent
                                nameIcon={'facebook-messenger'}
                                typeIcon={'FontAwesome5'}
                                title={'Nhắn tin'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.blueButtonColor,
                                    borderRadius: 8,
                                    marginLeft: 10,
                                }}
                                propsIcon={{ color: Color.white, size: 20, backgroundColor: Color.blueButtonColor, padding: 1 }}
                                propsTitle={{ color: Color.white, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonDot nameIcon={'ellipsis-horizontal'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                        </ButtonView>
                    ) : user.is_friend === '2' ? (
                        <ButtonView>
                            <ButtonIconComponent
                                onPress={handleDelRequestFriend}
                                nameIcon={'user-minus'}
                                typeIcon={'FontAwesome5'}
                                title={'Hủy yêu cầu'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.lightGray,
                                    borderRadius: 8,
                                    marginBottom: 20,
                                }}
                                propsIcon={{ color: Color.black, size: 20, backgroundColor: Color.lightGray, padding: 1 }}
                                propsTitle={{ color: Color.black, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonIconComponent
                                nameIcon={'facebook-messenger'}
                                typeIcon={'FontAwesome5'}
                                title={'Nhắn tin'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.blueButtonColor,
                                    borderRadius: 8,
                                    marginLeft: 10,
                                }}
                                propsIcon={{ color: Color.white, size: 20, backgroundColor: Color.blueButtonColor, padding: 1 }}
                                propsTitle={{ color: Color.white, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonDot nameIcon={'ellipsis-horizontal'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                        </ButtonView>
                    ) : user.is_friend === '3' ? (
                        <ButtonView>
                            <ButtonIconComponent
                                onPress={() => setRenderPopUpComponent3(true)}
                                nameIcon={'user-check'}
                                typeIcon={'FontAwesome5'}
                                title={'Phản hồi'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.lightGray,
                                    borderRadius: 8,
                                    marginBottom: 20,
                                }}
                                propsIcon={{ color: Color.black, size: 20, backgroundColor: Color.lightGray, padding: 1 }}
                                propsTitle={{ color: Color.black, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonIconComponent
                                nameIcon={'facebook-messenger'}
                                typeIcon={'FontAwesome5'}
                                title={'Nhắn tin'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.blueButtonColor,
                                    borderRadius: 8,
                                    marginLeft: 10,
                                }}
                                propsIcon={{ color: Color.white, size: 20, backgroundColor: Color.blueButtonColor, padding: 1 }}
                                propsTitle={{ color: Color.white, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonDot nameIcon={'ellipsis-horizontal'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                        </ButtonView>
                    ) : (
                        <ButtonView>
                            <ButtonIconComponent
                                onPress={handleRequestFriend}
                                nameIcon={'user-plus'}
                                typeIcon={'FontAwesome5'}
                                title={'Thêm bạn bè'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.blueButtonColor,
                                    borderRadius: 8,
                                    marginBottom: 20,
                                }}
                                propsIcon={{ color: Color.white, size: 20, backgroundColor: Color.blueButtonColor, padding: 1 }}
                                propsTitle={{ color: Color.white, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonIconComponent
                                nameIcon={'facebook-messenger'}
                                typeIcon={'FontAwesome5'}
                                title={'Nhắn tin'}
                                propsButton={{
                                    justifyContent: 'center',
                                    width: '40',
                                    padding: 1,
                                    height: 40,
                                    backgroundColor: Color.lightGray,
                                    borderRadius: 8,
                                    marginLeft: 10,
                                }}
                                propsIcon={{ color: Color.black, size: 20, backgroundColor: Color.lightGray, padding: 1 }}
                                propsTitle={{ color: Color.black, size: 16, fontWeight: 600, padding: 1 }}
                            />
                            <ButtonDot nameIcon={'ellipsis-horizontal'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                        </ButtonView>
                    )}
                </ProfileContainer>
                <FriendLabelContainer>
                    <LabelFriend>Bạn bè</LabelFriend>
                    <Friend>{friends.total} người bạn</Friend>
                    <Pressable onPress={() => navigate(routes.FRIEND_STACK)} style={{ position: 'absolute', right: 10, top: 10 }}>
                        <SeeAll>Xem tất cả</SeeAll>
                    </Pressable>
                </FriendLabelContainer>
                <ListFriend>
                    {friends.friends.map((item, index) => (
                        <FriendContainer
                            key={index}
                            style={[generateBoxShadowStyle()]}
                            onPress={() => {
                                navigation.push(routes.PROFILE_SCREEN, { user_id: item.id });
                            }}
                        >
                            <FriendImage>
                                <FriendAvatar source={item.avatar === '' ? images.defaultAvatar : { uri: item.avatar }} />
                            </FriendImage>
                            <FriendName>{item.username}</FriendName>
                        </FriendContainer>
                    ))}
                    {friends.total > 5 && (
                        <ButtonComponent
                            onPress={() => navigate(routes.FRIEND_STACK)}
                            color={Color.black}
                            title={'Xem tất cả'}
                            backgroundColor={Color.grey5}
                            width={'96'}
                            height={'40'}
                            size={15}
                            style={{ borderRadius: 8, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}
                        />
                    )}
                </ListFriend>
                <ItemSeparatorView />

                {userSelect.id === user_id || !user_id ? (
                    <PostComposerComponent
                        navigation={navigation}
                        stylesInput={{ placeholderTextColor: Color.grey3, borderWidth: 1, borderColor: Color.grey3 }}
                        isHeader={false}
                        post={post}
                        // setPost={setPost}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                ) : null}
                <ItemSeparatorView />
                {post &&
                    post.map((item, index) => (
                        <View key={item.id}>
                            <PostComponent
                                item={item}
                                user={user}
                                navigation={navigation}
                                post={post}
                                // setPost={setPost}
                                handleRequestNewPost={handleRequestNewPost}
                                key={index}
                            />
                            <ItemSeparatorView />
                        </View>
                    ))}
                <Footer>{pagination.isLoadMore && <ActivityIndicatorIcon size={30} color={Color.blueButtonColor} />}</Footer>
            </ScrollView>
            {renderPopUpComponent && (
                <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                    {listItems.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            nameIcon={item.name}
                            typeIcon={item.type}
                            propsButton={propsButton}
                            propsIcon={propsIcon}
                            propsTitle={propsTitle}
                            onPress={item.handlePress}
                        />
                    ))}
                </PopupComponent>
            )}
            {renderPopUpComponent2 && (
                <PopupScreenComponent
                    renderPopUpComponent={renderPopUpComponent2}
                    setRenderPopUpComponent={setRenderPopUpComponent2}
                    onBackdropPress={() => true}
                    coverScreen={true}
                    hasBackdrop={false}
                >
                    <ChangeAvatarScreen
                        navigation={navigation}
                        setRenderPopUpComponent={setRenderPopUpComponent2}
                        renderPopUpComponent={renderPopUpComponent2}
                        user={user}
                        lastAvatar={lastAvatar}
                    />
                </PopupScreenComponent>
            )}
            {renderPopUpComponent3 && (
                <Modal renderPopUpComponent={renderPopUpComponent3} setRenderPopUpComponent={setRenderPopUpComponent3}>
                    {user.is_friend === '1' ? (
                        <ButtonIconComponent
                            nameIcon={'user-minus'}
                            typeIcon={'FontAwesome5'}
                            title={'Hủy kết bạn'}
                            onPress={handleUnFriend}
                            propsButton={{ width: 90, height: 70, backgroundColor: Color.white, alignItems: 'center', padding: '0 20' }}
                            propsIcon={{ size: 24, color: Color.black, backgroundColor: Color.lightGray, padding: 8 }}
                            propsTitle={{ color: Color.black, fontWeight: '500', size: 17 }}
                        />
                    ) : user.is_friend === '3' ? (
                        <>
                            <ButtonIconComponent
                                nameIcon={'user-check'}
                                typeIcon={'FontAwesome5'}
                                title={'Xác nhận lời mời'}
                                onPress={handleAcceptFriend}
                                propsButton={{ width: 90, height: 70, backgroundColor: Color.white, alignItems: 'center', padding: '0 20' }}
                                propsIcon={{ size: 24, color: Color.black, backgroundColor: Color.lightGray, padding: 8 }}
                                propsTitle={{ color: Color.black, fontWeight: '500', size: 17 }}
                            />
                            <ButtonIconComponent
                                nameIcon={'close'}
                                typeIcon={'AntDesign'}
                                title={'Xóa lời mời'}
                                onPress={handleCancelRequestFriend}
                                propsButton={{ width: 90, height: 70, backgroundColor: Color.white, alignItems: 'center', padding: '0 20' }}
                                propsIcon={{ size: 24, color: Color.black, backgroundColor: Color.lightGray, padding: 8 }}
                                propsTitle={{ color: Color.black, fontWeight: '500', size: 17 }}
                            />
                        </>
                    ) : null}
                </Modal>
            )}
        </Container>
    );
}

export default ProfileScreen;
