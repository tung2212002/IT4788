import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useCameraPicker = () => {
    const [pickedImagePath, setPickedImagePath] = useState('');

    const pickCamera = async () => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission to access camera is required!');
                return;
            }

            const result = await ImagePicker.launchCameraAsync();

            if (!result.canceled) {
                setPickedImagePath(result.assets[0]);
            }
        };

        requestPermission();
    };

    return { pickedImagePath, pickCamera };
};
