import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import Color from '../utils/Color';
import Home from '../screens/Home';

const StackHome = createStackNavigator();

const HomeStack = ({ navigation }) => {
    const screenItemsLogin = [
        {
            name: 'Home',
            component: Home,
            options: {
                title: '',
                headerShown: false,
            },
        },
    ];

    return (
        <NavigationContainer>
            <StackHome.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: Color.white,
                    },
                }}
            >
                {screenItemsLogin.map((item, index) => (
                    <StackHome.Screen key={index} name={item.name} component={item.component} options={item.options} />
                ))}
            </StackHome.Navigator>
        </NavigationContainer>
    );
};

export default HomeStack;
