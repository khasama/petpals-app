import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import {
    isLoggedInSelector,
    currentUserSelector
} from '../redux/selectors';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Profile = () => {
    const navigation = useNavigation();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const currentUser = useSelector(currentUserSelector);
    const [refreshing, setRefreshing] = useState(false);

    const [email, setEmail] = useState(currentUser.email);
    const [fullName, setFullName] = useState(currentUser.fullName || '');
    const [address, setaddress] = useState(currentUser.address || '');
    const [phone, setPhone] = useState(currentUser.phone || '');

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (isLoggedIn) {

            } else {
                navigation.navigate('AuthScreen');
            }
        }, [isLoggedIn])
    );

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigation.navigate('AuthScreen');
    //     }
    //     return () => {
    //     }
    // }, [isLoggedIn]);
    return (
        <View style={styles.container}>
            <Header allowBack={false}></Header>

            <ScrollView
                nestedScrollEnabled
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{
                    width: '100%',
                    height: height / 4,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <LinearGradient
                        colors={['#E72515', '#FE6518']}
                        start={[0, 1]}
                        end={[1, 1]}
                        style={{
                            width: 1500,
                            height: 1500,
                            borderRadius: 1500 / 2,
                            position: 'absolute',
                            top: -1340,
                        }}
                    >
                    </LinearGradient>

                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: 20
                        }}
                    >
                        <View
                            style={{
                                marginRight: 10
                            }}
                        >
                            <Image
                                source={{ uri: currentUser.avatar }}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30
                                }}
                            />
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: "#fff",
                                    fontFamily: "Mali",
                                    fontSize: 16
                                }}
                            >
                                {currentUser.email}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    borderRadius: 5
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#E72515',
                                        fontFamily: 'Mali'
                                    }}
                                >
                                    Đơn hàng của bạn
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View
                    style={{
                        paddingHorizontal: 20
                    }}
                >
                    <TextInput
                        mode='outlined'
                        label="Email"
                        value={email}
                        disabled
                        onChangeText={text => { }}
                        style={{
                            marginVertical: 5,
                        }}
                        contentStyle={{
                            fontFamily: 'Mali'
                        }}
                        labelStyle={{ fontFamily: 'Mali' }}
                    />
                    <TextInput
                        mode='outlined'
                        label="Họ tên"
                        value={fullName}
                        activeOutlineColor="#E72515"
                        onChangeText={text => { }}
                        style={{
                            marginVertical: 5,
                        }}
                        contentStyle={{
                            fontFamily: 'Mali'
                        }}
                        labelStyle={{ fontFamily: 'Mali' }}
                    />
                    <TextInput
                        mode='outlined'
                        label="Địa chỉ"
                        value={address}
                        activeOutlineColor="#E72515"
                        onChangeText={text => { }}
                        style={{
                            marginVertical: 5,
                        }}
                        contentStyle={{
                            fontFamily: 'Mali'
                        }}
                        labelStyle={{ fontFamily: 'Mali' }}
                    />
                    <TextInput
                        mode='outlined'
                        label="Số điện thoại"
                        value={phone}
                        activeOutlineColor="#E72515"
                        onChangeText={text => { }}
                        style={{
                            marginVertical: 5,
                        }}
                        contentStyle={{
                            fontFamily: 'Mali'
                        }}
                    />

                    <Button
                        labelStyle={{
                            fontFamily: 'MaliBold'
                        }}
                        style={{
                            alignSelf: 'center'
                        }}
                        mode="contained"
                        buttonColor="#E72515"
                        onPress={() => console.log('Pressed')}
                    >
                        Lưu
                    </Button>
                </View>

            </ScrollView >
        </View >
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFBED"
    },
    scrollView: {
        paddingBottom: 20,
    },
    prodThumb: {
        width: width / 2.5,
        height: width / 2.5,
        resizeMode: 'contain',
        backgroundColor: "#fff"
    },
    prodDetailCtn: {
        width: '100%',
        height: width / 4,
        paddingHorizontal: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        top: -10
    },
    prodDetail: {
        color: "#fff",
        fontFamily: 'MaliBold',
        textAlign: 'center'
    }
});