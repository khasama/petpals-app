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
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { categoriesSelector } from '../redux/selectors';
import { LinearGradient } from 'expo-linear-gradient';
import getPets from '../api/getPets';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Animal = ({ route, navigation }) => {
    const idCategory = route.params?.category;
    // const idSubcategory = route.params?.subcategory;
    const [refreshing, setRefreshing] = useState(false);

    const categories = useSelector(categoriesSelector);
    const [subcategories, setSubcategories] = useState([]);
    const [defaultValue, setDefaultValue] = useState('Loại');
    const dropdownRef = useRef({});

    const [arrPet, setArrPet] = useState([]);
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState(null);

    const callApiGetPets = async (category, subcategory) => {
        try {
            const rs = await getPets(category, subcategory);
            if (rs.status == "success") {
                if (rs.data != null) setArrPet(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, error.message);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            // console.log(route.params);
            // if (route.params?.category && route.params?.subcategory) {
            //     callApiGetPets(route.params.category, route.params.subcategory);
            // } else {
            //     callApiGetPets(category, subcategory);
            // }
            callApiGetPets(category, subcategory);
            return () => { };
        }, [idCategory])
    );

    useEffect(() => {
        return () => {
        }
    }, [idCategory]);
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

                <View
                    style={{
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 5
                        }}
                    >
                        <SelectDropdown
                            data={categories}
                            defaultButtonText={'Thú cưng'}
                            searchInputStyle={{ color: '#fff', fontFamily: 'Mali' }}
                            rowTextStyle={{ color: '#000', fontFamily: 'Mali', textAlign: 'left' }}
                            buttonTextStyle={{ color: '#000', fontFamily: 'Mali', textAlign: 'left' }}
                            dropdownIconPosition={'right'}
                            selectedRowStyle={{ backgroundColor: "#fc4503" }}
                            selectedRowTextStyle={{ color: "#fff" }}
                            buttonStyle={{
                                padding: 5,
                                backgroundColor: 'transparent',
                                borderWidth: 1,
                                borderColor: "#000",
                                borderRadius: 10,
                                width: "45%",
                                marginHorizontal: 5
                            }}
                            onSelect={(selectedItem, index) => {
                                setCategory(selectedItem._id);
                                setSubcategory(0);
                                setSubcategories(subcategory => ([...[{ name: 'Tất cả', _id: 0 }], ...selectedItem.subcategory]));
                                setDefaultValue('Tất cả');
                                dropdownRef.current.reset();
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name;
                            }}
                            renderDropdownIcon={() => {
                                return <Icon name="chevron-down-outline" size={25} color={'#000'} />
                            }}
                        />
                        <SelectDropdown
                            data={subcategories}
                            ref={dropdownRef}
                            search
                            defaultButtonText={defaultValue}
                            defaultValueByIndex={0}
                            searchInputStyle={{ color: '#fff', fontFamily: 'Mali', }}
                            rowTextStyle={{ color: '#000', fontFamily: 'Mali', textAlign: 'left', }}
                            buttonTextStyle={{ color: '#000', fontFamily: 'Mali', textAlign: 'left', }}
                            dropdownIconPosition={'right'}
                            selectedRowStyle={{ backgroundColor: "#fc4503" }}
                            selectedRowTextStyle={{ color: "#fff" }}
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                borderWidth: 1,
                                borderColor: "#000",
                                borderRadius: 10,
                                width: "45%",
                                marginHorizontal: 5
                            }}
                            onSelect={(selectedItem, index) => {
                                setSubcategory(selectedItem._id);
                                // console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name;
                            }}
                            renderSearchInputRightIcon={() => {
                                return <Icon name="search-outline" size={25} color={'#000'} />
                            }}
                            renderDropdownIcon={() => {
                                return <Icon name="chevron-down-outline" size={25} color={'#000'} />
                            }}
                        />
                    </View>
                    <Button
                        style={{
                            backgroundColor: "#fc4503"
                        }}
                        mode="contained"
                        labelStyle={{ color: "#fff", fontFamily: "MaliBold" }}
                        onPress={() => callApiGetPets(category, subcategory)}
                    >
                        Lọc
                    </Button>
                </View>

                <View
                    style={{
                        marginHorizontal: 10,
                        marginBottom: 15
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'MaliMedium',
                            fontSize: 18
                        }}
                    >
                        Chó - Husky: 100 kết quả
                    </Text>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}
                >
                    {
                        arrPet.map((e, i) =>
                            <TouchableOpacity
                                key={e._id}
                                style={{ width: width / 2.5, marginHorizontal: 10, }}
                                onPress={() => { }}
                            >
                                <Image
                                    style={styles.prodThumb}
                                    source={{ uri: `http://192.168.1.3:3321/media/image/${e.images[0]}` }}
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
                                    >{e.name}</Text>
                                    <Text
                                        style={styles.prodDetail}
                                        numberOfLines={2}
                                    >{parseInt(e.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
                                </LinearGradient>

                            </TouchableOpacity>
                        )
                    }

                </View>

            </ScrollView >
        </View >
    )
}

export default Animal

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