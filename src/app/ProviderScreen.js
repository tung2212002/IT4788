/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { useState } from 'react';

import Color from '../utils/Color';
import LoginStack from '../navigation/LoginStack';
import MainTabStack from '../navigation/MainTabStack';
import { login, selectIsAuth, selectUser } from '../redux/features/auth/authSlice';
import { selectLoading } from '../redux/features/loading/loadingSlice';
import { LoadingScreen } from '../screens';
import ButtonIconComponent from '../components/ButtonIconComponent';

const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
`;

const ButtonIconComponentStyled = styled(ButtonIconComponent)``;

function ProviderScreen() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    const [isConnected, setIsConnected] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!state.isConnected && !showPopup) {
                setShowPopup(true);
            }
            setIsConnected(state.isConnected);
        });

        dispatch(login());

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Container enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}>
            <Modal visible={loading} transparent={true}>
                <LoadingScreen />
            </Modal>
            {isAuth ? <MainTabStack user /> : <LoginStack />}

            {showPopup ? (
                isConnected ? (
                    <ButtonIconComponentStyled
                        title="Đã khôi phục lại kết nối Internet"
                        nameIcon="wifi"
                        typeIcon="MaterialCommunityIcons"
                        propsIcon={{ color: Color.white, size: 12, backgroundColor: Color.gray }}
                        propsTitle={{ color: Color.white, size: 16 }}
                        onPress={() => setShowPopup(false)}
                        propsButton={{ backgroundColor: Color.gray, width: 95, marginRight: 10, marginLeft: 10, position: 'absolute', bottom: 50 }}
                    />
                ) : (
                    <ButtonIconComponentStyled
                        title="Bạn đang offline"
                        nameIcon="wifi-off"
                        typeIcon="MaterialCommunityIcons"
                        propsIcon={{ color: Color.white, size: 12, backgroundColor: Color.gray }}
                        propsTitle={{ color: Color.white, size: 16 }}
                        onPress={() => setShowPopup(false)}
                        propsButton={{ backgroundColor: Color.gray, width: 95, marginRight: 10, marginLeft: 10, position: 'absolute', bottom: 50 }}
                    />
                )
            ) : null}
        </Container>
    );
}

export default ProviderScreen;
