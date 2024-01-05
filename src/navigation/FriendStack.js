import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../utils/Color';
import { FriendsScreen, ProfileScreen, SuggestFriendsScreen, UserFriendsScreen } from '../screens';
import routes from '../constants/route';

const StackSetting = createStackNavigator();

const FriendStack = () => {
    const screenItemsSetting = [
        {
            name: routes.FRIENDS_SCREEN,
            component: FriendsScreen,
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
        {
            name: routes.SUGGEEST_FRIENDS_SCREEN,
            component: SuggestFriendsScreen,
            options: {
                headerShown: false,
            },
        },
    ];

    return (
        <StackSetting.Navigator
            initialRouteName={routes.FRIENDS_SCREEN}
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.mainBackgroundColor,
                    borderBottomWidth: 1,
                },
                headerTintColor: Color.black,
                headerTitleStyle: {
                    fontSize: 18,
                },
                // lazy: true,
            }}
        >
            {screenItemsSetting.map((item, index) => (
                <StackSetting.Screen key={index} name={item.name} component={item.component} options={item.options} />
            ))}
        </StackSetting.Navigator>
    );
};

export default FriendStack;
