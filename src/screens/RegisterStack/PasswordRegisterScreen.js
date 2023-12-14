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
    padding-bottom: 50px;
    background-color: ${Color.mainBackgroundColor};
`;

const Body = styled.View`
    width: 100%;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: Roboto-Bold;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const TextPara = styled.Text`
    font-size: 16px;
    line-height: 20px;
`;

const Input = styled.View`
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const InputValue = styled(InputSecure)`
    width: 100%;
    height: 60px;
    font-size: 18px;
    margin-bottom: 20px;
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
        }
        else {
            const body = {
                email: params.numberPhone ? '' : params.email,
                password: password,
                uuid: getUUID(),
            };
            console.log(body);
            setLoading(true);
            registerService(body)
                .then((res) => {
                    if (res.data.code === '1000') {
                        const verify_code = res.data.data.verify_code;
                        console.log(verify_code);
                        setLoading(false);
                        navigate(routes.ACCOUNT_AUTHEN_SCREEN, { ...route.params, password, verify_code });
                    } else if (res.data.code === '9996') {
                        setLoading(false);
                        setError('Tài khoản đã tồn tại');
                    } else if(res.data.code === '5001'){
                        setLoading(false);
                        setError('Email hoặc số điện thoại đã được đăng ký');
                    }
                    else {
                        console.log(res);
                        setLoading(false);
                        setError('Có lỗi xảy ra');
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log('err', err);
                });
                setError(1);
        }
    };

    return (
        <Container>
            <Body>
                <Title>Tạo mật khẩu</Title>
                <TextPara>Để bảo mật tài khoản, vui lòng nhập mật khẩu ít nhất 6 chữ cái hoặc chữ số. Bạn nên chọn mật khẩu khó đoán.</TextPara>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                <Input>
                    <InputValue
                        label={'Mật khẩu'}
                        placeholder={'Mật khẩu'}
                        value={password}
                        error={error}
                        onChangeText={(text) => {
                            setError('');
                            setPassword(text);
                        }}
                    />
                </Input>
            </Body>
            <ButtonComponent onPress={checkPassword} title={'Tiếp'} loading={loading} />
        </Container>
    );
}

export default PasswordRegisterScreen;
