import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { removeUserStorage, setUserStorage } from '../../utils/userStorage';
import { images } from '../../../assets';
import { removeAccountStorage, setAccountsStorage } from '../../utils/accountStorage';
import routes from '../../constants/route';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    padding-horizontal: 20px;
    padding-vertical: 50px;
    background-color: ${Color.grey6};
`;

const Box = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    margin-vertical: 30px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: OpenSans-Bold;
`;

const Description = styled.Text`
    font-size: 15px;
    line-height: 24px;
    margin-top: 20px;
    text-align: center;
    color: ${Color.gray};
    opacity: 0.6;
    font-family: OpenSans-SemiBold;
`;

const Icon = styled(FontAwesome5)`
    margin-vertical: 50px;
`;

const Info = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 50px;
`;

const TextInfo = styled.Text`
    font-size: 20px;
    line-height: 24px;
    margin-left: 10px;
    font-family: OpenSans-SemiBold;
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

const ButtonChoose = styled(ButtonComponent)`
    width: 45%;
    border: 1px solid ${Color.grey3};
`;

const AnimatedView = styled(Animated.View)`
    flex: 1;
`;

function SaveAccountScreen({ route, navigation }) {
    const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const params = route.params;
    const username = params.user.username;
    const email = params.user.email;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    const handleSaveAccount = async () => {
        const user = params.user;
        setAccountsStorage(user)
            .then((res) => {
                navigation.reset({ index: 0, routes: [{ name: routes.AUTHENTICATION_SCREEN }] });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogout = () => {
        removeAccountStorage(email)
            .then((res) => {
                navigation.reset({ index: 0, routes: [{ name: routes.AUTHENTICATION_SCREEN }] });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <AnimatedView style={{ transform: [{ translateY }] }}>
            <Container>
                <Icon name="facebook" size={80} color={Color.blueButtonColor} />
                <Box>
                    <Title>Lưu thông tin đăng nhập?</Title>
                    <Description>Lần tới khi đăng nhập vào điện thoại này, bạn chỉ cần nhấn vào ảnh đại diện thay vì nhập mật khẩu.</Description>
                </Box>
                <Info>
                    <Avatar source={images.defaultAvatar} />
                    <TextInfo>{username}</TextInfo>
                </Info>
                <ViewButton>
                    <ButtonChoose title="Đăng xuất" onPress={handleLogout} color={Color.black} style={{ backgroundColor: Color.grey6 }} />
                    <ButtonChoose title="Lưu" onPress={handleSaveAccount} color={Color.grey6} style={{ backgroundColor: Color.blueButtonColor }} />
                </ViewButton>
            </Container>
        </AnimatedView>
    );
}

export default SaveAccountScreen;
