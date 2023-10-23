import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import JoinScreen from '../screens/RegisterScreen/JoinScreen';
import { NavigationContainer } from '@react-navigation/native';
import Color from '../utils/Color';
import NameRegister from '../screens/RegisterScreen/NameRegister';
import BirthDate from '../screens/RegisterScreen/BirthDate';
import Policy from '../screens/RegisterScreen/Policy';
import WebViewScreen from '../screens/RegisterScreen/WebViewScreen';
import EmailRegister from '../screens/RegisterScreen/EmailRegister';
import PhoneRegister from '../screens/RegisterScreen/PhoneRegister';
import PasswordRegister from '../screens/RegisterScreen/PasswordRegister';
import AccountAuthen from '../screens/RegisterScreen/AccountAuthen';
import CompleteRegister from '../screens/RegisterScreen/CompleteRegister';
import SaveAccount from '../screens/RegisterScreen/SaveAccount';
import AuthScreen from '../screens/AuthScreen';
import Login from '../screens/Login';
import LoginNoSave from '../screens/LoginNotSave';

const StackAuth = createStackNavigator();

const LoginStack = ({ navigation }) => {
    const screenItemsLogin = [
        {
            name: 'AuthScreen',
            component: AuthScreen,
            options: {
                title: 'AuthScreen',
                headerShown: false,
            },
        },
        {
            name: 'JoinScreen',
            component: JoinScreen,
            options: {
                title: 'Tạo tài khoản',
                headerBackTitle: '',
            },
        },
        {
            name: 'NameRegister',
            component: NameRegister,
            options: {
                title: 'Tên',
                headerBackTitle: '',
            },
        },
        {
            name: 'BirthDate',
            component: BirthDate,
            options: {
                title: 'Ngày sinh',
                headerBackTitle: '',
            },
        },
        {
            name: 'Policy',
            component: Policy,
            options: {
                title: 'Điều khoản và quyền riêng tư',
                headerBackTitle: '',
            },
        },
        {
            name: 'WebViewScreen',
            component: WebViewScreen,
            options: {
                title: '',
                headerBackTitle: '',
            },
        },
        {
            name: 'EmailRegister',
            component: EmailRegister,
            options: {
                title: 'Địa chỉ Email',
                headerBackTitle: '',
            },
        },
        {
            name: 'PhoneRegister',
            component: PhoneRegister,
            options: {
                title: 'Số điện thoại',
                headerBackTitle: '',
            },
        },
        {
            name: 'PasswordRegister',
            component: PasswordRegister,
            options: {
                title: 'Mật khẩu',
                headerBackTitle: '',
            },
        },
        {
            name: 'AccountAuthen',
            component: AccountAuthen,
            options: {
                title: 'Xác nhận tài khoản',
                headerBackTitle: '',
            },
        },
        {
            name: 'CompleteRegister',
            component: CompleteRegister,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: 'SaveAccount',
            component: SaveAccount,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: 'Login',
            component: Login,
            options: {
                title: 'Đăng nhập',
                headerBackTitle: '',
            },
        },
        {
            name: 'LoginNoSave',
            component: LoginNoSave,
            options: {
                title: 'Đăng nhập',
                headerBackTitle: '',
            },
        },
    ];

    return (
        <NavigationContainer>
            <StackAuth.Navigator
                initialRouteName="AuthScreen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Color.mainBackgroundColor,
                        borderBottomWidth: 1,
                    },
                    headerTintColor: Color.black,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                {screenItemsLogin.map((item, index) => (
                    <StackAuth.Screen key={index} name={item.name} component={item.component} options={item.options} />
                ))}
            </StackAuth.Navigator>
        </NavigationContainer>
    );
};

export default LoginStack;
