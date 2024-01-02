import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import JoinScreen from '../screens/RegisterStack/JoinScreen';
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
import routes from '../constants/route';

const StackAuth = createStackNavigator();

const LoginStack = ({ navigation }) => {
    const screenItemsLogin = [
        {
            name: routes.AUTHENTICATION_SCREEN,
            component: AuthenticationScreen,
            options: {
                title: 'AuthenticationScreen',
                headerShown: false,
            },
        },
        {
            name: routes.JOIN_SCREEN,
            component: JoinScreen,
            options: {
                title: 'Tạo tài khoản',
                headerBackTitle: '',
            },
        },
        {
            name: routes.NAME_REGISTER_SCREEN,
            component: NameRegisterScreen,
            options: {
                title: 'Tên',
                headerBackTitle: '',
            },
        },
        {
            name: routes.BIRTH_DATE_SCREEN,
            component: BirthDateScreen,
            options: {
                title: 'Ngày sinh',
                headerBackTitle: '',
            },
        },
        {
            name: routes.POLICY_SCREEN,
            component: PolicyScreen,
            options: {
                title: 'Điều khoản và quyền riêng tư',
                headerBackTitle: '',
            },
        },
        {
            name: routes.WEB_VIEW_SCREEN,
            component: WebViewScreen,
            options: {
                title: '',
                headerBackTitle: '',
            },
        },
        {
            name: routes.EMAIL_REGISTER_SCREEN,
            component: EmailRegisterScreen,
            options: {
                title: 'Địa chỉ Email',
                headerBackTitle: '',
            },
        },
        {
            name: routes.PHONE_REGISTER_SCREEN,
            component: PhoneRegisterScreen,
            options: {
                title: 'Số điện thoại',
                headerBackTitle: '',
            },
        },
        {
            name: routes.PASSWORD_REGISTER_SCREEN,
            component: PasswordRegisterScreen,
            options: {
                title: 'Mật khẩu',
                headerBackTitle: '',
            },
        },
        {
            name: routes.ACCOUNT_AUTHEN_SCREEN,
            component: AccountAuthenScreen,
            options: {
                title: 'Xác nhận tài khoản',
                headerBackTitle: '',
            },
        },
        {
            name: routes.COMPLETE_REGISTER,
            component: CompleteRegister,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: routes.SAVE_ACCOUNT_SCREEN,
            component: SaveAccountScreen,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: routes.LOGIN_SCREEN,
            component: LoginScreen,
            options: {
                title: 'Đăng nhập',
                headerBackTitle: '',
            },
        },
        {
            name: routes.LOGIN_NOT_SAVE_SCREEN,
            component: LoginNotSaveScreen,
            options: {
                title: 'Đăng nhập',
                headerBackTitle: '',
            },
        },
    ];

    return (
        <StackAuth.Navigator
            initialRouteName={routes.AUTHENTICATION_SCREEN}
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
    );
};

export default LoginStack;
