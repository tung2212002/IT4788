import React from 'react';
import styled from 'styled-components/native';
import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import { useState } from 'react';
import { getSuggestedFriends, getUserFriendsService } from '../../services/friendService';
import { Alert, RefreshControl } from 'react-native';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../navigation/RootNavigator';
import SuggestFriendComponent from '../../components/SuggestFriendComponent';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addListSuggestFriendSub, selectSuggestFriendSub, setSuggestFriendSub } from '../../redux/features/friend/friendSlice';

const Container = styled.View`
    flex: 1;
`;

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

const ContainerBody = styled.FlatList`
    flex: 1;
`;
const Body = styled.View`
    margin-top: 50px;
    flex: 1;
    flex-direction: column;
    padding-horizontal: 15px;
    background-color: ${Color.white};
`;

function SuggestFriendsScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const listSuggestFriend = useSelector(selectSuggestFriendSub);
    // const [listSuggestFriend, setListSuggestFriend] = useState([]);
    const [page, setPage] = useState({
        index: 0,
        count: 10,
        isRefreshing: false,
        isLoadMore: false,
        last_index: 0,
    });

    const onRefresh = () => {
        setPage({ ...page, isRefreshing: true, index: 0, last_index: 0 });
    };

    const onLoadMore = () => {
        // console.log(page.last_index, page.index);
        if (page.last_index === page.index && page.index !== 0) {
            return;
        }
        setPage({ ...page, isLoadMore: true });
    };

    const refreshControl = <RefreshControl refreshing={page.isRefreshing} onRefresh={onRefresh} />;

    const handleGetSuggestFriends = () => {
        const body = {
            index: page.index,
            count: page.count,
        };

        getSuggestedFriends(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setListSuggestFriend([...listSuggestFriend, ...res.data.data]);
                    dispatch(addListSuggestFriendSub(res.data.data));
                    setPage({ ...page, index: page.index + res.data.data.length, isLoadMore: false, last_index: page.index });
                } else {
                    setPage({ ...page, isLoadMore: false });
                }
            })
            .catch((err) => {
                setPage({ ...page, isLoadMore: false });

                console.log('handleGetSuggestFriends', err);
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
            });
    };

    const handleRefreshSuggestFriends = () => {
        const body = {
            index: 0,
            count: page.count,
        };

        getSuggestedFriends(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setListSuggestFriend(res.data.data);
                    dispatch(setSuggestFriendSub(res.data.data));
                    setPage({ ...page, index: res.data.data.length, isRefreshing: false });
                } else {
                    setPage({ ...page, isRefreshing: false });
                }
            })
            .catch((err) => {
                setPage({ ...page, isRefreshing: false });
                console.log('handleRefreshSuggestFriends', err);
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
            });
    };

    useEffect(() => {
        handleRefreshSuggestFriends();
    }, []);

    useEffect(() => {
        console.log(page);
        if (page.isLoadMore) {
            handleGetSuggestFriends();
        } else if (page.isRefreshing) {
            handleRefreshSuggestFriends();
        }
    }, [page]);

    return (
        <Container>
            <HeaderProfile>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={30} color={Color.black} />
                </Pressable>
                <HeaderTitle>Gợi ý</HeaderTitle>
                <ItemRightComponent>
                    <PressItem onPress={() => navigate('SearchScreen')}>
                        <VectorIcon nameIcon={'search'} typeIcon={'FontAwesome'} size={24} color={Color.black} />
                    </PressItem>
                </ItemRightComponent>
            </HeaderProfile>
            <Body>
                <ContainerBody
                    showsVerticalScrollIndicator={false}
                    refreshing={page.isRefreshing}
                    onRefresh={onRefresh}
                    data={listSuggestFriend}
                    ListHeaderComponent={
                        <HeaderBody>
                            <TitleHeaderBody>Những người bạn có thể biết</TitleHeaderBody>
                        </HeaderBody>
                    }
                    keyExtractor={(item, index) => index + item.id + item.created}
                    renderItem={({ item }) => (
                        <SuggestFriendComponent
                            data={item}
                            listSuggestFriend={listSuggestFriend}
                            // setListSuggestFriend={setListSuggestFriend}
                        />
                    )}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0}
                    refreshControl={refreshControl}
                    ListFooterComponent={page.isLoadMore && <ActivityIndicator size="small" color={Color.blueButtonColor} style={{ marginVertical: 10 }} />}
                />
            </Body>
        </Container>
    );
}

export default SuggestFriendsScreen;
