import AsyncStorage from '@react-native-async-storage/async-storage';

const storeValueItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

const storeObjectItem = async (key, object) => {
    try {
        const jsonValue = JSON.stringify(object);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e);
    }
};

const getValueItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.log(e);
    }
};

const getObjectItem = async (key) => {
    try {
        const user = await AsyncStorage.getItem(key);
        return user != null ? JSON.parse(user) : null;
    } catch (e) {
        console.log(e);
    }
};

const mergeObjectItem = async (key, object) => {
    try {
        await AsyncStorage.mergeItem(key, object);
    } catch (e) {
        console.log(e);
    }
};

const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
};

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
};

export { storeValueItem, storeObjectItem, getValueItem, getObjectItem, mergeObjectItem, removeItem, clearAll };
