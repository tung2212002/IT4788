import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { setUserStorage } from '../../utils/userStorage';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    padding-horizontal: 20px;
    padding-vertical: 50px;
    background-color: ${Color.mainBackgroundColor};
`;

const Box = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    margin-vertical: 30px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const Description = styled.Text`
    font-size: 16px;
    line-height: 24px;
    margin-top: 20px;
    text-align: center;
    color: ${Color.gray};
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
    border: 1px solid ${Color.black};
`;

const AnimatedView = styled(Animated.View)`
    flex: 1;
`;

function SaveAccountScreen({ route, navigation }) {
    const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const { firstName, lastName, email, password, numberPhone } = route.params;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    const handleSaveAccount = async () => {
        const user = {
            firstName,
            lastName,
            email,
            password,
            numberPhone,
        };
        await setUserStorage(user);
        navigation.reset({ index: 0, routes: [{ name: 'AuthScreen' }] });
    };

    return (
        <AnimatedView style={{ transform: [{ translateY }] }}>
            <Container>
                <Icon name="facebook" size={80} color={Color.blueButtonColor} />
                <Box>
                    <Title>Lưu thông tin đăng nhập của bạn</Title>
                    <Description>Lần tới khi đăng nhập vào điện thoại này, bạn chỉ cần nhấn vào ảnh đại diện thay vì nhập mật khẩu.</Description>
                </Box>
                <Info>
                    <Avatar source={require('../../../assets/images/cloud.jpg')} />
                    <TextInfo>
                        {lastName} {firstName}
                    </TextInfo>
                </Info>
                <ViewButton>
                    <ButtonChoose
                        title="Đăng xuất"
                        onPress={() => navigation.navigate('AuthScreen')}
                        color={Color.black}
                        style={{ backgroundColor: Color.mainBackgroundColor }}
                    />
                    <ButtonChoose
                        title="Tiếp tục"
                        onPress={handleSaveAccount}
                        color={Color.mainBackgroundColor}
                        style={{ backgroundColor: Color.blueButtonColor }}
                    />
                </ViewButton>
            </Container>
        </AnimatedView>
    );
}

export default SaveAccountScreen;
