import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';

import Color from '../../utils/Color';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../../redux/features/auth/authSlice';
import { Alert, Modal } from 'react-native';
import { removeAsyncStorage } from '../../utils/asyncCacheStorage';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color:;
`;

function Logout({ route, navigation, props }) {
    const dispatch = useDispatch();
    const alpha = 0.7;
    const backgroundColor = `rgba(1, 1, 1, ${alpha})`;

    useEffect(() => {
        Alert.alert('Thông báo', 'Hết phiên đăng nhập', [{ text: 'OK', onPress: () => dispatch(logout()) }]);
    }, []);
    return (
        <Modal visible={true}>
            <Container alpha={alpha} backgroundColor={backgroundColor}>
                <ActivityIndicator size="large" color={Color.blueButtonColor} />
            </Container>
        </Modal>
    );
}

export default Logout;
