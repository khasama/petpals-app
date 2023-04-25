import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import getProducts from '../api/getProducts';
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
const ListProduct = () => {
    const navigation = useNavigation();
    const [arrProduct, setArrProduct] = useState([]);
    const callApiGetProducts = async () => {
        try {
            const rs = await getProducts();
            if (rs.status == "success") {
                if (rs.data != null) setArrProduct(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, error.message);
        }
    }

    useEffect(() => {
        callApiGetProducts();
        return () => { }
    }, []);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={require('../images/skull.png')}
                    style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        marginHorizontal: 10,
                    }}
                />
                <Text
                    style={{
                        fontFamily: 'MaliBold',
                        fontSize: 18,
                    }}
                >
                    Phụ kiện dành cho thú cưng
                </Text>
                <Image
                    source={require('../images/skull.png')}
                    style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        marginHorizontal: 10,
                    }}
                />
            </View>
            <View style={{ marginTop: 10, padding: 5 }}>
                <View style={{}}>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                        horizontal
                        data={arrProduct}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ width: width / 2.5, marginRight: 10, }}
                                onPress={() => {
                                    navigation.navigate('ProductScreen', { id: item._id, });
                                }}
                            >
                                <Image
                                    style={styles.prodThumb}
                                    source={{ uri: `http://192.168.1.3:3321/media/image/${item.images[0]}` }}
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
    )
}

export default ListProduct;

const styles = StyleSheet.create({
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