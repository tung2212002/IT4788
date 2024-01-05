import React from 'react';
import styled from 'styled-components/native';

import { images } from '../../../assets';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-vertical: 20px;
    background-color: ${Color.grey6};
`;

const Body = styled.View`
    width: 100%;
`;

const Logo = styled.Image`
    width: 100%;
    height: 50%;
    border-radius: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: OpenSans-Bold;
    margin-bottom: 10px;
`;

const SubTitle = styled.Text`
    font-size: 16px;
    text-align: left;
    margin-top: 10px;
    font-family: OpenSans-SemiBold;
    color: ${Color.black};
    opacity: 0.7;
`;

const ButtonNext = styled(ButtonComponent)`
    margin-top: 10px;
    border-radius: 30px;
`;

function JoinScreen({ navigation }) {
    return (
        <Container>
            <Body>
                <Title>Tham gia Facebook</Title>
                <Logo source={images.logoRegister} />
                <SubTitle>Tạo tài khoản kết nối với bạn bè, người thân và cộng đồng có chung sở thích.</SubTitle>
            </Body>
            <ButtonNext onPress={() => navigate(routes.NAME_REGISTER_SCREEN)} title={'Bắt đầu'} />
        </Container>
    );
}

export default JoinScreen;
