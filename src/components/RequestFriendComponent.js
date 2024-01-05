import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';

import { images } from '../../assets';
import Color from '../utils/Color';
import ButtonComponent from './ButtonComponent';
import { setAcceptFriendService } from '../services/friendService';
import { Alert } from 'react-native';
import convertTimeAgo from '../utils/convertTimeAgo';
import VectorIcon from '../utils/VectorIcon';
import ButtonIconComponent from './ButtonIconComponent';
import { SVGWave } from '../../assets';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';
import { setBlockService } from '../services/blockService';
import PopupComponent from './PopupComponent';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteRequestFriendMain } from '../redux/features/friend/friendSlice';

const Container = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
`;

const ContainerAvatar = styled.Pressable`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-width: 1px;
    border-color: ${Color.lightGray};
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 50px;
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
    font-size: 18px;
    font-family: 'Roboto-Medium';
`;

const Time = styled.Text`
    font-size: 14px;
    color: ${Color.gray};
    position: absolute;
    right: 0;
    font-family: 'Roboto-Regular';
`;

const SameFriends = styled.Text`
    margin-top: 5px;
    font-size: 16px;
    color: ${Color.gray};
    font-family: 'Roboto-Regular';
`;

const HelloButton = styled(ButtonIconComponent)`
    margin-top: 20px;
`;

const ContainerButton = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const ContainerNext = styled.View`
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const PressDot = styled.Pressable`
    position: absolute;
    right: 14px;
    top: 10px;
    border-radius: 10px;
    padding: 5px;
`;

const ThreeDots = styled(VectorIcon)``;

const Modal = styled(PopupComponent)`
    width: 100%;
    height: 100%;
    paddiing-bottom: 20px;
`;

function RequestFriendComponent({ data, listRequestFriend, setTotal }) {
    const dispatch = useDispatch();

    const [isAccept, setIsAccept] = useState(-1);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);

    const handleAcceptFriend = () => {
        const body = {
            user_id: data.id,
            is_accept: '1',
        };

        setAcceptFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setIsAccept(1);
                    setTotal((prev) => prev - 1);
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleDenytFriend = () => {
        const body = {
            user_id: data.id,
            is_accept: '0',
        };

        setAcceptFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setIsAccept(2);
                    setTotal((prev) => prev - 1);
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
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

    const handleReportUser = () => {
        setRenderPopUpComponent(false);
    };

    const requestBlockFriend = () => {
        const body = {
            user_id: data.id,
        };

        setBlockService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // const newListRequestFriend = listRequestFriend.filter((item) => item.id !== data.id);
                    // setListRequestFriend(newListRequestFriend);
                    dispatch(deleteRequestFriendMain(data.id));
                    setTotal((prev) => prev - 1);
                } else {
                    Alert.alert('Thông báo', res.data.message);
                }
            })
            .catch((err) => console.log(err));
    };

    const items = [
        {
            nameIcon: 'message-alert',
            typeIcon: 'MaterialCommunityIcons',
            title: 'Báo cáo hoặc góp ý',
            message: `${data.username} sẽ không thấy điều này.`,
            onPress: handleReportUser,
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
                    {isAccept === -1 && <Time>{convertTimeAgo(data.created)}</Time>}
                    {isAccept === 2 && (
                        <PressDot onPress={() => setRenderPopUpComponent(true)}>
                            <ThreeDots nameIcon="dots-three-horizontal" typeIcon="Entypo" size={18} color={Color.black} />
                        </PressDot>
                    )}
                </ContainerText>
                {data.same_friends !== '0' && <SameFriends>{data.same_friends} bạn chung</SameFriends>}
                {isAccept === -1 ? (
                    <ContainerButton>
                        <ButtonComponent
                            title={'Xác nhận'}
                            backgroundColor={Color.blueButtonColor}
                            color={Color.white}
                            onPress={handleAcceptFriend}
                            size={15}
                            style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                            borderRadius={'7'}
                            width={'48'}
                        />
                        <ButtonComponent
                            title="Xóa"
                            backgroundColor={Color.lightGray}
                            color={Color.black}
                            onPress={handleDenytFriend}
                            size={15}
                            style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                            borderRadius={'7'}
                            width={'48'}
                        />
                    </ContainerButton>
                ) : isAccept === 1 ? (
                    <ContainerNext>
                        <SameFriends>Lời mời được chấp nhận</SameFriends>
                        <HelloButton
                            SVGIcon={SVGWave}
                            title="Vẫy tay chào"
                            propsIcon={{ width: '20px' }}
                            propsButton={{ backgroundColor: Color.lightGray, justifyContent: 'center', height: '40', marginTop: '10' }}
                            propsTitle={{ color: Color.black, size: 16, fontWeight: '500' }}
                        />
                    </ContainerNext>
                ) : (
                    <ContainerNext>
                        <SameFriends>Đã gỡ lời mời kết bạn</SameFriends>
                    </ContainerNext>
                )}
            </Info>
            {renderPopUpComponent && (
                <Modal renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
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
                </Modal>
            )}
        </Container>
    );
}

export default RequestFriendComponent;
