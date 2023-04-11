import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
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
            {/* <Stack.Screen name="FilterScreen" component={FilterScreen} /> */}
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

// const ExploreStackNavigator = () => {
//     return (
//         <Stack.Navigator screenOptions={screenOptionStyle}>
//             {/* <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
//             <Stack.Screen name="LiveScreen" component={LiveScreen} /> */}
//         </Stack.Navigator>
//     )
// }

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            {/* <Stack.Screen name="LibraryScreen" component={LibraryScreen} /> */}
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    )
}

export { HomeStackNavigator, SearchStackNavigator, ProfileStackNavigator }