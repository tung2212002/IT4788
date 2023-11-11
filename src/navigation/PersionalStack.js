import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import { PersionalScreen, ProfileScreen } from '../screens';
import { selectUser } from '../redux/features/auth/authSlice';
import ItemRightComponent from '../components/ItemRightComponent';
import ButtonComponent from '../components/ButtonComponent';
import CreatePostScreen from '../screens/CreatePostComponent';
import { useState } from 'react';

const StackHome = createStackNavigator();

const itemsHeaderProfileRight = [
    {
        nameIcon: 'pencil',
        typeIcon: 'FontAwesome',
    },
    {
        nameIcon: 'search',
        typeIcon: 'FontAwesome',
    },
];

const headerRightProfile = () => {
    return <ItemRightComponent items={itemsHeaderProfileRight} />;
};

const PersionalStack = () => {
    const user = useSelector(selectUser);
    const username = user.username;
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
            name: 'PersionalScreen',
            component: PersionalScreen,
            options: {
                title: '',
                headerShown: false,
            },
            initialParams: { user, isCreatePost },
        },
        {
            name: 'ProfileScreen',
            component: ProfileScreen,
            options: {
                title: username,
                headerBackTitle: '',
                headerRight: headerRightProfile,
                headerTitleAlign: 'center',
            },
            initialParams: { user },
        },
        {
            name: 'CreatePostScreen',
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
            initialRouteName="PersionalScreen"
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
