import React from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';

const Container = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${Color.white};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
    opacity: 1.8;
`;
const ListIcon = styled.View`
    flex-direction: row;
    align-items: center;
`;
const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${Color.black};
    margin: 10px;
`;

const ButtonIcon = styled(VectorIcon)`
    padding: 6px;
    margin-horizontal: 5px;
    border-radius: 50px;
    background-color: ${Color.lightGray};
`;

function HeaderScreen({title, listItems}){
    return (
        <Container>
            <Title>{title}</Title>
            <ListIcon>
                {listItems.map((item, index) => (
                    <ButtonIcon key={index} nameIcon={item.nameIcon} typeIcon={item.typeIcon} size={25} color={Color.black} />
                ))}
            </ListIcon>
        </Container>
    );
}

export default HeaderScreen;