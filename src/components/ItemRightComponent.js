import React from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';

const Container = styled.View`
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ItemButton = styled(VectorIcon)`
    margin: 0 20px 0 0;
    padding: 5px;
`;

const ItemRightComponent = ({ items }) => {
    console.log('items', items);
    return (
        <Container>
            {items.map((item, index) => (
                <ItemButton
                    key={index}
                    nameIcon={item.nameIcon}
                    typeIcon={item.typeIcon}
                    size={20}
                    color={Color.black}
                    onPress={item.onPress}
                    style={item.style}
                />
            ))}
        </Container>
    );
};

export default ItemRightComponent;
