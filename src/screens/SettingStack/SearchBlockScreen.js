import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';

// import SVGIconfb from '../../../assets/images/likefb.svg';
import { SVGIconfb } from '../../../assets';
import ButtonComponent from '../../components/ButtonComponent';
import Color from '../../utils/Color';
import routes from '../../constants/route';
import { navigate } from '../../navigation/RootNavigator';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-horizontal: 20px;
    padding-bottom: 10px;
    background-color: ${Color.mainBackgroundColor};
`;

const ViewAnimation = styled.View`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ViewButton = styled.View`
    width: 100%;
    margin-top: 50px;
`;

const ButtonNext = styled(ButtonComponent)`
    border-radius: 30px;
    margin-bottom: 10px;
`;

function SearchScreen({ route, navigation }) {
    const scaleValue = useRef(new Animated.Value(1 / 5)).current;

    //render from right to left
    useEffect(() => {
        const scaleUpAnimation = Animated.timing(scaleValue, {
            toValue: 1 / 2,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        const scaleDownAnimation = Animated.timing(scaleValue, {
            toValue: 1 / 5,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        const sequenceAnimation = Animated.sequence([scaleUpAnimation, scaleDownAnimation]);
        Animated.loop(sequenceAnimation).start();
    }, [scaleValue]);

    return (
        <Container>
            <ViewAnimation>
                <Animated.View
                    style={{
                        transform: [
                            {
                                scale: scaleValue,
                            },
                        ],
                    }}
                >
                    <SVGIconfb />
                </Animated.View>
            </ViewAnimation>
            <ViewButton>
                <ButtonNext
                    title="Tiếp tục"
                    onPress={() => {
                        navigate(routes.REGISTER_STACK, navigation);
                    }}
                />
            </ViewButton>
        </Container>
    );
}

export default SearchScreen;
