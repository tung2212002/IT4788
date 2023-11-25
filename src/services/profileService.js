import * as request from '../utils/requestAxios';

export const changeProfileAfterSignupService = async (body) => {
    const response = await request.apiAuthAttach.post('/change_profile_after_signup', body);
    return response;
};

export const getUserInfoService = async (body) => {
    const response = await request.apiAuth.post('/get_user_info', body);
    return response;
};

export const setUserInfoService = async (body) => {
    const response = await request.apiAuth.post('/set_user_info', body);
    return response;
};
