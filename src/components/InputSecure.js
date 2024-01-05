import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import ButtonComponent from './ButtonComponent';
import VectorIcon from '../utils/VectorIcon';

const Container = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputTextSecure = styled(TextInput)`
    position: relative;
    width: 100%;
`;

const HiddenButton = styled(VectorIcon)`
    position: absolute;
    right: 10px;
`;

function InputSecure({ mode, placeholder, label, outlineColor, outlineStyle, underlineColor, underlineStyle, topClose, ...props }) {
    const [showClear, setShowClear] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <Container>
            <InputTextSecure
                {...props}
                mode={mode}
                placeholder={placeholder}
                label={label}
                outlineColor={outlineColor}
                outlineStyle={outlineStyle}
                underlineColor={underlineColor}
                underlineStyle={underlineStyle}
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
                            style={{ marginRight: 60, marginTop: topClose ? topClose : 0 }}
                        />
                    )
                }
            />
            {props.value && (
                <HiddenButton
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    nameIcon={showClear ? (secureTextEntry ? 'eye-outline' : 'eye-off-outline') : ''}
                    typeIcon="MaterialCommunityIcons"
                    size={28}
                    color={Color.black}
                />
            )}
        </Container>
    );
}

export default InputSecure;
