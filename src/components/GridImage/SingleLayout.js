import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';

const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;

const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: ${HEIGHT_DEVICE}px;
    padding-vertical: 8px;
`;

const StyledImage = styled.Image`
    width: ${WIDTH_DEVICE - 6}px;
    max-height: ${HEIGHT_DEVICE / 2}px;
    height: 100%;
    resize-mode: cover;
`;

function SingleLayout({ item, setModal, setNumberOut, headers }, ref) {
    console.log('itemssingle', item);
    const handleScrollTo = () => {
        ref.current.scrollTo({
            x: Dimensions.get('window').width,
            y: 0,
            animated: false,
        });
    };

    return (
        <Container>
            <Pressable
                onPress={() => {
                    setModal({ visible: true, data: 0 });
                    setNumberOut(1);
                    setTimeout(() => {
                        handleScrollTo();
                    }, 1);
                }}
            >
                <StyledImage
                    source={{
                        uri: item.url,
                        ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                    }}
                />
            </Pressable>
        </Container>
    );
}

export default forwardRef(SingleLayout);
