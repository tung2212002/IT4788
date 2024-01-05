import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { View as MotiView, AnimatePresence, useAnimationState } from 'moti';
import styled from 'styled-components/native';

const Container = styled.Pressable`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
`;

const TitleBox = styled(MotiView)`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.24);
    top: -50px;
    width: 60px;
    padding-horizontal: 8px;
    padding-vertical: 4px;
    border-radius: 16px;
`;

const Title = styled.Text`
    text-transform: capitalize;
    font-size: 16px;
    color: #fff;
    text-align: center;
`;

const Emoji = styled.Image`
    width: 40px;
    height: 40px;
`;

export default function EmojiItem({ data, index, scaled, ...rest }) {
    const animatedState = useAnimationState({
        scaleIn: {
            scale: 1.6,
        },
        scaleOut: {
            scale: 1,
        },
    });

    useEffect(() => {
        animatedState.transitionTo(scaled ? 'scaleIn' : 'scaleOut');
    }, [scaled]);

    return (
        <Container {...rest}>
            <AnimatePresence exitBeforeEnter>
                {scaled && (
                    <TitleBox from={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <Title>{data.title}</Title>
                    </TitleBox>
                )}
            </AnimatePresence>
            <MotiView
                from={{ transform: [{ translateY: 40 }, { scale: 1 }] }}
                animate={{ transform: [{ translateY: 0 }, { scale: 1 }] }}
                exit={{
                    transform: [{ translateY: 40 }, { scale: ((1 / 6) * index) / 10 }],
                }}
                transition={{ delay: (index + 1) * 50 }}
            >
                <MotiView state={animatedState}>
                    <Emoji source={data.emoji} />
                </MotiView>
            </MotiView>
        </Container>
    );
}
