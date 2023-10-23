import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import Button from './Button';

const Container = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputTextSecure = styled(TextInput)`
    flex: 9;
`;

const HiddenButton = styled(Button)`
    flex: 3;
`;

function InputSecure(props) {
    const [showClear, setShowClear] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <Container>
            <InputTextSecure
                {...props}
                secureTextEntry={secureTextEntry}
                onFocus={() => {
                    if (props.value) {
                        setShowClear(true);
                    }
                }}
                onBlur={() => {
                    setShowClear(false);
                }}
                onChangeText={(text) => {
                    props.onChangeText(text);
                    if (text) {
                        setShowClear(true);
                    } else {
                        setShowClear(false);
                    }
                }}
                right={
                    showClear && (
                        <TextInput.Icon
                            icon={props.value ? 'close' : ''}
                            onPress={() => {
                                props.onChangeText('');
                                setShowClear(false);
                                setSecureTextEntry(true);
                            }}
                        />
                    )
                }
            />
            {props.value && (
                <HiddenButton
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    title={secureTextEntry ? 'HIỂN THỊ' : 'ẨN'}
                    color={Color.black}
                    style={{ backgroundColor: Color.mainBackgroundColor }}
                />
            )}
        </Container>
    );
}

export default InputSecure;
