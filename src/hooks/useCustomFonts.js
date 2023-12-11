import { useFonts } from 'expo-font';
import { useCallback } from 'react';

function useCustomFonts() {
    const [fontsLoaded, fontError] = useFonts({
        test: require('../../assets/fonts/Test/DancingScript-Bold.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../../assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Roboto-Bold': require('../../assets/fonts/Roboto/Roboto-Bold.ttf'),
        'Roboto-Italic': require('../../assets/fonts/Roboto/Roboto-Italic.ttf'),
        'Roboto-Thin': require('../../assets/fonts/Roboto/Roboto-Thin.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            console.log('Loaded');
        }
    }, [fontsLoaded, fontError]);

    return [onLayoutRootView, fontsLoaded];
}

export default useCustomFonts;
