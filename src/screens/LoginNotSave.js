import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Device from 'expo-device';
import { useDispatch } from 'react-redux';

import { login } from '../redux/features/auth/authSlice';
import Button from '../components/Button';
import Color from '../utils/Color';
import InputSecure from '../components/InputSecure';
import TextInputComponent from '../components/TextInputComponent';
// import { loginService } from '../services/userService';
import { testPostService } from '../services/userService';
import { setUserStorage } from '../utils/userStorage';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    padding-horizontal: 20px;
    background-color: ${Color.mainBackgroundColor};
`;

const Icon = styled(FontAwesome5)``;

const Enter = styled.View`
    display: flex;
    flex-direction: column;
`;

const Input = styled(InputSecure)`
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

function LoginNoSave({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!password || !email) {
            setError('Bạn chưa nhập tài khoản hoặc mật khẩu');
        } else {
            setLoading(true);
            const params = {
                email,
                password,
                deviceId: Device.osBuildId.replace(/\s/g, ''),
            };
            try {
                const response = await testPostService(params);
                if (response.status === 201) {
                    const data = {
                        id: '1',
                        username: 'admin',
                        token: '1222222222',
                        avatar: '-1',
                        active: '1',
                        coins: '0',
                    };
                    await setUserStorage(data);
                } else {
                    setError(response.data.message);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
                dispatch(login());
            }
        }
    };

    const handleForgot = () => {
        console.log('Forgot');
    };

    return (
        <Container>
            <Icon name="facebook" size={60} color={Color.blueButtonColor} />
            <Enter>
                <TextInputComponent
                    onChangeText={(text) => {
                        setError('');
                        setEmail(text);
                    }}
                    placeholder={'Tài khoản'}
                />
                <Input
                    value={password}
                    onChangeText={(text) => {
                        setError('');
                        setPassword(text);
                    }}
                    placeholder={'Mật khẩu'}
                />
                <Error>{error}</Error>
            </Enter>
            <Button title={'Đăng nhập'} color={Color.white} style={{ backgroundColor: Color.blueButtonColor }} onPress={handleLogin} loading={loading} />
            <Forgot title={'Quên mật khẩu ?'} color={Color.blueButtonColor} style={{ backgroundColor: Color.mainBackgroundColor }} onPress={handleForgot} />
        </Container>
    );
}

export default LoginNoSave;
