/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import LoginStack from '../navigation/AppStack';
import MainTabStack from '../navigation/MainTabStack';
// import HomeScreen from './HomeScreen';
import { login, selectIsAuth, selectUser } from '../redux/features/auth/authSlice';

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

    useEffect(() => {
        dispatch(login());
    }, []);

    return (
        <Container enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}>
            <SafeAreaViewContainer>
                <StatusBar barStyle="light-content" />
                {isAuth ? <MainTabStack /> : <LoginStack />}
            </SafeAreaViewContainer>
        </Container>
    );
}

export default ProviderScreen;
