import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        regular1: require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
        regular: require('../../assets/fonts/SanFrancisco/SanFranciscoText-Regular.otf'),
        medium: require('../../assets/fonts/Roboto/Roboto-Medium.ttf'),
        bold: require('../../assets/fonts/Roboto/Roboto-Bold.ttf'),
        italic: require('../../assets/fonts/Roboto/Roboto-Italic.ttf'),
        thin: require('../../assets/fonts/Roboto/Roboto-Thin.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return [onLayoutRootView, fontsLoaded];
}

export default useCustomFonts;
