import React, { useState } from 'react';
import styled from 'styled-components/native';

import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import { checkEmailService } from '../../services/userService';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-bottom: 15px;
    background-color: ${Color.grey6};
`;

const Body = styled.View`
    width: 100%;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: OpenSans-Bold;
    margin-top: 20px;
`;

const SubTitle = styled.Text`
    font-size: 16px;
    margin-top: 10px;
    font-family: OpenSans-SemiBold;
    color: ${Color.black};
    text-align: left;
    opacity: 0.9;
`;

const Description = styled.Text`
    font-size: 15px;
    margin-top: 10px;
    font-family: OpenSans-SemiBold;
    opacity: 0.6;
    color: ${Color.black};
    text-align: left;
`;

const Input = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const InputValue = styled(TextInputComponent)`
    width: 100%;
    height: 60px;
    font-size: 18px;
    background-color: ${Color.white};
    font-family: OpenSans-Medium;
    border-radius: 20px;
`;

const Error = styled.Text`
    color: ${Color.red};
    margin-vertical: 10px;
    font-size: 16px;
`;

const ViewError = styled.View`
    width: 100%;
    height: 42px;
    align-items: center;
`;

const Box = styled.View`
    width: 100%;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
`;

const ButtonNext = styled(ButtonComponent)`
    border-radius: 30px;
    margin-bottom: 10px;
`;

const ButtonPhone = styled(ButtonComponent)`
    margin-top: 10px;
    border-radius: 30px;
    border-width: 1px;
    border-color: ${Color.grey3};
`;

function EmailRegisterScreen({ route, navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const checkEmail = () => {
        if (email === '') {
            setError('Vui lòng nhập email');
        } else if (!regex.test(email)) {
            setError('Email không hợp lệ');
        } else {
            setLoading(true);
            const body = {
                email,
            };
            checkEmailService(body)
                .then((res) => {
                    if (res.data.code === '1000') {
                        if (res.data.data.existed === '1') {
                            setLoading(false);
                            setError('Email đã tồn tại');
                        } else {
                            setLoading(false);
                            setError('');
                            navigate(routes.PASSWORD_REGISTER_SCREEN, { ...route.params, email });
                        }
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    };

    return (
        <Container>
            <Body>
                <Title>Email của bạn là gì?</Title>
                <SubTitle>Nhập email có thể dùng để liên lạc với bạn. Thông tin này sẽ không được hiển thị với ai khác trên trang cá nhân của bạn.</SubTitle>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                <Input>
                    <InputValue
                        label={'Email'}
                        placeholder={'Email'}
                        value={email}
                        error={error}
                        onChangeText={(text) => {
                            setError('');
                            setEmail(text);
                        }}
                        mode={'outlined'}
                        outlineColor={Color.blueButtonColor}
                        outlineStyle={{ borderRadius: 10 }}
                        underlineColor={Color.blueButtonColor}
                        underlineStyle={{ borderRadius: 10 }}
                        topClose={16}
                    />
                </Input>
                <Description>Bạn có thể nhận được email của chúng tôi và có thể chọn không nhận bất cứ lúc nào.</Description>
            </Body>
            <Box>
                <ButtonNext onPress={checkEmail} title={'Tiếp'} loading={loading} disabled={loading} />
                <ButtonPhone
                    onPress={() => {
                        setError('');
                        navigate(routes.PHONE_REGISTER_SCREEN, route.params);
                    }}
                    title={'Đăng kí bằng số di động'}
                    style={{ backgroundColor: Color.grey6 }}
                    color={Color.black}
                />
            </Box>
        </Container>
    );
}

export default EmailRegisterScreen;
