import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

const friendsData = [
    //data smaple
    { id: '1', name: 'Friend 1', profileImage: 'https://picsum.photos/200/300' },
    { id: '2', name: 'Friend 2', profileImage: 'https://picsum.photos/200/300' },
    { id: '3', name: 'Friend 3', profileImage: 'https://picsum.photos/200/300' },
];

const Container = styled.View`
    flex: 1;
    padding: 20px;
`;

const FriendItem = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
`;

const ProfileImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
`;

const FriendName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

function FriendScreen() {
    const renderFriend = ({ item }) => (
        <FriendItem>
            <ProfileImage source={{ uri: item.profileImage }} />
            <FriendName>{item.name}</FriendName>
        </FriendItem>
    );

    return (
        <Container>
            <FlatList data={friendsData} renderItem={renderFriend} keyExtractor={(item) => item.id} />
        </Container>
    );
}

export default FriendScreen;
