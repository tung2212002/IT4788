import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from '../screens/AuthScreen';
import Home from '../screens/ProfileScreen';
import Color from '../utils/Color';

const Stack = createStackNavigator();

function AppContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="AuthScreen"
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: Color.white,
                    },
                }}
            >
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
