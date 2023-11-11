/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import ButtonIconComponent from './ButtonIconComponent';
import Color from '../utils/Color';

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    position: absolute;
    background-color: ${(props) => props.backgroundColor || Color.white};
    border-radius: 10px;
    border: 1px solid ${Color.lightGray};
    z-index: 102;
    top: ${(props) => props.top || 0}px;
`;

const ItemContainer = styled.View`
    flex-direction: row;
    padding: 3px 10px;
`;

const AnimatedView = styled(Animated.View)`
    overflow: hidden;
`;

function SelectComponent({ items, showMore, maxHeight, propsButton, propsIcon, propsTitle, ...props }) {
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
        <Container {...props}>
            <AnimatedView style={{ maxHeight: heightInterpolate }}>
                {items.map((item, index) => (
                    <ItemContainer key={index}>
                        <ButtonIconComponent
                            nameIcon={item.nameIcon}
                            typeIcon={item.typeIcon}
                            title={item.title}
                            onPress={item.onPress}
                            key={index}
                            propsButton={propsButton}
                            propsIcon={propsIcon}
                            propsTitle={propsTitle}
                            {...props}
                        />
                    </ItemContainer>
                ))}
            </AnimatedView>
        </Container>
    );
}

export default SelectComponent;
