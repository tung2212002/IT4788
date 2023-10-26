import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';

import Color from '../utils/Color';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => `rgba(1, 1, 1, ${props.alpha})`};
`;

function LoadingScreen({ alpha = 0.7 }) {
    return (
        <Container alpha={alpha}>
            <ActivityIndicator size="large" color={Color.blueButtonColor} />
        </Container>
    );
}

export default LoadingScreen;
