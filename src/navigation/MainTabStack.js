/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';

import FriendsScreen from '../screens/FriendsScreen';
import GroupScreen from '../screens/GroupScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PersionalScreen from '../screens/PersionalScreen';
import SettingScreen from '../screens/SettingScreen';
import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';

const VectorIconStyled = styled(VectorIcon)``;

const TabStack = createMaterialTopTabNavigator();

const MainTabStack = ({ navigation }) => {
    const screenItemsLogin = [
        {
            name: 'HomeScreen',
            component: HomeScreen,
            icon: 'home-outline',
            iconFocused: 'home',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },

        {
            name: 'FriendsScreen',
            component: FriendsScreen,
            icon: 'users',
            iconFocused: 'user-friends',
            typeIcon: 'Feather',
            typeIconFocused: 'FontAwesome5',
        },
        {
            name: 'GroupScreen',
            component: GroupScreen,
            icon: 'account-group-outline',
            iconFocused: 'account-group',
            typeIcon: 'MaterialCommunityIcons',
            typeIconFocused: 'MaterialCommunityIcons',
        },
        {
            name: 'NotificationScreen',
            component: NotificationScreen,
            icon: 'bell-o',
            iconFocused: 'bell',
            typeIcon: 'FontAwesome',
            typeIconFocused: 'FontAwesome',
        },
        {
            name: 'PersionalScreen',
            component: PersionalScreen,
            icon: 'person-circle-outline',
            iconFocused: 'person-circle',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
        {
            name: 'SettingScreen',
            component: SettingScreen,
            icon: 'reorder-three',
            iconFocused: 'reorder-three',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
    ];

    return (
        <NavigationContainer>
            <TabStack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: Color.white,
                    },
                }}
            >
                {screenItemsLogin.map((item, index) => (
                    <TabStack.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                        options={{
                            tabBarLabel: ({ focused }) => (
                                <VectorIconStyled
                                    nameIcon={focused ? item.iconFocused : item.icon}
                                    typeIcon={focused ? item.typeIconFocused : item.typeIcon}
                                    size={24}
                                    color={focused ? Color.blueButtonColor : Color.gray}
                                />
                            ),
                        }}
                    />
                ))}
            </TabStack.Navigator>
        </NavigationContainer>
    );
};

export default MainTabStack;
