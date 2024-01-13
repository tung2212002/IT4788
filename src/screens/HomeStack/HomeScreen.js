/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import HeaderApp from '../../components/HeaderApp';
import PostComponent from '../../components/PostComponent/PostComponent';
import PostComposerComponent from '../../components/PostComposerComponent';
import Color from '../../utils/Color';
import { selectUser } from '../../redux/features/auth/authSlice';
import { getListPostsService, getPostService } from '../../services/postService';
import { getLocationStorage } from '../../utils/locationStorage';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';
import { addListPostHomeEnd, addPost, selectHomePost, setListHomePost } from '../../redux/features/post/postSlice';
import { selectNetwork } from '../../redux/features/network/networkSlice';
import { addDataHeadAsyncStorage, addDataTailAsyncStorage, getAsyncStorage, setAsyncStorage } from '../../utils/asyncCacheStorage';
import FakePostComponent from '../../components/Skeletion/FakePostComponent';
import { CacheManager } from '../../components/CachedImage';
import { View } from 'moti';

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
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
`;

const CONTAINER_HEIGHT = 60;

function HomeScreen({ route, navigation }) {
    const count = 10;
    const dispatch = useDispatch();

    // const [post, setPost] = useState(null);
    const post = useSelector(selectHomePost);
    const user = useSelector(selectUser);
    const isConnected = useSelector(selectNetwork);

    const fakePost = [
        {
            id: 1,
        },
        {
            id: 2,
        },
    ];
    const [location, setLocation] = useState(null);
    const [pagination, setPagination] = useState({
        index: 0,
        lastId: 0,
        isRefreshing: false,
        isLoadMore: false,
        firstLoad: true,
        canLoadMore: true,
    });

    const [isSearch, setIsSearch] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;
    const ref = useRef(null);

    const onRefresh = () => {
        console.log('onRefresh');
        if (pagination.isRefreshing || pagination.isLoadMore) {
            return;
        }
        console.log('onRefresh2');
        setPagination({ ...pagination, isRefreshing: true, index: 0, canLoadMore: true });
    };

    const onLoadMore = () => {
        if (!pagination.lastId || pagination.isRefreshing || pagination.isLoadMore || !pagination.canLoadMore) {
            return;
        }
        setPagination({ ...pagination, isLoadMore: true });
    };

    const handleLoadMore = () => {
        const data = {
            in_campaign: '1',
            campaign_id: '1',
            latitude: location.latitude,
            longitude: location.longitude,
            last_id: pagination.lastId,
            index: pagination.index,
            count: count,
        };
        getListPostsService(data)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data.post?.length !== 0 && response.data.data?.last_id !== pagination.lastId) {
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length + pagination.index,
                            isLoadMore: false,
                            canLoadMore: response.data.data.post.length === count,
                        });
                        // setPost((prev) => [...prev, ...response.data.data.post]);
                        dispatch(addListPostHomeEnd(response.data.data.post));
                        addDataTailAsyncStorage('homePost', response.data.data.post);
                    } else if (response.data.data.post?.length === 0) {
                        setPagination({ ...pagination, isLoadMore: false, canLoadMore: false });
                    } else {
                        setPagination({ ...pagination, isLoadMore: false });
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isLoadMore: false });
                console.log(e);
            });
    };

    const refreshControl = <RefreshControl refreshing={pagination.isRefreshing} onRefresh={onRefresh} progressViewOffset={CONTAINER_HEIGHT} />;

    const refreshData = () => {
        const data = {
            in_campaign: '1',
            campaign_id: '1',
            latitude: location.latitude,
            longitude: location.longitude,
            index: pagination.index,
            count: count,
        };
        getListPostsService(data)
            .then((response) => {
                if (response.data.code === '1000') {
                    console.log('response.data.data.post', response.data.data.post);
                    if (response.data.data.post.length !== 0) {
                        // setPost(response.data.data.post);
                        console.log('setListHomePostabc');

                        dispatch(setListHomePost(response.data.data.post));
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length,
                            isRefreshing: false,
                            canLoadMore: response.data.data.post.length === count,
                        });
                        setAsyncStorage('homePost', response.data.data.post);
                    } else if (response.data.data.post.length === 0) {
                        console.log('setListHomePost []');
                        setPagination({ ...pagination, isRefreshing: false, canLoadMore: false });
                        dispatch(setListHomePost([]));
                        setAsyncStorage('homePost', []);
                    } else {
                        setPagination({ ...pagination, isRefreshing: false });
                    }
                }
            })
            .catch((e) => {
                setPagination({ ...pagination, isRefreshing: false });
                console.log(e);
            });
    };

    const handleRequestNewPost = (id) => {
        console.log(id);
        const data = {
            id,
        };

        getPostService(data)
            .then((res) => {
                if (res.data.code === '1000') {
                    let isVideo = res.data.data.video ? true : false;
                    dispatch(addPost({ post: res.data.data, isVideo }));
                    addDataHeadAsyncStorage('homePost', [res.data.data]);
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            offsetAnim,
        ),
        0,
        CONTAINER_HEIGHT,
    );

    var _clampedScrollValue = 0;
    var _offsetValue = 0;
    var _scrollValue = 0;

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const absoluteScrollY = value < 0 ? 0 : value;
            const diff = absoluteScrollY - _scrollValue;
            _scrollValue = absoluteScrollY;
            _clampedScrollValue = Math.min(Math.max(_clampedScrollValue + diff, 0), CONTAINER_HEIGHT);
        });

        offsetAnim.addListener(({ value }) => {
            _offsetValue = value;
        });
    });

    var scrollEndTimer = null;
    const onMomentumScrollBegin = () => {
        clearTimeout(scrollEndTimer);
    };
    const onMomentumScrollEnd = () => {
        const toValue =
            _scrollValue > CONTAINER_HEIGHT && _clampedScrollValue > CONTAINER_HEIGHT / 2 ? _offsetValue + CONTAINER_HEIGHT : _offsetValue - CONTAINER_HEIGHT;

        Animated.timing(offsetAnim, {
            toValue,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const onScrollEndDrag = () => {
        scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
    };

    const headerTranslate = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT],
        outputRange: [0, -CONTAINER_HEIGHT],
        extrapolate: 'clamp',
    });
    const opacity = clampedScroll.interpolate({
        inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
        outputRange: [1, 0.05, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        if (pagination.isRefreshing && location && !pagination.isLoadMore) {
            refreshData();
        } else if (pagination.isLoadMore && location && !pagination.isRefreshing) {
            handleLoadMore();
        }
    }, [pagination]);

    useEffect(() => {
        if (isConnected && pagination.firstLoad) {
            getLocationStorage()
                .then((res) => {
                    if (res) {
                        setLocation(res);
                        const data = {
                            in_campaign: '1',
                            campaign_id: '1',
                            latitude: res.latitude,
                            longitude: res.longitude,
                            index: pagination.index,
                            count: count,
                        };

                        getListPostsService(data)
                            .then((response) => {
                                if (response.data.code === '1000') {
                                    if (response.data.data.post.length !== 0) {
                                        console.log('setListHomePost');

                                        setPagination({
                                            ...pagination,
                                            lastId: response.data.data.last_id,
                                            index: response.data.data.post.length,
                                            firstLoad: false,
                                            canLoadMore: response.data.data.post.length === count,
                                        });
                                        // setPost(response.data.data.post);
                                        dispatch(setListHomePost(response.data.data.post));
                                        setAsyncStorage('homePost', response.data.data.post);
                                    } else if (response.data.data.post.length === 0) {
                                        console.log('setListHomePost []');

                                        setPagination({ ...pagination, firstLoad: false, canLoadMore: false });
                                        dispatch(setListHomePost([]));
                                        setAsyncStorage('homePost', []);
                                    } else {
                                        setPagination({ ...pagination });
                                    }
                                }
                            })
                            .catch((e) => {
                                setPagination({ ...pagination, isRefreshing: false });
                            });
                    } else {
                        Alert.alert('Hãy bật định vị để sử dụng ứng dụng');
                    }
                })
                .catch((e) => {
                    Alert.alert('Hãy bật định vị để sử dụng ứng dụng');
                });
        } else if (!isConnected && post.length === 0 && pagination.firstLoad) {
            getAsyncStorage('homePost')
                .then((res) => {
                    Alert.alert(res.length.toString());
                    if (res) {
                        dispatch(setListHomePost(res));
                        setPagination({ ...pagination, firstLoad: false });
                    } else {
                        dispatch(setListHomePost([]));
                        setPagination({ ...pagination, firstLoad: false });
                        Alert.alert('No cache data');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [isConnected]);

    useScrollToTop(ref);

    return (
        <Container>
            <AnimatedHeader style={isSearch ? null : [{ transform: [{ translateY: headerTranslate }] }]}>
                <HeaderComponent style={{ opacity }} navigation={navigation} />
            </AnimatedHeader>
            {!pagination.firstLoad ? (
                <Animated.FlatList
                    ref={ref}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    data={post}
                    refreshing={pagination.isRefreshing}
                    onRefresh={onRefresh}
                    ListHeaderComponent={
                        <>
                            <PostComposerComponent
                                navigation={navigation}
                                stylesInput={{ placeholderTextColor: Color.grey3, borderWidth: 1, borderColor: Color.grey3 }}
                                isHeader={false}
                                post={post}
                                // setPost={setPost}
                                pagination={pagination}
                                setPagination={setPagination}
                            />
                            {/* <StoryComponent /> */}
                            <ItemSeparatorView />
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    refreshControl={refreshControl}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PostComponent
                            item={item}
                            user={user}
                            navigation={navigation}
                            post={post}
                            // setPost={setPost}
                            handleRequestNewPost={handleRequestNewPost}
                            cacheFolder="homePost"
                            canNavigate={true}
                        />
                    )}
                    onEndReached={onLoadMore}
                    ItemSeparatorComponent={ItemSeparatorView}
                    onEndReachedThreshold={1}
                    initialNumToRender={10}
                    contentContainerStyle={{ marginTop: CONTAINER_HEIGHT }}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    onScrollEndDrag={onScrollEndDrag}
                    scrollEventThrottle={1}
                    // ListFooterComponent={<Footer>{pagination.isLoadMore && <ActivityIndicatorIcon size={30} color={Color.blueButtonColor} />}</Footer>}
                    ListFooterComponent={
                        <Footer>
                            <ItemSeparatorView />
                            {pagination.isLoadMore && <FakePostComponent />}
                            <ItemSeparatorView />
                            {pagination.isLoadMore && <FakePostComponent />}
                        </Footer>
                    }
                    ListFooterComponentStyle={{ marginVertical: 0 }}
                />
            ) : (
                <Animated.FlatList
                    ref={ref}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    data={fakePost}
                    ListHeaderComponent={
                        <>
                            <PostComposerComponent
                                navigation={navigation}
                                stylesInput={{ placeholderTextColor: Color.grey3, borderWidth: 1, borderColor: Color.grey3 }}
                                isHeader={false}
                            />
                            <ItemSeparatorView />
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => <FakePostComponent />}
                    contentContainerStyle={{ marginTop: CONTAINER_HEIGHT, paddingBottom: CONTAINER_HEIGHT }}
                    ItemSeparatorComponent={ItemSeparatorView}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    onScrollEndDrag={onScrollEndDrag}
                    scrollEventThrottle={1}
                    ListFooterComponentStyle={{ marginVertical: 15 }}
                />
            )}
        </Container>
    );
}

export default HomeScreen;
