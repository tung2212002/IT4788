import React, { useState } from 'react';
import styled from 'styled-components/native';

import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-bottom: 50px;
    background-color: ${Color.mainBackgroundColor};
`;

const Body = styled.View`
    width: 100%;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-top: 50px;
`;

const Input = styled.View`
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const InputValue = styled(TextInputComponent)`
    width: 100%;
    height: 60px;
    font-size: 18px;
    background-color: ${Color.mainBackgroundColor};
`;

const Error = styled.Text`
    color: ${Color.red};
    margin-vertical: 10px;
    font-size: 16px;
`;

const ViewError = styled.View`
    width: 100%;
    height: 60px;
    align-items: center;
`;

const ButtonEmail = styled(ButtonComponent)`
    margin-top: 10px;
    position: absolute;
    bottom: 0;
`;

function PhoneRegisterScreen({ route, navigation }) {
    const [numberPhone, setNumberphone] = useState('');
    const [error, setError] = useState('');

    const regex = /^[0-9]{10}$/;

    const checkPhone = () => {
        if (numberPhone === '') {
            setError('Vui lòng nhập Số điện thoại');
        } else if (!regex.test(numberPhone)) {
            setError('Số điện thoại không hợp lệ');
        } else {
            navigation.navigate('PasswordRegisterScreen', { ...route.params, numberPhone });
        }
    };

    return (
        <Container>
            <Body>
                <Title>Nhập Số điện thoại của bạn</Title>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                <Input>
                    <InputValue
                        keyboardType={'number-pad'}
                        label={'Số điện thoại'}
                        placeholder={'Số điện thoại'}
                        value={numberPhone}
                        error={error}
                        onChangeText={(text) => {
                            setError('');
                            setNumberphone(text);
                        }}
                    />
                </Input>
            </Body>
            <ButtonComponent onPress={checkPhone} title={'Tiếp'} />
            <ButtonEmail
                onPress={() => {
                    setError('');
                    navigation.navigate('EmailRegisterScreen', route.params);
                }}
                title={'Sử dụng Email'}
                style={{ backgroundColor: Color.mainBackgroundColor }}
                color={Color.blueButtonColor}
            />
        </Container>
    );
}

export default PhoneRegisterScreen;
