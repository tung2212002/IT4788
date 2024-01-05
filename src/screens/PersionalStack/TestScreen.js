/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, Animated, Alert } from 'react-native';
import styled from 'styled-components/native';
// import debounce from 'lodash.debounce';

import HeaderApp from '../../components/HeaderApp';
import PostComponent from '../../components/PostComponent';
import PostComposerComponent from '../../components/PostComposerComponent';
import Color from '../../utils/Color';
import { getLocationStorage } from '../../utils/locationStorage';
import { getListPostsService } from '../../services/postService';
import { selectUser } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import StoryComponent from '../../components/StoryComponent';
import LoadingComponent from '../../components/LoadingComponent';
import { Modal } from 'react-native-paper';
import { Text } from 'react-native';

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${Color.white};
`;

const ActivityIndicatorIcon = styled.ActivityIndicator`
    background-color: ${Color.white};
    padding: 10px;
`;

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

const CONTAINER_HEIGHT = 60;

const postFake = [
    {
        id: 1,
        name: 'Nguyen Van A',
        created: '2021-05-20 10:00:00',
        described:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet.',
        modified: '2021-05-20 10:00:00',
        fake: 0,
        trust: 0,
        kudos: 10,
        disappointed: 10,
        is_rate: 0,
        is_marked: 0,
        image: [
            {
                id: 1,
                url: 'https://picsum.photos/200/300',
            },
            {
                id: 2,
                url: 'https://picsum.photos/200/300',
            },
            {
                id: 3,
                url: 'https://picsum.photos/200/300',
            },
        ],
        author: {
            id: 1,
            name: 'Nguyen Van A',
            avatar: 'https://picsum.photos/200/300',
            coins: 100,
        },
        category: {
            id: 1,
            name: 'Thể thao',
            has_name: 1,
        },
        state: 0,
        is_blocked: 0,
        can_edit: 0,
        banned: 0,
        can_mark: 0,
        can_rate: 0,
        url: 'https://picsum.photos/200/300',
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet.',
    },
    {
        id: 2,
        name: 'Nguyen Van A',
        created: '2021-05-20 10:00:00',
        described:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet.',
        modified: '2021-05-20 10:00:00',
        fake: 0,
        trust: 0,
        kudos: 10,
        disappointed: 10,
        is_rate: 0,
        is_marked: 0,
        image: [
            {
                id: 1,
                url: 'https://picsum.photos/200/300',
            },
            {
                id: 2,
                url: 'https://picsum.photos/200/300',
            },
            {
                id: 3,
                url: 'https://picsum.photos/200/300',
            },
        ],
        author: {
            id: 1,
            name: 'Nguyen Van A',
            avatar: 'https://picsum.photos/200/300',
            coins: 100,
        },
        category: {
            id: 1,
            name: 'Thể thao',
            has_name: 1,
        },
        state: 0,
        is_blocked: 0,
        can_edit: 0,
        banned: 0,
        can_mark: 0,
        can_rate: 0,
        url: 'https://picsum.photos/200/300',
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet.',
    },
    {
        id: 3,
        name: 'Nguyen Van A',
        created: '2021-05-20 10:00:00',
        described:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet.',
        modified: '2021-05-20 10:00:00',
        fake: 0,
        trust: 0,
        kudos: 10,
        disappointed: 10,
        is_rate: 0,
        is_marked: 0,
        image: [
            {
                id: 1,
                url: 'https://picsum.photos/200/300',
            },
            {
                id: 2,
                url: 'https://picsum.photos/200/300',
            },
            {
                id: 3,
                url: 'https://picsum.photos/200/300',
            },
        ],
        author: {
            id: 1,
            name: 'Nguyen Van A',
            avatar: 'https://picsum.photos/200/300',
            coins: 100,
        },
        category: {
            id: 1,
            name: 'Thể thao',
            has_name: 1,
        },
        state: 0,
        is_blocked: 0,
        can_edit: 0,
        banned: 0,
        can_mark: 0,
        can_rate: 0,
        url: 'https://picsum.photos/200/300',
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet. Donec euismod, nisl eget ullamcorper ultricies, nunc libero aliquam nunc, eu aliquet nisl nisl nec nunc. Sed vitae nisl eget nisl aliquet aliquet.',
    },
];

function TestScreen() {
    const count = 10;

    const user = useSelector(selectUser);
    const [location, setLocation] = useState(null);
    const [post, setPost] = useState(postFake);
    const [pagination, setPagination] = useState({
        index: 0,
        lastId: 0,
        isRefreshing: false,
        isLoadMore: false,
    });

    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;

    const onRefresh = () => {
        setPagination({ ...pagination, isRefreshing: true, index: 0 });
    };

    const onLoadMore = () => {
        if (!pagination.lastId) {
            return;
        }
        setPagination({ ...pagination, isLoadMore: true });
    };

    const handleLoadMore = () => {
        const data = {
            user_id: user?.id,
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
                    if (response.data.data.post.length !== 0 && response.data.data.last_id !== pagination.lastId) {
                        setPost([...post, ...response.data.data.post]);
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length + pagination.index,
                            isLoadMore: false,
                        });
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
            user_id: user?.id,
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
                    if (response.data.data.post.length !== 0 && response.data.data.last_id !== pagination.lastId) {
                        setPost(response.data.data.post);
                        setPagination({ ...pagination, lastId: response.data.data.last_id, index: response.data.data.post.length, isRefreshing: false });
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
        if (pagination.isRefreshing && location) {
            refreshData();
        } else if (pagination.isLoadMore && location) {
            handleLoadMore();
        }
    }, [pagination]);

    useEffect(() => {
        getLocationStorage()
            .then((res) => {
                if (res) {
                    setLocation(res);
                    const data = {
                        user_id: user?.id,
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
                                    setPost(response.data.data.post);
                                    setPagination({ ...pagination, lastId: response.data.data.last_id, index: response.data.data.post.length });
                                } else {
                                    setPagination({ ...pagination, isRefreshing: false });
                                }
                            }
                        })
                        .catch((e) => {
                            setPagination({ ...pagination, isRefreshing: false });
                        });
                } else {
                    Alert.alert('Please turn on location');
                }
            })
            .catch((e) => {
                Alert.alert('Have error, please try again');
            });
    }, []);

    return (
        <Container>
            <AnimatedHeader style={[{ transform: [{ translateY: headerTranslate }] }]}>
                <HeaderApp style={{ opacity }} />
            </AnimatedHeader>
            {/* <LoadingComponent visible={true} /> */}

            <Animated.FlatList
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                data={post}
                refreshing={pagination.isRefreshing}
                onRefresh={onRefresh}
                ListHeaderComponent={
                    <>
                        <PostComposerComponent
                            stylesInput={{ placeholderTextColor: Color.grey3, borderWidth: 1, borderColor: Color.grey3 }}
                            isHeader={true}
                            post={post}
                            setPost={setPost}
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                        <ItemSeparatorView />
                        <StoryComponent />
                        <ItemSeparatorView />
                    </>
                }
                showsVerticalScrollIndicator={false}
                refreshControl={refreshControl}
                keyExtractor={(item, index) => item.title + index.toString()}
                renderItem={({ item }) => <PostComponent item={item} user={user} post={post} setPost={setPost} />}
                // onEndReached={onLoadMore}
                ItemSeparatorComponent={ItemSeparatorView}
                // onEndReachedThreshold={0.2}
                // initialNumToRender={4}
                contentContainerStyle={{ marginTop: CONTAINER_HEIGHT, paddingBottom: CONTAINER_HEIGHT }}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={1}
                ListFooterComponent={pagination.isLoadMore && <ActivityIndicatorIcon size="large" color={Color.blueButtonColor} />}
            />
        </Container>
    );
}

export default TestScreen;