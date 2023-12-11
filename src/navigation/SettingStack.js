import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
import { SettingScreen, ProfileScreen } from '../screens';
import ItemRightComponent from '../components/ItemRightComponent';
import { selectUser } from '../redux/features/auth/authSlice';
import routes from '../constants/route';

const StackSetting = createStackNavigator();

// const itemsHeaderProfileRight = [
//     {
//         nameIcon: 'pencil',
//         typeIcon: 'FontAwesome',
//     },
//     {
//         nameIcon: 'search',
//         typeIcon: 'FontAwesome',
//     },
// ];

// const headerRight = () => {
//     return <ItemRightComponent items={itemsHeaderProfileRight} />;
// };

const SettingStack = ({ route, navigation }) => {
    const user = useSelector(selectUser);
    const username = user?.username || 'Người dùng';

    const screenItemsSetting = [
        {
            name: routes.SETTING_SCREEN,
            component: SettingScreen,
            options: {
                title: 'SettingScreen',
                headerShown: false,
            },
        },
        {
            name: routes.PROFILE_SCREEN,
            component: ProfileScreen,
            options: {
                headerShown: false,
                // title: username,
                // headerBackTitle: '',
                // headerRight: headerRightProfile,
                // headerTitleAlign: 'center',
            },
        },
    ];

    return (
        <StackSetting.Navigator
            initialRouteName={routes.SETTING_SCREEN}
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
                <StackSetting.Screen key={index} name={item.name} component={item.component} options={item.options} />
            ))}
        </StackSetting.Navigator>
    );
};

export default SettingStack;
