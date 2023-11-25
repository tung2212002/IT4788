import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
    const [imageFiles, setImageFiles] = useState([]);

    const pickImage = async () => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission to access media library is required!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                multiple: true,
                selectionLimit: 4,
                base64: true,
            });

            if (!result.canceled) {
                const file = {
                    uri: result.assets[0].uri,
                    type: 'image/png',
                    name: 'image.png',
                    data: result.assets[0].base64,
                };

                setImageFiles([{ ...result.assets[0], base64: file }, ...imageFiles]);
            }
        };

        requestPermission();
    };

    const clearImages = () => {
        setImageFiles([]);
    };

    return { imageFiles, pickImage, clearImages };
};
