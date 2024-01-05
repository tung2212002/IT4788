import React from 'react';
import { View as MotiView } from 'moti';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../utils/Color';

const Container = styled(MotiView)`
    position: absolute;
    bottom: 0;
    background-color: ${Color.backGroundTransparent};
    justify-content: center;
    z-index: 9;
    width: 100%;
    height: 56px;
`;

export default function Hint({ hint }) {
    return (
        <Container
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={[
                !hint && {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                },
            ]}
        >
            {hint ? (
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Release to cancel</Text>
            ) : (
                Array.from({ length: 10 }).map((_, index) => <View key={index} style={{ width: 5, height: 5, backgroundColor: '#eee' }} />)
            )}
        </Container>
    );
}
