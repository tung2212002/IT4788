import React, { useState } from 'react';
import styled from 'styled-components/native';

import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import { checkVerifyCodeService } from '../../services/userService';
import getUUID from '../../utils/getUUID';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-vertical: 10px;
    background-color: ${Color.grey6};
`;

const Body = styled.View`
    width: 100%;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: OpenSans-Bold;
    line-height: 60px;
`;

const TextPara = styled.Text`
    font-size: 16px;
    line-height: 24px;
    font-family: OpenSans-Medium;
`;

const Input = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const InputValue = styled.TextInput`
    width: 40%;
    height: 60px;
    font-size: 24px;
    font-family: OpenSans-Bold;
    text-align: center;
    border: 1px solid ${Color.gray};
    border-radius: 10px;
    background-color: ${Color.white};
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
    border-radius: 30px;
`;

const ButtonClick2 = styled(ButtonComponent)`
    margin-vertical: 10px;
    border-radius: 30px;
    border-color: ${Color.grey3};
    border-width: 1px;
`;

const ViewButton = styled.View`
    width: 100%;
`;

function AccountAuthenScreen({ route, navigation }) {
    const [SMS, setSMS] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const params = route?.params;
    const numberPhone = params?.numberPhone;
    const email = params?.email;

    const regex = /^[0-9]{5}$/;

    const checkCode = () => {
        if (SMS === '') {
            setError('Vui lòng nhập mã');
        } else if (!regex.test(SMS)) {
            setError('Mã không hợp lệ');
        } else {
            const code_verify = params.verify_code;
            const body = {
                email,
                code_verify,
            };
            setLoading(true);
            checkVerifyCodeService(body)
                .then((res) => {
                    if (res.data.code === '1000') {
                        const user = {
                            email,
                            password: params.password,
                            uuid: getUUID(),
                            id: res.data.data.id,
                            active: res.data.data.active,
                            username: params.firstName + ' ' + params.lastName,
                        };
                        setLoading(false);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'CompleteRegister', params: { user } }],
                        });
                    } else {
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
                <Title>Nhập mã xác nhận</Title>
                <TextPara>
                    Để xác nhận tài khoản, hãy nhập mã gồm 5 chữ số được chúng tôi gửi{' '}
                    {numberPhone ? ` SMS kèm mã tới ${numberPhone}` : `Email kèm mã tới ${email}`}
                </TextPara>
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
                <ButtonClick onPress={checkCode} title={'Xác nhận'} loading={loading} disabled={loading} />
                <ButtonClick2 title={'Tôi không nhận được mã'} color={Color.black} style={{ backgroundColor: Color.grey6 }} />
                <ButtonClick
                    onPress={() => navigate(routes.AUTHENTICATION_SCREEN)}
                    title={'Đăng xuất'}
                    color={Color.gray}
                    style={{ backgroundColor: Color.grey6 }}
                />
            </ViewButton>
        </Container>
    );
}

export default AccountAuthenScreen;
