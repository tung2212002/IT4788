import React from 'react';
import styled from 'styled-components/native';

import { images } from '../../../assets';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-vertical: 50px;
    background-color: ${Color.mainBackgroundColor};
`;

const Body = styled.View`
    width: 100%;
    align-items: center;
`;

const Logo = styled.Image`
    width: 100%;
    height: 50%;
    border-radius: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: Roboto-Bold;
    margin-top: 50px;
`;

const SubTitle = styled.Text`
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
    opacity: 0.5;
`;

function JoinScreen({ navigation }) {
    return (
        <Container>
            <Body>
                <Logo source={images.logoRegister} />
                <Title>Tham gia Facebook</Title>
                <SubTitle>Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng</SubTitle>
            </Body>
            <ButtonComponent onPress={() => navigate(routes.NAME_REGISTER_SCREEN)} title={'Tiếp'} />
        </Container>
    );
}

export default JoinScreen;
