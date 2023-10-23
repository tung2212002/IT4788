import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';

// import SVGIconfb from '../../../assets/images/likefb.svg';
import { SVGIconfb } from '../../../assets';
import Button from '../../components/Button';
import Color from '../../utils/Color';

const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-horizontal: 20px;
    padding-bottom: 50px;
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

function CompleteRegister({ route, navigation }) {
    const scaleValue = useRef(new Animated.Value(1 / 5)).current;

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

        return () => {
            Animated.loop(sequenceAnimation).stop();
        };
    }, [scaleValue]);

    return (
        <Container>
            <ViewAnimation>
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <SVGIconfb width="300" height="300" />
                </Animated.View>
            </ViewAnimation>
            <ViewButton>
                <Button title="Tiếp tục" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SaveAccount', params: route.params }] })} />
                <Button
                    title="Đăng xuất"
                    onPress={() => navigation.navigate('AuthScreen')}
                    color={Color.gray}
                    style={{ backgroundColor: Color.mainBackgroundColor }}
                />
            </ViewButton>
        </Container>
    );
}

export default CompleteRegister;
