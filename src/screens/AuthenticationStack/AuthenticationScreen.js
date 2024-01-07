import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Alert, Dimensions, Platform, Pressable, TouchableOpacity } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { getUserStorage, mergeUserStorage, removeUserStorage } from '../../utils/userStorage';
import { SVGMeta, images } from '../../../assets';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import TextInputComponent from '../../components/TextInputComponent';
import InputSecure from '../../components/InputSecure';
import { getAccounstStorage, removeAccountStorage, setAccountsStorage } from '../../utils/accountStorage';
import { loginService } from '../../services/userService';
import getUUID from '../../utils/getUUID';
import { login } from '../../redux/features/auth/authSlice';

const Box = styled.View`
    width: 100%;
    margin-vertical: 10px;
    align-items: center;
`;

const Icon = styled(FontAwesome5)`
    margin-top: 90px;
    height: 65px;
`;

const Info = styled.Pressable`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ViewButton = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: flex-end;
`;

const LogoBottom = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const LogoText = styled.Text`
    font-size: 20px;
    color: ${Color.blueButtonColor};
    font-family: Roboto-Medium;
    margin-left: 5px;
`;

const Popup = styled(MenuProvider)`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-horizontal: 20px;
    background-color: ${Color.grey6};
    justify-content: space-between;
`;

const MenuComponent = styled(Menu)`
    position: absolute;
    right: 10px;
`;

const ButtonLoginDif = styled(ButtonComponent)`
    border-width: 1.5px;
    border-color: ${Color.grey5};
    border-radius: 40px;
    background-color: ${Color.grey6};
    height: 38px;
`;

const ButtonChoose = styled(ButtonComponent)`
    border-width: 1px;
    border-color: ${Color.blueButtonColor};
    border-radius: 40px;
    background-color: ${Color.grey6};
    height: 36px;
`;

const ButtonForget = styled(ButtonComponent)`
    border-radius: 40px;
    background-color: ${Color.grey6};
    height: 44px;
    margin-top: -5px;
`;

const TextInPut = styled(TextInputComponent)`
    margin-bottom: 12px;
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

const SingleAccount = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 65px;
    padding: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${Color.white};
`;

const SingleAccountImage = styled.Image`
    width: 92px;
    height: 92px;
    border-radius: 60px;
`;

const SingleAccountText = styled.Text`
    font-size: 30px;
    color: ${Color.black};
    font-family: OpenSans-SemiBold;
`;

const SingleAccountView = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const Single = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding-bottom: 140px;
`;

const Double = styled.View`
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding-bottom: 70px;
`;

const DoubleAccountView = styled.Pressable`
    width: 100%;
    flex-direction: row;
    margin-top: 10px;
    align-items: center;
    background-color: ${Color.white};
    border-radius: 10px;
    padding-horizontal: 10px;
    padding-vertical: 11px;
`;

const DoubleAccount = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

const DoubleAccountImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`;

const DoubleAccountText = styled.Text`
    font-size: 16px;
    color: ${Color.black};
    font-family: OpenSans-SemiBold;
`;

function AuthenticationScreen() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRemoveAccount = (account) => {
        removeAccountStorage(account)
            .then(() => {
                getAccounstStorage()
                    .then((data) => {
                        setUser(data);
                        console.log(data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    const handleTurnOffNotification = () => {
        console.log('turn off notification');
    };

    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!password || !email) {
            Alert.alert('Cần nhập đầy đủ thông tin', 'Vui lòng nhập đầy đủ thông tin để đăng nhập', [
                {
                    text: 'Đồng ý',
                    onPress: () => console.log('Cancel Pressed'),
                },
            ]);
        } else {
            // dispatch(setLoading(true));
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
                        setAccountsStorage({ email, ...response.data.data });
                        mergeUserStorage({ email, ...response.data.data })
                            .then(() => {
                                getUserStorage().then((userData) => {
                                    dispatch(login(userData));
                                });
                                setLoadingLogin(false);
                                // dispatch(setLoading(false));
                            })
                            .catch((e) => {
                                setLoadingLogin(false);
                                // dispatch(setLoading(false));
                                setError('Có lỗi xảy ra, vui lòng thử lại sau');
                            });
                    } else if (response.data.code === '9991') {
                        // dispatch(setLoading(false));
                        setLoadingLogin(false);
                        Alert.alert('Bạn quên mật khẩu ư?', 'Chúng tôi có thể hỗ trợ bạn vòa tài khoản trong trường hợp bạn quên mật khẩu', [
                            {
                                text: 'Lấy lại mật khẩu',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'Đồng ý',
                                onPress: () => console.log('Forget Pressed'),
                            },
                        ]);
                    } else {
                        // dispatch(setLoading(false));
                        setLoadingLogin(false);
                        Alert.alert('Thông tin đăng nhập không đúng định dạng', 'Vui lòng kiểm tra lại thông tin đăng nhập', [
                            {
                                text: 'Đồng ý',
                                onPress: () => console.log('Cancel Pressed'),
                            },
                        ]);
                    }
                })
                .catch((e) => {
                    setLoadingLogin(false);
                    // dispatch(setLoading(false));
                });
        }
    };

    const handleForgot = () => {
        console.log('Forgot');
    };

    useEffect(() => {
        getAccounstStorage()
            .then((data) => {
                setUser(data);
                console.log(!data[1]?.avatar);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Popup>
            <Icon name="facebook" size={50} color={Color.blueButtonColor} />
            {user && (
                <Info>
                    {user?.length === 1 && (
                        <Single>
                            <SingleAccountView>
                                <SingleAccount>
                                    <SingleAccountImage source={user[0]?.avatar === '' || !user[0].avatar ? images.defaultAvatar : { uri: user[0].avatar }} />
                                </SingleAccount>
                                <SingleAccountText>{user[0]?.username}</SingleAccountText>
                                <MenuComponent>
                                    <MenuTrigger
                                        customStyles={{
                                            triggerWrapper: {
                                                padding: 10,
                                                borderRadius: 10,
                                            },
                                        }}
                                    >
                                        <Entypo name="dots-three-vertical" size={20} color={Color.gray} />
                                    </MenuTrigger>
                                    <MenuOptions
                                        customStyles={{
                                            optionsContainer: {
                                                width: 'auto',
                                                marginTop: 40,
                                            },
                                            optionText: {
                                                color: Color.black,
                                                fontSize: 18,
                                                padding: 15,
                                            },
                                        }}
                                    >
                                        <MenuOption text="Gỡ tài khoản khỏi thiết bị" onSelect={() => handleRemoveAccount(user[0].email)} />
                                        <MenuOption onSelect={handleTurnOffNotification} text="Tắt thông báo đẩy" />
                                    </MenuOptions>
                                </MenuComponent>
                            </SingleAccountView>
                            <Box>
                                <ButtonChoose
                                    title="Đăng nhập"
                                    onPress={() => navigate(routes.LOGIN_NOT_SAVE_SCREEN, { email: user[0]?.username })}
                                    color={Color.white}
                                    style={{ backgroundColor: Color.blueButtonColor }}
                                    padding={'0'}
                                    size={14}
                                    fontFamily="OpenSans-Medium"
                                    loading={loadingLogin}
                                    disabled={loadingLogin}
                                />
                                <ButtonLoginDif
                                    title="Đăng nhập bằng tài khoản khác"
                                    onPress={() => navigate(routes.LOGIN_NOT_SAVE_SCREEN)}
                                    color={Color.black}
                                    padding={'0'}
                                    size={14}
                                    fontFamily="OpenSans-Medium"
                                />
                            </Box>
                        </Single>
                    )}
                    {user?.length === 2 && (
                        <Double>
                            {user.map((item, index) => (
                                <DoubleAccountView onPress={() => navigate(routes.LOGIN_NOT_SAVE_SCREEN, { email: item?.email })} key={index}>
                                    <DoubleAccount>
                                        <DoubleAccountImage source={item?.avatar === '' || !item.avatar ? images.defaultAvatar : { uri: item.avatar }} />
                                    </DoubleAccount>
                                    <DoubleAccountText>{item?.username}</DoubleAccountText>
                                    <MenuComponent>
                                        <MenuTrigger
                                            customStyles={{
                                                triggerWrapper: {
                                                    padding: 10,
                                                    borderRadius: 10,
                                                },
                                            }}
                                        >
                                            <Entypo name="dots-three-vertical" size={20} color={Color.gray} />
                                        </MenuTrigger>
                                        <MenuOptions
                                            customStyles={{
                                                optionsContainer: {
                                                    width: 'auto',
                                                    marginTop: 40,
                                                },
                                                optionText: {
                                                    color: Color.black,
                                                    fontSize: 18,
                                                    padding: 15,
                                                },
                                            }}
                                        >
                                            <MenuOption text="Gỡ tài khoản khỏi thiết bị" onSelect={() => handleRemoveAccount(item.email)} />
                                            <MenuOption onSelect={handleTurnOffNotification} text="Tắt thông báo đẩy" />
                                        </MenuOptions>
                                    </MenuComponent>
                                </DoubleAccountView>
                            ))}
                            <Box>
                                <ButtonLoginDif
                                    title="Đăng nhập bằng tài khoản khác"
                                    onPress={() => navigate(routes.LOGIN_NOT_SAVE_SCREEN)}
                                    color={Color.black}
                                    padding={'0'}
                                    size={14}
                                    fontFamily="OpenSans-Medium"
                                />
                            </Box>
                        </Double>
                    )}
                </Info>
            )}
            {(!user || user?.length === 0) && (
                <Box>
                    <TextInPut
                        mode="outlined"
                        placeholder="Số điện thoại hoặc email"
                        label="Số điện thoại hoặc email"
                        outlineColor={Color.blueButtonColor}
                        outlineStyle={{ borderRadius: 10 }}
                        underlineColor={Color.blueButtonColor}
                        underlineStyle={{ borderRadius: 10 }}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
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
                        onChangeText={(text) => setPassword(text)}
                        topClose={16}
                    />
                    <ButtonChoose
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
                    <ButtonForget
                        title="Bạn quên mật khẩu ư?"
                        onPress={() => navigate(routes.LOGIN_NOT_SAVE_SCREEN)}
                        color={Color.black}
                        padding={'0'}
                        size={15}
                        fontFamily="OpenSans-SemiBold"
                    />
                </Box>
            )}

            <ViewButton>
                <ButtonChoose
                    title="Tạo tài khoản mới"
                    onPress={() => navigate(routes.JOIN_SCREEN)}
                    color={Color.blueButtonColor}
                    padding={'0'}
                    size={16}
                    fontFamily="Roboto-Medium"
                />
                <LogoBottom>
                    <SVGMeta width={24} height={24} />
                    <LogoText>Meta</LogoText>
                </LogoBottom>
            </ViewButton>
        </Popup>
    );
}

export default AuthenticationScreen;
