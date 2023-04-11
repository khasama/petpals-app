import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ToastAndroid } from 'react-native';
import { Drawer, Text, Button, List } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

const DrawerContent = (props) => {

    // const genres = useSelector(genresSelector);
    // const years = useSelector(yearsSelector);
    // const countries = useSelector(countriesSelector);
    // const isLoggedIn = useSelector(isLoggedInSelector);
    // const currentUser = useSelector(currentUserSelector);

    // const handleLogout = () => {
    //     dispatch(logout())
    //         .then(unwrapResult)
    //         .then(() => {
    //             props.navigation.navigate("Home");
    //         })
    //         .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT));
    // }

    // useEffect(() => {
    //     dispatch(getGenres());
    //     dispatch(getYears());
    //     dispatch(getCountries());
    //     return () => {
    //     }
    // }, []);

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.logoConainer}>
                    <Image source={require('../images/logo.png')} style={styles.logoImage} />
                </View>
                <Drawer.Section style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    {/* <View style={styles.authSection}>
                        {
                            isLoggedIn ?
                                (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        <Image
                                            source={{ uri: currentUser.avatar }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: "contain",
                                                borderRadius: 100,

                                            }}
                                        />
                                        <View
                                            style={{
                                                paddingHorizontal: 10,
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontFamily: '', fontSize: 18 }}>
                                                {currentUser.username}
                                            </Text>
                                            <Text style={{ color: "#fff", fontFamily: '', fontSize: 12 }}>
                                                {currentUser.email}
                                            </Text>
                                        </View>
                                    </View>
                                ) :
                                (
                                    <View>
                                        <Text style={{ color: "#fff", textAlign: "center", fontFamily: '' }}>
                                            Bạn chưa đăng nhập
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Button
                                                style={styles.authBtn}
                                                labelStyle={{ fontFamily: '' }}
                                                icon={({ size, color }) => (
                                                    <Icon
                                                        name="log-in-outline" size={size} color={color}
                                                    />
                                                )}
                                                mode="contained"
                                                uppercase={false}
                                                onPress={() => props.navigation.navigate("AuthScreen")}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </View>
                                    </View>
                                )
                        }
                    </View> */}
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection} >
                    <DrawerItem
                        icon={({ size, color }) => (
                            <Icon
                                name="home-outline" size={size} color="#000"
                            />
                        )}
                        label={() => {
                            return <Text style={styles.drawerTitle}>Trang Chủ</Text>
                        }}
                        onPress={() => {
                            props.navigation.navigate('HomeScreen');
                        }}
                    />
                    <DrawerItem
                        icon={({ size, color }) => (
                            <Icon
                                name="search-outline" size={size} color="#000"
                            />
                        )}
                        label={() => {
                            return <Text style={styles.drawerTitle}>Tìm Kiếm</Text>
                        }}
                        onPress={() => {
                            props.navigation.navigate('SearchScreen');
                        }}
                    />
                </Drawer.Section>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.authSection}></View>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    authSection: {
        color: "#fff",
        marginTop: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    logoConainer: {
        height: 50,
        padding: 5
    },
    logoImage: {
        width: undefined,
        height: undefined,
        flex: 1,
        resizeMode: 'contain',
    },
    authBtn: {
        marginHorizontal: 2,
        padding: 0,
        marginVertical: 10
    },
    drawerSection: {
    },
    drawerTitle: {
        color: "#000",
        fontSize: 17,
        fontFamily: ''
    },
    list: {
        backgroundColor: "#222222",
        paddingLeft: 17
    },
    listTitle: {
        marginLeft: 18
    },
    listItem: {
        color: "#000",
        fontSize: 14,
        fontFamily: ''
    }
});