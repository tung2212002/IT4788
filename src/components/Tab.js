/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Learn from '../screens/Learn';
import Learn2 from '../screens/Learn2';
import Learn3 from '../screens/Learn3';

const Tabbar = createBottomTabNavigator();

function Tab() {
    return (
        <NavigationContainer>
            <Tabbar.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Learn') {
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        }
                        // else if (route.name === 'Learn2') {
                        //     iconName = focused
                        //         ? 'ios-list'
                        //         : 'ios-list-outline';
                        // }
                        else if (route.name === 'Learn3') {
                            iconName = focused ? 'alarm' : 'alarm-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },

                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'grey',
                    headerStyle: {
                        backgroundColor: 'blue',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                    },
                })}
            >
                <Tabbar.Screen name="Learn" component={Learn} />
                {/* <Tabbar.Screen name="Learn2" component={Learn2} /> */}
                <Tabbar.Screen name="Learn3" component={Learn3} />
            </Tabbar.Navigator>
        </NavigationContainer>
    );
}

export default Tab;
