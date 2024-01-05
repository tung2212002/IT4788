import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

function TextInputComponent(props) {
    const [showClear, setShowClear] = useState(false);
    return (
        <TextInput
            {...props}
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
                        }}
                        style={{ marginTop: props.topClose ? props.topClose : 0 }}
                    />
                )
            }
        />
    );
}

export default TextInputComponent;
