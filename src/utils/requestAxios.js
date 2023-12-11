import axios from 'axios';

import { getTokenStorage } from './userStorage';
import {BASE_URL} from '@env';


const instance = (config = {}, auth = false) => {
    const request = axios.create(config);
   // BASE_URL = 'https://it4788.catan.io.vn';
    console.log('BASE_URL', BASE_URL);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
               // const token = await getTokenStorage();
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGV2aWNlX2lkIjoic3RyaW5nIiwiaWF0IjoxNzAyMjY3ODg1fQ.FfCK26T8nQKS7vT0cA85C-bx6rjAdXD0gX9PO9-0dqs';
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
