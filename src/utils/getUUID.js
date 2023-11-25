import * as Device from 'expo-device';

const getUUID = () => {
    return Device.osBuildId + Device.osInternalBuildId;
};

export default getUUID;
