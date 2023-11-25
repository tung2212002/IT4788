import AsyncStorage from '@react-native-async-storage/async-storage';

const storeValueItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        return false;
    }
};

const storeObjectItem = async (key, object) => {
    try {
        const jsonValue = JSON.stringify(object);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (error) {
        return false;
    }
};

const getValueItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? value : null;
    } catch (error) {
        return null;
    }
};

const getObjectItem = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        return null;
    }
};

const mergeObjectItem = async (key, object) => {
    try {
        const jsonValue = JSON.stringify(object);
        await AsyncStorage.mergeItem(key, jsonValue);
        return true;
    } catch (error) {
        return false;
    }
};

const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
};

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        return false;
    }
};

export { storeValueItem, storeObjectItem, getValueItem, getObjectItem, mergeObjectItem, removeItem, clearAll };
