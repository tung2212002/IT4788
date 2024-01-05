import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Alert } from 'react-native';

/*this is a react native version of this code https://github.com/Expertizo/react-fb-image-grid*/

const FbImages = ({ imagesList }) => {
    const countFrom = 5;
    const conditionalRender = false;
    // const imagesList = ['https://bootdey.com/img/Content/avatar/avatar1.png', 'https://bootdey.com/img/Content/avatar/avatar6.png'];
    const [images, setImages] = useState(imagesList);

    const clickEventListener = () => {
        Alert.alert('Alert', 'image clicked');
    };

    const renderOne = () => {
        return (
            <View style={[styles.row, styles.row1]} onPress={() => clickEventListener()}>
                <Pressable style={[styles.imageContent, styles.imageContent1]} onPress={() => clickEventListener()}>
                    <Image style={styles.image} source={{ uri: images[0].url }} />
                </Pressable>
            </View>
        );
    };

    const renderTwo = () => {
        const conditionalRender = [3, 4].includes(images.length) || (images.length > +countFrom && [3, 4].includes(+countFrom));

        return (
            <View style={styles.row}>
                <Pressable style={[styles.imageContent, styles.imageContent2]} onPress={() => clickEventListener()}>
                    <Image style={styles.image} source={{ uri: conditionalRender ? images[1].url : images[0].url }} />
                </Pressable>
                <Pressable style={[styles.imageContent, styles.imageContent2]} onPress={() => clickEventListener()}>
                    <Image style={styles.image} source={{ uri: conditionalRender ? images[2].url : images[1].url }} />
                </Pressable>
            </View>
        );
    };

    const renderThree = () => {
        const overlay = !countFrom || countFrom > 5 || (images.length > countFrom && [4, 5].includes(+countFrom)) ? renderCountOverlay(true) : renderOverlay();
        const conditionalRender = images.length == 4 || (images.length > +countFrom && +countFrom == 4);

        return (
            <View style={styles.row}>
                <Pressable style={[styles.imageContent, styles.imageContent3]} onPress={() => clickEventListener()}>
                    <Image style={styles.image} source={{ uri: conditionalRender ? images[1].url : images[2].url }} />
                </Pressable>
                <Pressable style={[styles.imageContent, styles.imageContent3]} onPress={() => clickEventListener()}>
                    <Image style={styles.image} source={{ uri: conditionalRender ? images[2].url : images[3].url }} />
                </Pressable>
                {overlay}
            </View>
        );
    };

    const renderOverlay = () => {
        return (
            <Pressable style={[styles.imageContent, styles.imageContent3]} onPress={() => clickEventListener()}>
                <Image style={styles.image} source={{ uri: images[images.length - 1].url }} />
            </Pressable>
        );
    };

    const renderCountOverlay = (more) => {
        const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
        const conditionalRender = images.length == 4 || (images.length > +countFrom && +countFrom == 4);
        return (
            <Pressable style={[styles.imageContent, styles.imageContent3]} onPress={() => clickEventListener()}>
                <Image style={styles.image} source={{ uri: conditionalRender ? images[3].url : images[4].url }} />
                <View style={styles.overlayContent}>
                    <View>
                        <Text style={styles.count}>+{extra}</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    const imagesToShow = [...images];

    if (countFrom && images.length > countFrom) {
        imagesToShow.length = countFrom;
    }

    return (
        <View style={styles.container}>
            {[1, 3, 4].includes(imagesToShow.length) && renderOne()}
            {imagesToShow.length >= 2 && imagesToShow.length != 4 && renderTwo()}
            {imagesToShow.length >= 4 && renderThree()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
    },
    imageContent: {
        borderWidth: 1,
        borderColor: 'black',
        height: 120,
    },
    imageContent1: {
        width: '100%',
    },
    imageContent2: {
        width: '50%',
    },
    imageContent3: {
        width: '33.33%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    //overlay efect
    overlayContent: {
        flex: 1,
        position: 'absolute',
        zIndex: 100,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        fontSize: 50,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 139, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default FbImages;
