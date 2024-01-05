import React, { useState } from 'react';
import styled from 'styled-components/native';

import InputSecure from '../../components/InputSecure';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { registerService } from '../../services/userService';
import getUUID from '../../utils/getUUID';
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
    margin-top: 10px;
    margin-bottom: 20px;
`;

const TextPara = styled.Text`
    font-size: 16px;
    line-height: 20px;
    font-family: OpenSans-Medium;
`;

const Input = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const InputSecureCus = styled(InputSecure)`
    margin-bottom: 10px;
    background-color: ${Color.white};
    width: 100%;
    border-radius: 20px;
    font-size: 18px;
    font-family: OpenSans-Medium;
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

const ButtonNext = styled(ButtonComponent)`
    border-radius: 30px;
`;

function PasswordRegisterScreen({ route, navigation }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const params = route.params;

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const checkPassword = () => {
        if (password === '') {
            setError('Vui lòng nhập password');
        } else if (!regex.test(password)) {
            setError('Password không hợp lệ');
        } else {
            const body = {
                email: params.numberPhone ? '' : params.email,
                password: password,
                uuid: getUUID(),
            };
            setLoading(true);
            registerService(body)
                .then((res) => {
                    if (res.data.code === '1000') {
                        const verify_code = res.data.data.verify_code;
                        setLoading(false);
                        navigate(routes.ACCOUNT_AUTHEN_SCREEN, { ...route.params, password, verify_code });
                    } else if (res.data.code === '9996') {
                        setLoading(false);
                        setError('Tài khoản đã tồn tại');
                    } else {
                        console.log(res);
                        setLoading(false);
                        setError('Có lỗi xảy ra');
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log('err', err);
                });
        }
    };

    return (
        <Container>
            <Body>
                <Title>Tạo mật khẩu</Title>
                <TextPara>Để bảo mật tài khoản, vui lòng nhập mật khẩu ít nhất 6 chữ cái hoặc chữ số. Bạn nên chọn mật khẩu khó đoán.</TextPara>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                <Input>
                    <InputSecureCus
                        label={'Mật khẩu'}
                        placeholder={'Mật khẩu'}
                        value={password}
                        error={error}
                        onChangeText={(text) => {
                            setError('');
                            setPassword(text);
                        }}
                        mode="outlined"
                        topClose={16}
                        style={{ height: 60 }}
                        outlineColor={Color.blueButtonColor}
                        outlineStyle={{ borderRadius: 10 }}
                        underlineColor={Color.blueButtonColor}
                        underlineStyle={{ borderRadius: 10 }}
                    />
                </Input>
            </Body>
            <ButtonNext onPress={checkPassword} title={'Tiếp'} loading={loading} disabled={loading} />
        </Container>
    );
}

export default PasswordRegisterScreen;
