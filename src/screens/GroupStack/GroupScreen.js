import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

import GridImageView from '../../components/GridImageView ';
import { Button } from 'react-native-paper';
import { useEffect } from 'react';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding-horizontal: 20px;
    padding-vertical: 50px;
`;

function GroupScreen() {
    return (
        <Container>
            <Text>GroupScreen</Text>
        </Container>
    );
}

export default GroupScreen;
