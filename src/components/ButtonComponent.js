import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Platform } from 'react-native';

import Color from '../utils/Color';

const Container = styled.TouchableOpacity`
    width: ${(props) => (props.width === 'auto' ? 'auto' : (props.width || 100) + '%')};
    height: ${(props) => (props.height === 'auto' ? 'auto' : (props.height || 50) + 'px')};
    background-color: ${(props) => props.backgroundColor || Color.blueButtonColor};
    border-radius: ${(props) => props.borderRadius || 10}px;
    justify-content: ${(props) => props.justifyContent || 'center'};
    align-items: ${(props) => props.alignItems || 'center'};
    padding: ${(props) => props.padding || 10}px;
    margin-right: ${(props) => (props.marginRight === 'auto' ? 'auto' : props.marginRight ? props.marginRight + 'px' : '10px')};
    margin-left: ${(props) => (props.marginLeft === 'auto' ? 'auto' : props.marginLeft ? props.marginLeft + 'px' : '10px')};
    margin-top: ${(props) => props.marginTop || '10'}px;
    margin-bottom: ${(props) => props.marginBottom || '10'}px;
`;

const Title = styled.Text`
    font-size: ${(props) => props.size || 18}px;
    color: ${(props) => props.color || Color.white};
    font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'OpenSans-SemiBold')};
`;

function ButtonComponent({ title, onPress, style = {}, color, size, loading, fontWeight, fontFamily, isShadow, ...props }) {
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
        <Container onPress={onPress} style={[style, isShadow ? generateBoxShadowStyle() : {}]} disabled={loading} {...props}>
            {!loading ? (
                <Title color={color} size={size} fontWeight={fontWeight} fontFamily={fontFamily}>
                    {title}
                </Title>
            ) : (
                <ActivityIndicator size="small" color={Color.white} />
            )}
        </Container>
    );
}

export default ButtonComponent;
