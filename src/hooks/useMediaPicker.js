import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useMediaPicker = () => {
    const [mediaFiles, setMediaFiles] = useState([]);

    const pickMedia = async () => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission to access media library is required!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                base64: true,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                multiple: true,
                selectionLimit: 4,
            });

            if (!result.canceled) {
                try {
                    const fileUri = result.assets[0].uri;
                    const file = {
                        uri: fileUri,
                        type: 'image/png/jpg/mp4',
                        name: 'image.png/jpg/mp4',
                        data: result.assets[0].base64,
                    };

                    setMediaFiles([{ ...result.assets[0], base64: file }, ...mediaFiles]);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        requestPermission();
    };

    const clearMedia = () => {
        setMediaFiles([]);
    };

    return { mediaFiles, pickMedia, clearMedia };
};
