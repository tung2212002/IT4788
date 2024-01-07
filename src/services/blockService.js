import * as request from '../utils/requestAxios';

export const getListBlocksService = async (body) => {
    const response = await request.apiAuth.post('/get_list_blocks', body);
    return response;
};

export const setBlockService = async (body) => {
    const response = await request.apiAuth.post('/set_block', body);
    return response;
};

export const unblockService = async (body) => {
    const response = await request.apiAuth.post('/unblock', body);
    return response;
};
