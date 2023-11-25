import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import { Platform } from 'react-native';

const ModalContainer = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
    z-index: 1000;
`;

const ScrollAbleModal = styled.View`
    max-height: ${Math.round(Dimensions.get('window').height) - 100}px;
    height: auto;
    background-color: ${Color.white};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-width: 1px;
    border-color: ${Color.lightBlue};
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

function PopupComponent({
    renderPopUpComponent,
    setRenderPopUpComponent,
    onBackdropPress,
    children,
    headerItem,
    bottomItem,
    coverScreen,
    hasBackdrop,
    handleScrollToTop,
    disableHandleSwipeMoveBottom,
}) {
    const [scrollViewRef, setScrollViewRef] = useState(null);
    const [state, setState] = useState({
        scrollOffset: null,
        scrollViewRef: null,
    });

    const handleScrollTo = (p) => {
        if (scrollViewRef) {
            handleScrollToTop && handleScrollToTop();
            scrollViewRef.scrollTo(p);
        }
    };

    const close = () => {
        setRenderPopUpComponent(!renderPopUpComponent);
        setState({ scrollOffset: null, scrollViewRef: null });
    };

    const handleSwipeMove = (percentageShown) => {
        if (percentageShown <= 0.2) {
            setIsVisible(false);
        }
    };

    const [isVisible, setIsVisible] = useState(true);

    const generateBoxShadowStyle = () => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
            };
        } else {
            return {
                elevation: 6,
            };
        }
    };

    return (
        <ModalContainer
            isVisible={isVisible}
            onSwipeComplete={close}
            swipeDirection={disableHandleSwipeMoveBottom ? [] : ['down']}
            scrollTo={handleScrollTo}
            scrollOffset={state.scrollOffset}
            scrollOffsetMax={400 - 300}
            propagateSwipe={true}
            onSwipeMove={(percentageShown) => handleSwipeMove(percentageShown)}
            onBackdropPress={onBackdropPress ? onBackdropPress : () => setIsVisible(false)}
            onModalHide={() => setRenderPopUpComponent(false)}
            coverScreen={!coverScreen ? coverScreen : true}
            hasBackdrop={!hasBackdrop ? hasBackdrop : true}
            avoidKeyboard={true}
        >
            <ScrollAbleModal scrollEventThrottle={16} style={[generateBoxShadowStyle()]}>
                <ScrollAbleModalTop />
                {headerItem ? headerItem : null}
                <ScrollViewContainer ref={setScrollViewRef}>{children}</ScrollViewContainer>
                {bottomItem ? bottomItem : null}
            </ScrollAbleModal>
        </ModalContainer>
    );
}

export default PopupComponent;
