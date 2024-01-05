import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

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
                quality: 1,
                multiple: true,
            });

            if (!result.canceled) {
                try {
                    const fileUri = result.assets[0].uri;
                    const fileType = fileUri.substring(fileUri.lastIndexOf('.') + 1);
                    if (fileType === 'png' || fileType === 'jpg') {
                        const file = {
                            uri: fileUri,
                            type: 'image/png',
                            name: 'image.png',
                            data: result.assets[0].base64,
                        };
                        setMediaFiles([{ ...result.assets[0], base64: file }, ...mediaFiles]);
                    }
                    if (fileType === 'jpeg') {
                        const file = {
                            uri: fileUri,
                            type: 'image/jpeg',
                            name: 'image.jpeg',
                            data: result.assets[0].base64,
                        };
                        setMediaFiles([{ ...result.assets[0], base64: file }, ...mediaFiles]);
                    } else if (fileType === 'mp4' || fileType === 'mov') {
                        let file = await FileSystem.readAsStringAsync(fileUri, {
                            encoding: FileSystem.EncodingType.Base64,
                        });

                        file = {
                            uri: fileUri,
                            type: 'video/mp4',
                            name: 'video.mp4',
                            data: file,
                        };

                        setMediaFiles([{ ...result.assets[0], base64: file }, ...mediaFiles]);
                    }
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
