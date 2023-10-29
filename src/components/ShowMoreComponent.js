/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import ButtonIconComponent from './ButtonIconComponent';

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

const ItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 3px 10px;
`;

const AnimatedView = styled(Animated.View)`
    overflow: hidden;
`;

function ShowMoreComponent({ items, showMore, maxHeight }) {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: showMore ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [showMore]);

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, maxHeight ? maxHeight : 500],
    });

    return (
        <Container>
            <AnimatedView style={{ maxHeight: heightInterpolate }}>
                {items.map((item, index) => (
                    <ItemContainer key={index}>
                        <ButtonIconComponent SVGIcon={item.SVGIcon} title={item.title} key={index} propsIcon={{ width: 30, height: 30 }} isShadow={true} />
                    </ItemContainer>
                ))}
            </AnimatedView>
        </Container>
    );
}

export default ShowMoreComponent;
