import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/features/auth/authSlice';
import { setLoading as setModalLoading } from '../../redux/features/loading/loadingSlice';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import InputSecure from '../../components/InputSecure';
import TextInputComponent from '../../components/TextInputComponent';
import { loginService } from '../../services/userService';
import { getUserStorage, mergeUserStorage } from '../../utils/userStorage';
import getUUID from '../../utils/getUUID';
import VectorIcon from '../../utils/VectorIcon';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    padding-horizontal: 20px;
    background-color: ${Color.mainBackgroundColor};
`;

const Enter = styled.View`
    display: flex;
    flex-direction: column;
`;

const Input = styled(InputSecure)`
    margin-vertical: 20px;
    border-radius: 5px;
`;

const Forgot = styled(ButtonComponent)`
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

function LoginNotSaveScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!password || !email) {
            setError('Bạn chưa nhập tài khoản hoặc mật khẩu');
        } else {
            dispatch(setModalLoading(true));
            const uuid = getUUID();

            const body = {
                email,
                password,
                uuid,
            };

            loginService(body)
                .then((response) => {
                    if (response.data.code === '1000') {
                        mergeUserStorage(response.data.data)
                            .then(() => {
                                getUserStorage().then((user) => {
                                    dispatch(login(user));
                                });
                                dispatch(setModalLoading(false));
                            })
                            .catch((e) => {
                                dispatch(setModalLoading(false));
                                setError('Có lỗi xảy ra, vui lòng thử lại sau');
                            });
                    } else if (response.data.code === '9991') {
                        dispatch(setModalLoading(false));
                        setError('Tài khoản hoặc mật khẩu không đúng');
                    } else {
                        dispatch(setModalLoading(false));
                        setError('Thông tin đăng nhập không đúng định dạng');
                    }
                })
                .catch((e) => {
                    dispatch(setModalLoading(false));
                    console.log('ab', e);
                    setError('Có lỗi xảy ra, vui lòng thử lại sau');
                });
        }
    };

    const handleForgot = () => {
        console.log('Forgot');
    };

    return (
        <Container>
            <VectorIcon nameIcon={'facebook'} typeIcon={'FontAwesome5'} size={60} color={Color.blueButtonColor} style={{ marginBottom: 20, marginTop: 20 }} />
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
            <ButtonComponent title={'Đăng nhập'} color={Color.white} style={{ backgroundColor: Color.blueButtonColor }} onPress={handleLogin} />
            <Forgot title={'Quên mật khẩu ?'} color={Color.blueButtonColor} style={{ backgroundColor: Color.mainBackgroundColor }} onPress={handleForgot} />
        </Container>
    );
}

export default LoginNotSaveScreen;
