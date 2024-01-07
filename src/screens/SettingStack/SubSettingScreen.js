import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { Alert, Pressable } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import ButtonIconComponent from '../../components/ButtonIconComponent';
import { SVGProfile } from '../../../assets';
import PopupScreenComponent from '../../components/PopupScreenCompopnent';
import ChangUserInfo from './ChangUserInfo';
import ChangePasswordScreen from './ChangePasswordScreen';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
    padding-horizontal: 15px;
`;

const Body = styled.ScrollView`
    margin-top: 50px;
    flex: 1;
    flex-direction: column;
    background-color: ${Color.white};
    width: 100%;
`;

const Header = styled.View`
    top: 0;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'Roboto-Medium';
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const TitleBody = styled.Text`
    font-size: 24px;
    font-family: 'Roboto-Medium';
    margin-top: 10px;
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Regular';
    color: ${Color.gray};
    margin-bottom: 10px;
`;

function SubSettingScreen({ navigation }) {
    const [renderPopupComponent, setRenderPopUpComponent] = useState(false);
    const [renderPopupChangePassword, setRenderPopupChangePassword] = useState(false);

    return (
        <Container>
            <Header>
                <Pressable onPress={() => navigation.goBack()}>
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={28} color={Color.black} style={{ marginLeft: 10 }} />
                </Pressable>
                <Title>Cài đặt & quyền riêng tư</Title>
            </Header>
            <Body showsVerticalScrollIndicator={false}>
                <TitleBody>Cài đặt tài khoản</TitleBody>
                <Description>Quản lý thông tin về bạn, các khoản thanh toán và danh bạ của bạn cũng như tài khoản nói chung.</Description>
                <ButtonIconComponent
                    title={'Thông tin cá nhân'}
                    message={'Cập nhật tên, số điện thoại và địa chỉ email của bạn.'}
                    nameIcon={'user-circle-o'}
                    typeIcon={'FontAwesome'}
                    propsButton={{ width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 19, fontWeight: '500' }}
                    propsMessage={{ size: 14, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ size: 36, color: Color.black }}
                    onPress={() => setRenderPopUpComponent(true)}
                />
                <TitleBody>Cài đặt thông báo</TitleBody>
                <Description>Quản lý thông báo đẩy và cài đặt khác.</Description>
                <ButtonIconComponent
                    title={'Cài đặt thông báo'}
                    message={'Điều chỉnh cách bạn nhận thông báo từ chúng tôi.'}
                    nameIcon={'bell-o'}
                    typeIcon={'FontAwesome'}
                    propsButton={{ width: '80', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 19, fontWeight: '500' }}
                    propsMessage={{ size: 14, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ size: 36, Color: Color.black }}
                    onPress={() => navigate(routes.SETTING_NOTIFICATION_SCREEN)}
                />
                <TitleBody>Bảo mật</TitleBody>
                <Description>Đổi mật khẩu và thực hiện các hành động khác để giữ an toàn cho tài khoản của bạn.</Description>
                <ButtonIconComponent
                    title={'Đổi mật khẩu'}
                    message={'Bạn nên đổi mật khẩu mạnh mẽ và khác với mật khẩu của các tài khoản khác.'}
                    nameIcon={'lock'}
                    typeIcon={'FontAwesome'}
                    propsButton={{ width: '90', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 19, fontWeight: '500' }}
                    propsMessage={{ size: 14, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ size: 36, Color: Color.black }}
                    onPress={() => setRenderPopupChangePassword(true)}
                />
                <TitleBody>Quyền riêng tư</TitleBody>
                <Description>Quản lý cách chúng tôi sử dụng dữ liệu của bạn để cải thiện trải nghiệm của bạn.</Description>
                <ButtonIconComponent
                    title={'Chặn'}
                    message={'Xem người dùng bạn đã chặn chặn trước đó.'}
                    nameIcon={'ban'}
                    typeIcon={'FontAwesome'}
                    propsButton={{ width: '90', height: 60, marginLeft: '0', marginTop: 10, padding: '0' }}
                    propsTitle={{ size: 19, fontWeight: '500' }}
                    propsMessage={{ size: 14, color: Color.gray, fontWeight: '400' }}
                    propsIcon={{ size: 36, Color: Color.black }}
                    onPress={() => navigate(routes.BLOCK_USER_SCREEN, { navigation: navigation })}
                />
            </Body>
            {renderPopupComponent && (
                <PopupScreenComponent
                    renderPopUpComponent={renderPopupComponent}
                    setRenderPopUpComponent={setRenderPopUpComponent}
                    onBackdropPress={() => true}
                    coverScreen={true}
                    hasBackdrop={false}
                    isClose={false}
                >
                    <ChangUserInfo navigation={navigation} renderPopUpComponent={renderPopupComponent} setRenderPopUpComponent={setRenderPopUpComponent} />
                </PopupScreenComponent>
            )}
            {renderPopupChangePassword && (
                <PopupScreenComponent
                    renderPopUpComponent={renderPopupChangePassword}
                    setRenderPopUpComponent={setRenderPopupChangePassword}
                    onBackdropPress={() => true}
                    coverScreen={true}
                    hasBackdrop={false}
                    isClose={false}
                >
                    <ChangePasswordScreen
                        navigation={navigation}
                        renderPopUpComponent={renderPopupChangePassword}
                        setRenderPopUpComponent={setRenderPopupChangePassword}
                    />
                </PopupScreenComponent>
            )}
        </Container>
    );
}

export default SubSettingScreen;
