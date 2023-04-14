import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ToastAndroid, TouchableOpacity, } from 'react-native';
import { Drawer, Text, Button, List } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCategories } from '../redux/reducers/category';
import { getItems } from '../redux/reducers/item';
import {
    categoriesSelector,
    itemsSelector
} from '../redux/selectors';

import Icon from 'react-native-vector-icons/Ionicons';

const DrawerContent = (props) => {
    const dispatch = useDispatch();
    const [petList, setPetList] = useState('');
    const [itemList, setItemList] = useState('');

    const categories = useSelector(categoriesSelector);
    const items = useSelector(itemsSelector);
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

    useEffect(() => {
        dispatch(getCategories())
            .then(unwrapResult)
            .catch((err) => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
            });
        dispatch(getItems())
            .then(unwrapResult)
            .catch((err) => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
            });
        return () => {
        }
    }, []);

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
                    <List.AccordionGroup>

                        <List.Accordion
                            style={styles.list}
                            titleStyle={[styles.drawerTitle, styles.listTitle]}
                            title="Thú Cưng"
                            id="1"
                            left={() => <Icon name="paw-outline" size={25} color="#000" />}
                            right={({ isExpanded }) => {
                                if (isExpanded) return <Icon name="chevron-forward-outline" size={20} color="#000" />
                                return <Icon name="chevron-down-outline" size={20} color="#000" />
                            }}
                        >
                            {
                                categories.map((e, i) => {
                                    return (
                                        <View key={i} style={{
                                            flex: 1,
                                            marginLeft: -30,
                                        }}>
                                            <List.Item
                                                style={{}}
                                                onPress={() => {
                                                    if (petList == e.slug) {
                                                        setPetList(false);
                                                    } else {
                                                        setPetList(e.slug);
                                                    }
                                                }}
                                                titleStyle={styles.listItem}
                                                title={e.name}
                                                left={props => {
                                                    if (e.slug == 'cho') {
                                                        return <Text {...props}>🐶</Text>
                                                    } else if (e.slug == 'meo') {
                                                        return <Text {...props}>🐱</Text>
                                                    }

                                                }}

                                            />
                                            <View style={[{ marginLeft: 30, flex: 1 }, { display: petList == e.slug ? 'flex' : 'none' }]}>
                                                {
                                                    e.subcategory.map((sc, index) =>
                                                    (
                                                        <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 35 }} key={index}>
                                                            <Text style={{}}>
                                                                {sc.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                    )
                                                }

                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </List.Accordion>

                        <List.Accordion
                            style={styles.list}
                            titleStyle={[styles.drawerTitle, styles.listTitle]}
                            title="Phụ Kiện"
                            id="2"
                            left={() => <Icon name="cube-outline" size={25} color="#000" />}
                            right={({ isExpanded }) => {
                                if (isExpanded) return <Icon name="chevron-forward-outline" size={20} color="#000" />
                                return <Icon name="chevron-down-outline" size={20} color="#000" />
                            }}
                        >
                            {
                                items.map((e, i) => {
                                    return (
                                        <View key={i} style={{
                                            flex: 1,
                                            marginLeft: -30,
                                        }}>
                                            <List.Item
                                                style={{}}
                                                onPress={() => {
                                                    if (itemList == e.slug) {
                                                        setItemList(false);
                                                    } else {
                                                        setItemList(e.slug);
                                                    }
                                                }}
                                                titleStyle={styles.listItem}
                                                title={e.name}
                                                left={props => {
                                                    if (e.slug == 'phu-kien-cho-cho') {
                                                        return <Text {...props}>🐶</Text>
                                                    } else if (e.slug == 'phu-kien-cho-meo') {
                                                        return <Text {...props}>🐱</Text>
                                                    }

                                                }}

                                            />
                                            <View style={[{ marginLeft: 30, flex: 1 }, { display: itemList == e.slug ? 'flex' : 'none' }]}>
                                                {
                                                    e.subitem.map((si, index) =>
                                                    (
                                                        <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 35 }} key={index}>
                                                            <Text style={{}}>
                                                                {si.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                    )
                                                }

                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </List.Accordion>

                    </List.AccordionGroup>
                </Drawer.Section>

            </DrawerContentScrollView>
        </View >
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
        paddingLeft: 17
    },
    listTitle: {
        marginLeft: 25
    },
    listItem: {
        color: "#000",
        fontSize: 15,
        fontFamily: '',

    }
});