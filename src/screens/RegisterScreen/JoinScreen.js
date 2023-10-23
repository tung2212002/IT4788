import React from 'react';
import styled from 'styled-components/native';

import { images } from '../../../assets';
import Button from '../../components/Button';
import Color from '../../utils/Color';

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
    font-weight: bold;
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
            <Button onPress={() => navigation.navigate('NameRegister')} title={'Tiếp'} />
        </Container>
    );
}

export default JoinScreen;