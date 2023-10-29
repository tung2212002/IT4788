/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { useState } from 'react';

import Color from '../utils/Color';
import LoginStack from '../navigation/AppStack';
import MainTabStack from '../navigation/MainTabStack';
import { login, selectIsAuth, selectUser } from '../redux/features/auth/authSlice';
import { selectLoading } from '../redux/features/loading/loadingSlice';
import { LoadingScreen, ProfileScreen, SettingScreen } from '../screens';

const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
`;

const SafeAreaViewContainer = styled.SafeAreaView`
    flex: 1;
`;

function ProviderScreen() {
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
            console.log('Connection type', state.type);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        dispatch(login());
    }, []);

    return (
        <Container enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}>
            <SafeAreaViewContainer>
                <StatusBar barStyle="light-content" />
                {isAuth ? <MainTabStack avatar={user.avatar} /> : <LoginStack />}
                <Modal visible={loading} transparent={true}>
                    <LoadingScreen />
                </Modal>
            </SafeAreaViewContainer>
        </Container>
    );
}

export default ProviderScreen;
