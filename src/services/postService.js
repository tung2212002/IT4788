import * as request from '../utils/requestAxios';

export const addPostService = async (body) => {
    const response = await request.apiAuthAttach.post('/add_post', body);
    return response;
};

export const getPostService = async (body) => {
    const response = await request.apiAuth.get('/get_post', body);
    return response;
};

export const getListPostsService = async (body) => {
    const response = await request.apiAuth.get('/get_list_posts', body);
    return response;
};

export const editPostService = async (body) => {
    const response = await request.apiAuthAttach.post('/edit_post', body);
    return response;
};

export const getListVideosService = async (body) => {
    const response = await request.apiAuth.get('/get_list_videos', body);
    return response;
};

export const deletePostService = async (body) => {
    const response = await request.apiAuth.post('/delete_post', body);
    return response;
};

export const reportPostService = async (body) => {
    const response = await request.apiAuth.post('/report_post', body);
    return response;
};
