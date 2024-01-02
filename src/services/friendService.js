import * as request from '../utils/requestAxios';

export const getRequestedFriendsService = async (body) => {
    const response = await request.apiAuth.post('/get_requested_friends', body);
    return response;
};

export const setRequestFriendService = async (body) => {
    const response = await request.apiAuth.post('/set_request_friend', body);
    return response;
};

export const setAcceptFriendService = async (body) => {
    const response = await request.apiAuth.post('/set_accept_friend', body);
    return response;
};

export const getUserFriendsService = async (body) => {
    const response = await request.apiAuth.post('/get_user_friends', body);
    return response;
};

export const getSuggestedFriends = async (body) => {
    const response = await request.apiAuth.post('/get_suggested_friends', body);
    return response;
};

export const unfriendService = async (body) => {
    const response = await request.apiAuth.post('/unfriend', body);
    return response;
};

export const DelRequestFriendService = async (body) => {
    const response = await request.apiAuth.post('/del_request_friend', body);
    return response;
};
