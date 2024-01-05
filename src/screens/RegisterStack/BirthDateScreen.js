import React, { useState } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
    padding-vertical: 10px;
    background-color: ${Color.grey6};
`;

const Title = styled.Text`
    font-size: 24px;
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

const Body = styled.View`
    width: 100%;
    align-items: center;
`;

const Error = styled.Text`
    color: ${Color.red};
    margin-top: 20px;
    font-size: 16px;
    width: 100%;
    text-align: center;
`;

const TextDate = styled.Text`
    font-size: 24px;
    text-align: center;
    margin-top: 40px;
    opacity: 0.5;
`;

const ErrorIcon = styled(MaterialIcons)`
    left: 10px;
`;

const ButtonNext = styled(ButtonComponent)`
    margin-top: 20px;
    border-radius: 30px;
`;

function BirthDateScreen({ route, navigation }) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const toggleDatepicker = () => {
        setError('');
        setShow(!show);
    };

    const onChange = ({ type }, selectedDate) => {
        setError('');
        if (type === 'set') {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            if (Platform.OS === 'android') {
                toggleDatepicker();
            }
        } else {
            if (Platform.OS === 'android') {
                toggleDatepicker();
            }
        }
    };

    const checkDate = () => {
        const currentDate = new Date();
        const birthDate = new Date(date);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            setError('Có vẻ như bạn đã nhập thông tin sai. Hãy đảm bảo sử dụng ngày sinh nhật của mình.');
        } else {
            navigate(routes.POLICY_SCREEN, {
                ...route.params,
                birthDate: date.toISOString().split('T')[0],
            });
        }
    };

    const convertDate = () => {
        const currentDate = new Date(date);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `Ngày ${day} tháng ${month} năm ${year}`;
    };

    return (
        <Container>
            <Body>
                <Title>Ngày sinh của bạn là khi nào?</Title>
                <SubTitle>Chọn ngày sinh của bạn. Bạn luôn có thể đặt thông tin này ở chế độ riêng tư và chỉ chia sẻ cho những người bạn muốn.</SubTitle>
                <Error>
                    {error}
                    {error !== '' && <ErrorIcon name="error" size={24} color="red" />}
                </Error>
                {Platform.OS === 'ios' && (
                    <DateTimePicker testID="dateTimePicker" value={date} mode={'date'} display="spinner" onChange={onChange} locale={'vi-VN'} />
                )}
                {Platform.OS === 'android' &&
                    (show ? (
                        <DateTimePicker testID="dateTimePicker" value={date} mode={'date'} display="spinner" maximumDate={new Date()} onChange={onChange} />
                    ) : (
                        <Pressable onPress={toggleDatepicker}>
                            <TextDate>{convertDate(date)}</TextDate>
                        </Pressable>
                    ))}
            </Body>
            <ButtonNext onPress={checkDate} title={'Tiếp'} width={'90'} />
        </Container>
    );
}

export default BirthDateScreen;
