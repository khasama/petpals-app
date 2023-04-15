import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");


const Banner = () => {
    return (
        <View style={{
            width: '100%',
            height: height / 4,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }}>
            <LinearGradient
                colors={['#E72515', '#FE6518']}
                start={[0, 1]}
                end={[1, 1]}
                style={{
                    width: 1500,
                    height: 1500,
                    borderRadius: 1500 / 2,
                    position: 'absolute',
                    top: -1340,
                }}
            >
            </LinearGradient>
            <View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{
                    flex: 2,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        style={{
                            fontFamily: 'MaliMedium',
                            color: "#fff"
                        }}
                    >
                        Cửa hàng thú cưng
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'MaliMedium',
                            color: "#fff"
                        }}
                    >
                        Ở đây bán thịt cầy
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'MaliMedium',
                            color: "#fff"
                        }}
                    >
                        Bán luôn thịt mèo
                    </Text>
                </View>
                <View style={{
                    flex: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingTop: 10
                }}>
                    <Image
                        source={require('../images/c.png')}
                        style={{
                            width: 150,
                            height: 150,
                            flex: 1,
                            resizeMode: 'contain',
                            marginLeft: 10,
                        }} />
                    <Image
                        source={require('../images/d.png')}
                        style={{
                            width: 90,
                            height: 90,
                            flex: 1,
                            resizeMode: 'contain',
                            marginRight: 10,
                        }} />
                </View>
            </View>
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({})