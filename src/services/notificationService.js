import * as request from '../utils/requestAxios';

export const checkNewItemsService = async (body) => {
    const response = await request.apiAuth.post('/check_new_items', body);
    return response;
};

export const getNotificationService = async (body) => {
    const response = await request.apiAuth.post('/get_notification', body);
    return response;
};
