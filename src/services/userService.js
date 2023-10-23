import * as request from '../utils/requestAxios';

export const loginService = async (data) => {
    const response = await request.api.post('login', data);
    return response;
};

export const logoutService = async (token) => {
    const response = await request.apiAuth.post('logout', token);
    return response;
};

export const registerService = async (params) => {
    const response = await request.apiAttach.post('register', params);
    return response;
};

export const getVerifyCodeService = async (email) => {
    const response = await request.api.post('verify-code', email);
    return response;
};

export const checkVerifyCodeService = async (params) => {
    const response = await request.api.post('verify-code/check', params);
    return response;
};

export const testGetService = async (params) => {
    const response = await request.api.get('posts', params);
    return response;
};

export const testPostService = async (params) => {
    const response = await request.api.post('posts', params);
    return response;
};
