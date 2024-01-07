import * as request from '../utils/requestAxios';

export const searchService = async (body) => {
    const response = await request.apiAuth.post('/search', body);
    return response;
};

export const searchUserService = async (body) => {
    const response = await request.apiAuth.post('/search_user', body);
    return response;
};

export const getSavedSearchService = async (body) => {
    const response = await request.apiAuth.post('/get_saved_search', body);
    return response;
};

export const delSavedSearchService = async (body) => {
    const response = await request.apiAuth.post('/del_saved_search', body);
    return response;
};
