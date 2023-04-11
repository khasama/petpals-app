import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
} from 'react-native';
import Header from '../components/Header';
const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);



    useEffect(() => {
        return () => {
            console.log("Home screen Unmount");
        }
    }, []);

    return (
        <View style={styles.container}>
            <Header allowBack={false}></Header>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingBottom: 20
    },
});
export default Home;