import * as Storage from './asyncStorageUtils';

const getUserStorage = async () => {
    const user = await Storage.getObjectItem('user');
    return user;
};

const getTokenStorage = async () => {
    const user = await getUserStorage();
    return user.token;
};

const setUserStorage = async (data) => {
    const result = await Storage.storeObjectItem('user', data);
    return result;
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

const mergeUserStorage = async (data) => {
    try {
        const user = await getUserStorage();
        if (!user) {
            setUserStorage(data);
        }
        await Storage.mergeObjectItem('user', data);
        const newUser = await getUserStorage();
        return newUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { getUserStorage, setUserStorage, removeUserStorage, getTokenStorage, setTokenStorage, removeTokenStorage, mergeUserStorage };
