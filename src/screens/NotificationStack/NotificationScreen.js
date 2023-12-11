import styled from 'styled-components/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { RefreshControl } from 'react-native';

import { getRequestedFriendsService, getSuggestedFriends } from '../../services/friendService';
import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import RequestFriendComponent from '../../components/RequestFriendComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import SuggestFriendComponent from '../../components/SuggestFriendComponent';
import { ActivityIndicator } from 'react-native-paper';

const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: ${Color.white};
`;

const Body = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${Color.white};
`;

const ContainerBody = styled.FlatList`
    flex: 1;
`;

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 40px;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: 'Roboto-Bold';
    flex: 1;
    align-items: center;
`;

const Icon = styled(VectorIcon)`
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 6px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin-left: 10px;
`;

const ItemButton = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
    padding-bottom: 10px;
`;

const HeaderBody = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
`;

const TitleHeaderBody = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.black};
`;

const NumberRequest = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.gray};
`;

const TextMore = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Regular';
    color: ${Color.blueButtonColor};
    position: absolute;
    right: 0;
`;

const ButtonItem = styled(ButtonComponent)`
    border-radius: 20px;
    background-color: ${Color.lightGray};
    padding: 0 15px;
`;

function NotificationScreen() {
    return (
        <Container>
            <Header>
                <Title>Thông báo</Title>
                <Icon nameIcon={'settings-sharp'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                <Icon nameIcon={'search'} typeIcon={'FontAwesome5'} size={20} color={Color.black} />
            </Header>
        </Container>
    );
}

export default NotificationScreen;
