/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import SettingStack from './SettingStack';
import { FriendsScreen, GroupScreen, NotificationScreen } from '../screens';
import HomeStack from './HomeStack';
import PersionalStack from './PersionalStack';
import { selectUser } from '../redux/features/auth/authSlice';

const VectorIconStyled = styled(VectorIcon)``;

// const TabStack = createBottomTabNavigator();
const TabStack = createMaterialTopTabNavigator();

const MainTabStack = ({ user }) => {
    let userNew = useSelector(selectUser);

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
            sizeIcon: 26,
            typeIcon: 'Feather',
            typeIconFocused: 'FontAwesome5',
        },
        {
            name: 'GroupScreen',
            component: GroupScreen,
            icon: 'account-group-outline',
            iconFocused: 'account-group',
            sizeIconFocused: 30,
            sizeIcon: 30,
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
            sizeIcon: 28,
            sizeIconFocused: 28,
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
        {
            name: 'SettingStack',
            component: SettingStack,
            icon: 'reorder-three',
            iconFocused: 'reorder-three',
            sizeIcon: 30,
            sizeIconFocused: 30,
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
    ];

    useEffect(() => {}, [userNew]);

    return (
        <NavigationContainer>
            <TabStack.Navigator
                // 1 ==> -1 to check dont have avatar
                // initialRouteName={user.avatar === '-1' || user.avatar === '' ? 'SettingStack' : 'HomeStack'}
                initialRouteName={'HomeStack'}
                tabBarPosition="bottom"
                screenOptions={{
                    // swipeEnabled: false,
                    tabBarShowLabel: false,
                    tabBarIndicatorStyle: {
                        position: 'absolute',
                        top: 0,
                        height: 3,
                        backgroundColor: Color.blueButtonColor,
                        borderRadius: 10,
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
                                    size={focused ? (item.sizeIconFocused ? item.sizeIconFocused : 24) : item.sizeIcon ? item.sizeIcon : 24}
                                    color={focused ? Color.blueButtonColor : Color.gray}
                                    style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
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
