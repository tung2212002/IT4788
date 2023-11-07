/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import SettingStack from './SettingStack';
import { FriendsScreen, GroupScreen, HomeScreen, NotificationScreen, PersionalScreen } from '../screens';
import HomeStack from './HomeStack';
import PersionalStack from './PersionalStack';

const VectorIconStyled = styled(VectorIcon)``;

const TabStack = createBottomTabNavigator();

const MainTabStack = ({ user }) => {
    const screenItemsLogin = [
        {
            name: 'HomeStack',
            component: HomeStack,
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
            name: 'PersionalStack',
            component: PersionalStack,
            icon: 'person-circle-outline',
            iconFocused: 'person-circle',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
        {
            name: 'SettingStack',
            component: SettingStack,
            icon: 'reorder-three',
            iconFocused: 'reorder-three',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
    ];

    return (
        <NavigationContainer>
            <TabStack.Navigator
                // 1 ==> -1 to check dont have avatar
                initialRouteName={user.avatar === '1' ? 'SettingStack' : 'HomeStack'}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: Color.white,
                    },
                }}
            >
                {screenItemsLogin.map((item, index) => (
                    <TabStack.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                        initialParams={{ user }}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <VectorIconStyled
                                    nameIcon={focused ? item.iconFocused : item.icon}
                                    typeIcon={focused ? item.typeIconFocused : item.typeIcon}
                                    size={24}
                                    color={focused ? Color.blueButtonColor : Color.gray}
                                />
                            ),
                            tabBarShowLabel: false,
                        }}
                    />
                ))}
            </TabStack.Navigator>
        </NavigationContainer>
    );
};

export default MainTabStack;
