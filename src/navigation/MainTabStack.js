/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import SettingStack from './SettingStack';
import { FriendsScreen, GroupScreen, HomeScreen, NotificationScreen, PersionalScreen } from '../screens';

const VectorIconStyled = styled(VectorIcon)``;

const TabStack = createMaterialBottomTabNavigator();

const MainTabStack = ({ navigation, avatar }) => {
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
            name: 'SettingStack',
            component: SettingStack,
            icon: 'reorder-three',
            iconFocused: 'reorder-three',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
            tabBarLabel: undefined,
        },
    ];

    return (
        <NavigationContainer>
            <TabStack.Navigator
                initialRouteName={avatar === '-1' ? 'SettingStack' : 'HomeScreen'}
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: Color.white,
                    },
                }}
                labeled={false}
                barStyle={{ backgroundColor: Color.mainBackgroundColor, height: 60 }}
            >
                {screenItemsLogin.map((item, index) => (
                    <TabStack.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                        initialParams={{ avatar }}
                        options={{
                            tabBarIcon: ({ focused }) => (
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
