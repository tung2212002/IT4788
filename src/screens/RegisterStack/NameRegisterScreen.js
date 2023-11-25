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
    width: 45%;
    height: 60px;
    font-size: 18px;
    background-color: ${Color.mainBackgroundColor};
`;

const Error = styled.Text`
    color: ${Color.red};
    margin-vertical: 10px;
    font-size: 16px;
`;

function NameRegisterScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');

    const regex = /^[\p{L}\p{Mn}\p{Pd}\s']+$/u;

    const checkName = () => {
        if (firstName === '' && lastName === '') {
            setError1('Vui lòng nhập họ và tên');
        } else if (firstName === '') {
            setError1('Vui lòng nhập họ');
        } else if (lastName === '') {
            setError2('Vui lòng nhập tên');
        } else {
            if (!regex.test(firstName)) {
                setError1('Họ không hợp lệ');
            }
            if (!regex.test(lastName)) {
                setError2('Tên không hợp lệ');
            }
            if (regex.test(firstName) && regex.test(lastName)) {
                navigation.navigate('BirthDateScreen', {
                    firstName: firstName,
                    lastName: lastName,
                });
            }
        }
    };

    return (
        <Container>
            <Body>
                <Title>Bạn tên gì?</Title>
                <Input>
                    <InputValue
                        label={'Họ'}
                        placeholder={'Họ'}
                        value={firstName}
                        error={error1}
                        onChangeText={(text) => {
                            setError1('');
                            setFirstName(text);
                        }}
                    />
                    <InputValue
                        label={'Tên'}
                        placeholder={'Tên'}
                        value={lastName}
                        error={error2}
                        onChangeText={(text) => {
                            setError2('');
                            setLastName(text);
                        }}
                    />
                </Input>
                {error1 !== '' && <Error>{error1}</Error>}
                {error2 !== '' && <Error>{error2}</Error>}
            </Body>
            <ButtonComponent onPress={checkName} title={'Tiếp'} />
        </Container>
    );
}

export default NameRegisterScreen;
