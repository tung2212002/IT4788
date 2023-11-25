import React, { useState } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';

const ModalContainer = styled(Modal)`
    flex: 1;
    margin: 0;
    background-color: ${Color.white};
    justify-content: flex-start;
    margin-top: ${Platform.OS === 'ios' ? 0 : -15}px;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 30px;
    left: 20px;
    z-index: 1;
`;

function PopupScreenComponent({ renderPopUpComponent, setRenderPopUpComponent, onBackdropPress, children, handleClose }) {
    const [state, setState] = useState({
        scrollOffset: null,
        scrollViewRef: null,
    });

    const close = () => {
        setState({ scrollOffset: null, scrollViewRef: null });
    };

    const handleSwipeMove = (percentageShown) => {
        if (percentageShown <= 0.2) {
            setIsVisible(false);
        }
    };

    const [isVisible, setIsVisible] = useState(true);

    return (
        <ModalContainer
            isVisible={isVisible}
            // onSwipeComplete={close}
            // swipeDirection={['down']}
            propagateSwipe={true}
            onBackdropPress={onBackdropPress ? onBackdropPress : () => setIsVisible(false)}
            // onSwipeMove={(percentageShown) => handleSwipeMove(percentageShown)}
            onModalHide={() => setRenderPopUpComponent(false)}
        >
            <CloseButton onPress={() => (handleClose ? handleClose() : setIsVisible(false))}>
                <VectorIcon nameIcon="close" size={32} color={Color.black} typeIcon={'MaterialCommunityIcons'} />
            </CloseButton>
            {children}
        </ModalContainer>
    );
}

export default PopupScreenComponent;
