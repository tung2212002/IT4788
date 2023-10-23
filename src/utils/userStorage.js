import * as Storage from './asyncStorageUtils';

const getUserStorage = async () => {
    return await Storage.getObjectItem('user');
};

const getTokenStorage = async () => {
    const user = await getUserStorage();
    return user.token;
};

const setUserStorage = async (data) => {
    await Storage.storeObjectItem('user', data);
};

const setTokenStorage = async (token) => {
    const user = await getUserStorage();
    if (!user) {
        setUserStorage({ token });
    }
    user.token = token;
    await setUserStorage(user);
};

const removeUserStorage = async () => {
    await Storage.removeItem('user');
};

const removeTokenStorage = async () => {
    const user = await getUserStorage();
    if (user) {
        user.token = null;
        await setUserStorage(user);
    }
};

export { getUserStorage, setUserStorage, removeUserStorage, getTokenStorage, setTokenStorage, removeTokenStorage };
