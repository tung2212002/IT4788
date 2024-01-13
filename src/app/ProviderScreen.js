/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
// import messaging from '@react-native-firebase/messaging';

import Color from '../utils/Color';
import LoginStack from '../navigation/LoginStack';
import MainTabStack from '../navigation/MainTabStack';
import { login, selectIsAuth, selectAuth } from '../redux/features/auth/authSlice';
import { selectLoading, setLoading } from '../redux/features/loading/loadingSlice';
import { LoadingScreen, Logout } from '../screens';
import ButtonIconComponent from '../components/ButtonIconComponent';
import getLocation from '../utils/getLocation';
import { setLocationStorage } from '../utils/locationStorage';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../navigation/RootNavigator';
import { getUserStorage } from '../utils/userStorage';
import { hiddenNoti, selectNoti } from '../redux/features/noti/notiSlice';
import { selectNetwork, setNetwork } from '../redux/features/network/networkSlice';

const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
`;

const ButtonIconComponentStyled = styled(ButtonIconComponent)``;

const IMAGE_CACHE_FOLDER = `${FileSystem.cacheDirectory}`;

function ProviderScreen() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const loading = useSelector(selectLoading);
    const noti = useSelector(selectNoti);
    const isConnected = useSelector(selectNetwork);

    const [showPopup, setShowPopup] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const listCache = ['homePost', 'avatar'];

    listCache.forEach((item) => {
        const info = FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${item}`);
        if (!info.exists) {
            FileSystem.makeDirectoryAsync(`${IMAGE_CACHE_FOLDER}${item}`, { intermediates: true });
        }
    });

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!state.isConnected && !showPopup) {
                setShowPopup(true);
            }
            // setIsConnected(state.isConnected);
            dispatch(setNetwork(state.isConnected));
        });

        getLocation()
            .then((location) => {
                if (location) {
                    setLocationStorage(location).then(() => {
                        getUserStorage().then((user) => {
                            dispatch(login(user));
                        });
                        setLoadingAuth(true);
                    });
                } else {
                    setLoadingAuth(true);
                    Alert.alert('Hãy bật định vị để sử dụng ứng dụng');
                }
            })
            .catch((e) => {
                setLoadingAuth(true);
                Alert.alert('Hãy bật định vị để sử dụng ứng dụng');
            });

        return () => {
            unsubscribe();
        };
    }, []);

    // async function requestUserPermission() {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // }

    // useEffect(() => {
    //     if (requestUserPermission()) {
    //         messaging()
    //             .getToken()
    //             .then((token) => {
    //                 console.log('Token: ', token);
    //             });
    //     } else {
    //         console.log('error to get token');
    //     }

    //     // Check whether an initial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(async (remoteMessage) => {
    //             if (remoteMessage) {
    //                 console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    //             }
    //         });

    //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //         console.log('Notification caused app to open from background state:', remoteMessage.notification);
    //         // navigation.navigate(remoteMessage.data.type);
    //     });

    //     // Register background handler
    //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //         console.log('Message handled in the background!', remoteMessage);
    //     });

    //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);

    return (
        <Container enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0}>
            <Modal visible={loading} transparent={true} animationType="slide">
                <LoadingScreen alpha={1} backgroundColor={'rgba(255, 255, 255, 1)'} />
            </Modal>
            {loadingAuth && <NavigationContainer ref={navigationRef}>{isAuth ? <MainTabStack user /> : <LoginStack />}</NavigationContainer>}
            {!loadingAuth && (
                <Modal visible={true} transparent={true}>
                    <LoadingScreen alpha={1} backgroundColor={'rgba(255, 255, 255, 1)'} />
                </Modal>
            )}
            {/* <NavigationContainer ref={navigationRef}>{isAuth ? <MainTabStack user /> : <LoginStack />}</NavigationContainer> */}

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

            {noti.show && (
                <ButtonIconComponentStyled
                    title={noti.title}
                    nameIcon={noti.iconName}
                    typeIcon={noti.iconType}
                    propsIcon={noti.propsIcon}
                    propsTitle={noti.propsTitle}
                    onPress={() => {
                        dispatch(hiddenNoti());
                    }}
                    propsButton={noti.propsButton}
                />
            )}
        </Container>
    );
}

export default ProviderScreen;
