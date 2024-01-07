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
import PopupScreenComponent from '../../components/PopupScreenCompopnent';
import ChangUserInfo from './ChangUserInfo';
import ChangePasswordScreen from './ChangePasswordScreen';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
    padding-horizontal: 15px;
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

function SettingNotificationScreen({ navigation }) {
    const handlePress = (title, description, type) => {
        navigate(routes.SETTING_NOTIFICATION_DETAIL_SCREEN, { title, description, type });
    };

    const listItem = [
        {
            title: 'Bình luận/Tương tác',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'comment-alt',
            typeIcon: 'FontAwesome5',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'like_comment',
        },
        {
            title: 'Cập nhật từ bạn bè',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'users',
            typeIcon: 'Feather',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'from_friends',
        },
        {
            title: 'Lời mời kết bạn',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'user-plus',
            typeIcon: 'Feather',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'requested_friend',
        },
        {
            title: 'Những người bạn có thể biết',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'user-check',
            typeIcon: 'Feather',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'suggested_friend',
        },
        {
            title: 'Sinh nhật',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'gift',
            typeIcon: 'Feather',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'birthday',
        },
        {
            title: 'Video',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'video',
            typeIcon: 'Feather',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'video',
        },
        {
            title: 'Phản hồi về bài viết',
            message: 'Thông báo đẩy, email, SMS',
            nameIcon: 'message-circle',
            typeIcon: 'Feather',
            description: 'Đây là thông báo khi có người bình luận hoặc tương tác với bài viết của bạn',
            type: 'report',
        },
    ];

    return (
        <Container>
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} style={{ marginLeft: 10 }} />
                </Pressable>
                <Title>Cài đặt thông báo</Title>
            </Header>
            <Body showsVerticalScrollIndicator={false}>
                <TitleBody>Bạn nhận thông báo về</TitleBody>
                {listItem.map((item, index) => {
                    return (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            message={item.message}
                            nameIcon={item.nameIcon}
                            typeIcon={item.typeIcon}
                            propsButton={{ width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                            propsTitle={{ size: 16, fontWeight: '500' }}
                            propsMessage={{ size: 14, color: Color.gray, fontWeight: '400' }}
                            propsIcon={{ size: 30, color: Color.black }}
                            onPress={() => handlePress(item.title, item.description, item.typeIcon)}
                        />
                    );
                })}
                <TitleBody>Bạn nhận thông báo qua</TitleBody>
                <ButtonIconComponent
                    title={'Thông báo đẩy'}
                    message={'Tắt'}
                    nameIcon={'notifications-off'}
                    typeIcon={'Entypo'}
                    propsButton={{ width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 16, fontWeight: '500' }}
                    propsMessage={{ size: 14, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ size: 30, color: Color.black }}
                    onPress={() => navigate(routes.SETTING_PUSH_NOTIFICATION_SCREEN)}
                />
            </Body>
        </Container>
    );
}

export default SettingNotificationScreen;
