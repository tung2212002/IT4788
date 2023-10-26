import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';

const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.backgroundColor || Color.white};
    width: ${(props) => props.width || 100}%;
    height: ${(props) => props.height || 50}px;
`;

const Title = styled.Text`
    font-size: ${(props) => props.size || 18}px;
    font-weight: bold;
    color: ${(props) => props.color || Color.black};
`;

const Message = styled.Text`
    font-size: ${(props) => props.size || 16}px;
    color: ${(props) => props.color || Color.black};
`;

const Content = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

const Icon = styled(VectorIcon)`
    border-radius: 50px;
    background-color: ${(props) => props.backgroundColor || Color.white};
    padding: 10px;
`;

const Loading = styled.ActivityIndicator`
    margin-horizontal: auto;
    margin-right: auto;
    margin-left: auto;
`;

function ButtonIconComponent({ title, message, onPress, nameIcon, typeIcon, propsButton, propsTitle, propsMessage, propsIcon, SVGIcon, imgIcon, loading }) {
    return (
        <Container onPress={onPress} {...propsButton} disabled={loading}>
            {loading ? (
                <Loading size="small" color={Color.blueButtonColor} />
            ) : (
                <>
                    {typeIcon ? (
                        <Icon nameIcon={nameIcon} typeIcon={typeIcon} {...propsIcon} />
                    ) : SVGIcon ? (
                        <SVGIcon {...propsIcon} />
                    ) : imgIcon ? (
                        <Image source={imgIcon} {...propsIcon} />
                    ) : null}
                    <Content>
                        <Title {...propsTitle}>{title}</Title>
                        {message && <Message {...propsMessage}>{message}</Message>}
                    </Content>
                </>
            )}
        </Container>
    );
}

ButtonIconComponent.defaultProps = {
    loading: false,
};

export default ButtonIconComponent;
