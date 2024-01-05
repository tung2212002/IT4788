import React from 'react';
import styled from 'styled-components/native';

import VectorIcon from '../utils/VectorIcon';
import Color from '../utils/Color';
import { Dimensions } from 'react-native';

const Container = styled.View`
    flex: 1;
    padding-horizontal: 15px;
    margin-top: ${Dimensions.get('window').height * 0.15}px;
`;

const Header = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding-horizontal: 10px;
    padding-vertical: 10px;
    flex-wrap: wrap;
`;

const Label = styled.Text`
    font-size: 16px;
    color: ${Color.grey1};
    flex: 1;
    margin-left: 3px;
    font-family: 'Roboto-Bold';
`;

const LabelFriend = styled.Text`
    font-size: 20px;
    color: ${Color.grey1};
    font-family: 'Roboto-Regular';
`;

const Friend = styled.Text`
    font-size: 20px;
    color: ${Color.black};
    margin-left: 3px;
    font-family: 'Roboto-Bold';
`;

const Descreption = styled.Text`
    font-size: 16px;
    color: ${Color.grey1};
    font-family: 'Roboto-Regular';
`;

const VectorIconView = styled(VectorIcon)`
    width: 30px;
    height: 20px;
`;

function BioProfileComponent({ user, friends }) {
    const items = [
        {
            id: 1,
            title: 'Học Khoa học máy tính (IT1) tại',
            description: 'Đại học Bách Khoa Hà Nội - HaNoi University of Science and Technology',
            nameIcon: 'graduation-cap',
            typeIcon: 'FontAwesome',
            type: 'school',
        },
        {
            id: 2,
            title: 'Học tại',
            description: 'Đại học Bách Khoa Hà Nội - HaNoi University of Science and Technology',
            nameIcon: 'graduation-cap',
            typeIcon: 'FontAwesome',
            type: 'school',
        },
        {
            id: 3,
            title: 'Sống tại',
            description: 'Hà Nội',
            nameIcon: 'ios-home',
            typeIcon: 'Ionicons',
            type: 'address',
        },
    ];

    return (
        <Container>
            <Header>
                <Friend>{friends?.total}</Friend>
                <LabelFriend> bạn bè</LabelFriend>
            </Header>

            {items.map((item, index) => {
                return (
                    <Header key={item.id}>
                        <VectorIconView nameIcon={item.nameIcon} typeIcon={item.typeIcon} size={20} color={Color.grey2} />
                        <Descreption>{item.title}</Descreption>
                        <Label numberOfLines={1} ellipsizeMode="tail">
                            {user[item.type] ? user[item.type] : item.description}
                        </Label>
                    </Header>
                );
            })}
        </Container>
    );
}

export default BioProfileComponent;
