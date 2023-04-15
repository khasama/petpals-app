import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import store from './src/redux/store';
import { Provider } from 'react-redux';
import {
	useFonts,
	Mali_200ExtraLight,
	Mali_200ExtraLight_Italic,
	Mali_300Light,
	Mali_300Light_Italic,
	Mali_400Regular,
	Mali_400Regular_Italic,
	Mali_500Medium,
	Mali_500Medium_Italic,
	Mali_600SemiBold,
	Mali_600SemiBold_Italic,
	Mali_700Bold,
	Mali_700Bold_Italic,
} from '@expo-google-fonts/mali';

export default function App() {
	let [fontsLoaded] = useFonts({
		"MaliLigth": Mali_300Light,
		"Mali": Mali_400Regular,
		"MaliMedium": Mali_500Medium,
		"MaliBold": Mali_700Bold,
	});
	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<NavigationContainer>
						<DrawerNavigator></DrawerNavigator>
					</NavigationContainer>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		flex: 1,
		backgroundColor: '#FFFBED',
	},
});
