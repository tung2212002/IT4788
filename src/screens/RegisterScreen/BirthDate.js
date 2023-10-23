import React, { useState } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../../components/Button';
import Color from '../../utils/Color';

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
    padding-vertical: 50px;
    background-color: ${Color.mainBackgroundColor};
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-top: 50px;
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

function BirthDate({ route, navigation }) {
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
            navigation.navigate('Policy', {
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
                <Title>Sinh nhật của bạn là khi nào?</Title>
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
            <Button onPress={checkDate} title={'Tiếp'} />
        </Container>
    );
}

export default BirthDate;
