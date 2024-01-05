/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';

import PostComponent from '../../components/PostComponent/PostComponent';
import Color from '../../utils/Color';
import { selectUser } from '../../redux/features/auth/authSlice';
import { getListPostsService } from '../../services/postService';
import SearchInputComponent from '../../components/SearchComponent.js/SearchInputComponent';
import { searchService } from '../../services/searchService';
import { View } from 'moti';
import VectorIcon from '../../utils/VectorIcon';

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
    const { keyword, refreshHistory } = route.params;
    const count = 10;

    const user = useSelector(selectUser);
    const [post, setPost] = useState([]);
    const [pagination, setPagination] = useState({
        index: 0,
        isLoadMore: false,
        canLoadMore: true,
        isLoaded: false,
    });

    const ref = useRef(null);

    const onLoadMore = () => {
        setPagination({ ...pagination, isLoadMore: true });
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
                    refreshHistory();
                    if (response.data.data?.length !== 0 && response.data.data?.length === count) {
                        setPagination({
                            ...pagination,
                            index: response.data.data.length + pagination.index,
                            isLoadMore: false,
                            isLoaded: true,
                        });
                        setPost(response.data.data);
                    } else if (response.data.data?.length !== 0 && response.data.data?.length < count) {
                        setPagination({
                            ...pagination,
                            index: response.data.data.length + pagination.index,
                            isLoadMore: false,
                            canLoadMore: false,
                            isLoaded: true,
                        });
                        setPost(response.data.data);
                    } else {
                        setPagination({
                            ...pagination,
                            isLoadMore: false,
                            canLoadMore: false,
                            isLoaded: true,
                        });
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isLoadMore: false });
                console.log(e);
            });
    }, []);

    return (
        <Container>
            <SearchInputComponent navigation={navigation} style={{ zIndex: 100 }} keyword={keyword} refreshHistory={refreshHistory} />
            {pagination.isLoaded ? (
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
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: -1 }}>
                        <VectorIcon nameIcon={'magnify-close'} typeIcon={'MaterialCommunityIcons'} size={50} color={Color.grey5} />
                        <List.Subheader style={{ fontSize: 20 }}>Không có kết quả</List.Subheader>
                    </View>
                )
            ) : null}

            {pagination.isLoaded ? (
                <Animated.FlatList
                    ref={ref}
                    data={post}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PostComponent item={item} user={user} navigation={navigation} post={post} setPost={setPost} style={{ zIndex: -10 }} />
                    )}
                    onEndReached={onLoadMore}
                    ItemSeparatorComponent={ItemSeparatorView}
                    onEndReachedThreshold={0}
                    initialNumToRender={10}
                    contentContainerStyle={{ paddingBottom: CONTAINER_HEIGHT }}
                    scrollEventThrottle={1}
                    ListFooterComponent={
                        <Footer>{pagination.isLoadMore && pagination.canLoadMore && <ActivityIndicatorIcon size={30} color={Color.blueButtonColor} />}</Footer>
                    }
                    ListFooterComponentStyle={{ marginVertical: 15 }}
                />
            ) : (
                <ActivityIndicatorIcon size={30} color={Color.blueButtonColor} />
            )}
        </Container>
    );
}

export default SearchResultScreen;
