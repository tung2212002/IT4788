import React, { useState } from 'react';
import styled from 'styled-components/native';

import TextInputComponent from '../../components/TextInputComponent';
import Button from '../../components/Button';
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

const ButtonPhone = styled(Button)`
    margin-top: 10px;
    position: absolute;
    bottom: 0;
`;

function EmailRegister({ route, navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const checkEmail = () => {
        if (email === '') {
            setError('Vui lòng nhập email');
        } else if (!regex.test(email)) {
            setError('Email không hợp lệ');
        } else {
            navigation.navigate('PasswordRegister', { ...route.params, email });
        }
    };

    return (
        <Container>
            <Body>
                <Title>Nhập địa chỉ email của bạn</Title>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                <Input>
                    <InputValue
                        label={'Địa chỉ email'}
                        placeholder={'Địa chỉ email'}
                        value={email}
                        error={error}
                        onChangeText={(text) => {
                            setError('');
                            setEmail(text);
                        }}
                    />
                </Input>
            </Body>
            <Button onPress={checkEmail} title={'Tiếp'} />
            <ButtonPhone
                onPress={() => {
                    setError('');
                    navigation.navigate('PhoneRegister', route.params);
                }}
                title={'Sử dụng số điện thoại'}
                style={{ backgroundColor: Color.mainBackgroundColor }}
                color={Color.blueButtonColor}
            />
        </Container>
    );
}

export default EmailRegister;
