import React from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import { SVGLogo } from '../../assets';

const Container = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${Color.white};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
`;

const ListIcon = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ButtonIcon = styled(VectorIcon)`
    padding: 6px;
    margin-horizontal: 5px;
    border-radius: 50px;
    background-color: ${Color.lightGray};
`;

function HeaderApp({ navigation, opacity }) {
    const listItems = [
        {
            nameIcon: 'plus',
            typeIcon: 'Entypo',
        },
        {
            nameIcon: 'search',
            typeIcon: 'FontAwesome',
        },
        {
            nameIcon: 'facebook-messenger',
            typeIcon: 'MaterialCommunityIcons',
        },
    ];

    const handleClickIcon = () => {
        console.log('click icon');
    };

    return (
        <Container style={{ opacity: opacity }}>
            <SVGLogo width={170} height={60} onPress={handleClickIcon} />
            <ListIcon>
                {listItems.map((item, index) => (
                    <ButtonIcon key={index} nameIcon={item.nameIcon} typeIcon={item.typeIcon} size={25} color={Color.black} />
                ))}
            </ListIcon>
        </Container>
    );
}

export default HeaderApp;
