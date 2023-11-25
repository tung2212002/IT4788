import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { getUserStorage, removeUserStorage } from '../../utils/userStorage';
import { images } from '../../../assets';
import { setUserInfo } from '../../redux/features/user/userSlice';

const Box = styled.View`
    width: 100%;
    display: flex;
    margin-vertical: 30px;
`;

const TextBox = styled.Text`
    color: ${Color.blueButtonColor};
    font-size: 20px;
    margin-left: 20px;
    font-weight: bold;
`;

const Icon = styled(FontAwesome5)`
    margin-vertical: 50px;
`;

const ViewIconBox = styled.View`
    padding: 15px 20px;
    background-color: ${Color.lightBlue};
    border-radius: 10px;
`;

const IconBox = styled(FontAwesome5)`
    border-radius: 10px;
`;

const ButtonBox = styled(TouchableOpacity)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-vertical: 10px;
`;

const Info = styled.Pressable`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 10px;
`;

const TextInfo = styled.Text`
    font-size: 22px;
    line-height: 24px;
    margin-left: 10px;
    font-weight: bold;
`;

const ViewButton = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    position: absolute;
    bottom: 50px;
`;

const Popup = styled(MenuProvider)`
    flex: 1;
    display: flex;
    align-items: center;
    padding-horizontal: 20px;
    padding-vertical: 50px;
    background-color: ${Color.mainBackgroundColor};
`;

const MenuComponent = styled(Menu)`
    position: absolute;
    right: 10px;
`;

const ButtonChoose = styled(ButtonComponent)``;

function AuthenticationScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const handleRemoveAccount = () => {
        removeUserStorage()
            .then(() => {
                setUser(null);
                dispatch(setUserInfo(null));
            })
            .catch((err) => console.log(err));
    };

    const handleTurnOffNotification = () => {
        console.log('turn off notification');
    };

    useEffect(() => {
        getUserStorage()
            .then((data) => {
                setUser(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Popup>
            <Icon name="facebook" size={80} color={Color.blueButtonColor} />
            {user && (
                <Info onPress={() => navigation.navigate('LoginScreen')}>
                    <Avatar source={user.avatar === '' || user.avatar === '-1' ? images.defaultAvatar : { uri: user.avatar }} />
                    <TextInfo>{user.username}</TextInfo>
                    <MenuComponent>
                        <MenuTrigger
                            customStyles={{
                                triggerWrapper: {
                                    padding: 10,
                                },
                            }}
                        >
                            <Entypo name="dots-three-vertical" size={24} color={Color.black} />
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
                            <MenuOption onSelect={handleRemoveAccount} text="Gỡ tài khoản khỏi thiết bị" />
                            <MenuOption onSelect={handleTurnOffNotification} text="Tắt thông báo đẩy" />
                        </MenuOptions>
                    </MenuComponent>
                </Info>
            )}
            <Box>
                <ButtonBox onPress={() => navigation.navigate('LoginNotSaveScreen')}>
                    <ViewIconBox>
                        <IconBox name="plus" size={20} color={Color.blueButtonColor} />
                    </ViewIconBox>
                    <TextBox>Thêm tài khoản khác</TextBox>
                </ButtonBox>

                <ButtonBox onPress={() => navigation.navigate('StackHome', { screen: 'HomeScreen' })}>
                    <ViewIconBox>
                        <IconBox name="search" size={20} color={Color.blueButtonColor} />
                    </ViewIconBox>
                    <TextBox>Tìm tài khoản</TextBox>
                </ButtonBox>
            </Box>
            <ViewButton>
                <ButtonChoose
                    title="TẠO TÀI KHOẢN FACEBOOK MỚI"
                    onPress={() => navigation.navigate('JoinScreen')}
                    color={Color.blueButtonColor}
                    style={{ backgroundColor: Color.lightBlue }}
                />
            </ViewButton>
        </Popup>
    );
}

export default AuthenticationScreen;
