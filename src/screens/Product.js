import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    RefreshControl,
    Dimensions,
    ToastAndroid,
    FlatList,
    TouchableOpacity
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import getProduct from '../api/getProductDetail';
import getRecommendProducts from '../api/getRecommendProducts';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    isLoggedInSelector,
    currentUserSelector
} from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { addCart } from '../redux/reducers/auth';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

const Product = ({ route, navigation }) => {
    const id = route.params.id;
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const currentUser = useSelector(currentUserSelector);
    const [product, setProduct] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [recommend, setRecommend] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    const callApiGetProductDetail = async () => {
        try {
            const rs = await getProduct(id);
            if (rs.status == "success") {
                if (rs.data != null) setProduct(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, error.message);
        }
    }

    const callApiGetRecommendProduct = async () => {
        try {
            const rs = await getRecommendProducts(id);
            if (rs.status == "success") {
                if (rs.data != null) setRecommend(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, error.message);
        }
    }

    const handleAddCart = () => {
        if (isLoggedIn) {
            dispatch(addCart({ idUser: currentUser.id, idProduct: id, quantity: 1 }))
                .then(unwrapResult)
                .then((result) => {
                    ToastAndroid.show("Thêm giỏ hàng thành công", ToastAndroid.SHORT);
                }).catch((err) => {
                    ToastAndroid.show(err, ToastAndroid.SHORT);
                });
        } else {
            ToastAndroid.show("Vui lòng đăng nhập", ToastAndroid.SHORT);
        }

    }

    useEffect(() => {
        callApiGetProductDetail();
        callApiGetRecommendProduct();
        return () => {
        }
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
                        paddingHorizontal: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                >
                    <View>
                        <Image
                            source={{ uri: product?.images[0] }}
                            style={{
                                width: (7 * width) / 10,
                                height: (7 * width) / 10,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>

                    <View
                        style={{
                            width: '100%'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'MaliMedium',
                                fontSize: 18
                            }}
                        >{product?.name}</Text>
                        <Text
                            style={{
                                fontFamily: 'Mali',
                            }}
                        >{product?.item.name} - {product?.subitem.name}</Text>
                        <Text
                            style={{
                                fontFamily: 'MaliMedium',
                                fontSize: 16
                            }}
                        >
                            Giá:&nbsp;
                            <Text style={{ color: "#E72515" }}>
                                {product?.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                            </Text>
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >

                            <Button
                                buttonColor="#E72515"
                                style={{}}
                                labelStyle={{ fontFamily: 'Mali' }}
                                mode="contained"
                                uppercase={false}
                                onPress={handleAddCart}
                                icon={({ size, color }) => (
                                    <Icon
                                        name="cart-outline" size={size} color={color}
                                    />
                                )}
                            >
                                Thêm giỏ hàng
                            </Button>
                        </View>
                    </View>

                    <View
                        style={{
                            width: '100%'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'MaliMedium',
                                fontSize: 18
                            }}
                        >
                            Mô tả:
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Mali',
                                fontSize: 16
                            }}
                        >
                            {product?.description.replace(/<\/?[^>]+(>|$)/g, "")}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: '100%'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'MaliMedium',
                                fontSize: 18
                            }}
                        >
                            Sản phẩm cùng loại:
                        </Text>
                        <View>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                                horizontal
                                data={recommend}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={{ width: width / 2.5, marginRight: 10, }}
                                        onPress={() => {
                                            navigation.replace('ProductScreen', { id: item._id, });
                                        }}
                                    >
                                        <Image
                                            style={styles.prodThumb}
                                            source={{ uri: `http://192.168.1.17:3321/media/image/${item.images[0]}` }}
                                        />
                                        <LinearGradient
                                            colors={['#E72515', '#FE6518']}
                                            start={[0, 1]}
                                            end={[1, 1]}
                                            style={styles.prodDetailCtn}
                                        >
                                            <Text
                                                style={styles.prodDetail}
                                                numberOfLines={2}
                                            >{item.name}</Text>
                                            <Text
                                                style={styles.prodDetail}
                                                numberOfLines={2}
                                            >{item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                }
                                keyExtractor={item => item._id}
                            />
                        </View>
                    </View>
                </View>


            </ScrollView >
        </View >
    )
}

export default Product;

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