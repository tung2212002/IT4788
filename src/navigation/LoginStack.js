import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import JoinScreen from '../screens/RegisterStack/JoinScreen';
import { NavigationContainer } from '@react-navigation/native';
import Color from '../utils/Color';
import {
    NameRegisterScreen,
    BirthDateScreen,
    PolicyScreen,
    WebViewScreen,
    EmailRegisterScreen,
    PhoneRegisterScreen,
    PasswordRegisterScreen,
    AccountAuthenScreen,
    CompleteRegister,
    SaveAccountScreen,
    AuthenticationScreen,
    LoginScreen,
    LoginNotSaveScreen,
} from '../screens';

const StackAuth = createStackNavigator();

const LoginStack = ({ navigation }) => {
    const screenItemsLogin = [
        {
            name: 'AuthenticationScreen',
            component: AuthenticationScreen,
            options: {
                title: 'AuthenticationScreen',
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
            name: 'NameRegisterScreen',
            component: NameRegisterScreen,
            options: {
                title: 'Tên',
                headerBackTitle: '',
            },
        },
        {
            name: 'BirthDateScreen',
            component: BirthDateScreen,
            options: {
                title: 'Ngày sinh',
                headerBackTitle: '',
            },
        },
        {
            name: 'PolicyScreen',
            component: PolicyScreen,
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
            name: 'EmailRegisterScreen',
            component: EmailRegisterScreen,
            options: {
                title: 'Địa chỉ Email',
                headerBackTitle: '',
            },
        },
        {
            name: 'PhoneRegisterScreen',
            component: PhoneRegisterScreen,
            options: {
                title: 'Số điện thoại',
                headerBackTitle: '',
            },
        },
        {
            name: 'PasswordRegisterScreen',
            component: PasswordRegisterScreen,
            options: {
                title: 'Mật khẩu',
                headerBackTitle: '',
            },
        },
        {
            name: 'AccountAuthenScreen',
            component: AccountAuthenScreen,
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
            name: 'SaveAccountScreen',
            component: SaveAccountScreen,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: 'LoginScreen',
            component: LoginScreen,
            options: {
                title: 'Đăng nhập',
                headerBackTitle: '',
            },
        },
        {
            name: 'LoginNotSaveScreen',
            component: LoginNotSaveScreen,
            options: {
                title: 'Đăng nhập',
                headerBackTitle: '',
            },
        },
    ];

    return (
        <NavigationContainer>
            <StackAuth.Navigator
                initialRouteName="AuthenticationScreen"
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
