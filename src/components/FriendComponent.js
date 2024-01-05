import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';

import { images } from '../../assets';
import Color from '../utils/Color';
import { convertTimeMonthYear } from '../utils/convertTimeAgo';
import VectorIcon from '../utils/VectorIcon';
import ButtonIconComponent from './ButtonIconComponent';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';
import PopupComponent from './PopupComponent';
import { Alert } from 'react-native';
import { unfriendService } from '../services/friendService';
import { setBlockService } from '../services/blockService';
import { useDispatch } from 'react-redux';
import { deleteFriendSub } from '../redux/features/friend/friendSlice';

const Container = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
`;

const ContainerAvatar = styled.Pressable`
    width: 60px;
    height: 60px;
    border-radius: 50px;
    border-width: 1px;
    border-color: ${Color.lightGray};
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 30px;
`;

const Info = styled.View`
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    justify-content: center;
`;

const ContainerText = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

const Name = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Medium';
`;

const SameFriends = styled.Text`
    font-size: 16px;
    color: ${Color.gray};
    font-family: 'Roboto-Regular';
`;

const PressDot = styled.Pressable`
    position: absolute;
    right: 0;
    border-radius: 10px;
    padding: 10px;
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

const ContainerModalHeader = styled.View`
    flex-direction: row;
    align-items: center;
    padding-bottom: 15px;
    margin-left: 20px;
    margin-right: 20px;
    border-bottom-width: 2px;
    border-bottom-color: ${Color.lightGray};
`;

const ContainerAvatarModal = styled.Pressable`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border-width: 1px;
    border-color: ${Color.lightGray};
`;

const AvatarModal = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 25px;
`;

const TimeModal = styled.Text`
    font-size: 16px;
    color: ${Color.gray};
    font-family: 'Roboto-Regular';
`;

function FriendComponent({ data, listFriend }) {
    const dispatch = useDispatch();

    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);

    const handleDeleteFriend = () => {
        setRenderPopUpComponent(false);
        Alert.alert(`Hủy kết bạn với ${data.username}`, `Bạn có chắc chắn muốn hủy kết bạn với ${data.username} không?`, [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: requestDeleteFriend,
            },
        ]);
    };

    const handleBlockFriend = () => {
        setRenderPopUpComponent(false);
        Alert.alert(
            `Chặn ${data.username}`,
            'Những người bạn chặn sẽ không thể gắn thẻ hay mời tham gia nhóm hoặc sự  kiện, cũng không thể bắt đầu trò chuyện, thêm bạn vào danh sách bạn bè hoặc xem nội dung bạn đăng trên dòng thời gian của mình nữa. Nếu bạn chặn ai đó khi hai người đang là bạn bè thì hành động này sẽ hủy kết bạn với họ.',
            [
                {
                    text: 'Chặn',
                    onPress: requestBlockFriend,
                },
                {
                    text: 'Hủy',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
        );
    };

    const handleUnfollowFriend = () => {
        setRenderPopUpComponent(false);
        Alert.alert(`Bỏ theo dõi ${data.username}`, `Bạn có chắc chắn muốn bỏ theo dõi ${data.username} không?`, [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Bỏ theo dõi',
                onPress: () => {},
            },
        ]);
    };

    const handleSendMessage = () => {
        setRenderPopUpComponent(false);
        Alert.alert(`Nhắn tin cho ${data.username}`, `Bạn có chắc chắn muốn nhắn tin cho ${data.username} không?`, [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Nhắn tin',
                onPress: () => {},
            },
        ]);
    };

    const requestDeleteFriend = () => {
        const body = {
            user_id: data.id,
        };

        unfriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // const newListFriend = listFriend.filter((item) => item.id !== data.id);
                    // setListFriend(newListFriend);

                    dispatch(deleteFriendSub(data.id));
                } else {
                    Alert.alert('Thông báo', res.data.message);
                }
            })
            .catch((err) => console.log(err));
    };

    const requestBlockFriend = () => {
        const body = {
            user_id: data.id,
        };

        setBlockService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // const newListFriend = listFriend.filter((item) => item.id !== data.id);
                    // setListFriend(newListFriend);
                    dispatch(deleteFriendSub(data.id));
                } else {
                    Alert.alert('Thông báo', res.data.message);
                }
            })
            .catch((err) => console.log(err));
    };

    const items = [
        {
            nameIcon: 'facebook-messenger',
            typeIcon: 'MaterialCommunityIcons',
            title: `Nhắn tin cho ${data.username}`,
            message: `Nhắn tin cho ${data.username}`,
            onPress: handleSendMessage,
        },
        {
            nameIcon: 'uninstall',
            typeIcon: 'Entypo',
            title: `Bỏ theo dõi ${data.username}`,
            message: 'Không thấy bài viết nữa nhưng vẫn là bạn bè.',
            onPress: handleUnfollowFriend,
        },
        {
            nameIcon: 'account-cancel',
            typeIcon: 'MaterialCommunityIcons',
            title: `Chặn ${data.username}`,
            message: `${data.username} sẽ không thể nhìn thấy bạn hoặc liên hệ với bạn trên Facebook.`,
            onPress: handleBlockFriend,
        },
    ];

    return (
        <Container>
            <ContainerAvatar onPress={() => navigate(routes.PROFILE_SCREEN, { user_id: data.id })}>
                <Avatar source={data.avatar === '' ? images.defaultAvatar : { uri: data.avatar }} />
            </ContainerAvatar>
            <Info>
                <ContainerText>
                    <Name>{data.username}</Name>
                    <PressDot onPress={() => setRenderPopUpComponent(true)}>
                        <ThreeDots nameIcon="dots-three-horizontal" typeIcon="Entypo" size={18} color={Color.black} />
                    </PressDot>
                </ContainerText>
                {data.same_friends !== '0' && <SameFriends>{data.same_friends} bạn chung</SameFriends>}
            </Info>
            {renderPopUpComponent && (
                <Modal
                    renderPopUpComponent={renderPopUpComponent}
                    setRenderPopUpComponent={setRenderPopUpComponent}
                    headerItem={
                        <ContainerModalHeader>
                            <ContainerAvatarModal onPress={() => navigate(routes.PROFILE_SCREEN, { user_id: data.id })}>
                                <AvatarModal source={data.avatar === '' ? images.defaultAvatar : { uri: data.avatar }} />
                            </ContainerAvatarModal>
                            <Info>
                                <ContainerText>
                                    <Name>{data.username}</Name>
                                </ContainerText>
                                <TimeModal>Là bạn bè từ {convertTimeMonthYear(data.created)}</TimeModal>
                            </Info>
                        </ContainerModalHeader>
                    }
                >
                    {items.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            nameIcon={item.nameIcon}
                            typeIcon={item.typeIcon}
                            title={item.title}
                            message={item.message}
                            onPress={item.onPress}
                            propsButton={{ width: 90, height: 70, backgroundColor: Color.white, alignItems: 'center', padding: '0 20' }}
                            propsIcon={{ size: 24, color: Color.black, backgroundColor: Color.lightGray, padding: 8 }}
                            propsTitle={{ color: Color.black, fontWeight: '500', size: 17 }}
                            propsMessage={{ color: Color.gray, size: 15, fontWeight: '400' }}
                        />
                    ))}

                    <ButtonIconComponent
                        nameIcon={'user-x'}
                        typeIcon={'Feather'}
                        title={`Hủy kết bạn với ${data.username}`}
                        message={`Hủy kết bạn với ${data.username}`}
                        onPress={handleDeleteFriend}
                        propsButton={{ width: 90, height: 70, backgroundColor: Color.white, alignItems: 'center', padding: '0 20' }}
                        propsIcon={{ size: 24, color: Color.red, backgroundColor: Color.lightGray, padding: 8 }}
                        propsTitle={{ color: Color.red, fontWeight: '500', size: 17 }}
                        propsMessage={{ color: Color.red, size: 15, fontWeight: '400' }}
                    />
                </Modal>
            )}
        </Container>
    );
}

export default FriendComponent;
