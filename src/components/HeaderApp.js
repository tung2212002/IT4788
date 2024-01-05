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

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 57px;
    padding: 10px;
    background-color: ${Color.white};
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: 'Roboto-Bold';
    flex: 1;
    align-items: center;
`;

const Icon = styled(VectorIcon)`
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 6px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin-left: 10px;
`;

function HeaderApp({ navigation, opacity, title, listItem }) {
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

    return title ? (
        <Header>
            <Title>{title}</Title>
            {listItem.map((item, index) => (
                <Icon key={index} nameIcon={item.nameIcon} typeIcon={item.typeIcon} size={22} color={Color.black} />
            ))}
        </Header>
    ) : (
        <Container style={{ opacity: opacity }}>
            <SVGLogo width={170} height={60} onPress={handleClickIcon} />
            <ListIcon>
                {listItems.map((item, index) => (
                    <ButtonIcon key={index} nameIcon={item.nameIcon} typeIcon={item.typeIcon} size={22} color={Color.black} />
                ))}
            </ListIcon>
        </Container>
    );
}

export default HeaderApp;
