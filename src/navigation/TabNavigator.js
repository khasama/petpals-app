import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HomeStackNavigator, SearchStackNavigator, ProfileStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

const getRouteName = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
        routeName?.includes('ProductScreen') ||
        routeName?.includes('AuthScreen')
    ) {
        return "none";
    }
    return "flex";
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                        size = focused ? size + 5 : size;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#fc4503',
                tabBarInactiveTintColor: '#000',
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 40,
                    display: getRouteName(route)
                }

            })}>
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator