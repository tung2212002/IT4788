import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import { HomeScreen, Logout, PostDetailScreen, ProfileScreen, SearchLogScreen, SearchResultScreen } from '../screens';
import { selectUser } from '../redux/features/auth/authSlice';
import routes from '../constants/route';

const StackHome = createStackNavigator();

const HomeStack = () => {
    const user = useSelector(selectUser);
    const username = user?.username;

    const screenItemsLogin = [
        {
            name: routes.HOME_SCREEN,
            component: HomeScreen,
            options: {
                title: '',
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
            name: routes.LOGOUT,
            component: Logout,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: routes.SEARCH_RESULT_SCREEN,
            component: SearchResultScreen,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: routes.SEARCH_LOG_SCREEN,
            component: SearchLogScreen,
            options: {
                title: '',
                headerShown: false,
            },
        },
        {
            name: routes.POST_DETAIL_SCREEN,
            component: PostDetailScreen,
            options: {
                title: '',
                headerShown: false,
            },
        },
    ];

    return (
        <StackHome.Navigator
            initialRouteName={routes.HOME_SCREEN}
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.white,
                },
                headerTintColor: Color.black,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {screenItemsLogin.map((item, index) => (
                <StackHome.Screen key={index} name={item.name} component={item.component} initialParams={{ user }} options={item.options} />
            ))}
        </StackHome.Navigator>
    );
};

export default HomeStack;
