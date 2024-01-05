import React, { useState } from 'react';
import styled from 'styled-components/native';

import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-bottom: 10px;
    background-color: ${Color.grey6};
`;

const Body = styled.View`
    width: 100%;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: OpenSans-Bold;
    margin-top: 50px;
`;

const SubTitle = styled.Text`
    font-size: 16px;
    margin-top: 10px;
    font-family: OpenSans-Medium;
    color: ${Color.black};
    text-align: left;
`;

const Input = styled.View`
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const InputValue = styled(TextInputComponent)`
    width: 49%;
    height: 60px;
    font-size: 18px;
    background-color: ${Color.white};
    border-radius: 20px;
    font-family: OpenSans-Medium;
`;

const Error = styled.Text`
    color: ${Color.red};
    margin-vertical: 5px;
    font-size: 16px;
`;

const ButtonNext = styled(ButtonComponent)`
    margin-top: 20px;
    border-radius: 30px;
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
            return;
        } else if (firstName === '') {
            setError1('Vui lòng nhập họ');
            return;
        } else if (lastName === '') {
            setError2('Vui lòng nhập tên');
            return;
        } else {
            if (!regex.test(firstName)) {
                setError1('Họ không hợp lệ');
                return;
            }
            if (!regex.test(lastName)) {
                setError2('Tên không hợp lệ');
                return;
            }
            if (regex.test(firstName) && regex.test(lastName)) {
                navigate(routes.BIRTH_DATE_SCREEN, {
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
                <SubTitle>Nhập tên của bạn sử dụng trong đời thực.</SubTitle>
                <Input>
                    <InputValue
                        mode={'outlined'}
                        label={'Họ'}
                        placeholder={'Họ'}
                        value={firstName}
                        outlineColor={Color.blueButtonColor}
                        outlineStyle={{ borderRadius: 10 }}
                        underlineColor={Color.blueButtonColor}
                        underlineStyle={{ borderRadius: 10 }}
                        topClose={16}
                        error={error1}
                        onChangeText={(text) => {
                            setError1('');
                            setError2('');
                            setFirstName(text);
                        }}
                    />
                    <InputValue
                        mode={'outlined'}
                        label={'Tên'}
                        placeholder={'Tên'}
                        value={lastName}
                        outlineColor={Color.blueButtonColor}
                        outlineStyle={{ borderRadius: 10 }}
                        underlineColor={Color.blueButtonColor}
                        underlineStyle={{ borderRadius: 10 }}
                        topClose={16}
                        error={error2}
                        onChangeText={(text) => {
                            setError2('');
                            setError1('');
                            setLastName(text);
                        }}
                    />
                </Input>
                {error1 !== '' && <Error>{error1}</Error>}
                {error2 !== '' && <Error>{error2}</Error>}
            </Body>
            <ButtonNext onPress={checkName} title={'Tiếp'} />
        </Container>
    );
}

export default NameRegisterScreen;
