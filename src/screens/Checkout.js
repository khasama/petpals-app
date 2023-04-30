import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import React, { useState } from 'react';
import {
    currentCartSelector,
    totalSelector,
    currentUserSelector
} from '../redux/selectors';
import { useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import Header from '../components/Header';
import { useCallback } from 'react';

const Checkout = () => {
    const currentUser = useSelector(currentUserSelector);
    const [refreshing, setRefreshing] = useState(false);
    const cart = useSelector(currentCartSelector);
    const total = useSelector(totalSelector);
    const [email, setEmail] = useState(currentUser.email);
    const [fullName, setFullName] = useState(currentUser.fullName || '');
    const [address, setaddress] = useState(currentUser.address || '');
    const [phone, setPhone] = useState(currentUser.phone || '');

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            <Header allowBack={true}></Header>

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
                <View
                    style={{
                        padding: 10
                    }}
                >
                    {
                        cart.map((e, i) =>
                            <View
                                key={e.product._id}
                                style={{
                                    marginVertical: 5
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Image
                                        source={{ uri: e.product.thumb }}
                                        style={{
                                            width: 85,
                                            height: 85,
                                            resizeMode: 'contain',
                                            flex: 1
                                        }}
                                    />
                                    <View
                                        style={{
                                            flex: 3,
                                            marginLeft: 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'MaliMedium'
                                            }}
                                            numberOfLines={2}
                                        >
                                            {e.product.name}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'Mali',
                                                    flex: 1,
                                                }}
                                            >
                                                Số lượng: {e.quantity}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Mali',
                                                    flex: 1,
                                                    textAlign: 'right'
                                                }}
                                            >
                                                Giá: <Text style={{ color: "#E72515" }} >{e.product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
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
                    <TextInput
                        mode='outlined'
                        label="Tổng cộng"
                        value={String(total)}
                        activeOutlineColor="#E72515"
                        disabled
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
                        Thanh toán
                    </Button>
                </View>

            </ScrollView >
        </View >
    )
}

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFBED"
    },
    scrollView: {
        paddingBottom: 20,
    },
});