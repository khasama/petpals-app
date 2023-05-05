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
import { itemsSelector } from '../redux/selectors';
import { LinearGradient } from 'expo-linear-gradient';
import getProducts from '../api/getProducts';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Item = () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const items = useSelector(itemsSelector);
    const [subitems, setSubitems] = useState([]);
    const [defaultValue, setDefaultValue] = useState('Loại');
    const dropdownRef = useRef({});
    const sortMenu = ["Mới nhất", "Cũ nhất", "Giá tăng dần", "Giá giảm dần"];
    const [sortSelected, setSortSelected] = useState(0);

    const [arrProduct, setArrProduct] = useState([]);
    const [item, setItem] = useState(null);
    const [subitem, setSubitem] = useState(null);

    const callApiGetProducts = async () => {
        try {
            const rs = await getProducts(item, subitem, null, null, sortSelected);
            if (rs.status == "success") {
                if (rs.data != null) setArrProduct(rs.data);
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

    useEffect(() => {
        callApiGetProducts();
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
                            flexDirection: 'column',
                            marginBottom: 5
                        }}
                    >
                        <SelectDropdown
                            data={items}
                            defaultButtonText={'Phụ kiện'}
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
                                width: '90%',
                                marginVertical: 5
                            }}
                            onSelect={(selectedItem, index) => {
                                setItem(selectedItem._id);
                                setSubitem(0);
                                setSubitems(subitem => ([...[{ name: 'Tất cả', _id: 0 }], ...selectedItem.subitem]));
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
                            data={subitems}
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
                                width: '90%',
                                marginVertical: 5
                            }}
                            onSelect={(selectedItem, index) => {
                                setSubitem(selectedItem._id);
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
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: 5
                        }}
                    >
                        <SelectDropdown
                            data={sortMenu}
                            defaultValueByIndex={0}
                            defaultValue={"Mới nhất"}
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
                                setSortSelected(index);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            renderDropdownIcon={() => {
                                return <Icon name="chevron-down-outline" size={25} color={'#000'} />
                            }}
                        />
                        <Button
                            style={{
                                backgroundColor: "#fc4503",
                                alignSelf: 'center',
                            }}
                            mode="contained"
                            labelStyle={{ color: "#fff", fontFamily: "MaliBold" }}
                            onPress={() => callApiGetProducts()}
                        >
                            Lọc
                        </Button>
                    </View>
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
                        arrProduct.map((e, i) =>
                            <TouchableOpacity
                                key={e._id}
                                style={{ width: width / 2.5, marginHorizontal: 10, }}
                                onPress={() => { navigation.navigate('ProductScreen', { id: e._id, }); }}
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

export default Item;

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