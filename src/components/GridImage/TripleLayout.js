import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';

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

const Button = styled.Pressable`
    paddinghorizontal: 3px;
    paddingvertical: 8px;
`;

const StyledImage = styled.Image`
    width: ${(WIDTH_DEVICE * 2) / 3 - 6}px;
    max-height: ${HEIGHT_DEVICE * 0.6}px;
    height: 100%;
    resize-mode: cover;
`;

const StyledImage1 = styled.Image`
    width: ${WIDTH_DEVICE / 3 - 6}px;
    max-height: ${(HEIGHT_DEVICE * 0.6) / 2 - 1}px;
    height: 100%;
    resize-mode: cover;
`;

const StyledUnit = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: ${HEIGHT_DEVICE / 2 - 5}px;
    max-width: ${WIDTH_DEVICE / 3}px;
`;

function TripleLayout({ items, setModal, setNumberOut, headers }, ref) {
    console.log('itemsgrtriple', items);
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

    return (
        <Container>
            <Button
            // onPress={() => {
            //     setModal({ visible: true, data: 0 });
            //     setNumberOut(1);
            //     setTimeout(() => {
            //         handleScrollTo1();
            //     }, 1);
            // }}
            >
                <StyledImage
                    source={{
                        uri: items[0].url,
                        ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                    }}
                />
            </Button>
            <StyledUnit>
                {items.slice(1, 3).map((item, index) => (
                    <Pressable
                        style={{ padding: 1 }}
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
            </StyledUnit>
        </Container>
    );
}

export default forwardRef(TripleLayout);
