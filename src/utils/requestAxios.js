import axios from 'axios';

import { getTokenStorage } from './userStorage';
//import { BASE_URL } from '@env';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';
import { Alert } from 'react-native';

const BASE_URL = 'https://it4788.catan.io.vn';

const instance = (config = {}, auth = false) => {
    console.log(BASE_URL);
    const request = axios.create(config);
    request.interceptors.request.use(
        async (requestConfig) => {
            if (auth) {
                const token = await getTokenStorage();
                if (token) {
                    requestConfig.headers.Authorization = `Bearer ${token}`;
                }
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
            try {
                if (error.response.status) {
                    if (error.response.data.code === '9998') {
                        console.log('token not found');
                        Alert.alert('Phiên đăng nhập đã hết hạn', '', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigate(routes.LOGOUT);
                                },
                            },
                        ]);
                        return Promise.resolve({
                            status: error.response.status,
                            data: error.response.data,
                        });
                    } else {
                        return Promise.resolve({
                            status: error.response.status,
                            data: error.response.data,
                        });
                    }
                }
            } catch (e) {
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
