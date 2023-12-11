import React from 'react';
import styled from 'styled-components/native';
import VectorIcon from '../utils/VectorIcon';

import { images } from '../../assets';
import Color from '../utils/Color';

const Container = styled.FlatList`
    flex: 1;
    background-color: ${Color.white};
`;

const Item = styled.Pressable`
    width: 30%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
`;

const ImageItem = styled.Image`
    width: 100%;
    height: 100%;
`;

const ContainerAvatar = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
`;

const Name = styled.Text`
    font-size: 16px;
    font-family: Roboto-Bold;
    margin-left: 10px;
`;

const StoryComponent = ({ data }) => {
    const renderItem = ({ item }) => {
        return (
            <Item>
                <ContainerAvatar>
                    <Avatar source={images.avatar} />
                </ContainerAvatar>
                <Name>{item.name}</Name>
            </Item>
        );
    };

    return <Container data={data} renderItem={renderItem} horizontal={true} />;
};

export default StoryComponent;
