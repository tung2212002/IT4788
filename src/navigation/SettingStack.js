import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../utils/Color';
import { SettingScreen, ProfileScreen } from '../screens';

const StackSetting = createStackNavigator();

const SettingStack = ({ route, navigation }) => {
    const avatar = route.params?.avatar;
    const screenItemsSetting = [
        {
            name: 'SettingScreen',
            component: SettingScreen,
            options: {
                title: 'SettingScreen',
                headerShown: false,
            },
        },
        {
            name: 'ProfileScreen',
            component: ProfileScreen,
            options: {
                title: 'Trang cá nhân',
                headerBackTitle: '',
                // headerShown: false,
            },
        },
    ];
    return (
        <StackSetting.Navigator
            initialRouteName="SettingScreen"
            initialParams={{ avatar }}
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.mainBackgroundColor,
                    borderBottomWidth: 1,
                },
                headerTintColor: Color.black,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {screenItemsSetting.map((item, index) => (
                <StackSetting.Screen initialParams={{ avatar }} key={index} name={item.name} component={item.component} options={item.options} />
            ))}
        </StackSetting.Navigator>
    );
};

export default SettingStack;
