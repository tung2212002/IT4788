import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Color from '../utils/Color';
import { selectUser } from '../redux/features/auth/authSlice';
import { images } from '../../assets';
import VectorIcon from '../utils/VectorIcon';
import { SVGFilter, SVGCheckIn, SVGPhotos, SVGEdit } from '../../assets';
import ButtonIconComponent from './ButtonIconComponent';
import ButtonComponent from './ButtonComponent';
import { useImagePicker } from '../hooks/useImagePicker';
import { useEffect } from 'react';
import CreatePostScreen from '../screens/CreatePostScreen';
import { getPostService } from '../services/postService';
import { getTokenStorage } from '../utils/userStorage';
import { BASE_URL } from '@env';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';
import { addPost } from '../redux/features/post/postSlice';

const Container = styled.View`
    background-color: ${Color.white};
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Header = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
`;

const TitleHeader = styled.Text`
    margin-left: 10px;
    font-size: 20px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    flex: 2;
`;

const ListIcon = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const Icon = styled(VectorIcon)`
    margin-horizontal: 8px;
    padding: 7px 13px;
    border-radius: 10px;
    background-color: ${Color.lightGray};
`;

const ViewIcon = styled.View`
    padding: 5px 10px;
    background-color: ${Color.lightGray};
    border-radius: 10px;
`;

const FilterIcon = styled(SVGFilter)`
    background-color: ${Color.lightGray};
`;

const Content = styled.View`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
    border-bottom-width: 1px;
    border-color: ${Color.mainBackgroundHome};
`;

const Avatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin-left: 10px;
`;

const ButtonInput = styled(ButtonComponent)`
    flex: 1;
    height: 50px;
    margin-horizontal: 10px;
    border-radius: 50px;
    align-items: flex-start;
    padding-left: 20px;
    border-width: 1px;
    border-color: ${Color.mainBackgroundHome};
`;

const Bottom = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AlertComponent = styled(Alert)`
    background-color: ${Color.blue};
    transform: scale(0.8);
`;

const PostComposerComponent = ({ navigation, stylesInput, isHeader = false, post, setPost, pagination, setPagination }) => {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const { placeholderTextColor, ...styles } = stylesInput;
    const { imageFiles, pickImage, clearImages } = useImagePicker();

    const handleClickImgIcon = () => {
        pickImage();
    };

    const [perc, setPerc] = useState(0);

    const handleCreatePost = async (data) => {
        const formData = new FormData();
        formData.append('described', data.described);
        formData.append('status', data.status);
        if (data.image) {
            data.image.forEach((item) => {
                formData.append('image', item.base64);
            });
        }
        if (data.video) {
            formData.append('video', data.video, data.video.type);
        }
        setShowCreatePost(false);

        const token = await getTokenStorage();
        const options = {
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            },
            onUploadProgress: function ({ loaded, total, progress, bytes, estimated, rate, upload = true }) {
                console.log('onUploadProgress', progress, loaded, total);
            },
            maxRedirects: 0,
        };
        const url = '/add_post';
        axios
            .post(url, formData, options)
            .then((res) => {
                if (res.data.code === '1000') {
                    handleRequestNewPost(res.data.data.id);
                } else {
                    console.log(res);
                }
            })
            .catch((e) => {
                if (e.response) {
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                } else if (e.request) {
                    console.log(e.request);
                } else {
                    console.log('e', e.message);
                }
                console.log(e.config);
            });
    };

    const handleRequestNewPost = (id) => {
        const data = {
            id,
        };

        getPostService(data)
            .then((res) => {
                if (res.data.code === '1000') {
                    const newPost = res.data.data;
                    // const newListPost = [...post];
                    // console.log(newPost);
                    // newListPost.unshift(newPost);
                    // setPost(newListPost);
                    let isVideo = newPost.video ? true : false;
                    dispatch(addPost({ post: newPost, isVideo }));
                    setPagination({ ...pagination, index: pagination.index + 1 });
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const listItemsBottom = [
        {
            title: 'Trạng thái',
            onPress: () => {
                AlertComponent.alert('OK');
            },
            SVGIcon: SVGEdit,
            styleIcon: { width: 22, height: 22 },
        },
        {
            title: 'Ảnh',
            onPress: handleClickImgIcon,
            SVGIcon: SVGPhotos,
            styleIcon: { width: 26, height: 26 },
        },
        {
            title: 'Check in',
            onPress: () => {},
            SVGIcon: SVGCheckIn,
            styleIcon: { width: 26, height: 26 },
        },
    ];

    useEffect(() => {
        if (imageFiles.length > 0) {
            setShowCreatePost(true);
        }
    }, [imageFiles]);

    return (
        <Container>
            {isHeader ? (
                <Header>
                    <TitleHeader>Bài viết</TitleHeader>
                    <ListIcon>
                        <ViewIcon>
                            <FilterIcon width={24} height={24} />
                        </ViewIcon>
                        <Icon nameIcon="settings-sharp" typeIcon="Ionicons" size={18} color={Color.black} />
                    </ListIcon>
                </Header>
            ) : null}
            <Content>
                <TouchableOpacity onPress={() => navigate(routes.PROFILE_SCREEN, { userId: user?.id })}>
                    <Avatar source={user?.avatar === '' ? images.defaultAvatar : { uri: user?.avatar }} />
                </TouchableOpacity>
                <ButtonInput
                    onPress={() => setShowCreatePost(true)}
                    title="Bạn đang nghĩ gì?"
                    color={placeholderTextColor ? placeholderTextColor : Color.gray}
                    fontWeight="500"
                    style={[styles, { backgroundColor: Color.white }]}
                />
            </Content>

            <Bottom>
                {listItemsBottom.map((item, index) => (
                    <ButtonIconComponent
                        key={index}
                        title={item.title}
                        onPress={item.onPress}
                        SVGIcon={item.SVGIcon}
                        propsIcon={item.styleIcon}
                        propsTitle={{ size: 14, color: Color.gray }}
                        propsButton={{
                            width: 100 / 3,
                            height: '32',
                            justifyContent: 'center',
                            borderLeftWidth: index === 0 ? 0 : 0.5,
                            borderRadius: '0',
                            padding: '0',
                        }}
                    />
                ))}
            </Bottom>

            {/* {perc > 0 && perc < 100 && <ProgressBarCreatePost perc={perc} user={user} />} */}
            {/* <ProgressBarCreatePost perc={perc} user={user} /> */}
            {showCreatePost && (
                <CreatePostScreen
                    navigation={navigation}
                    setShowCreatePost={setShowCreatePost}
                    showCreatePost={showCreatePost}
                    user={user}
                    imageFilesPostComposer={imageFiles}
                    clearImagesPostComposer={clearImages}
                    handleCreatePost={handleCreatePost}
                />
            )}
        </Container>
    );
};

export default PostComposerComponent;
