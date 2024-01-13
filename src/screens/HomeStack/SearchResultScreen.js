/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Animated, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';

import PostComponent from '../../components/PostComponent/PostComponent';
import Color from '../../utils/Color';
import { selectUser } from '../../redux/features/auth/authSlice';
import { getListPostsService } from '../../services/postService';
import SearchInputComponent from '../../components/SearchComponent.js/SearchInputComponent';
import { searchService } from '../../services/searchService';
import { Text, View } from 'moti';
import VectorIcon from '../../utils/VectorIcon';
import { updateHistorySearch } from '../../redux/features/history/searchSlice';
import FakePostComponent from '../../components/Skeletion/FakePostComponent';

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${Color.white};
`;

const ActivityIndicatorIcon = styled(ActivityIndicator)``;

const AnimatedHeader = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;

const ItemSeparatorView = styled.View`
    height: 8px;
    background-color: ${Color.mainBackgroundHome};
`;

const Footer = styled.View`
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const ContainerListItem = styled.ScrollView`
    width: 100%;
    height: 70px;
    background-color: ${Color.white};
    border-bottom-width: 2px;
    border-bottom-color: ${Color.grey5};
    max-height: 70px;
`;

const Item = styled.TouchableOpacity`
    height: 60px;
    justify-content: center;
    align-items: center;
    padding-horizontal: 8px;
`;

const ItemText = styled.Text`
    font-size: 17px;
    color: ${Color.black};
    font-family: Roboto-Medium;
`;

const CONTAINER_HEIGHT = 60;

const fakePost = [
    {
        id: 1,
    },
    {
        id: 2,
    },
];

const listItem = [
    {
        id: 1,
        title: 'Tất cả',
    },
    {
        id: 2,
        title: 'Bài viết',
    },
    {
        id: 3,
        title: 'Người dùng',
    },
    {
        id: 4,
        title: 'Trang',
    },
    {
        id: 5,
        title: 'Nhóm',
    },
    {
        id: 6,
        title: 'Sự kiện',
    },
];

function SearchResultScreen({ route, navigation }) {
    const { keyword } = route.params;
    const count = 10;
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const [post, setPost] = useState([]);
    const [pagination, setPagination] = useState({
        index: 0,
        isLoadMore: false,
        canLoadMore: true,
        firstLoad: true,
    });

    const onLoadMore = () => {
        if (!pagination.canLoadMore || pagination.isLoadMore) {
            return;
        }
        setPagination({ ...pagination, isLoadMore: true, firstLoad: false });
    };

    const handleLoadMore = () => {
        const body = {
            keyword: keyword,
            index: pagination.index,
            count: count,
        };
        searchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data?.length !== 0 && response.data.data?.length === count) {
                        setPagination({
                            ...pagination,
                            index: response.data.data.length + pagination.index,
                            isLoadMore: false,
                        });
                        setPost((prev) => [...prev, ...response.data.data]);
                    } else if (response.data.data?.length !== 0 && response.data.data?.length < count) {
                        setPagination({
                            ...pagination,
                            index: response.data.data.length + pagination.index,
                            isLoadMore: false,

                            canLoadMore: false,
                        });
                        setPost((prev) => [...prev, ...response.data.data]);
                    } else {
                        setPagination({
                            ...pagination,
                            isLoadMore: false,
                            canLoadMore: false,
                        });
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isLoadMore: false });
                console.log(e);
            });
    };

    useEffect(() => {
        if (pagination.isLoadMore && pagination.canLoadMore) {
            handleLoadMore();
        }
    }, [pagination]);

    useEffect(() => {
        const body = {
            keyword: keyword,
            index: pagination.index,
            count: count,
        };
        searchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    console.log(response.data.data);
                    // refreshHistory();
                    if (response.data.data?.length !== 0 && response.data.data?.length === count) {
                        setPost(response.data.data);
                        setPagination({
                            ...pagination,
                            index: response.data.data.length + pagination.index,
                            isLoadMore: false,
                            firstLoad: false,
                        });
                        console.log('firstLoad1', pagination.firstLoad);
                        dispatch(updateHistorySearch());
                    } else if (response.data.data?.length !== 0 && response.data.data?.length < count) {
                        setPagination({
                            ...pagination,
                            index: response.data.data.length + pagination.index,
                            isLoadMore: false,
                            canLoadMore: false,
                            firstLoad: false,
                        });
                        console.log('firstLoad2', pagination.firstLoad);
                        setPost(response.data.data);
                        dispatch(updateHistorySearch());
                    } else {
                        console.log('firstLoad3', pagination.firstLoad);
                        setPagination({
                            ...pagination,
                            isLoadMore: false,
                            canLoadMore: false,
                            firstLoad: false,
                        });
                        dispatch(updateHistorySearch());
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isLoadMore: false, firstLoad: false });
                console.log(e);
            });
    }, []);

    useEffect(() => {
        console.log('firstLoad', pagination.firstLoad);
    }, [pagination]);

    return (
        <Container>
            <SearchInputComponent navigation={navigation} style={{ zIndex: 100 }} keyword={keyword} />
            {!pagination.firstLoad ? (
                post.length > 0 ? (
                    <ContainerListItem
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, height: 70, paddingVertical: 0 }}
                    >
                        {listItem.map((item, index) => (
                            <Item key={index}>
                                <ItemText
                                    style={{
                                        color: index === 1 ? Color.blueButtonColor : Color.black,
                                    }}
                                >
                                    {item.title}
                                </ItemText>
                            </Item>
                        ))}
                    </ContainerListItem>
                ) : (
                    !pagination.firstLoad && (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: -1 }}>
                            <VectorIcon nameIcon={'magnify-close'} typeIcon={'MaterialCommunityIcons'} size={50} color={Color.grey5} />
                            <List.Subheader style={{ fontSize: 20 }}>Không có kết quả</List.Subheader>
                        </View>
                    )
                )
            ) : null}

            {!pagination.firstLoad ? (
                // <Animated.FlatList
                //     data={post}
                //     showsVerticalScrollIndicator={false}
                //     keyExtractor={(item, index) => item.id.toString()}
                //     renderItem={({ item }) => (
                //         <PostComponent item={item} user={user} navigation={navigation} post={post} setPost={setPost} style={{ zIndex: -10 }} />
                //         // <Text>{item.described}</Text>
                //     )}
                //     onEndReached={onLoadMore}
                //     ItemSeparatorComponent={ItemSeparatorView}
                //     onEndReachedThreshold={1}
                //     initialNumToRender={10}
                //     contentContainerStyle={{ paddingBottom: CONTAINER_HEIGHT }}
                //     scrollEventThrottle={1}
                //     ListFooterComponent={
                //         <Footer>
                //             <ItemSeparatorView />
                //             {pagination.isLoadMore && <FakePostComponent />}
                //             <ItemSeparatorView />
                //             {pagination.isLoadMore && <FakePostComponent />}
                //             <ItemSeparatorView />
                //         </Footer>
                //     }
                //     ListFooterComponentStyle={{ marginVertical: 15 }}
                // />
                <ScrollView
                    style={{ flex: 1, backgroundColor: Color.white }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: CONTAINER_HEIGHT }}
                    onScroll={({ nativeEvent }) => {
                        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
                            onLoadMore();
                        }
                    }}
                    scrollEventThrottle={16}
                >
                    {post.map((item, index) => (
                        <View key={index} style={{ zIndex: -10 }}>
                            <PostComponent key={index} item={item} user={user} navigation={navigation} post={post} setPost={setPost} style={{ zIndex: -10 }} />
                            <ItemSeparatorView />
                        </View>
                    ))}
                    <Footer>
                        <ItemSeparatorView />
                        {pagination.isLoadMore && <FakePostComponent />}
                        <ItemSeparatorView />
                        {pagination.isLoadMore && <FakePostComponent />}
                        <ItemSeparatorView />
                    </Footer>
                </ScrollView>
            ) : (
                <ScrollView style={{ flex: 1, backgroundColor: Color.white }} showsVerticalScrollIndicator={false}>
                    <FakePostComponent />
                    <ItemSeparatorView />
                    <FakePostComponent />
                    <ItemSeparatorView />
                    <FakePostComponent />
                </ScrollView>
            )}
        </Container>
    );
}

export default SearchResultScreen;
