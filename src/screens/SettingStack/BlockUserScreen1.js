import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

import Color from '../../utils/Color';
import { Pressable, TextInput } from 'react-native';
import VectorIcon from '../../utils/VectorIcon';
import ButtonIconComponent from '../../components/ButtonIconComponent';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
    z-index: 10;
`;

const Header = styled.View`
    top: 0;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const BodyPosition = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${Color.lightBlue};
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'Roboto-Medium';
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 30px;
`;

const TextInputHeader = styled(TextInput)`
    flex: 1;
    height: 40px;
    border-width: 1px;
    border-color: ${Color.lightGray};
    padding-left: 10px;
`;

function BlockUserScreen({ navigation }) {
    // show input from right to left
    const inputRef = useRef(null);
    const [showInput, setShowInput] = useState(false);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <Container>
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} style={{ marginLeft: 10 }} />
                </Pressable>
                <Title>Chặn</Title>
            </Header>
            <BodyPosition style={{ zIndex: showInput ? 100 : -1 }}>
                <TextInputHeader placeholder="Tìm kiếm" ref={inputRef} onFocus={() => setShowInput(true)} onBlur={() => setShowInput(false)} />
                <Title>Chặn</Title>
            </BodyPosition>
            <ButtonIconComponent
                title="THÊM VÀO DANH SÁCH CHẶN"
                nameIcon="plus"
                typeIcon="FontAwesome"
                propsIcon={{ color: Color.white, size: 12, backgroundColor: Color.gray }}
                propsTitle={{ color: Color.white, size: 16 }}
                propsButton={{ backgroundColor: Color.gray, width: 95, marginRight: 10, marginLeft: 10, position: 'absolute', bottom: 50 }}
                onPress={focusInput}
            />
        </Container>
    );
}

export default BlockUserScreen;
