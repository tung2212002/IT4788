import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Switch } from 'react-native-paper';

import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import { Pressable } from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
    padding-horizontal: 15px;
`;

const Body = styled.ScrollView`
    margin-top: 70px;
    flex: 1;
    flex-direction: column;
    background-color: ${Color.white};
    width: 100%;
`;

const Header = styled.View`
    top: 0;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'Roboto-Medium';
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const TitleBody = styled.Text`
    font-size: 24px;
    font-family: 'Roboto-Medium';
    margin-top: 10px;
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Regular';
    color: ${Color.gray};
    margin-bottom: 10px;
`;

const ViewButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;
`;

const Icon = styled(VectorIcon)`
    margin-right: 10px;
`;

const TitleButton = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Medium';
`;

function SettingNotificationDetailScreen({ route, navigation }) {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const { title, description, type } = route.params;
    return (
        <Container>
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} style={{ marginLeft: 10 }} />
                </Pressable>
                <Title>{title}</Title>
            </Header>
            <Body>
                <Description>{description}</Description>
                <TitleBody>Nơi bạn nhận thông báo này</TitleBody>
                <ViewButton>
                    <Icon nameIcon={'notification'} typeIcon={'Entypo'} size={28} color={Color.black} />
                    <TitleButton>Thông báo đẩy</TitleButton>
                    <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} style={{ marginLeft: 'auto' }} />
                </ViewButton>
            </Body>
        </Container>
    );
}

export default SettingNotificationDetailScreen;
