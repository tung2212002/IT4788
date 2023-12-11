import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Color from '../utils/Color';
import { PersionalScreen, ProfileScreen } from '../screens';
import { selectUser } from '../redux/features/auth/authSlice';
import ButtonComponent from '../components/ButtonComponent';
import CreatePostScreen from '../screens/CreatePostScreen';
import routes from '../constants/route';

const StackHome = createStackNavigator();

const PersionalStack = () => {
    const user = useSelector(selectUser);
    const username = user?.username;
    const [isCreatePost, setIsCreatePost] = useState(false);

    const headerRightCreatePost = () => {
        return (
            <ButtonComponent
                title="ĐĂNG"
                style={{ backgroundColor: isCreatePost ? Color.blueButtonColor : Color.white, color: isCreatePost ? Color.gray : Color.blueButtonColor }}
            />
        );
    };

    const screenItemsLogin = [
        {
            name: routes.PERSIONAL_SCREEN,
            component: PersionalScreen,
            options: {
                title: '',
                headerShown: false,
            },
            initialParams: { user, isCreatePost },
        },
        {
            name: routes.PROFILE_SCREEN,
            component: ProfileScreen,
            options: {
                headerShown: false,
            },
            initialParams: { user },
        },
        {
            name: routes.CREATE_POST_SCREEN,
            component: CreatePostScreen,
            options: {
                title: 'Tạo bài viết',
                headerBackTitle: '',
                headerRight: headerRightCreatePost,
                headerTitleAlign: 'center',
            },
            initialParams: { isCreatePost },
        },
    ];

    return (
        <StackHome.Navigator
            initialRouteName={routes.PERSIONAL_SCREEN}
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
                <StackHome.Screen key={index} name={item.name} component={item.component} options={item.options} initialParams={item.initialParams} />
            ))}
        </StackHome.Navigator>
    );
};

export default PersionalStack;
