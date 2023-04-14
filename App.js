import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import store from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
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

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		flex: 1,
		backgroundColor: '#fff',
	},
});
