import * as request from '../utils/requestAxios';

export const settingsSetDevTokenService = async (body) => {
    const response = await request.apiAuthAttach.post('/settings/set_devtoken', body);
    return response;
};

export const settingsBuyCoinsService = async (body) => {
    const response = await request.apiAuth.post('/settings/buy_coins', body);
    return response;
};

export const settingsGetPushSettingsService = async (body) => {
    const response = await request.apiAuth.post('/get_push_settings', body);
    return response;
};

export const settingsSetPushSettingsService = async (body) => {
    const response = await request.apiAuth.post('/set_push_settings', body);
    return response;
};

export const getSuggestedFriends = async (body) => {
    const response = await request.apiAuth.post('/get_suggested_friends', body);
    return response;
};

export const DelRequestFriendService = async (body) => {
    const response = await request.apiAuth.post('/del_request_friend', body);
    return response;
};
