import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import LoadingComponent from '../../components/LoadingComponent';
import VectorIcon from '../../utils/VectorIcon';
import { useImagePicker } from '../../hooks/useImagePicker';
import { changeProfileAfterSignupService } from '../../services/profileService';
import { mergeUser, selectAuth, setLoading } from '../../redux/features/auth/authSlice';
import { Alert } from 'react-native';

const Container = styled.View`
    background-color: ${Color.white};
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
    background-color: ${Color.white};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
    margin-bottom: 100px;
`;

const ViewTitle = styled.View`
    height: 50px;
    padding-top: 15px;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TitleHeader = styled.Text`
    margin-left: 50px;
    font-size: 16px;
    font-family: Roboto-Bold;
    color: ${Color.black};
`;

const Content = styled.View`
    margin-top: 10px;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonSaveAvatar = styled(ButtonComponent)`
    width: 50px;
    height: 40px;
    margin-top: 10px;
    background-color: ${Color.white};
`;

const AvatarContainer = styled.View`
    width: 300px;
    height: 300px;
    border-radius: 150px;
    border-width: 10px;
    border-color: ${Color.lightGray};
    align-items: center;
    justify-content: center;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 150px;
`;
const AvatarIcon = styled.TouchableOpacity`
    position: absolute;
    bottom: 0px;
    left: 280px;
    border-radius: 50px;
    padding: 10px;
    background-color: ${Color.lightGray};
    z-index: 1;
`;

const AlertComponent = styled(Alert)`
    background-color: ${Color.gray};
    transform: scale(0.8);
`;

function ChangeAvatarScreen({ navigation, setRenderPopUpComponent, renderPopUpComponent, user, lastAvatar }) {
    const [avatar, setAvatar] = useState(lastAvatar.uri);
    const { imageFiles, pickImage } = useImagePicker();
    const loadingState = useSelector(selectAuth);
    const dispatch = useDispatch();

    const handleAlert = (title, body, options) => {
        AlertComponent.alert(title, body, options, { cancelable: false });
    };

    const handleSaveAvatar = () => {
        dispatch(setLoading(true));
        const data = new FormData();
        const avataFile = imageFiles[0]?.base64 || lastAvatar.base64;
        data.append('avatar', avataFile);
        data.append('username', user.username);
        changeProfileAfterSignupService(data)
            .then((res) => {
                if (res.data.code === '1000') {
                    dispatch(mergeUser(res.data.data));
                    setRenderPopUpComponent(!renderPopUpComponent);
                    dispatch(setLoading(false));
                } else {
                    dispatch(setLoading(false));
                    handleAlert('Lỗi', res.data.message, [{ text: 'OK' }]);
                }
            })
            .catch((err) => {
                dispatch(setLoading(false));
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
                console.log(err);
            });
    };

    useEffect(() => {
        if (imageFiles.length > 0) {
            setAvatar(imageFiles[0].uri);
        }
    }, [imageFiles]);

    return (
        <Container>
            <Header>
                <ViewTitle>
                    <TitleHeader>Xem trước ảnh đại diện</TitleHeader>
                </ViewTitle>
                <ButtonSaveAvatar title={'Lưu'} onPress={handleSaveAvatar} color={Color.black} />
            </Header>
            <Content>
                <AvatarContainer>
                    <Avatar source={{ uri: avatar }} />
                </AvatarContainer>
                <AvatarIcon onPress={() => pickImage()}>
                    <VectorIcon nameIcon="camera" typeIcon="FontAwesome5" size={35} color={Color.black} />
                </AvatarIcon>
            </Content>
            <LoadingComponent visible={loadingState.loading} message={'Đang đặt ảnh đại diện...'} />
        </Container>
    );
}

export default ChangeAvatarScreen;
