/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import ButtonComponent from './ButtonComponent';
import { listActivity, listFeeling } from '../constants/listItem';
import ButtonIconComponent from './ButtonIconComponent';
import VectorIcon from '../utils/VectorIcon';
import { Dimensions } from 'react-native';

const Container = styled.View`
    background-color: ${Color.white};
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Header = styled.View`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
    background-color: ${Color.mainBackgroundColor};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const ViewTitle = styled.View`
    height: 50px;
    padding-top: 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TitleHeader = styled.Text`
    margin-left: 10px;
    font-size: 18px;
    font-family: Roboto-Bold;
    color: ${Color.black};
`;

const Content = styled.View`
    margin-top: 10px;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FeatureContainer = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const FeatureButton = styled(ButtonComponent)`
    width: 50%;
    height: 50px;
    border-radius: 5px;
    background-color: ${Color.white};
    color: ${Color.black};
    align-items: center;
    justify-content: center;
`;

const FindContainer = styled.View`
    width: 90%;
    height: 40px;
    background-color: ${Color.white};
    margin-vertical: 10px;
`;

const FindItem = styled.TextInput`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 10px;
    padding-left: 40px;
    background-color: ${Color.lightGray};
    font-size: 16px;
`;

const FindIcon = styled(VectorIcon)`
    position: absolute;
    left: 10px;
    top: 10px;
`;

const BodyContent = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`;

const ScrollViewContent = styled.ScrollView`
    width: 100%;
    height: 100%;
`;

const ButtonItem = styled(ButtonIconComponent)`
    margin: 10px;
    border-radius: 5px;
    background-color: ${Color.mainBackgroundColor};
    border-width: 1px;
    border-color: ${Color.lightGray};
`;

const TextItem = styled.Text`
    font-size: 14px;
    color: ${Color.gray};
    text-align: center;
    margin-left: 20px;
`;

function ChoiceFeelingComponent({ navigation, setFeelings, feelings, activities, setActivities, setRenderPopUpComponent, renderPopUpComponent, user }) {
    const [feature, setFeature] = useState(true);
    const [input, setInput] = useState('');
    const [listFilter, setListFilter] = useState(listFeeling);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handleFilter = (e) => {
        setInput(e);
        if (e) {
            let list = feature ? listFeeling : listActivity;
            list = list.filter((item) => {
                return item.title.toLowerCase().includes(e.toLowerCase());
            });
            setListFilter(list);
        } else {
            setListFilter(feature ? listFeeling : listActivity);
        }
    };

    const handleChangeFeature = () => {
        setFeature(!feature);
        setInput('');
        setListFilter(feature ? listActivity : listFeeling);
        Animated.timing(animatedValue, {
            toValue: feature ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Dimensions.get('window').width / 2],
    });

    const handleChoice = (item) => () => {
        if (feature) {
            setFeelings(item);
            setActivities('');
        } else {
            setFeelings('');
            setActivities(item);
        }
        setRenderPopUpComponent(false);
    };

    return (
        <Container>
            <Header>
                <ViewTitle>
                    <TitleHeader>Bạn đang cảm thấy thế nào?</TitleHeader>
                </ViewTitle>
            </Header>
            <Content>
                <FeatureContainer>
                    <FeatureButton title="Cảm xúc" onPress={handleChangeFeature} color={feature ? Color.blueButtonColor : Color.gray} />
                    <FeatureButton title="Hoạt động" onPress={handleChangeFeature} color={!feature ? Color.blueButtonColor : Color.gray} />
                    <Animated.View
                        style={{
                            position: 'absolute',
                            height: 3,
                            bottom: 0,
                            left: 0,
                            width: '50%',
                            backgroundColor: Color.blueButtonColor,
                            transform: [{ translateX }],
                        }}
                    />
                </FeatureContainer>

                <FindContainer>
                    <FindItem placeholder="Tìm kiếm" placeholderTextColor={Color.gray} onChangeText={handleFilter} value={input} />
                    <FindIcon nameIcon={'search'} typeIcon={'Feather'} size={20} color={Color.gray} />
                </FindContainer>
                <ScrollViewContent>
                    <BodyContent>
                        {listFilter && listFilter.length > 0 ? (
                            listFilter.map((item, index) => {
                                return (
                                    <ButtonItem
                                        key={index}
                                        onPress={handleChoice(item)}
                                        title={item.title}
                                        SVGIcon={item.SVGIcon}
                                        propsIcon={{ width: 40, height: 30 }}
                                        propsButton={{
                                            width: 50,
                                            height: 75,
                                            direction: 'row',
                                            borderRadius: '0',
                                            borderWidth: 1,
                                            borderTopWidth: 1,
                                            borderLeftWidth: 1,
                                            borderRightWidth: 1,
                                            borderBottomWidth: 1,
                                            border: `1px solid ${Color.lightGray}`,
                                        }}
                                        propsTitle={{
                                            style: {
                                                fontSize: 14,
                                                color: Color.gray,
                                                textAlign: 'center',
                                            },
                                        }}
                                    />
                                );
                            })
                        ) : (
                            <TextItem>Rất tiếc, không tìm thấy {feature ? 'cảm xúc' : 'hoạt động'} nào phù hợp</TextItem>
                        )}
                    </BodyContent>
                </ScrollViewContent>
            </Content>
        </Container>
    );
}

export default ChoiceFeelingComponent;
