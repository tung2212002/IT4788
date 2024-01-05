import { useFonts } from 'expo-font';
import { useCallback } from 'react';

function useCustomFonts() {
    const [fontsLoaded, fontError] = useFonts({
        'Roboto-Regular': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../../assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-Bold': require('../../assets/fonts/Roboto/Roboto-Bold.ttf'),
        'Roboto-Italic': require('../../assets/fonts/Roboto/Roboto-Italic.ttf'),
        'Roboto-Thin': require('../../assets/fonts/Roboto/Roboto-Thin.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
        'Montserrat-Italic': require('../../assets/fonts/Montserrat/Montserrat-Italic.ttf'),
        'Montserrat-Thin': require('../../assets/fonts/Montserrat/Montserrat-Thin.ttf'),
        'Montserrat-Light': require('../../assets/fonts/Montserrat/Montserrat-Light.ttf'),
        'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
        'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
        'OpenSans-Regular': require('../../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
        'OpenSans-Medium': require('../../assets/fonts/OpenSans/OpenSans-Medium.ttf'),
        'OpenSans-Bold': require('../../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
        'OpenSans-Italic': require('../../assets/fonts/OpenSans/OpenSans-Italic.ttf'),
        'OpenSans-Light': require('../../assets/fonts/OpenSans/OpenSans-Light.ttf'),
        'OpenSans-SemiBold': require('../../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
        'OpenSans-ExtraBold': require('../../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
        'OpenSans-BoldItalic': require('../../assets/fonts/OpenSans/OpenSans-BoldItalic.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            console.log('Loaded');
        }
    }, [fontsLoaded, fontError]);

    return [onLayoutRootView, fontsLoaded];
}

export default useCustomFonts;
