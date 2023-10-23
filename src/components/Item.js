import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { images } from '../../assets';
const Item = (props) => {
    const { dt_txt, main, weather, condition } = props;
    const { container, text, textTemp, textWeather, image } = styles;
    return (
        <View style={container}>
            <Image source={images.defaultAvatar} style={image} />
            <Feather name={'sun'} size={30} color={'black'} />
            <Text>{dt_txt}</Text>
            <Text style={[text, textTemp]}>{main.temp}</Text>
            <Text style={[text, textWeather]}>{weather[0].main}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        marginVertical: 4,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: 'pink',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textTemp: {
        color: 'red',
    },
    textWeather: {
        color: 'blue',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default Item;
