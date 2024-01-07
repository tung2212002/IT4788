import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { Dimensions, Text } from 'react-native';

import Color from '../utils/Color';
import { convertTimeNoti } from '../utils/convertTimeAgo';
import { SVGChat, SVGCheck, SVGCommentMark, SVGEditPost, SVGExclamationMark, SVGGroups, SVGMonitor, SVGUser, SVGVideo, images } from '../../assets';
import VectorIcon from '../utils/VectorIcon';
import PopupComponent from './PopupComponent';
import { SVGHaha2, SVGSad2 } from '../../assets';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';

const Container = styled.Pressable`
    flex: 1;
    padding: 10px;
    flex-direction: row;
`;

const AvatarContainer = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border-width: 1px;
    border-color: ${Color.grey5};
    background-color: ${Color.white};
`;

const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
`;

const Content = styled.View`
    flex: 1;
    margin-left: 12px;
    flex-direction: column;
`;

const ContentText = styled.View`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: ${Dimensions.get('window').width - 140}px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Bold';
    line-height: 22px;
`;

const Description = styled.Text`
    font-size: 16px;
    color: ${Color.grey1};
    font-family: 'Roboto-Medium';
    line-height: 22px;
`;

const Time = styled.Text`
    font-size: 15px;
    color: ${Color.grey3};
    font-family: 'Roboto-Medium';
    line-height: 22px;
`;

const DotButton = styled.Pressable`
    position: absolute;
    right: 0;
    border-radius: 10px;
    padding: 0 0 10px 10px;
`;

const ThreeDots = styled(VectorIcon)`
    backgorund-color: ${Color.black};
    border-radius: 10px;
`;

const Modal = styled(PopupComponent)`
    width: 100%;
    height: 100%;
    paddiing-bottom: 20px;
`;

const IconDescription = styled.View`
    position: absolute;
    right: -5px;
    bottom: 0;
`;

function NotificationComponent({ navigation, item }) {
    const [read, setRead] = useState(item.read);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);

    const notificationType = [
        {
            name: 'FriendRequest',
            description: ' đã gửi cho bạn một lời mời kết bạn.',
            type: '1',
            icon: <SVGUser width={28} height={28} />,
            onPress: () => {
                setRead('0');
                navigate(routes.PROFILE_SCREEN, { user_id: item.object_id });
            },
        },
        {
            name: 'FriendAccepted',
            description: ' đã chấp nhận lời mời kết bạn của bạn.',
            type: '2',
            icon: <SVGUser width={28} height={28} />,
            onPress: () => {
                setRead('0');
                navigate(routes.PROFILE_SCREEN, { user_id: item.object_id });
            },
        },
        {
            name: 'PostAdded',
            description: ' đã đăng một bài viết mới.',
            type: '3',
            icon: <SVGGroups width={28} height={28} />,
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
        {
            name: 'PostUpdated',
            description: ' đã cập nhật một bài viết.',
            type: '4',
            icon: <SVGEditPost width={28} height={28} />,
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
        {
            name: 'PostFelt',
            description: ' đã bày tỏ cảm xúc về bài viết của bạn.',
            type: '5',
            icon: item.feel && (item.feel === '1' ? <SVGSad2 width={28} height={28} /> : <SVGHaha2 width={28} height={28} />),
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
        {
            name: 'PostMarked',
            description: ' đã đánh giá bài viết của bạn.',
            type: '6',
            icon: item.mark && (item.mark === '1' ? <SVGCheck width={28} height={28} /> : <SVGExclamationMark width={28} height={28} />),
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
        {
            name: 'MarkCommented',
            description: ' đã bình luận về bài viết của bạn.',
            type: '7',
            icon: <SVGCommentMark width={28} height={28} />,
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
        {
            name: 'VideoAdded',
            description: ' đã đăng một video mới.',
            type: '8',
            icon: <SVGMonitor width={28} height={28} style={{ backgroundColor: Color.white, borderRadius: 14 }} />,
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
        {
            name: 'PostCommented',
            description: ' đã bình luận về bài viết của bạn.',
            type: '9',
            icon: <SVGChat width={28} height={28} />,
            onPress: () => {
                setRead('0');
                navigation.push(routes.POST_DETAIL_SCREEN, { id: item.object_id });
            },
        },
    ];

    return (
        <Container
            style={{ backgroundColor: read === '1' ? Color.lightBlue1 : Color.white }}
            onPress={item.group === '1' && notificationType.find((type) => type.type === item.type).onPress}
        >
            <AvatarContainer>
                <Avatar source={item.avatar === '' ? images.defaultAvatar : { uri: item.avatar }} />
                <IconDescription>{notificationType.find((type) => type.type === item.type).icon}</IconDescription>
            </AvatarContainer>
            <Content>
                <ContentText>
                    <Title>
                        {item.user.username}
                        <Description>{notificationType.find((type) => type.type === item.type).description}</Description>
                    </Title>
                </ContentText>
                <Time>{convertTimeNoti(item.created)}</Time>
                <DotButton onPress={() => setRenderPopUpComponent(true)}>
                    <ThreeDots nameIcon="dots-three-horizontal" typeIcon="Entypo" size={26} color={Color.black} />
                </DotButton>
            </Content>
            <Modal renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                <Text>Mark as read</Text>
                <Text>Delete</Text>
            </Modal>
        </Container>
    );
}

export default NotificationComponent;
