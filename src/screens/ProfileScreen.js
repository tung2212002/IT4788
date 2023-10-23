import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import PopupComponent from '../components/PopupComponent';
import ButtonIconComponent from '../components/ButtonIconComponent';
import { images } from '../../assets';
import VectorIcon from '../utils/VectorIcon';
import { useImagePicker } from '../hooks/useImagePicker';

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${Color.mainBackgroundColor};
`;

const ProfileContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
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
    font-weight: bold;
    color: ${Color.black};
    margin-top: 10px;
`;

function ProfileScreen(props) {
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const { imageFiles, pickImage, clearImages } = useImagePicker();

    const listItems = [
        {
            title: 'Quay video đại diện mới',
            name: 'video',
            type: 'FontAwesome5',
        },
        {
            title: 'Chọn video đại diện',
            name: 'folder-video',
            type: 'Entypo',
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

    useEffect(() => {
        setTimeout(() => {
            setRenderPopUpComponent(true);
        }, 2000);
    }, []);

    return (
        <Container>
            <ProfileContainer>
                <BackGround source={images.defaultBackground}>
                    <AvatarContainer>
                        <Avatar source={images.defaultAvatar} />
                        <AvatarIcon onPress={pickImage}>
                            <VectorIcon nameIcon="camera" typeIcon="FontAwesome5" size={30} color={Color.black} />
                        </AvatarIcon>
                    </AvatarContainer>

                    <FullName>Ong Thế Tùng</FullName>
                </BackGround>
            </ProfileContainer>

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
        </Container>
    );
}

export default ProfileScreen;