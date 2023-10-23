import { useState, useEffect } from 'react';
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
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });

            if (!result.cancelled) {
                setImageFiles([...imageFiles, result.uri]);
            }
        };

        requestPermission();
    };

    const clearImages = () => {
        setImageFiles([]);
    };
    useEffect(() => {}, []);

    return { imageFiles, pickImage, clearImages };
};
