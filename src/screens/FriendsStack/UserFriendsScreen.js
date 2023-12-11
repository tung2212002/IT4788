import React from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';

import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../navigation/RootNavigator';
import FriendComponent from '../../components/FriendComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { getUserFriendsService } from '../../services/friendService';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const HeaderProfile = styled.View`
    top: 0;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: ${Color.white};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const HeaderTitle = styled.Text`
    font-size: 20px;
    font-family: Roboto-Medium;
    color: ${Color.black};
    padding-left: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const ItemRightComponent = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PressItem = styled.Pressable`
    margin-horizontal: 10px;
`;

const HeaderBody = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TitleHeaderBody = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.black};
`;

const TextMore = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Regular';
    color: ${Color.blueButtonColor};
`;
const Container = styled.View`
    flex: 1;
`;

const Body = styled.View`
    margin-top: 50px;
    flex: 1;
    flex-direction: column;
    padding-horizontal: 15px;
    background-color: ${Color.white};
`;

const ContainerBody = styled.FlatList`
    flex: 1;
`;

function UserFriendsScreen() {
    const navigation = useNavigation();
    const [listFriend, setListFriend] = useState([]);
    const [totalUserFriends, setTotalUserFriends] = useState(0);
    const [page, setPage] = useState({
        index: 0,
        count: 20,
        isRefreshing: false,
        isLoadMore: false,
        last_index: 0,
    });

    const onRefresh = () => {
        setPage({ ...page, isRefreshing: true, index: 0, last_index: 0 });
    };

    const onLoadMore = () => {
        if (page.last_index === page.index) {
            return;
        }
        setPage({ ...page, isLoadMore: true });
    };

    const refreshControl = <RefreshControl refreshing={page.isRefreshing} onRefresh={onRefresh} />;

    const handleGetUserFriends = () => {
        console.log('loadmore friend');
        const body = {
            index: page.index,
            count: page.count,
        };

        getUserFriendsService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setTotalUserFriends(res.data.data.friends.length + totalUserFriends);
                    setListFriend([...listFriend, ...res.data.data.friends]);
                    setPage({ ...page, index: page.index + res.data.data.friends.length, isLoadMore: false, last_index: page.index });
                } else {
                    setPage({ ...page, isLoadMore: false });
                }
            })
            .catch((err) => {
                setPage({ ...page, isLoadMore: false });

                console.log(err);
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
            });
    };

    const handleRefreshUserFriends = () => {
        const body = {
            index: 0,
            count: page.count,
        };

        getUserFriendsService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setTotalUserFriends(res.data.data.friends.length);
                    setListFriend(res.data.data.friends);
                    setPage({ ...page, index: res.data.data.friends.length, isRefreshing: false });
                } else {
                    setPage({ ...page, isRefreshing: false });
                }
            })
            .catch((err) => {
                setPage({ ...page, isRefreshing: false });
                console.log(err);
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
            });
    };

    useEffect(() => {
        handleGetUserFriends();
    }, []);

    useEffect(() => {
        if (page.isLoadMore) {
            handleGetUserFriends();
        } else if (page.isRefreshing) {
            handleRefreshUserFriends();
        }
    }, [page]);

    useEffect(() => {
        setTotalUserFriends(listFriend.length);
    }, [listFriend]);

    return (
        <Container>
            <HeaderProfile>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={30} color={Color.black} />
                </Pressable>
                <HeaderTitle>Tất cả bạn bè</HeaderTitle>
                <ItemRightComponent>
                    <PressItem onPress={() => navigate('SearchScreen')}>
                        <VectorIcon nameIcon={'search'} typeIcon={'FontAwesome'} size={24} color={Color.black} />
                    </PressItem>
                </ItemRightComponent>
            </HeaderProfile>
            <Body>
                <ContainerBody
                    refreshing={page.isRefreshing}
                    onRefresh={onRefresh}
                    ListHeaderComponent={
                        <HeaderBody>
                            <TitleHeaderBody>{totalUserFriends} bạn bè</TitleHeaderBody>
                            <TextMore onPress={() => console.log('loadmore friend')}>Sắp xếp</TextMore>
                        </HeaderBody>
                    }
                    data={listFriend}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <FriendComponent data={item} listFriend={listFriend} setListFriend={setListFriend} />}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0}
                    refreshControl={refreshControl}
                    ListFooterComponent={page.isLoadMore && <ActivityIndicator size="small" color={Color.blueButtonColor} style={{ marginVertical: 10 }} />}
                />
            </Body>
        </Container>
    );
}

export default UserFriendsScreen;
