/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import HeaderApp from '../../components/HeaderApp';
import PostComponent from '../../components/PostComponent/PostComponent';
import PostComposerComponent from '../../components/PostComposerComponent';
import Color from '../../utils/Color';
import { selectUser } from '../../redux/features/auth/authSlice';
import { getListPostsService } from '../../services/postService';
import { getLocationStorage } from '../../utils/locationStorage';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';

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

function PersionalScreen({ route, navigation }) {
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
    const ref = useRef(null);

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

    return (
        <Container>
            <AnimatedHeader style={[{ transform: [{ translateY: headerTranslate }] }]}>
                <HeaderComponent style={{ opacity }} />
            </AnimatedHeader>

            <Animated.FlatList
                ref={ref}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                ListHeaderComponent={
                    <>
                        <ItemSeparatorView />
                    </>
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparatorView}
                onEndReachedThreshold={0}
                initialNumToRender={10}
                contentContainerStyle={{ marginTop: 10 * CONTAINER_HEIGHT, paddingBottom: CONTAINER_HEIGHT }}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={1}
            />
        </Container>
    );
}

export default PersionalScreen;
