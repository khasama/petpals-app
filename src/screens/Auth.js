import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextInput, Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import register from '../api/register';
import { login } from '../redux/reducers/auth';
import { isLoggedInSelector } from '../redux/selectors';


const { width, heigth } = Dimensions.get('window');

const Auth = () => {
    const navigation = useNavigation();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [rePasswordRegister, setRePasswordRegister] = useState('');

    const [showTextPassRegis, setShowTextPassRegis] = useState(false);
    const [showTextRePassRegis, setShowTextRePassRegis] = useState(false);
    const [showTextPass, setShowTextPass] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        if (
            validateEmail(emailRegister) != null &&
            emailRegister.length > 0 &&
            passwordRegister.length >= 6 &&
            rePasswordRegister == passwordRegister
        ) {
            const rs = await register(emailRegister, passwordRegister);
            if (rs.status == "success") {
                setEmailRegister('');
                setPasswordRegister('');
                setRePasswordRegister('');
                ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
                setIsLogin(true);
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show(
                "Vui lòng kiểm tra lại thông tin Email phải đúng định dạng và mật khẩu phải có ít nhất 6 kí tự",
                ToastAndroid.SHORT
            );
        }

    }

    const handleLogin = () => {
        if (emailLogin.length != 0 && passwordLogin.length != 0) {
            dispatch(login({ email: emailLogin, password: passwordLogin }))
                .then(unwrapResult)
                .then((result) => {
                    setEmailLogin('');
                    setPasswordLogin('');
                    ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
                    navigation.navigate("Home", { screen: 'HomeScreen' })
                }).catch((err) => {
                    ToastAndroid.show(err, ToastAndroid.SHORT);
                });
        } else {
            ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        if (isLoggedIn) return navigation.navigate("Home", { screen: 'HomeScreen' })
    }, [])


    return (
        <View style={styles.container}>
            <Header allowBack={true}></Header>
            {
                isLogin ?
                    (<View style={styles.form}>
                        <Title style={styles.formTitle}>Đăng nhập</Title>
                        <TextInput
                            autoCapitalize='none'
                            activeUnderlineColor="#E72515"
                            style={styles.formInput}
                            contentStyle={{
                                fontFamily: 'Mali',
                                backgroundColor: '#fde9e8'
                            }}
                            mode="flat"
                            label={<Text style={{ fontFamily: 'Mali' }}>Email</Text>}
                            onChangeText={(text) => {
                                setEmailLogin(text.trim().replace(' ', ''));
                            }}
                            placeholder="Nhập Email"
                        />
                        <View
                            style={{
                                position: 'relative',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                autoCapitalize='none'
                                activeUnderlineColor="#E72515"
                                contentStyle={{
                                    fontFamily: 'Mali',
                                    backgroundColor: '#fde9e8',
                                    paddingRight: 35
                                }}
                                style={styles.formInput}
                                mode="flat"
                                label={<Text style={{ fontFamily: 'Mali' }}>Mật Khẩu</Text>}
                                secureTextEntry={!showTextPass}
                                placeholder="Nhập mật khẩu"
                                onChangeText={(text) => {
                                    setPasswordLogin(text.trim().replace(' ', ''));
                                }}
                            // value={passwordLogin}
                            />
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    right: 8,
                                    top: 22
                                }}
                                onPress={() => setShowTextPass(!showTextPass)}
                            >
                                <Icon
                                    name={showTextPass ? 'eye-off-outline' : 'eye-outline'} size={25} color={"#000"}
                                />
                            </TouchableOpacity>
                        </View>
                        <Button
                            buttonColor="#E72515"
                            style={styles.formBtn}
                            labelStyle={{ fontFamily: 'Mali' }}
                            mode="contained"
                            uppercase={false}
                            onPress={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </View>) :
                    (<View style={styles.form}>
                        <Title style={styles.formTitle}>Đăng ký</Title>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.formInput}
                            activeUnderlineColor="#E72515"
                            mode="flat"
                            contentStyle={{
                                fontFamily: 'Mali',
                                backgroundColor: '#fde9e8'
                            }}
                            label={<Text style={{ fontFamily: 'Mali' }}>Email</Text>}
                            value={emailRegister}
                            onChangeText={(text) => {
                                setEmailRegister(text.trim().replace(' ', ''));
                            }}
                            placeholder="Nhập Email"
                        />
                        <View
                            style={{
                                position: 'relative',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                style={styles.formInput}
                                activeUnderlineColor="#E72515"
                                mode="flat"
                                contentStyle={{
                                    fontFamily: 'Mali',
                                    backgroundColor: '#fde9e8'
                                }}
                                autoCapitalize='none'
                                label={<Text style={{ fontFamily: 'Mali' }}>Mật Khẩu</Text>}
                                secureTextEntry={!showTextPassRegis}
                                onChangeText={(text) => {
                                    setPasswordRegister(text.trim().replace(' ', ''));
                                }}
                                value={passwordRegister}
                                placeholder="Mật khẩu"

                            />
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    right: 8,
                                    top: 22
                                }}
                                onPress={() => setShowTextPassRegis(!showTextPassRegis)}
                            >
                                <Icon
                                    name={showTextPassRegis ? 'eye-off-outline' : 'eye-outline'} size={25} color={"#000"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                position: 'relative',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TextInput
                                autoCapitalize='none'
                                style={styles.formInput}
                                activeUnderlineColor="#E72515"
                                mode="flat"
                                contentStyle={{
                                    fontFamily: 'Mali',
                                    backgroundColor: '#fde9e8'
                                }}
                                label={<Text style={{ fontFamily: 'Mali' }}>Nhập Lại Mật Khẩu</Text>}
                                secureTextEntry={!showTextRePassRegis}
                                onChangeText={(text) => {
                                    setRePasswordRegister(text.trim().replace(' ', ''));
                                }}
                                placeholder="Nhập lại mật khẩu"
                                value={rePasswordRegister}

                            />
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    right: 8,
                                    top: 22
                                }}
                                onPress={() => setShowTextRePassRegis(!showTextRePassRegis)}
                            >
                                <Icon
                                    name={showTextRePassRegis ? 'eye-off-outline' : 'eye-outline'} size={25} color={"#000"}
                                />
                            </TouchableOpacity>
                        </View>


                        <Button
                            buttonColor="#E72515"
                            style={styles.formBtn}
                            labelStyle={{ fontFamily: 'Mali' }}
                            mode="contained"
                            uppercase={false}
                            onPress={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </View>)
            }
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.changeScreen}>
                    <TouchableOpacity
                        onPress={() => setIsLogin(true)}
                        style={[styles.touchStyle, styles.touchLeft, isLogin ? styles.touchActive : ""]}>
                        <Icon
                            name="log-in-outline" size={17} color="#fff"
                        />
                        <Text style={styles.touchText}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsLogin(false)}
                        style={[styles.touchStyle, styles.touchRigth, isLogin ? "" : styles.touchActive]}>
                        <Icon
                            name="person-add-outline" size={17} color="#fff"
                        />
                        <Text style={styles.touchText}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBED',
    },
    form: {
        height: "80%",
        paddingHorizontal: 25,
        paddingTop: 30,
        alignItems: "center",
    },
    formTitle: {
        fontSize: 35,
        lineHeight: 45,
        textTransform: 'uppercase',
        fontFamily: 'MaliBold',
        color: '#E72515',
        marginBottom: 20
    },
    formInput: {
        width: "100%",
        marginVertical: 5,
        fontFamily: 'Mali'
    },
    formBtn: {
        marginTop: 10
    },
    changeScreen: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "#fff"
    },
    touchStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: "center",
        backgroundColor: "#f4938a"
    },
    touchLeft: {
        borderRightWidth: 1,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 100,
        borderColor: "#fff"
    },
    touchRigth: {
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
        borderLeftWidth: 1,
        borderColor: "#fff"
    },
    touchActive: {
        backgroundColor: "#e72515",
    },
    touchText: {
        fontSize: 15,
        marginLeft: 5,
        fontFamily: 'Mali',
        color: "#fff"
    }
});