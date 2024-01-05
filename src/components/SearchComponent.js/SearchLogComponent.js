import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';

import routes from '../../constants/route';
import styled from 'styled-components';

const SearchItem = styled.View`
    flex-direction: row;
    align-items: 'center';
    flex: 1;
    margin-vertical: 10px;
    margin-left: 10px;
`;

const ItemIcon = styled(VectorIcon)`
    margin-right: 10px;
    background-color: ${Color.blueButtonColor};
    border-radius: 60px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
`;

const ImagePlaceholderText = styled.Text`
    font-size: 16px;
    color: ${Color.grey2};
    width: 100%;
    font-family: 'Roboto-Medium';
`;

const Content = styled.View`
    flex-direction: column;
    width: ${Dimensions.get('window').width - 130}px;
`;

const TextLabel = styled.Text`
    font-size: 18px;
    font-family: 'Roboto-Medium';
    color: ${Color.black};
`;

const TextDescriptionContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const IconLock = styled(VectorIcon)`
    margin-right: 4px;
`;

const TextDescription = styled.Text`
    font-size: 13px;
    font-family: 'Roboto-Medium';
    color: ${Color.gray};
`;

const IconDot = styled(VectorIcon)``;

const SearchLogComponent = ({ item, navigation, handleDeleteHistorySearch }) => {
    return (
        <SearchItem onPress={() => navigation.push(routes.SEARCH_RESULT_SCREEN, { keyword: item.keyword })}>
            <ItemIcon nameIcon={'search-sharp'} typeIcon={'Ionicons'} size={24} color={Color.white} />
            <Content>
                <TextLabel>Bạn đã tìm kiếm trên Facebook</TextLabel>
                <ImagePlaceholderText>{`"${item.keyword}"`}</ImagePlaceholderText>
                <TextDescriptionContainer>
                    <IconLock nameIcon={'lock'} typeIcon={'FontAwesome'} size={20} color={Color.gray} />
                    <TextDescription>Chỉ mình tôi</TextDescription>
                    <IconDot nameIcon={'dot-single'} typeIcon={'Entypo'} size={24} color={Color.gray} />
                    <TextDescription>Đã ẩn khỏi dòng thời gian</TextDescription>
                </TextDescriptionContainer>
            </Content>
            <VectorIcon nameIcon={'close'} typeIcon={'Ionicons'} size={28} color={Color.black} onPress={() => handleDeleteHistorySearch(item.id)} />
        </SearchItem>
    );
};

export default SearchLogComponent;
