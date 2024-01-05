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
    padding-horizontal: 10px;
    padding-bottom: 10px;
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

const Input = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    height: 60px;
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
    margin-bottom: 20px;
`;

const ButtonEmail = styled(ButtonComponent)`
    border-radius: 30px;
    border-width: 1px;
    border-color: ${Color.grey3};
`;
const Description = styled.Text`
    font-size: 15px;
    margin-top: 10px;
    font-family: OpenSans-SemiBold;
    opacity: 0.6;
    color: ${Color.black};
    text-align: left;
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
            navigate(routes.PASSWORD_REGISTER_SCREEN, { ...route.params, numberPhone });
        }
    };

    return (
        <Container>
            <Body>
                <Title>Số di động của bạn là gì?</Title>
                <SubTitle>
                    Nhập số di động có thể dùng để liên lạc với bạn. Thông tin này sẽ không được hiển thị với ai khác trên trang cá nhân của bạn.
                </SubTitle>
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
                        mode={'outlined'}
                        outlineColor={Color.blueButtonColor}
                        outlineStyle={{ borderRadius: 10 }}
                        underlineColor={Color.blueButtonColor}
                        underlineStyle={{ borderRadius: 10 }}
                        topClose={16}
                    />
                </Input>
                <Description>Bạn có thể nhận được thông báo của chúng tôi qua SMS và có thể chọn không nhận bất cứ lúc nào.</Description>
            </Body>
            <Box>
                <ButtonNext onPress={checkPhone} title={'Tiếp'} />
                <ButtonEmail
                    onPress={() => {
                        setError('');
                        navigate(routes.EMAIL_REGISTER_SCREEN, route.params);
                    }}
                    title={'Đăng ký bằng Email'}
                    style={{ backgroundColor: Color.mainBackgroundColor }}
                    color={Color.black}
                />
            </Box>
        </Container>
    );
}

export default PhoneRegisterScreen;
