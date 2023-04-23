import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    HomeStackNavigator,
    ProfileStackNavigator,
    ItemStackNavigator,
    AnimalStackNavigator,
    CartStackNavigator
} from './StackNavigator';
import { View, Text } from 'react-native';

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
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Animal') {
                        iconName = focused ? 'paw' : 'paw-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Item') {
                        iconName = focused ? 'cube' : 'cube-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                        size = focused ? size + 5 : size;
                    }

                    return route.name === 'Cart' ? (
                        <View style={{ position: 'relative' }}>
                            <Icon name={iconName} size={size} color={color} />
                            <View style={{
                                position: 'absolute',
                                top: -3,
                                right: -3,
                                backgroundColor: '#fc4503',
                                paddingHorizontal: 5,
                                borderRadius: 100
                            }}>
                                <Text style={{ color: "#fff", fontSize: 12, textAlign: 'center' }}>5</Text>
                            </View>
                        </View>
                    ) : (<Icon name={iconName} size={size} color={color} />);
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
            <Tab.Screen name="Animal" component={AnimalStackNavigator} />
            <Tab.Screen name="Item" component={ItemStackNavigator} />
            <Tab.Screen name="Cart" component={CartStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator