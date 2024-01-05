import * as request from '../utils/requestAxios';

export const setDevtokenService = async (body) => {
    const response = await request.apiAuth.post('/set_devtoken', body);
    return response;
};

export const buyCoinsService = async (body) => {
    const response = await request.apiAuth.post('/buy_coins', body);
    return response;
};

export const getPushSettingsService = async (body) => {
    const response = await request.apiAuth.post('/get_push_settings', body);
    return response;
};

export const setPushSettingsService = async (body) => {
    const response = await request.apiAuth.post('/set_push_settings', body);
    return response;
};
