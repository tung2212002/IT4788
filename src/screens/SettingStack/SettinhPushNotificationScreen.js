import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Switch } from 'react-native-paper';

import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import { Pressable } from 'react-native';
import ButtonIconComponent from '../../components/ButtonIconComponent';

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

function SettingPushNotificationScreen({ route, navigation }) {
    const [switchOn, setSwitchOn] = useState({
        notification_on: false,
        vibrant_on: false,
        led_on: false,
        sound_on: false,
    });

    const listItem = [
        {
            id: 1,
            title: 'Thông báo đẩy',
            message: 'Tắt',
            nameIcon: 'notifications-off',
            typeIcon: 'Entypo',
            propsButton: { width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' },
            propsTitle: { size: 16, fontWeight: '500' },
            propsMessage: { size: 14, color: Color.gray, fontWeight: '400' },
            propsIcon: { size: 30, color: Color.black },
            onPress: () => setSwitchOn({ ...switchOn, notification_on: !switchOn.notification_on }),
            type: 'notification_on',
        },
        {
            id: 2,
            title: 'Rung',
            message: 'Rung khi có thông báo đến',
            nameIcon: 'vibration',
            typeIcon: 'MaterialIcons',
            propsButton: { width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' },
            propsTitle: { size: 16, fontWeight: '500' },
            propsMessage: { size: 14, color: Color.gray, fontWeight: '400' },
            propsIcon: { size: 30, color: Color.black },
            onPress: () => setSwitchOn({ ...switchOn, vibrant_on: !switchOn.vibrant_on }),
            type: 'vibrant_on',
        },
        {
            id: 3,
            title: 'Đèn led điện thoại',
            message: 'Nhấp nháy đèn led khi có thông báo đến',
            nameIcon: 'flashlight',
            typeIcon: 'MaterialCommunityIcons',
            propsButton: { width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' },
            propsTitle: { size: 16, fontWeight: '500' },
            propsMessage: { size: 14, color: Color.gray, fontWeight: '400' },
            propsIcon: { size: 30, color: Color.black },
            onPress: () => setSwitchOn({ ...switchOn, led_on: !switchOn.led_on }),
            type: 'led_on',
        },
        {
            id: 4,
            title: 'Âm thanh thông báo',
            message: 'Phát âm thanh khi có thông báo đến',
            nameIcon: 'volume-high',
            typeIcon: 'MaterialCommunityIcons',
            propsButton: { width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' },
            propsTitle: { size: 16, fontWeight: '500' },
            propsMessage: { size: 14, color: Color.gray, fontWeight: '400' },
            propsIcon: { size: 30, color: Color.black },
            onPress: () => setSwitchOn({ ...switchOn, sound_on: !switchOn.sound_on }),
            type: 'sound_on',
        },
    ];

    useEffect(() => {
        if (switchOn.notification_on) {
            setSwitchOn({ ...switchOn, vibrant_on: true, led_on: true, sound_on: true });
        } else {
            setSwitchOn({ ...switchOn, vibrant_on: false, led_on: false, sound_on: false });
        }
    }, [switchOn.notification_on]);
    return (
        <Container>
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} style={{ marginLeft: 10 }} />
                </Pressable>
                <Title>Thông báo đẩy</Title>
            </Header>
            <Body>
                <Description>Để nhận thông báo đẩy, hãy bật chúng ở cài đặt thiết bị của bạn</Description>
                <TitleBody>Thông báo đẩy</TitleBody>
                {listItem.map((item) => (
                    <ViewButton key={item.id}>
                        <ButtonIconComponent
                            title={item.title}
                            message={item.message}
                            nameIcon={item.nameIcon}
                            typeIcon={item.typeIcon}
                            propsButton={item.propsButton}
                            propsTitle={item.propsTitle}
                            propsMessage={item.propsMessage}
                            propsIcon={item.propsIcon}
                        />
                        <Switch value={switchOn[item.type]} onValueChange={item.onPress} style={{ position: 'absolute', right: 0 }} />
                    </ViewButton>
                ))}
            </Body>
        </Container>
    );
}

export default SettingPushNotificationScreen;
