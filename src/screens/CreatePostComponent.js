import React, { useState } from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import { TextInput } from 'react-native';

const Container = styled.View`
    background-color: ${Color.white};
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

function CreatePostScreen({ route, navigation }) {
    const isCreatePost = route.params?.isCreatePost;
    const setIsCreatePost = route.params?.setIsCreatePost;
    const [input, setInput] = useState('');

    const handleCreatePost = () => {
        setIsCreatePost(false);
    };

    const handleCancelCreatePost = () => {
        setIsCreatePost(false);
    };

    const handleInput = (text) => {
        if (text.length > 0) {
            setIsCreatePost(true);
        } else {
            setIsCreatePost(false);
        }
        setInput(text);
    };

    return (
        <Container>
            <TextInput placeholder="What's on your mind?" onChangeText={(text) => handleInput(text)} value={input} />
        </Container>
    );
}

export default CreatePostScreen;
