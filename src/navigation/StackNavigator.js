import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home';
import AnimalScreen from '../screens/Animal';
import ItemScreen from '../screens/Item';
import PetScreen from '../screens/Pet';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import CartScreen from '../screens/Cart';
import AuthScreen from '../screens/Auth';
import ProductScreen from '../screens/Product';

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false,
};

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    )
}

const ItemStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ItemScreen" component={ItemScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    )
}

const AnimalStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="AnimalScreen" component={AnimalScreen} />
            <Stack.Screen name="PetScreen" component={PetScreen} />
        </Stack.Navigator>
    )
}

const CartStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    )
}

export { HomeStackNavigator, SearchStackNavigator, ItemStackNavigator, AnimalStackNavigator, CartStackNavigator }