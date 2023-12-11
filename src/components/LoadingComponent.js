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

const ModalContainer = styled.Modal`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ContainerItem = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => `rgba(1, 1, 1, ${props.alpha})`};
`;

const Box = styled.View`
    width: 80%;
    height: 130px;
    border-radius: 10px;
    background-color: ${Color.black};
    opacity: ${(props) => props.alpha || 0.8};
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text`
    margin-top: 20px;
    font-size: ${(props) => props.size || 18}px;
    font-family: Roboto-Bold;
    color: ${(props) => props.color || Color.white};
`;

function LoadingComponent({
    alpha = 0.3,
    visible = false,
    transparent = true,
    coverScreen = true,
    animationType = 'fade',
    message = 'Loading...',
    propsMessage,
    propsBox,
}) {
    return (
        <Container>
            <ModalContainer visible={visible} transparent={transparent} coverScreen={coverScreen} animationType={animationType} alpha={alpha}>
                <ContainerItem alpha={alpha}>
                    <Box style={propsBox}>
                        <ActivityIndicator size="large" color={Color.white} />
                        <Text style={propsMessage}>{message}</Text>
                    </Box>
                </ContainerItem>
            </ModalContainer>
        </Container>
    );
}

export default LoadingComponent;
