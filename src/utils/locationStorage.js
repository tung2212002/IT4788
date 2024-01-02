import * as Storage from './asyncStorageUtils';

const getLocationStorage = async () => {
    const location = await Storage.getObjectItem('location');
    return location;
};

const setLocationStorage = async (data) => {
    const result = await Storage.storeObjectItem('location', data);
    return result;
};

const removeLocationStorage = async () => {
    await Storage.removeItem('location');
};

const mergeLocationStorage = async (data) => {
    try {
        const location = await getLocationStorage();
        if (!location) {
            setLocationStorage(data);
        }
        await Storage.mergeObjectItem('location', data);
        const newLocation = await getLocationStorage();
        return newLocation;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { getLocationStorage, setLocationStorage, removeLocationStorage, mergeLocationStorage };
