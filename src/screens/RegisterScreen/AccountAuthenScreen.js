import React, { useState } from 'react';
import styled from 'styled-components/native';

import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-vertical: 50px;
    padding-top: 10px;
    background-color: ${Color.mainBackgroundColor};
`;

const Body = styled.View`
    width: 100%;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    line-height: 60px;
    margin-bottom: 20px;
`;

const TextPara = styled.Text`
    font-size: 18px;
    line-height: 24px;
`;

const Input = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const TextPara2 = styled.Text`
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
`;

const InputValue = styled.TextInput`
    width: 40%;
    height: 60px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border: 1px solid ${Color.gray};
    border-radius: 10px;
    background-color: ${Color.mainBackgroundColor};
`;

const Error = styled.Text`
    color: ${Color.red};
    margin-vertical: 10px;
    font-size: 16px;
`;

const ViewError = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
`;

const ButtonClick = styled(ButtonComponent)`
    margin-vertical: 10px;
`;

const ViewButton = styled.View`
    width: 100%;
`;

function AccountAuthenScreen({ route, navigation }) {
    const [SMS, setSMS] = useState('');
    const [error, setError] = useState('');

    const { email, numberPhone } = route.params;

    const regex = /^[0-9]{5}$/;

    const checkCode = () => {
        if (SMS === '') {
            setError('Vui lòng nhập mã');
        } else if (!regex.test(SMS)) {
            setError('Mã không hợp lệ');
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'JoinScreen' }, { name: 'CompleteRegister', params: route.params }],
            });
        }
    };

    return (
        <Container>
            <Body>
                <TextPara>Chúng tôi đã gửi {numberPhone ? ` SMS kèm mã tới ${numberPhone}` : `Email kèm mã tới ${email}`}</TextPara>
                <TextPara2>Nhập mã gồm 5 chữ số từ {numberPhone ? 'SMS' : 'Email'} của bạn.</TextPara2>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                <Input>
                    <Title>FB- </Title>
                    <InputValue
                        keyboardType="numeric"
                        maxLength={5}
                        value={SMS}
                        error={error}
                        onChangeText={(text) => {
                            setError('');
                            setSMS(text);
                        }}
                    />
                </Input>
            </Body>
            <ViewButton>
                <ButtonClick onPress={checkCode} title={'Xác nhận'} />
                <ButtonClick title={'Tôi không nhận được mã'} color={Color.black} style={{ backgroundColor: Color.lightGray }} />
                <ButtonClick
                    onPress={() => navigation.navigate('AuthScreen')}
                    title={'Đăng xuất'}
                    color={Color.gray}
                    style={{ backgroundColor: Color.mainBackgroundColor }}
                />
            </ViewButton>
        </Container>
    );
}

export default AccountAuthenScreen;
