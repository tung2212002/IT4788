import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView as SafeAreaViewAndroid } from 'react-native-safe-area-context';
import { SafeAreaView as SafeAreaViewIOS, Platform, StyleSheet } from 'react-native';
import store from './src/redux/store';
import ProviderScreen from './src/app/ProviderScreen';
import Color from './src/utils/Color';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewAndroid;

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <StatusBar StatusBarStyle="dark-content" backgroundColor={Color.mainBackgroundColor} />
                <ProviderScreen />
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
