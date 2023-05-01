import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    Dimensions,
    Alert
} from 'react-native';
import React, { useState, useCallback } from 'react';
import {
    currentCartSelector,
    totalSelector,
    currentUserSelector
} from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, RadioButton, Provider, Portal, Modal } from 'react-native-paper';
import Header from '../components/Header';
import { clear } from '../redux/reducers/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import checkout from '../api/checkout';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Checkout = () => {
    const navigation = useNavigation();
    const currentUser = useSelector(currentUserSelector);
    const [refreshing, setRefreshing] = useState(false);
    const cart = useSelector(currentCartSelector);
    const total = useSelector(totalSelector);
    const [idOrder, setIdOrder] = useState(null);
    const dispatch = useDispatch();
    const [email, setEmail] = useState(currentUser.email);
    const [fullName, setFullName] = useState(currentUser.fullName || '');
    const [address, setAddress] = useState(currentUser.address || '');
    const [phone, setPhone] = useState(currentUser.phone || '');
    const [paymentMethod, setPaymentMethod] = useState(0);
    const [visibleSearchModal, setVisibleSearchModal] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    const handleCheckout = async () => {
        if (email.length != 0 && fullName.length != 0 && address.length != 0 && phone.length != 0) {
            const rs = await checkout({ idUser: currentUser.id, paymentMethod, fullName, email, address, phone });
            if (rs.status == "success") {
                if (rs.data) {
                    setVisibleSearchModal(true);
                    setIdOrder(rs.data);
                } else {
                    dispatch(clear())
                        .then(unwrapResult)
                        .then(() => {
                            ToastAndroid.show("Thành công", ToastAndroid.SHORT);
                            navigation.navigate("Home");
                        })
                        .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT));
                }
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <Provider>
                <Portal>
                    <Modal
                        visible={visibleSearchModal}
                        contentContainerStyle={{ backgroundColor: '#FFFBED', padding: 10, marginHorizontal: 10, height: height * 0.8 }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={require('../images/QRmomo.png')}
                                style={{
                                    width: '80%',
                                    resizeMode: 'contain',
                                    marginHorizontal: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: 'MaliBold',
                                    fontSize: 18
                                }}
                            >
                                Thông tin người nhận tiền:
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'MaliMedium',
                                    fontSize: 16
                                }}
                            >
                                Tên tài khoản: Nguyễn Việt K
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'MaliMedium',
                                    fontSize: 16
                                }}
                            >
                                Số điện thoại Momo: 0905082320
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'MaliMedium',
                                    fontSize: 16
                                }}
                            >
                                Nội dung chuyển khoản &nbsp;
                                <Text style={{ color: "#E72515" }}>
                                    (bắt buộc)
                                </Text>
                                :

                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'MaliBold',
                                    fontSize: 18,
                                    marginBottom: 10
                                }}
                            >
                                #{idOrder}
                            </Text>

                            <Button
                                labelStyle={{
                                    fontFamily: 'MaliBold'
                                }}
                                style={{
                                    alignSelf: 'center'
                                }}
                                mode="contained"
                                buttonColor="#E72515"
                                onPress={() => {
                                    setVisibleSearchModal(false);
                                    dispatch(clear())
                                        .then(unwrapResult)
                                        .then(() => {
                                            ToastAndroid.show("Thành công", ToastAndroid.SHORT);
                                            navigation.navigate("Home");
                                        })
                                        .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT));
                                }}
                            >
                                Hoàn tất
                            </Button>

                        </View>
                    </Modal>
                </Portal>

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
                    <Text
                        style={{
                            fontFamily: 'MaliBold',
                            fontSize: 18,
                            textAlign: 'center'
                        }}
                    >
                        Thông tin đơn hàng
                    </Text>
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
                            autoCapitalize='none'
                            onChangeText={text => { setEmail(text) }}
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
                            onChangeText={text => { setFullName(text) }}
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
                            onChangeText={text => { setAddress(text) }}
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
                            onChangeText={text => { setPhone(text) }}
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
                        <View>
                            <Text
                                style={{
                                    fontFamily: 'Mali',
                                    fontSize: 17
                                }}
                            >
                                Chọn phương thức thanh toán:
                            </Text>
                            <View>
                                <RadioButton.Item
                                    status={paymentMethod === 0 ? 'checked' : 'unchecked'}
                                    uncheckedColor="gray"
                                    color={"#E72515"}
                                    mode={'android'}
                                    label="Thanh toán khi nhận hàng"
                                    labelStyle={{ fontFamily: "Mali" }}
                                    value={0}
                                    onPress={() => setPaymentMethod(0)}
                                />
                                <RadioButton.Item
                                    status={paymentMethod === 1 ? 'checked' : 'unchecked'}
                                    color={"#E72515"}
                                    uncheckedColor="gray"
                                    mode={'android'}
                                    label="Momo"
                                    labelStyle={{ fontFamily: "Mali" }}
                                    value={0}
                                    onPress={() => setPaymentMethod(1)}
                                />
                            </View>

                        </View>

                        <Button
                            labelStyle={{
                                fontFamily: 'MaliBold'
                            }}
                            style={{
                                alignSelf: 'center'
                            }}
                            mode="contained"
                            buttonColor="#E72515"
                            onPress={handleCheckout}
                        >
                            Thanh toán
                        </Button>
                    </View>

                </ScrollView >
            </Provider>
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