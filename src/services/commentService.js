import * as request from '../utils/requestAxios';

export const getMarkCommentService = async (body) => {
    const response = await request.apiAuthAttach.post('/get_mark_comment', body);
    return response;
};

export const setMarkCommentService = async (body) => {
    const response = await request.apiAuthAttach.post('/set_mark_comment', body);
    return response;
};

export const feelService = async (body) => {
    const response = await request.apiAuth.post('/feel', body);
    return response;
};

export const getListFeelsService = async (body) => {
    const response = await request.apiAuth.post('/get_list_feels', body);
    return response;
};

export const deleteFeelService = async (body) => {
    const response = await request.apiAuth.post('/delete_feel', body);
    return response;
};
