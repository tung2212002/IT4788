import * as Location from 'expo-location';
import { Alert } from 'react-native';

const getLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('denied');
            Alert.alert('Permission location denied');
            return null;
        }

        const location = await Location.getCurrentPositionAsync({});
        return location.coords;
    } catch {
        Alert.alert('Try later');
        return null;
    }
};

export default getLocation;
