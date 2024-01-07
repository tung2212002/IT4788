import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

import TextInputComponent from '../../components/TextInputComponent';
import { View } from 'react-native';
import { images } from '../../../assets';
import VectorIcon from '../../utils/VectorIcon';
import { useMediaPicker } from '../../hooks/useMediaPicker';
import { changeProfileAfterSignupService, setUserInfoService } from '../../services/profileService';
import { useDispatch, useSelector } from 'react-redux';
import { logout, mergeUser, selectUser } from '../../redux/features/auth/authSlice';
import { mergeUserStorage, setTokenStorage } from '../../utils/userStorage';
import { changePasswordService } from '../../services/userService';
import InputSecure from '../../components/InputSecure';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.grey6};
    padding-vertical: 40px;
`;

const Body = styled.View`
    background-color: ${Color.grey6};
    width: 100%;
    padding-horizontal: 10px;
    align-items: center;
    flex: 1;
`;

const Header = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
    background-color: ${Color.grey6};
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'OpenSans-Bold';
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const TitleBody = styled.Text`
    font-size: 26px;
    font-family: 'OpenSans-Bold';
    margin-vertical: 10px;
`;

const LabelDescription = styled.Text`
    font-size: 15px;
    font-family: 'OpenSans-Bold';
    color: ${Color.black};
    margin-vertical: 10px;
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'OpenSans-Medium';
    color: ${Color.gray};
    margin-vertical: 10px;
`;

const TextInPut = styled(TextInputComponent)`
    background-color: ${Color.white};
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: OpenSans-SemiBold;
`;

const ButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: ${Color.grey6};
`;

const ButtonNext = styled(ButtonComponent)`
    height: 48px;
    width: 40%;
`;

const Error = styled.Text`
    color: ${Color.red};
    font-size: 16px;
    font-family: 'OpenSans-Regular';
    margin-top: 10px;
`;

const InputSecureView = styled(InputSecure)`
    background-color: ${Color.white};
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-family: OpenSans-SemiBold;
`;

function ChangePasswordScreen({ navigation, renderPopUpComponent, setRenderPopUpComponent }) {
    const user = useSelector(selectUser);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState({
        changeProfile: false,
    });
    const dispatch = useDispatch();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const handleNext = () => {
        if (!passwordRegex.test(newPassword)) {
            setError('Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ cái viết hoa và 1 số');
            return;
        }
        if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (currentPassword === newPassword) {
            setError('Mật khẩu mới không được trùng với mật khẩu cũ');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('Mật khẩu mới không khớp');
            return;
        }
        setLoading({ ...loading, changeProfile: true });
        const body = {
            password: currentPassword,
            new_password: newPassword,
        };

        changePasswordService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    const token = res.data.data.token;
                    setTokenStorage(token);
                    const userToken = {
                        token: token,
                    };
                    dispatch(mergeUser(userToken));
                    setRenderPopUpComponent(false);
                    setLoading({ ...loading, changeProfile: false });
                } else {
                    setError('Mật khẩu hiện tại không đúng');
                    setLoading({ ...loading, changeProfile: false });
                }
            })
            .catch((err) => {
                setLoading({ ...loading, changeProfile: false });
                setError(err.message);
            });
    };

    return (
        <Container>
            <Header>
                <Title>Đổi mật khẩu</Title>
            </Header>
            <Body>
                <View style={{ width: '100%', alignItems: 'left' }}>
                    <TitleBody>Đổi mật khẩu</TitleBody>
                </View>
                <InputSecureView
                    placeholder={'Mật khẩu hiện tại'}
                    value={currentPassword}
                    onChangeText={(text) => {
                        setError('');
                        setCurrentPassword(text);
                    }}
                />
                <InputSecureView
                    placeholder={'Mật khẩu mới'}
                    value={newPassword}
                    onChangeText={(text) => {
                        setError('');
                        setNewPassword(text);
                    }}
                />
                <InputSecureView
                    placeholder={'Nhập lại mật khẩu mới'}
                    value={confirmNewPassword}
                    onChangeText={(text) => {
                        setError('');
                        setConfirmNewPassword(text);
                    }}
                />
                <Error>{error}</Error>
                {/* <Description>
                    <LabelDescription>Xin lưu ý rắng: </LabelDescription>
                    Nếu bạn đổi tên trên Facebook, bạn không thể đổi lại tên trong 60 ngày. Đừng thêm bất cứ cách viết hoa khác thường , dấu câu, kí tự hoặc
                    thêm các từ ngẫu nhiên.
                </Description> */}
                <ButtonContainer>
                    <ButtonNext
                        title={'Hủy'}
                        onPress={() => setRenderPopUpComponent(false)}
                        disabled={loading.changeProfile}
                        style={{ backgroundColor: Color.grey6, borderColor: Color.black, borderWidth: 1 }}
                        color={Color.black}
                    />
                    <ButtonNext title={'Lưu thay đổi'} onPress={handleNext} disabled={loading.changeProfile} loading={loading.changeProfile} />
                </ButtonContainer>
            </Body>
        </Container>
    );
}

export default ChangePasswordScreen;
