/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, Animated, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import HeaderApp from '../../components/HeaderApp';
import PostComponent from '../../components/PostComponent';
import PostComposerComponent from '../../components/PostComposerComponent';
import Color from '../../utils/Color';
import CreatePostScreen from '../CreatePostScreen';
import fakeItems from '../../constants/fakeData';
import { selectUser } from '../../redux/features/auth/authSlice';

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${Color.mainBackgroundHome};
`;

const ActivityIndicatorIcon = styled.ActivityIndicator``;

const AnimatedHeader = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;

const CONTAINER_HEIGHT = 60;

function HomeScreen({ route, navigation }) {
    const user = useSelector(selectUser);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const platform = Platform.OS === 'ios' ? true : false;

    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;

    const Refresh = styled.View`
        width: 100%;
        height: ${CONTAINER_HEIGHT}px;
        background-color: ${Color.white};
        justify-content: center;
        align-items: center;
        z-index: 100;
        margin-top: ${platform ? 0 : -60}px;
    `;
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

    const handleRefresh = () => {
        !platform && setIsRefreshing(true);
        setTimeout(() => {
            platform ? setRefreshing(false) : setIsRefreshing(false);
        }, 4000);
    };

    const handleLoadMore = () => {
        setTimeout(() => {
            setIsLoadMore(true);
        }, 4000);
    };

    const refreshControl =
        Platform.OS === 'ios' ? null : <RefreshControl refreshing={isRefreshing} progressViewOffset={CONTAINER_HEIGHT} onRefresh={handleRefresh} />;

    var _clampedScrollValue = 0;
    var _offsetValue = 0;
    var _scrollValue = 0;

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const absoluteScrollY = value < 0 ? 0 : value;
            if (value <= -CONTAINER_HEIGHT) {
                setRefreshing(true);
                handleRefresh();
            }
            const diff = absoluteScrollY - _scrollValue;
            _scrollValue = absoluteScrollY;
            _clampedScrollValue = Math.min(Math.max(_clampedScrollValue + diff, 0), CONTAINER_HEIGHT);
        });

        offsetAnim.addListener(({ value }) => {
            _offsetValue = value;
        });
    }, []);

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
        // console.log('scrollY', scrollY);
    }, [scrollY]);

    return (
        <Container>
            <>
                <AnimatedHeader style={[{ transform: [{ translateY: headerTranslate }] }]}>
                    <HeaderApp style={{ opacity }} />
                </AnimatedHeader>
                <Animated.FlatList
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    data={fakeItems}
                    ListHeaderComponent={
                        <>
                            {refreshing && (
                                <Refresh>
                                    <ActivityIndicatorIcon size="large" color={Color.blueButtonColor} />
                                </Refresh>
                            )}
                            <PostComposerComponent
                                navigation={navigation}
                                stylesInput={{ borderWidth: 2, borderColor: Color.lightGray, placeholderTextColor: Color.black }}
                                isHeader={false}
                                setShowCreatePost={setShowCreatePost}
                            />
                        </>
                    }
                    keyExtractor={(item, index) => item.title + index.toString()}
                    renderItem={({ item }) => <PostComponent item={item} user={user} />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={4}
                    refreshControl={refreshControl}
                    contentContainerStyle={{ paddingTop: CONTAINER_HEIGHT }}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    onScrollEndDrag={onScrollEndDrag}
                    scrollEventThrottle={1}
                    ListFooterComponent={isLoadMore && <ActivityIndicatorIcon size="large" color={Color.blueButtonColor} />}
                />
            </>
            {showCreatePost && <CreatePostScreen navigation={navigation} setShowCreatePost={setShowCreatePost} showCreatePost={showCreatePost} user={user} />}
        </Container>
    );
}

export default HomeScreen;
