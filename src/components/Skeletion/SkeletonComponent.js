import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

import Color from '../../utils/Color';

const Container = styled.View`
    background-color: ${Color.skeletion1};
    overflow: hidden;
`;

const LinearGradientView = styled(LinearGradient)`
    width: 100%;
    height: 100%;
`;

function SkeletonComponent({ width, height, style }) {
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                duration: 2000,
                useNativeDriver: true,
            }),
        ).start();
    }, []);
    return (
        <Container style={[{ width: width, height: height }, style]}>
            <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateX: translateX }] }}>
                <LinearGradientView colors={['transparent', Color.skeletion2, 'transparent']} start={{ x: 1, y: 1 }} />
            </Animated.View>
        </Container>
    );
}

export default SkeletonComponent;
