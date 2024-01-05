import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { View as MotiView, AnimatePresence } from 'moti';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import CustomButton from './CustomButton';
import Backdrop from './Backdrop';
import EmojiItem from './EmojiItem';
import Hint from './Hint';
import { images } from '../../../assets';
import Color from '../../utils/Color';

const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20%;
`;

const Box = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 180px;
    justify-content: center;
    z-index: 10;
`;

const FloatBox = styled(MotiView)`
    align-items: center;
`;

const EmojiBox = styled.View`
    flex-direction: row;
    border-radius: 33px;
    background-color: ${Color.white};
`;

const items = [
    {
        id: '0',
        emoji: images.sadGif,
        title: 'Sad',
        color: Color.yellow1,
    },
    {
        id: '1',
        emoji: images.hahaGif,
        title: 'Haha',
        color: Color.yellow1,
    },
];

const ReactionBox = ({ current, setCurrent }) => {
    const [show, setShow] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const onGesture = (event) => {
        if (
            event.nativeEvent.absoluteY >= 120 &&
            event.nativeEvent.absoluteY <= 250 &&
            event.nativeEvent.absoluteX >= 40 &&
            event.nativeEvent.absoluteX <= 170
        ) {
            setShowHint(false);
            const currentItem = Math.floor(event.nativeEvent.x / 50);
            if (currentItem >= 0 && currentItem < items.length) {
                setCurrent(currentItem);
            } else {
                setCurrent(null);
            }
        } else {
            setCurrent(null);
            setShowHint(true);
        }
    };

    const gestureEnded = () => {
        setShow(false);
        setShowHint(false);
    };

    const btnPressHandler = () => {
        setCurrent(null);
        setShow(true);
        setShowHint(false);
    };

    const onClose = () => {
        setShow(false);
        setShowHint(false);
        setCurrent(null);
    };

    const emojiPressHandler = (index) => {
        setShow(false);
        setShowHint(false);
        setCurrent(index);
    };
    const generateBoxShadowStyle = () => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 1.5,
            };
        } else {
            return {
                elevation: 10,
            };
        }
    };
    return (
        <Container>
            <AnimatePresence>
                {show && (
                    <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
                        <Box from={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <FloatBox
                                from={{ translateY: 40, opacity: 0 }}
                                animate={{ translateY: 0, opacity: 1 }}
                                exit={{ translateY: 40, opacity: 0 }}
                                transition={{ duration: 800 }}
                            >
                                <EmojiBox style={[generateBoxShadowStyle()]}>
                                    {items.map((item, index) => (
                                        <EmojiItem
                                            onPress={() => emojiPressHandler(index)}
                                            key={item.title}
                                            data={item}
                                            index={index}
                                            scaled={current === index}
                                        />
                                    ))}
                                </EmojiBox>
                            </FloatBox>
                        </Box>
                    </PanGestureHandler>
                )}
            </AnimatePresence>
            {show && <Hint hint={showHint} />}
            {show && <Backdrop onPress={onClose} />}
            {current !== '-1' ? (
                <CustomButton
                    onLongPress={btnPressHandler}
                    onPress={() => {
                        if (current !== '-1') {
                            setCurrent('-1');
                        } else {
                            setCurrent('0');
                        }
                    }}
                    // color={current === null ? '#000' : items[current].color}
                    id={items[current === null ? 0 : current]?.id}
                    text={items[current === null ? 0 : current]?.title}
                />
            ) : (
                <CustomButton onLongPress={btnPressHandler} onPress={() => setCurrent('0')} id={'-1'} />
            )}
        </Container>
    );
};

export default ReactionBox;
