import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';

import Color from '../../utils/Color';

const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;

const Container = styled.View`
    flex: 1;
    flex-direction: row;
    max-height: ${HEIGHT_DEVICE * 0.6}px;
    max-width: ${WIDTH_DEVICE}px;
    justify-content: center;
    align-items: center;
`;

const StyledUnit = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: ${HEIGHT_DEVICE / 2 - 4}px;
    max-width: ${WIDTH_DEVICE / 3}px;
`;

const MoreImage = styled.View`
    position: absolute;
    align-self: center;
    align-items: center;
    justify-content: center;
    background-color: ${Color.black};
    height: 100%;
    width: 100%;
    opacity: 0.8;
`;

const NumberMore = styled.Text`
    color: ${Color.white};
    font-size: 24px;
    font-family: 'Roboto-Medium';
`;

const StyledImage = styled.Image`
    width: ${(WIDTH_DEVICE * 2) / 3 - 6}px;
    max-height: ${HEIGHT_DEVICE * 0.6}px;
    height: 100%;
    resize-mode: cover;
`;

const StyledImage1 = styled.Image`
    width: ${WIDTH_DEVICE / 3 - 6}px;
    max-height: ${HEIGHT_DEVICE * 0.2 - 2}px;
    height: 100%;
    resize-mode: cover;
`;

function MultipleLayout({ items, setModal, setNumberOut, headers }, ref) {
    console.log('itemsgrmultiple', items);
    const handleScrollTo1 = () => {
        ref.current.scrollTo({
            x: 0,
            y: 0,
            animated: false,
        });
    };

    const handleScrollTo2 = (index) => {
        ref.current.scrollTo({
            x: Dimensions.get('window').width * (index + 1),
            y: 0,
            animated: false,
        });
    };

    const handleScrollTo3 = () => {
        ref.current.scrollTo({
            x: Dimensions.get('window').width * 3,
            y: 0,
            animated: false,
        });
    };

    return (
        <Container>
            <Pressable
                style={{ paddingHorizontal: 0, paddingVertical: 1 }}
                onPress={() => {
                    setModal({ visible: true, data: 0 });
                    setNumberOut(1);
                    setTimeout(() => {
                        handleScrollTo1();
                    }, 1);
                }}
            >
                <StyledImage
                    source={{
                        uri: items[0].url,
                        ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                    }}
                />
            </Pressable>
            <StyledUnit>
                {items.slice(1, 3).map((item, index) => (
                    <Pressable
                        style={{ paddingHorizontal: 4, paddingVertical: 1 }}
                        key={index}
                        // onPress={() => {
                        //     setModal({ visible: true, data: index + 1 });
                        //     setNumberOut(index + 2);
                        //     setTimeout(() => {
                        //         handleScrollTo2(index);
                        //     }, 1);
                        // }}
                    >
                        <StyledImage1
                            source={{
                                uri: item.url,
                                ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                            }}
                        />
                    </Pressable>
                ))}
                <Pressable
                    style={{ paddingHorizontal: 4, paddingVertical: 1 }}
                    // onPress={() => {
                    //     setModal({ visible: true, data: 3 });
                    //     setNumberOut(4);
                    //     setTimeout(() => {
                    //         handleScrollTo3();
                    //     }, 1);
                    // }}
                >
                    <StyledImage1
                        source={{
                            uri: items[3].url,
                            ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                        }}
                    />

                    <MoreImage>
                        <NumberMore>{`+${items.length - 3}`}</NumberMore>
                    </MoreImage>
                </Pressable>
            </StyledUnit>
        </Container>
    );
}

export default forwardRef(MultipleLayout);
