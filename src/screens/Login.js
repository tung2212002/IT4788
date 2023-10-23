import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import Button from '../components/Button';
import Color from '../utils/Color';
import InputSecure from '../components/InputSecure';
import { setUserStorage } from '../utils/userStorage';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
    padding-horizontal: 20px;
    padding-vertical: 50px;
`;

const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 5px;
`;

const Name = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin: 10px;
`;

const Info = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Enter = styled.View`
    display: flex;
    flex-direction: column;
`;

const Input = styled(InputSecure)`
    border: 1px solid ${Color.gray};
    background-color: ${Color.mainBackgroundColor};
    margin-vertical: 20px;
    border-radius: 5px;
`;

const Forgot = styled(Button)`
    position: absolute;
    bottom: 0px;
    width: 110%;
`;

const Error = styled.Text`
    font-size: 16px;
    color: red;
    line-height: 16px;
    text-align: center;
    margin-bottom: 8px;
`;

const AlertComponent = styled(Alert)`
    background-color: ${Color.gray};
    transform: scale(0.8);
`;

function Login({ navigation }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!password) {
            setError('Bạn chưa nhập mật khẩu');
        } else if (password === '1') {
            handleAlert('Sai thông tin đăng nhập', 'Tên người dùng hoặc mật khẩu không hợp lệ', [{ text: 'OK' }]);
        }
        setUserStorage({ email: 'abc@gmail.com', password });
    };

    const handleForgot = () => {
        console.log('Forgot');
    };

    const handleAlert = (title, body, options) => {
        AlertComponent.alert(title, body, options, { cancelable: false });
    };

    return (
        <Container>
            <Info>
                <Avatar source={require('../../assets/images/cloud.jpg')} />
                <Name>Nguyễn Văn A</Name>
            </Info>
            <Enter>
                <Input
                    value={password}
                    onChangeText={(text) => {
                        setError('');
                        setPassword(text);
                    }}
                    placeholder={'Mật khẩu'}
                />
                <Error>{error}</Error>
                <Button title={'Đăng nhập'} color={Color.white} style={{ backgroundColor: Color.blueButtonColor }} onPress={handleLogin} />
            </Enter>
            <Forgot title={'Quên mật khẩu ?'} color={Color.blueButtonColor} style={{ backgroundColor: Color.mainBackgroundColor }} onPress={handleForgot} />
        </Container>
    );
}

export default Login;
