import * as request from '../utils/requestAxios';

export const registerService = async (body) => {
    const response = await request.api.post('/signup', body);
    return response;
};

export const loginService = async (body) => {
    const response = await request.api.post('/login', body);
    return response;
};

export const changePasswordService = async (body) => {
    const response = await request.apiAuth.post('/change_password', body);
    return response;
};

export const logoutService = async (token) => {
    const response = await request.apiAuth.post('/logout', token);
    return response;
};

export const getVerifyCodeService = async (body) => {
    const response = await request.api.post('/get_verify_code', body);
    return response;
};

export const checkVerifyCodeService = async (body) => {
    const response = await request.api.post('/check_verify_code', body);
    return response;
};

export const resetPasswordService = async (body) => {
    const response = await request.api.post('/reset_password', body);
    return response;
};

export const checkEmailService = async (body) => {
    const response = await request.api.post('/check_email', body);
    return response;
};

export const deactiveUserSerivce = async (body) => {
    const response = await request.apiAuth.post('/deactive_user', body);
    return response;
};

export const restoreUserSerivce = async (body) => {
    const response = await request.api.post('/restore_user', body);
    return response;
};
