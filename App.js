import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { SafeAreaView as SafeAreaViewIOS, Platform, StyleSheet } from 'react-native';

import useCustomFonts from './src/hooks/useCustomFonts';
import store from './src/redux/store';
import ProviderScreen from './src/app/ProviderScreen';
import Color from './src/utils/Color';
import { UserFriendsScreen } from './src/screens';
import SubSettingScreen from './src/screens/SettingStack/SubSettingScreen';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewAndroid;

export default function App() {
    const [onLayoutRootView, fontsLoaded] = useCustomFonts();

    if (!fontsLoaded) {
        console.log('Loading...');
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar StatusBarStyle="dark-content" backgroundColor={Color.mainBackgroundColor} />
                {/* <ProviderScreen onLayout={onLayoutRootView} /> */}
                <SubSettingScreen />
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 24,
    },
});
