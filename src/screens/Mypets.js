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
    currentUserSelector
} from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import getMypets from '../api/getMypets';

import { useNavigation } from '@react-navigation/native';
const Mypets = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [pets, setPets] = useState([]);
    const currentUser = useSelector(currentUserSelector);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    const callApiGetMypets = async () => {
        try {
            const rs = await getMypets(currentUser.id);
            if (rs.status == "success") {
                if (rs.data != null) setPets(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, error.message);
        }
    }

    useEffect(() => {
        callApiGetMypets();
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
                <Text
                    style={{
                        fontFamily: 'MaliBold',
                        fontSize: 18,
                        textAlign: 'center'
                    }}
                >
                    Thú cưng của bạn
                </Text>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 10
                    }}
                >
                    {
                        pets.length > 0 ?
                            (
                                pets.map((e, i) =>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PetScreen', { id: e._id, })}
                                        key={e._id}
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
                                                source={{ uri: e.thumb }}
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
                                                    {e.name}
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
                                                        Giá: <Text style={{ color: "#E72515" }} >{e.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
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
                                >Bạn chưa đăng bán thú cưng</Text>
                            </View>)
                    }
                </View>
            </ScrollView >
        </View >
    )
}

export default Mypets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFBED"
    },
    scrollView: {
        paddingBottom: 20,
    },
});