import * as Storage from './asyncStorageUtils';
import { CacheManager } from '../components/CachedImage';
import { Alert } from 'react-native';

const getAsyncStorage = async (key) => {
    console.log('getAsyncStorage', key);
    const asyncStorage = await Storage.getObjectItem(key);
    return asyncStorage;
};

const removeAsyncStorage = async (key) => {
    console.log('removeAsyncStorage', key);
    try {
        console.log('removeAsyncStorage2', key);
        // const result = await Storage.removeItem(key);
        // console.log('removeAsyncStorage3', key);
        // if (result) {
        //     CacheManager.deleteAllFolders({ folders: key });

        // }
        // await Storage.removeItem(key);
        Storage.removeItem(key)
            .then((result) => {
                if (result) {
                    CacheManager.deleteAllFolders(key);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};

const setAsyncStorage = async (key, data) => {
    console.log('setAsyncStorage', key);
    const result = await Storage.storeObjectItem(key, data);
    return result;
    // removeAsyncStorage(key)
    //     .then(() => {
    //         console.log('setAsyncStorage', key);
    //         Storage.storeObjectItem(key, data);
    //         return true;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return false;
    //     });
    // const result = await Storage.storeObjectItem(key, data);
    // console.log('setAsyncStorage result', data);
    // console.log('setAsyncStorage result', result);
    // return result;
};

const setAsyncStorage1 = async (key, data) => {
    console.log('setAsyncStorage', key);
    const result = await Storage.storeObjectItem(key, data);
    return result;
};

const addDataHeadAsyncStorage = async (key, data) => {
    console.log('addDataHeadAsyncStorage', key);

    const asyncStorage = await getAsyncStorage(key);
    if (asyncStorage) {
        const newAsyncStorage = [...data, ...asyncStorage];
        await setAsyncStorage1(key, newAsyncStorage);
    } else {
        await setAsyncStorage1(key, data);
    }
};

const addDataTailAsyncStorage = async (key, data) => {
    console.log('addDataTailAsyncStorage', key);
    //     const asyncStorage = await getAsyncStorage(key);
    //     if (asyncStorage) {
    //         const newAsyncStorage = [...asyncStorage, ...data];
    //         console.log('addDataTailAsyncStorage', newAsyncStorage);
    //         await setAsyncStorage1(key, newAsyncStorage);
    //     } else {
    //         await setAsyncStorage1(key, data);
    //     }

    getAsyncStorage(key).then((asyncStorage) => {
        if (asyncStorage) {
            const newAsyncStorage = [...asyncStorage, ...data];
            setAsyncStorage1(key, newAsyncStorage);
        } else {
            setAsyncStorage1(key, data);
        }
    });
};

const removeDataByIdAsyncStorage = async (key, id) => {
    console.log('removeDataByIdAsyncStorage', key);
    const asyncStorage = await getAsyncStorage(key);
    if (asyncStorage) {
        const newAsyncStorage = asyncStorage.filter((item) => item.id !== id);
        await setAsyncStorage1(key, newAsyncStorage);
    }
};

const updateParamData = async (key, id, param, value) => {
    console.log('updateParamData', key);
    const asyncStorage = await getAsyncStorage(key);
    if (asyncStorage) {
        const newAsyncStorage = asyncStorage.map((item) => {
            if (item.id === id) {
                item[param] = value;
            }
            return item;
        });
        await setAsyncStorage1(key, newAsyncStorage);
    }
};

const getDataByIdAsyncStorage = async (key, id) => {
    console.log('getDataByIdAsyncStorage', key);
    const asyncStorage = await getAsyncStorage(key);
    if (asyncStorage) {
        const data = asyncStorage.find((item) => item.id === id);
        return data;
    } else {
        return null;
    }
};

export {
    getAsyncStorage,
    setAsyncStorage,
    addDataHeadAsyncStorage,
    addDataTailAsyncStorage,
    removeAsyncStorage,
    removeDataByIdAsyncStorage,
    updateParamData,
    getDataByIdAsyncStorage,
};
