import React from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import { ActivityIndicator } from 'react-native';

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${Color.blueButtonColor};
`;

const Title = styled.Text`
    font-size: ${(props) => props.size || 18}px;
    font-weight: bold;
    color: ${(props) => props.color || Color.white};
`;

function ButtonComponent({ title, onPress, style = {}, color, size, loading }) {
    return (
        <Container onPress={onPress} style={style} disabled={loading}>
            {!loading ? (
                <Title color={color} size={size}>
                    {title}
                </Title>
            ) : (
                <ActivityIndicator size="small" color={Color.white} />
            )}
        </Container>
    );
}

export default ButtonComponent;
