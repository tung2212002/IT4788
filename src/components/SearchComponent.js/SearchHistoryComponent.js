import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';
import PopupComponent from '../PopupComponent';
import ButtonIconComponent from '../ButtonIconComponent';
import { View } from 'moti';
import routes from '../../constants/route';

const SearchHistoryComponent = ({ item, navigation, handleDeleteHistorySearch }) => {
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);

    return (
        <Pressable style={styles.search_item} onPress={() => navigation.push(routes.SEARCH_RESULT_SCREEN, { keyword: item.keyword })}>
            <VectorIcon nameIcon={'clock'} typeIcon={'Feather'} size={24} color={Color.gray} style={styles.item_icon} />
            <Text style={styles.image_placeholder_text}>{item.keyword}</Text>
            <VectorIcon nameIcon={'dots-three-horizontal'} typeIcon={'Entypo'} size={20} color={Color.black} onPress={() => setRenderPopUpComponent(true)} />
            <PopupComponent
                renderPopUpComponent={renderPopUpComponent}
                setRenderPopUpComponent={setRenderPopUpComponent}
                headerItem={
                    <View style={styles.header_item}>
                        <VectorIcon nameIcon={'clockcircleo'} typeIcon={'AntDesign'} size={30} color={Color.black} style={styles.header_item_icon} />
                        <Text style={styles.popup_text}>{item.keyword}</Text>
                    </View>
                }
            >
                <ButtonIconComponent
                    title="Xóa"
                    nameIcon="delete"
                    typeIcon="AntDesign"
                    propsButton={{ height: 64 }}
                    propsIcon={{ size: 24, color: Color.black }}
                    propsTitle={{ size: 18, color: Color.black, fontWeight: 'normal' }}
                    onPress={() => {
                        setRenderPopUpComponent(false);
                        handleDeleteHistorySearch(item.id);
                    }}
                />
            </PopupComponent>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    search_item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    item_icon: {
        marginRight: 10,
    },
    image_placeholder_text: {
        flex: 1,
        fontSize: 16,
        color: Color.black,
    },
    popup_text: {
        flex: 1,
        fontSize: 24,
        color: Color.black,
    },
    header_item_icon: {
        marginRight: 10,
        padding: 15,
        borderRadius: 50,
        backgroundColor: Color.grey5,
        width: 60,
    },
    header_item: {
        borderBottomWidth: 1,
        borderBottomColor: Color.grey5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
});

export default SearchHistoryComponent;
