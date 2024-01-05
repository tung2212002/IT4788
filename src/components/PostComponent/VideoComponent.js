import React from 'react';
import styled from 'styled-components/native';
import { Video } from 'expo-av';
import { Dimensions, View } from 'react-native';
import Color from '../../utils/Color';

const Container = styled.View`
    height: ${Dimensions.get('window').height * 0.6}px;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${Color.white};
`;

const ButtonDelete = styled.Pressable`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
    background-color: ${Color.white};
    border-radius: 10px;
    padding: 5px;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
`;

const XText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${Color.black};
`;

const VideoComponent = ({ uri, canDelete, setAllVideo, allVideo }) => {
    return (
        // <Container>
        //     <Video style={{ width: '100%', height: '100%' }} source={{ uri: uri }} useNativeControls resizeMode="contain" isLooping shouldPlay />
        //     {canDelete && (
        //         <ButtonDelete
        //             onPress={() => {
        //                 setAllVideo(allVideo.filter((item) => item !== uri));
        //             }}
        //         >
        //             <XText>X</XText>
        //         </ButtonDelete>
        //     )}
        // </Container>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.black, height: 300 }}>
            <Video style={{ width: '100%', height: '100%' }} source={{ uri: uri }} useNativeControls resizeMode="contain" isLooping shouldPlay={false} />
        </View>
    );
};

export default VideoComponent;
