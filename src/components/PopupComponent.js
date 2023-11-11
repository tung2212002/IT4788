import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import Color from '../utils/Color';

const ModalContainer = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
`;

const ScrollAbleModal = styled.View`
    max-height: ${Math.round(Dimensions.get('window').height) - 100}px;
    height: auto;
    background-color: ${Color.white};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const ScrollViewContainer = styled.ScrollView`
    position: relative;
`;

const ScrollAbleModalTop = styled.View`
    height: 5px;
    width: 50px;
    background-color: ${Color.gray};
    border-radius: 5px;
    align-self: center;
    margin-vertical: 10px;
`;

function PopupComponent({ renderPopUpComponent, setRenderPopUpComponent, onBackdropPress, children }) {
    const [scrollViewRef, setScrollViewRef] = useState(null);
    const [state, setState] = useState({
        scrollOffset: null,
        scrollViewRef: null,
    });

    const handleScrollTo = (p) => {
        if (scrollViewRef) {
            scrollViewRef.scrollTo(p);
        }
    };

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
            onSwipeComplete={close}
            swipeDirection={['down']}
            scrollTo={handleScrollTo}
            scrollOffset={state.scrollOffset}
            scrollOffsetMax={400 - 300}
            propagateSwipe={true}
            onBackdropPress={onBackdropPress ? onBackdropPress : () => setIsVisible(false)}
            onSwipeMove={(percentageShown) => handleSwipeMove(percentageShown)}
            onModalHide={() => setRenderPopUpComponent(false)}
        >
            <ScrollAbleModal scrollEventThrottle={16}>
                <ScrollAbleModalTop />
                <ScrollViewContainer ref={setScrollViewRef}>{children}</ScrollViewContainer>
            </ScrollAbleModal>
        </ModalContainer>
    );
}

export default PopupComponent;
