import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import { SettingScreen, ProfileScreen } from '../screens';
import ItemRightComponent from '../components/ItemRightComponent';
import { selectUser } from '../redux/features/auth/authSlice';

const StackSetting = createStackNavigator();

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

const headerRight = () => {
    return <ItemRightComponent items={itemsHeaderProfileRight} />;
};

const SettingStack = ({ route, navigation }) => {
    const user = useSelector(selectUser);
    const username = user.username;

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
                title: username,
                headerBackTitle: '',
                headerRight: headerRight,
                headerTitleAlign: 'center',
            },
        },
    ];

    return (
        <StackSetting.Navigator
            initialRouteName="SettingScreen"
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
                <StackSetting.Screen initialParams={{ user }} key={index} name={item.name} component={item.component} options={item.options} />
            ))}
        </StackSetting.Navigator>
    );
};

export default SettingStack;
