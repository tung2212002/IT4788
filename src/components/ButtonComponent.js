import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Platform } from 'react-native';

import Color from '../utils/Color';

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

function ButtonComponent({ title, onPress, style = {}, color, size, loading, isShadow }) {
    const generateBoxShadowStyle = () => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
            };
        } else {
            return {
                elevation: 6,
            };
        }
    };

    return (
        <Container onPress={onPress} style={[style, isShadow ? generateBoxShadowStyle() : {}]} disabled={loading}>
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
