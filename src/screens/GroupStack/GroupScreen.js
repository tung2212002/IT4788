import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

import GridImageView from '../../components/GridImageView ';
import { Button } from 'react-native-paper';
import { useEffect } from 'react';
import SearchScreen from '../SearchStack/SearchScreen';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding-horizontal: 20px;
    padding-vertical: 50px;
`;

function GroupScreen() {
    return (
        <SearchScreen></SearchScreen>
    );
}

export default GroupScreen;
