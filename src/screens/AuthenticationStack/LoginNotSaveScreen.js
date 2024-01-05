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
import { setAccountsStorage } from '../../utils/accountStorage';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    background-color: ${Color.grey6};
`;

const Header = styled.View`
    top: 0;
    position: absolute;
    z-index: 100;
    width: 110%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const Enter = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-bottom: 200px;
`;

const Bottom = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

const Forgot = styled(ButtonComponent)`
    position: absolute;
    bottom: 0px;
    width: 110%;
    height: 38px;
`;

const TextInPut = styled(TextInputComponent)`
    margin-bottom: 2px;
    background-color: ${Color.white};
    width: 100%;
    border-radius: 20px;
    height: 55px;
    font-size: 18px;
    font-family: OpenSans-Medium;
`;

const InputSecureCus = styled(InputSecure)`
    margin-bottom: 10px;
    background-color: ${Color.white};
    width: 100%;
    border-radius: 20px;
    font-size: 18px;
    height: 55px;
    font-family: OpenSans-Medium;
`;
const Error = styled.Text`
    font-size: 16px;
    color: red;
    line-height: 22px;
    text-align: center;
`;

const LoginButton = styled(ButtonComponent)`
    border-radius: 24px;
    height: 48px;
`;

function LoginNotSaveScreen({ route }) {
    const emailParam = route.params?.email;
    const [email, setEmail] = useState(emailParam || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!password || !email) {
            setError('Bạn chưa nhập tài khoản hoặc mật khẩu');
        } else {
            // dispatch(setModalLoading(true));
            setLoadingLogin(true);
            const uuid = getUUID();

            const body = {
                email,
                password,
                uuid,
            };

            loginService(body)
                .then((response) => {
                    if (response.data.code === '1000') {
                        dispatch(setModalLoading(true));

                        setAccountsStorage({ email, ...response.data.data });
                        mergeUserStorage({ email, ...response.data.data })
                            .then(() => {
                                getUserStorage().then((user) => {
                                    dispatch(login(user));
                                });
                                setLoadingLogin(false);
                                dispatch(setModalLoading(false));
                            })
                            .catch((e) => {
                                // dispatch(setModalLoading(false));
                                setLoadingLogin(false);
                                setError('Có lỗi xảy ra, vui lòng thử lại sau');
                            });
                    } else if (response.data.code === '9991') {
                        // dispatch(setModalLoading(false));
                        // setLoadingLogin(false);
                        setLoadingLogin(false);
                        setError('Tài khoản hoặc mật khẩu không đúng');
                    } else {
                        // dispatch(setModalLoading(false));
                        setLoadingLogin(false);
                        setError('Thông tin đăng nhập không đúng định dạng');
                    }
                })
                .catch((e) => {
                    // dispatch(setModalLoading(false));
                    setLoadingLogin(false);
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
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} />
                </Pressable>
            </Header>
            <Enter>
                <VectorIcon
                    nameIcon={'facebook'}
                    typeIcon={'FontAwesome5'}
                    size={60}
                    color={Color.blueButtonColor}
                    style={{ marginBottom: 40, marginTop: 40 }}
                />
                <TextInPut
                    mode="outlined"
                    placeholder="Số điện thoại hoặc email"
                    label="Số điện thoại hoặc email"
                    outlineColor={Color.blueButtonColor}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.blueButtonColor}
                    underlineStyle={{ borderRadius: 10 }}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                    }}
                    topClose={16}
                />
                <InputSecureCus
                    mode="outlined"
                    placeholder="Mật khẩu"
                    label="Mật khẩu"
                    style={{ height: 55 }}
                    outlineColor={Color.blueButtonColor}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.blueButtonColor}
                    underlineStyle={{ borderRadius: 10 }}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setError('');
                    }}
                    topClose={16}
                />
                <Error>{error}</Error>
                <LoginButton
                    title="Đăng nhập"
                    onPress={handleLogin}
                    color={Color.white}
                    style={{ backgroundColor: Color.blueButtonColor }}
                    padding={'0'}
                    size={15}
                    fontFamily="OpenSans-SemiBold"
                    loading={loadingLogin}
                    disabled={loadingLogin}
                />
            </Enter>
            <Bottom>
                <Forgot
                    title={'Quên mật khẩu ?'}
                    fontFamily="OpenSans-SemiBold"
                    color={Color.black}
                    size={14}
                    style={{ backgroundColor: Color.mainBackgroundColor, height: 38 }}
                    onPress={handleForgot}
                />
            </Bottom>
        </Container>
    );
}

export default LoginNotSaveScreen;
