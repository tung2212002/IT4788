import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useVideoPicker = () => {
    const [videoFiles, setVideoFiles] = useState([]);

    const pickVideo = async () => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission to access media library is required!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                multiple: true,
                base64: true,
            });

            const file = {
                uri: result.assets[0].uri,
                type: 'video/mp4',
                name: 'video.mp4',
                data: result.assets[0].base64,
            };

            if (!result.canceled) {
                setVideoFiles([{ ...result.assets[0], base64: file }, ...videoFiles]);
            }
        };

        requestPermission();
    };

    const clearVideos = () => {
        setVideoFiles([]);
    };
    // useEffect(() => {}, []);

    return { videoFiles, pickVideo, clearVideos };
};
