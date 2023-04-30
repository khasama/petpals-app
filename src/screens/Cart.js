import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    RefreshControl,
    Image,
    ToastAndroid
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    currentCartSelector,
    totalSelector,
    currentUserSelector
} from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { updateCart } from '../redux/reducers/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
const Cart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const cart = useSelector(currentCartSelector);
    const total = useSelector(totalSelector);
    const currentUser = useSelector(currentUserSelector);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    const handleUpdateCart = (idProduct, quantity) => {
        dispatch(updateCart({ idUser: currentUser.id, idProduct, quantity }))
            .then(unwrapResult)
            .then((result) => {
                ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
            }).catch((err) => {
                ToastAndroid.show(err, ToastAndroid.SHORT);
            });
    }

    useEffect(() => {
        return () => {
        }
    }, []);

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
                <Text
                    style={{
                        fontFamily: 'MaliBold',
                        fontSize: 18,
                        textAlign: 'center'
                    }}
                >
                    Giỏ hàng của bạn
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 10
                    }}
                >
                    {
                        cart.length > 0 ?
                            (
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
                                        <View>
                                            <Button
                                                buttonColor="#E72515"
                                                style={{
                                                    alignSelf: 'center'
                                                }}
                                                labelStyle={{ fontFamily: 'Mali' }}
                                                mode="contained"
                                                uppercase={false}
                                                onPress={() => handleUpdateCart(e.product._id, 0)}
                                                icon={({ size, color }) => (
                                                    <Icon
                                                        name="trash-outline" size={size} color={color}
                                                    />
                                                )}
                                            >
                                                Xóa
                                            </Button>
                                        </View>
                                    </View>
                                )

                            ) :
                            (<View>
                                <Text
                                    style={{
                                        fontFamily: 'MaliMedium',
                                        color: '#E72515',
                                        textAlign: "center",
                                        fontSize: 16
                                    }}
                                >Bạn chưa có món nào trong giỏ</Text>
                            </View>)
                    }
                </View>
                {
                    cart.length > 0 && (
                        <View
                            style={{
                                marginTop: 10,
                                marginHorizontal: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopWidth: 1,
                                borderColor: "#000"
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'MaliMedium',
                                    fontSize: 18
                                }}
                            >
                                Tổng tiền:&nbsp;
                                <Text
                                    style={{
                                        color: "#E72515"
                                    }}
                                >
                                    {total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}

                                </Text>
                            </Text>
                            <Button
                                buttonColor="#E72515"
                                style={{
                                    alignSelf: 'center'
                                }}
                                labelStyle={{ fontFamily: 'Mali' }}
                                mode="contained"
                                uppercase={false}
                                onPress={() => { navigation.navigate('CheckoutScreen'); }}
                                icon={({ size, color }) => (
                                    <Icon
                                        name="cash-outline" size={size} color={color}
                                    />
                                )}
                            >
                                Thanh toán
                            </Button>
                        </View>
                    )
                }

            </ScrollView >
        </View >
    )
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFBED"
    },
    scrollView: {
        paddingBottom: 20,
    },
});