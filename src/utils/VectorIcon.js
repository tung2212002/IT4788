import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function VectorIcon({ nameIcon, typeIcon, ...props }) {
    const { size, color, onPress, style } = props;

    return (
        <View style={style}>
            {typeIcon === 'Feather' ? (
                <Feather name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'Ionicons' ? (
                <Ionicons name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'FontAwesome5' ? (
                <FontAwesome5 name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'FontAwesome' ? (
                <FontAwesome name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'Entypo' ? (
                <Entypo name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'MaterialIcons' ? (
                <MaterialIcons name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : typeIcon === 'AntDesign' ? (
                <AntDesign name={nameIcon} size={size} color={color} onPress={onPress} />
            ) : null}
        </View>
    );
}

export default VectorIcon;
