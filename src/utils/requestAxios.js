import axios from 'axios';

import { getTokenStorage } from './userStorage';
// import { BASE_URL } from '@env';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';

// const BASE_URL = process.env.BASE_URL;
// console.log('BASE_URL', BASE_URL);
export const BASE_URL = 'https://it4788.catan.io.vn';

const instance = (config = {}, auth = false) => {
    const request = axios.create(config);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
                const token = await getTokenStorage();
                if (token) {
                    requestConfig.headers.Authorization = `Bearer ${token}`;
                } else {
                    navigate(routes.LOGOUT);
                }
            }
            requestConfig.timeout = 10000;
            return requestConfig;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            try {
                if (error.response.status) {
                    if (error.response.data.code === '9998') {
                        navigate(routes.LOGOUT);
                    } else {
                        return Promise.resolve({
                            status: error.response.status,
                            data: error.response.data,
                        });
                    }
                }
            } catch (e) {
                if (e.code === 'ECONNABORTED' && e.message.includes('timeout')) {
                    return Promise.resolve({
                        status: 408,
                        data: {
                            code: '408',
                            message: 'Request timeout',
                        },
                    });
                }

                Promise.reject(error);
            }
        },
    );

    return request;
};

export const api = instance({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

export const apiAuth = instance(
    {
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
    },
    true,
);

export const apiAttach = instance({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    },
});

export const apiAuthAttach = instance(
    {
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        },
    },
    true,
);
