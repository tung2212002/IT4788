import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Pressable } from 'react-native';

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

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${Color.mainBackgroundColor};
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
    flex: 1;
    width: 100%;
    height: 100%;
    margin-top: 50px;
`;

const BackGround = styled.ImageBackground`
    width: 100%;
    height: 50%;
    align-items: center;
    padding-top: 50px;
`;

const AvatarContainer = styled.View`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border-width: 5px;
    border-color: ${Color.white};
`;

const AvatarIcon = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 140px;
    border-radius: 50px;
    padding: 10px;
    background-color: ${Color.lightGray};
    z-index: 1;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    border-radius: 100px;
`;

const FullName = styled.Text`
    font-size: 30px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-top: 10px;
`;

function ProfileScreen({ route, navigation, props }) {
    const user_id = route.params?.user_id;
    const [user, setUser] = useState({});
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const [renderPopUpComponent2, setRenderPopUpComponent2] = useState(false);
    const { imageFiles, pickImage, clearImages } = useImagePicker();
    const { videoFiles, pickVideo, clearVideos } = useVideoPicker();
    const { pickedImagePath, pickCamera } = useCameraPicker();
    const [lastAvatar, setLastAvatar] = useState(null);
    const userSelect = useSelector(selectUser);

    const HeaderTitle = styled.Text`
        font-size: 20px;
        font-family: Roboto-Bold;
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
        height: 100,
    };

    const propsIcon = {
        size: 30,
        color: Color.black,
        backgroundColor: Color.lightGray,
    };

    const propsTitle = {
        size: 22,
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

    useEffect(() => {
        if (pickedImagePath) {
            setLastAvatar(pickedImagePath);
        }
    }, [pickedImagePath]);

    const handlePressAvatarIcon = () => {
        pickImage();
    };

    useEffect(() => {
        if (imageFiles.length === 0) {
            return;
        }
        setLastAvatar(imageFiles[0]);
        setRenderPopUpComponent2(true);
    }, [imageFiles]);

    useEffect(() => {
        setLastAvatar(videoFiles[0]);
    }, [videoFiles]);

    useEffect(() => {
        if (((userSelect.avatar === '-1' || userSelect.avatar === '') && userSelect.id === user_id) || !user_id) {
            setUser(userSelect);

            setRenderPopUpComponent(true);
        } else {
            handleGetUserInfo();
        }
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
            <ProfileContainer>
                <BackGround source={images.defaultBackground}>
                    <AvatarContainer>
                        <Avatar source={user?.avatar === '-1' || user?.avatar === '' ? images.defaultAvatar : { uri: user.avatar }} />
                        <AvatarIcon onPress={handlePressAvatarIcon}>
                            <VectorIcon nameIcon="camera" typeIcon="FontAwesome5" size={30} color={Color.black} />
                        </AvatarIcon>
                    </AvatarContainer>

                    <FullName>{user?.username}</FullName>
                </BackGround>
            </ProfileContainer>

            {renderPopUpComponent && userSelect.id === user_id && (
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
            {renderPopUpComponent2 && userSelect.id === user_id && (
                <PopupScreenComponent
                    renderPopUpComponent={renderPopUpComponent2}
                    setRenderPopUpComponent={setRenderPopUpComponent2}
                    onBackdropPress={() => true}
                    coverScreen={false}
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
        </Container>
    );
}

export default ProfileScreen;
