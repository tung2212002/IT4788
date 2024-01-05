/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import HeaderApp from '../../components/HeaderApp';
import Color from '../../utils/Color';
import { selectUser } from '../../redux/features/auth/authSlice';
import { getListVideosService } from '../../services/postService';
import { getLocationStorage } from '../../utils/locationStorage';
import PostVideoComponent from '../../components/PostComponent/PostVideoComponent';

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

const CONTAINER_HEIGHT = 60;

function VideoDarkThemeScreen({ route, navigation }) {
    const { id } = route.params;
    const count = 10;

    const user = useSelector(selectUser);
    const [location, setLocation] = useState(null);
    const [post, setPost] = useState(null);
    const [pagination, setPagination] = useState({
        index: 0,
        lastId: 0,
        isRefreshing: false,
        isLoadMore: false,
    });

    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;

    const listItem = [
        {
            nameIcon: 'settings-sharp',
            typeIcon: 'Ionicons',
        },
        {
            nameIcon: 'search',
            typeIcon: 'FontAwesome5',
        },
    ];

    const onRefresh = () => {
        console.log('refresh....');
        // setPost([]);
        setPagination({ ...pagination, isRefreshing: true, index: 0 });
    };

    const onLoadMore = () => {
        if (!pagination.lastId || pagination.isRefreshing) {
            return;
        }
        console.log('load more....');
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
        getListVideosService(data)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data.post?.length !== 0 && response.data.data?.last_id !== pagination.lastId) {
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length + pagination.index,
                            isLoadMore: false,
                        });
                        setPost((prev) => [...prev, ...response.data.data.post]);
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
        getListVideosService(data)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data.post.length !== 0 && response.data.data.last_id !== pagination.lastId) {
                        setPost(response.data.data.post);
                        setPagination({
                            ...pagination,
                            lastId: response.data.data.last_id,
                            index: response.data.data.post.length,
                            isRefreshing: false,
                        });
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
                        in_campaign: '1',
                        campaign_id: '1',
                        latitude: res.latitude,
                        longitude: res.longitude,
                        index: pagination.index,
                        count: count,
                    };

                    getListVideosService(data)
                        .then((response) => {
                            if (response.data.code === '1000') {
                                if (response.data.data.post.length !== 0) {
                                    setPagination({ ...pagination, lastId: response.data.data.last_id, index: response.data.data.post.length });
                                    setPost(response.data.data.post);
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
                <HeaderApp style={{ opacity }} title={'Video'} listItem={listItem} />
            </AnimatedHeader>

            <Animated.FlatList
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                data={post}
                refreshing={pagination.isRefreshing}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                refreshControl={refreshControl}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => <PostVideoComponent item={item} user={user} navigation={navigation} post={post} setPost={setPost} />}
                onEndReached={onLoadMore}
                ItemSeparatorComponent={ItemSeparatorView}
                onEndReachedThreshold={0}
                initialNumToRender={10}
                contentContainerStyle={{ marginTop: CONTAINER_HEIGHT, paddingBottom: CONTAINER_HEIGHT }}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={1}
                ListFooterComponent={<Footer>{pagination.isLoadMore && <ActivityIndicatorIcon size={30} color={Color.blueButtonColor} />}</Footer>}
                ListFooterComponentStyle={{ marginVertical: 15 }}
            />
        </Container>
    );
}

export default VideoDarkThemeScreen;
