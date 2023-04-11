import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";

export default function App() {
	return (
		<View style={styles.container}>
			<NavigationContainer>
				<DrawerNavigator></DrawerNavigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		flex: 1,
		backgroundColor: '#fff',
	},
});
