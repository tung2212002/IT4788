import axios from 'axios';

import { getTokenStorage } from './userStorage';
import { BASE_URL } from '@env';

const instance = (config = {}, auth = false) => {
    const request = axios.create(config);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
                const token = await getTokenStorage();
                requestConfig.headers.Authorization = `Bearer ${token}`;
            }
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
            if (error.response.status) {
                return Promise.resolve({
                    status: error.response.status,
                    data: error.response.data,
                });
            }
            return error.response;
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
