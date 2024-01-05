import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../utils/Color';
import { NotificationScreen, ProfileScreen, UserFriendsScreen } from '../screens';
import routes from '../constants/route';

const StackSetting = createStackNavigator();

const NotificationStack = () => {
    const screenItemNotf = [
        {
            name: routes.NOTIFICATION_SCREEN,
            component: NotificationScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.USER_FRIENDS_SCREEN,
            component: UserFriendsScreen,
            options: {
                headerShown: false,
            },
        },
        {
            name: routes.PROFILE_SCREEN,
            component: ProfileScreen,
            options: {
                headerShown: false,
            },
        },
    ];

    return (
        <StackSetting.Navigator
            initialRouteName={routes.NOTIFICATION_SCREEN}
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.mainBackgroundColor,
                    borderBottomWidth: 1,
                },
                headerTintColor: Color.black,
                headerTitleStyle: {
                    fontSize: 18,
                },
            }}
        >
            {screenItemNotf.map((item, index) => (
                <StackSetting.Screen key={index} name={item.name} component={item.component} options={item.options} />
            ))}
        </StackSetting.Navigator>
    );
};

export default NotificationStack;
