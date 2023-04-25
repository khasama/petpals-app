import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    RefreshControl,
    Dimensions
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import getProduct from '../api/getProductDetail';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");

const Product = ({ route, navigation }) => {
    const id = route.params.id;

    const [product, setProduct] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

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

    useEffect(() => {
        callApiGetProductDetail();
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
                                onPress={() => { }}
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
});