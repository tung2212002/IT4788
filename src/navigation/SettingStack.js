import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import {
    SettingScreen,
    ProfileScreen,
    SubSettingScreen,
    ChangeAvatarScreen,
    ChangInfoAfterSignUp,
    SettingNotificationScreen,
    SettingNotificationDetailScreen,
    SettingPushNotificationScreen,
} from '../screens';
import { selectUser } from '../redux/features/auth/authSlice';
import routes from '../constants/route';
import BlockUserScreen from '../screens/SettingStack/BlockUserScreen';

const StackSetting = createStackNavigator();

const SettingStack = ({ route, navigation }) => {
    const user = useSelector(selectUser);

    const screenItemsSetting = [
        {
            name: routes.SETTING_SCREEN,
            component: SettingScreen,
            options: {
                title: 'SettingScreen',
                headerShown: false,
            },
        },
        {
            name: routes.PROFILE_SCREEN,
            component: ProfileScreen,
            options: {
                headerShown: false,
                // title: username,
                // headerBackTitle: '',
                // headerRight: headerRightProfile,
                // headerTitleAlign: 'center',
            },
        },
        {
            name: routes.SUB_SETTING_SCREEN,
            component: SubSettingScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.CHANGE_AVATAR_SCREEN,
            component: ChangeAvatarScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.SETTING_NOTIFICATION_SCREEN,
            component: SettingNotificationScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.SETTING_NOTIFICATION_DETAIL_SCREEN,
            component: SettingNotificationDetailScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.SETTING_PUSH_NOTIFICATION_SCREEN,
            component: SettingPushNotificationScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.BLOCK_USER_SCREEN,
            component: BlockUserScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.CHANGE_INFO_AFTER_SIGN_UP,
            component: ChangInfoAfterSignUp,
            options: {
                headerShown: false,
            },
        },
    ];

    return (
        <StackSetting.Navigator
            initialRouteName={routes.SETTING_SCREEN}
            // initialRouteName={routes.SETTING_SCREEN}
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
            {screenItemsSetting.map((item, index) => (
                <StackSetting.Screen key={index} name={item.name} component={item.component} options={item.options} />
            ))}
        </StackSetting.Navigator>
    );
};

export default SettingStack;
