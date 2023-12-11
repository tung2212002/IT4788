import styled from 'styled-components/native';
import { useState } from 'react';
import { Alert } from 'react-native';
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

const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: ${Color.white};
`;

const Body = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${Color.white};
`;

const ContainerBody = styled.FlatList`
    flex: 1;
`;

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 40px;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: 'Roboto-Bold';
    flex: 1;
    align-items: center;
`;

const Icon = styled(VectorIcon)`
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 6px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
`;

const ItemButton = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
    padding-bottom: 10px;
`;

const HeaderBody = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
`;

const TitleHeaderBody = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.black};
`;

const NumberRequest = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.gray};
`;

const TextMore = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Regular';
    color: ${Color.blueButtonColor};
    position: absolute;
    right: 0;
`;

const ButtonItem = styled(ButtonComponent)`
    border-radius: 20px;
    background-color: ${Color.lightGray};
    padding: 0 15px;
`;

function FriendsScreen() {
    const [listRequestFriend, setListRequestFriend] = useState([]);
    const [listSuggestFriend, setListSuggestFriend] = useState([]);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState({
        index: 0,
        count: 10,
        isRefreshing: false,
        isLoadMore: false,
        last_index: 0,
    });

    const [page2, setPage2] = useState({
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
        if (page.last_index === page.index && page.index !== 0) {
            return;
        }
        setPage({ ...page, isLoadMore: true });
    };

    const onLoadMore2 = () => {
        if (page2.last_index === page2.index && page2.index !== 0) {
            return;
        }
        setPage2({ ...page, isLoadMore: true });
    };

    const refreshControl = <RefreshControl refreshing={page.isRefreshing} onRefresh={onRefresh} />;

    const handleGetRequestFriend = () => {
        const body = {
            index: page.index,
            count: page.count,
        };
        getRequestedFriendsService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setTotal(res.data.data.total);
                    setListRequestFriend([...listRequestFriend, ...res.data.data.requests]);
                    setPage({ ...page, index: page.index + res.data.data.requests.length, isLoadMore: false, last_index: page.index });
                    if (res.data.data.requests.length >= page.count) {
                        setIsLoadMore(true);
                    } else {
                        setIsLoadMore(false);
                    }
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

    const handleRefresh = () => {
        const body = {
            index: 0,
            count: page.count,
        };
        getRequestedFriendsService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    // setTotal(res.data.data.total);
                    setListRequestFriend(res.data.data.requests);
                    setPage({ ...page, index: res.data.data.requests.length, isRefreshing: false });
                    console.log('listRequestFriend', page);
                } else {
                    setPage({ ...page, isRefreshing: false });
                }
            })
            .catch((err) => {
                setPage({ ...page, isRefreshing: false });
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
                console.log(err);
            });
    };

    const handleGetRequestFriend2 = () => {
        const body = {
            index: page2.index,
            count: page2.count,
        };
        getSuggestedFriends(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setListSuggestFriend([...listSuggestFriend, ...res.data.data]);
                    setPage({ ...page2, index: page2.index + res.data.data.length, isLoadMore: false, last_index: page2.index });
                } else {
                    setPage({ ...page2, isLoadMore: false });
                }
            })
            .catch((err) => {
                setPage({ ...page2, isLoadMore: false });
                console.log(err);
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
            });
    };

    const handleRefresh2 = () => {
        const body = {
            index: 0,
            count: page2.count,
        };
        getSuggestedFriends(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setListSuggestFriend(res.data.data);
                    setPage({ ...page2, index: res.data.data.length, isRefreshing: false, last_index: 0 });
                } else {
                    setPage({ ...page2, isRefreshing: false });
                }
            })
            .catch((err) => {
                setPage({ ...page2, isRefreshing: false });
                Alert.alert('Lỗi', 'Vui lòng thử lại sau !');
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetRequestFriend();
        handleGetRequestFriend2();
    }, []);

    useEffect(() => {
        if (page.isLoadMore) {
            handleGetRequestFriend();
        } else if (page.isRefreshing && page.index === 0) {
            handleRefresh();
            handleRefresh2();
        }
    }, [page]);

    useEffect(() => {
        if (page2.isLoadMore) {
            handleGetRequestFriend2();
        } else if (page2.isRefreshing && page2.index === 0) {
            handleRefresh2();
        }
    }, [page2]);

    useEffect(() => {
        setTotal(listRequestFriend.length);
    }, [listRequestFriend]);

    return (
        <Container>
            <Header>
                <Title>Bạn bè</Title>
                <Icon nameIcon={'search'} typeIcon={'FontAwesome5'} size={20} color={Color.black} />
            </Header>
            <Body>
                <ContainerBody
                    refreshing={page.isRefreshing}
                    onRefresh={onRefresh}
                    ListHeaderComponent={
                        <>
                            <ItemButton>
                                <ButtonItem
                                    title={'Gợi ý'}
                                    style={{ width: 'auto', height: 40, marginLeft: 0 }}
                                    fontWeight="600"
                                    size="16"
                                    color={Color.black}
                                    onPress={() => navigate(routes.SUGGEEST_FRIENDS_SCREEN)}
                                />
                                <ButtonItem
                                    title={'Tất cả bạn bè'}
                                    style={{ width: 'auto', height: 40, marginLeft: 0 }}
                                    fontWeight="600"
                                    size="16"
                                    color={Color.black}
                                    onPress={() => navigate(routes.USER_FRIENDS_SCREEN)}
                                />
                            </ItemButton>
                            {total !== 0 && (
                                <HeaderBody>
                                    <TitleHeaderBody>Lời mời kết bạn</TitleHeaderBody>
                                    <NumberRequest> {total}</NumberRequest>
                                    <TextMore onPress={() => console.log('loadmore friend')}>Xem tất cả</TextMore>
                                </HeaderBody>
                            )}
                            {listRequestFriend.map((item, index) => {
                                return (
                                    <RequestFriendComponent
                                        data={item}
                                        listRequestFriend={listRequestFriend}
                                        setListRequestFriend={setListRequestFriend}
                                        key={index}
                                    />
                                );
                            })}
                            {isLoadMore && (
                                <ButtonComponent
                                    title={'Xem tất cả'}
                                    backgroundColor={Color.lightGray}
                                    color={Color.black}
                                    size={15}
                                    style={{ height: 40, marginLeft: 0, marginRight: 0 }}
                                    borderRadius={'7'}
                                    onPress={onLoadMore}
                                />
                            )}
                        </>
                    }
                    onEndReached={onLoadMore2}
                    onEndReachedThreshold={0}
                    refreshControl={refreshControl}
                    ListFooterComponent={
                        <>
                            <HeaderBody>
                                <TitleHeaderBody>Những người mà bạn có thể biết</TitleHeaderBody>
                            </HeaderBody>
                            {listSuggestFriend.map((item, index) => {
                                return (
                                    <SuggestFriendComponent
                                        data={item}
                                        listSuggestFriend={listSuggestFriend}
                                        setListSuggestFriend={setListSuggestFriend}
                                        key={index}
                                    />
                                );
                            })}
                            {page2.isLoadMore && <ActivityIndicator size="small" color={Color.blueButtonColor} style={{ marginVertical: 10 }} />}
                        </>
                    }
                />
            </Body>
        </Container>
    );
}

export default FriendsScreen;
