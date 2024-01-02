import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { useEffect } from 'react';
import { RefreshControl } from 'react-native';

import { getRequestedFriendsService, getSuggestedFriends } from '../../services/friendService';
import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import RequestFriendComponent from '../../components/RequestFriendComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import SuggestFriendComponent from '../../components/SuggestFriendComponent';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ButtonIconComponent from '../../components/ButtonIconComponent';
import { SVGProfile } from '../../../assets';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
    margin-horizontal: 15px;
`;

const Body = styled.ScrollView`
    margin-top: 50px;
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

function SubSettingScreen() {
    // const navigation = useNavigation();

    return (
        <Container>
            <Header>
                <Pressable>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} />
                </Pressable>
                <Title>Cài đặt & quyền riêng tư</Title>
            </Header>
            <Body>
                <TitleBody>Cài đặt tài khoản</TitleBody>
                <Description>Quản lý thông tin về bạn, các khoản thanh toán và danh bạ của bạn cũng như tài khoản nói chung.</Description>
                <ButtonIconComponent
                    title={'Thông tin cá nhân'}
                    message={'Cập nhật tên, số điện thoại và địa chỉ email của bạn.'}
                    SVGIcon={SVGProfile}
                    propsButton={{ width: '90', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 19, fontWeight: '500' }}
                    propsMessage={{ size: 15, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ width: 50, height: 50, fill: Color.black }}
                    onPress={() => navigate(routes.PROFILE_SCREEN)}
                />
                <TitleBody>Quyền riêng tư</TitleBody>
                <Description>Quản lý thông tin về bạn, các khoản thanh toán và danh bạ của bạn cũng như tài khoản nói chung.</Description>
                <ButtonIconComponent
                    title={'Thông tin cá nhân'}
                    message={'Cập nhật tên, số điện thoại và địa chỉ email của bạn.'}
                    SVGIcon={SVGProfile}
                    propsButton={{ width: '90', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 19, fontWeight: '500' }}
                    propsMessage={{ size: 15, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ width: 50, height: 50, fill: Color.black }}
                    onPress={() => navigate(routes.PROFILE_SCREEN)}
                />
            </Body>
        </Container>
    );
}

export default SubSettingScreen;
