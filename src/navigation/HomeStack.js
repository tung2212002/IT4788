import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import { HomeScreen, ProfileScreen } from '../screens';
import { selectUser } from '../redux/features/auth/authSlice';
import ItemRightComponent from '../components/ItemRightComponent';
import CreatePostScreen from '../screens/CreatePostComponent';
import ButtonComponent from '../components/ButtonComponent';

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

const headerRightCreatePost = () => {
    return <ButtonComponent title="ĐĂNG" />;
};

const HomeStack = () => {
    const user = useSelector(selectUser);
    const username = user.username;

    const screenItemsLogin = [
        {
            name: 'HomeScreen',
            component: HomeScreen,
            options: {
                title: '',
                headerShown: false,
            },
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
        },
    ];

    return (
        <StackHome.Navigator
            initialRouteName="HomeScreen"
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
                <StackHome.Screen key={index} name={item.name} component={item.component} options={item.options} initialParams={{ user }} />
            ))}
        </StackHome.Navigator>
    );
};

export default HomeStack;
