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
import CheckoutScreen from '../screens/Checkout';
import MypetsScreen from '../screens/Mypets';

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false,
};

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="PetScreen" component={PetScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Profile">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="MypetsScreen" component={MypetsScreen} />
            <Stack.Screen name="PetScreen" component={PetScreen} />
        </Stack.Navigator>
    )
}

const ItemStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Item">
            <Stack.Screen name="ItemScreen" component={ItemScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}

const AnimalStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Animal">
            <Stack.Screen name="AnimalScreen" component={AnimalScreen} />
            <Stack.Screen name="PetScreen" component={PetScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}

const CartStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Cart">
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
    )
}

export { HomeStackNavigator, ProfileStackNavigator, ItemStackNavigator, AnimalStackNavigator, CartStackNavigator }