import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';

import { images } from '../../assets';
import Color from '../utils/Color';
import ButtonComponent from './ButtonComponent';
import { DelRequestFriendService, setAcceptFriendService, setRequestFriendService } from '../services/friendService';
import { Alert } from 'react-native';
import ButtonIconComponent from './ButtonIconComponent';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';
import { useDispatch } from 'react-redux';
import { deleteRequestFriendMain, deleteSuggestFriendMain, deleteSuggestFriendSub } from '../redux/features/friend/friendSlice';
import CachedImage from './CachedImage';

const Container = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
    height: 105px;
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

const SameFriends = styled.Text`
    margin-top: 5px;
    font-size: 16px;
    color: ${Color.gray};
    font-family: 'Roboto-Regular';
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

function SuggestFriendComponent({ data, listSuggestFriend, cacheFolder = '' }) {
    const dispatch = useDispatch();

    const [isRequest, setIsRequest] = useState(-1);

    const handleRequestFriend = () => {
        const body = {
            user_id: data.id,
        };

        setRequestFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setIsRequest(1);
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleDelRequestFriend = () => {
        const body = {
            user_id: data.id,
        };

        DelRequestFriendService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setIsRequest(2);
                    dispatch(deleteSuggestFriendMain(data.id));
                    // dispatch(deleteSuggestFriendSub(data.id));
                } else {
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại sau!', [{ text: 'OK' }]);
            });
    };

    const handleDeleteRequestFriend = () => {
        // setListSuggestFriend(listSuggestFriend.filter((item) => item.id !== data.id));
        dispatch(deleteSuggestFriendSub(data.id));
    };

    return (
        <Container>
            <ContainerAvatar onPress={() => navigate(routes.PROFILE_SCREEN, { user_id: data.id })}>
                {cacheFolder === '' ? (
                    <Avatar source={data.avatar === '' ? images.defaultAvatar : { uri: data.avatar }} />
                ) : data.avatar === '' ? (
                    <Avatar source={images.defaultAvatar} />
                ) : (
                    <CachedImage
                        source={{ uri: data.avatar }}
                        imageStyle={{ width: 100, height: 100, borderRadius: 50 }}
                        resizeMode="cover"
                        cacheFolder={cacheFolder}
                        cacheKey={data.avatar.split('/').pop()}
                    />
                )}
            </ContainerAvatar>
            <Info>
                <ContainerText>
                    <Name>{data.username}</Name>
                </ContainerText>
                {data.same_friends !== '0' && isRequest !== 1 && isRequest !== 2 && <SameFriends>{data.same_friends} bạn chung</SameFriends>}
                {isRequest === -1 ? (
                    <ContainerButton>
                        <ButtonComponent
                            title={'Thêm bạn bè'}
                            backgroundColor={Color.blueButtonColor}
                            color={Color.white}
                            onPress={handleRequestFriend}
                            size={15}
                            style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                            borderRadius={7}
                            width={'48'}
                        />
                        <ButtonComponent
                            title="Gỡ"
                            backgroundColor={Color.lightGray}
                            color={Color.black}
                            onPress={handleDeleteRequestFriend}
                            size={15}
                            style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                            borderRadius={7}
                            width={'48'}
                        />
                    </ContainerButton>
                ) : isRequest === 1 ? (
                    <ContainerNext>
                        <SameFriends>Đã gửi yêu cầu</SameFriends>
                        <ButtonComponent
                            title="Hủy"
                            backgroundColor={Color.lightGray}
                            color={Color.black}
                            onPress={handleDelRequestFriend}
                            size={15}
                            style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                            borderRadius={7}
                        />
                    </ContainerNext>
                ) : (
                    <ContainerNext>
                        <SameFriends>Đã hủy yêu cầu</SameFriends>
                        <ContainerButton>
                            <ButtonComponent
                                title={'Thêm bạn bè'}
                                backgroundColor={Color.blueButtonColor}
                                color={Color.white}
                                onPress={handleRequestFriend}
                                size={15}
                                style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                                borderRadius={7}
                                width={'48'}
                            />
                            <ButtonComponent
                                title="Gỡ"
                                backgroundColor={Color.lightGray}
                                color={Color.black}
                                onPress={handleDeleteRequestFriend}
                                size={15}
                                style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                                width={'48'}
                                borderRadius={7}
                            />
                        </ContainerButton>
                    </ContainerNext>
                )}
            </Info>
        </Container>
    );
}

export default SuggestFriendComponent;
