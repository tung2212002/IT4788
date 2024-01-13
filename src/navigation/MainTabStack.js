/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import SettingStack from './SettingStack';
import HomeStack from './HomeStack';
import PersionalStack from './PersionalStack';
import { selectUser } from '../redux/features/auth/authSlice';
import routes from '../constants/route';
import FriendStack from './FriendStack';
import NotificationStack from './NotificationStack';
import VideoStack from './VideoStack';

const VectorIconStyled = styled(VectorIcon)``;

const TabStack = createMaterialTopTabNavigator();

const MainTabStack = ({ user }) => {
    let userNew = useSelector(selectUser);

    const screenItemsLogin = [
        {
            name: routes.HOME_STACK,
            component: HomeStack,
            icon: 'home-outline',
            iconFocused: 'home',
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },

        {
            name: routes.FRIEND_STACK,
            component: FriendStack,
            icon: 'users',
            iconFocused: 'user-friends',
            sizeIcon: 26,
            typeIcon: 'Feather',
            typeIconFocused: 'FontAwesome5',
        },
        {
            name: routes.VIDEO_STACK,
            component: VideoStack,
            icon: 'television-play',
            iconFocused: 'youtube-tv',
            sizeIconFocused: 30,
            sizeIcon: 28,
            typeIcon: 'MaterialCommunityIcons',
            typeIconFocused: 'MaterialCommunityIcons',
        },
        {
            name: routes.NOTIFICATION_STACK,
            component: NotificationStack,
            icon: 'bell',
            iconFocused: 'bell-fill',
            typeIcon: 'Octicons',
            typeIconFocused: 'Octicons',
        },
        {
            name: routes.SETTING_STACK,
            component: SettingStack,
            icon: 'reorder-three',
            iconFocused: 'reorder-three',
            sizeIcon: 30,
            sizeIconFocused: 30,
            typeIcon: 'Ionicons',
            typeIconFocused: 'Ionicons',
        },
    ];

    return (
        <TabStack.Navigator
            initialRouteName={userNew.active === '-1' ? routes.SETTING_STACK : routes.HOME_STACK}
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
                tabBarPressColor: Color.lightGray,
                lazy: false,
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
    );
};

export default MainTabStack;
