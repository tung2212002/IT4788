import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';

const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;

const StyledUnit = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-height: ${HEIGHT_DEVICE / 2}px;
    padding-vertical: 8px;
`;

const StyledImage = styled.Image`
    width: ${WIDTH_DEVICE - 6}px;
    max-height: ${HEIGHT_DEVICE / 4}px;
    height: 100%;
    resize-mode: cover;
`;

function DualLayout({ items, setModal, setNumberOut, headers }, ref) {
    console.log('itemsgr2', items);
    const handleScrollTo = (index) => {
        ref.current.scrollTo({
            x: Dimensions.get('window').width * index,
            y: 0,
            animated: false,
        });
    };

    return (
        <StyledUnit>
            {items.map((item, index) => (
                <Pressable
                    style={{ padding: 3 }}
                    key={index}
                    // onPress={() => {
                    //     setModal({ visible: true, data: index });
                    //     setNumberOut(index + 1);
                    //     setTimeout(() => {
                    //         handleScrollTo(index);
                    //     }, 1);
                    // }}
                >
                    <StyledImage
                        source={{
                            uri: item.url,
                            ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                        }}
                    />
                </Pressable>
            ))}
        </StyledUnit>
    );
}

export default forwardRef(DualLayout);
