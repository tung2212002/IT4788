/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';

import ButtonIconComponent from '../../components/ButtonIconComponent';
import {
    images,
    SVGQuestionMark,
    SVGSetting,
    SVGGroups,
    SVGFeed,
    SVGFriends,
    SVGMarket,
    SVGVideo,
    SVGPast,
    SVGBookmark,
    SVGPage,
    SVGReel,
    SVGDating,
    SVGEvent,
    SVGGame,
    SVGMore,
    SVGProfile,
    SVGPrivateAccount,
} from '../../../assets';
import { logout, selectUser } from '../../redux/features/auth/authSlice';
import Color from '../../utils/Color';
import ShowMoreComponent from '../../components/ShowMoreComponent';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import { Alert } from 'react-native';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import VectorIcon from '../../utils/VectorIcon';
import { StatusBar } from 'expo-status-bar';

const ContainerScrollView = styled.ScrollView`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
`;

const ContainerView = styled.View`
    flex: 1;
    align-items: center;
`;

const ContainerHeader = styled.View`
    width: 100%;
    height: 70px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
`;

const Title = styled.Text`
    font-size: 28px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin: 10px;
    flex: 1;
`;

const ContainerItem = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-horizontal: 10px;
`;

const AlertComponent = styled(Alert)`
    background-color: ${Color.gray};
    transform: scale(0.8);
`;

const ButtonIconComponentBorder = styled(ButtonIconComponent)`
    border-bottom-width: 1px;
    border-bottom-color: ${Color.grayButton};
`;

const Hr = styled.View`
    border-bottom-width: 2px;
    border-bottom-color: ${Color.lightGray};
    width: 100%;
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

const ButtonProfile = styled(ButtonIconComponent)``;

function SettingScreen({ route, navigation }) {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const itemsSetting = [
        {
            title: 'Bạn bè',
            onPress: () => navigate(routes.FRIEND_STACK, { screen: routes.FRIEND_SCREEN }),
            SVGIcon: SVGFriends,
        },
        {
            title: 'Bảng feed',
            // onPress: 'SettingScreen',
            SVGIcon: SVGFeed,
        },
        {
            title: 'Nhóm',
            onPress: () => navigate(routes.GROUP_SCREEN),
            SVGIcon: SVGGroups,
        },
        {
            title: 'Marketplace',
            // onPress: 'SettingScreen',
            SVGIcon: SVGMarket,
        },
        {
            title: 'Video',
            // onPress: 'SettingScreen',
            SVGIcon: SVGVideo,
        },
        {
            title: 'Kỷ niệm',
            // onPress: 'SettingScreen',
            SVGIcon: SVGPast,
        },
        {
            title: 'Đã lưu',
            // onPress: 'SettingScreen',
            SVGIcon: SVGBookmark,
        },
        {
            title: 'Trang',
            // onPress: 'SettingScreen',
            SVGIcon: SVGPage,
        },
        {
            title: 'Reels',
            // onPress: 'SettingScreen',
            SVGIcon: SVGReel,
        },
        {
            title: 'Hẹn hò',
            // onPress: 'SettingScreen',
            SVGIcon: SVGDating,
        },
        {
            title: 'Sự kiện',
            // onPress: 'SettingScreen',
            SVGIcon: SVGEvent,
        },
        {
            title: 'Trò chơi',
            // onPress: 'SettingScreen',
            SVGIcon: SVGGame,
        },
    ];

    const moreItemsPolicy = [
        {
            title: 'Điều khoản & chính sách',
            // navigate: 'SettingScreen',
            SVGIcon: SVGPrivateAccount,
        },
    ];

    const moreItems = [
        {
            title: 'Cài đặt',
            // navigate: 'SettingScreen',
            SVGIcon: SVGProfile,
        },
        {
            title: 'Điều khoản & chính sách',
            // navigate: 'SettingScreen',
            SVGIcon: SVGPrivateAccount,
        },
    ];

    const moreItemsSetting = [
        {
            title: 'Cài đặt',
            // navigate: 'SettingScreen',
            SVGIcon: SVGProfile,
        },
    ];

    const requestLogout = () => {
        dispatch(logout());
    };

    const [showMore, setShowMore] = useState(false);
    const [showMoreHelp, setShowMoreHelp] = useState(false);
    const [showMoreNotification, setShowMoreNotification] = useState(false);

    const handleLogout = async () => {
        const title = 'Bạn có chắc chắn muốn đăng xuất?';
        const body = '';
        const options = [
            { text: 'Hủy' },
            {
                text: 'Đăng xuất',
                onPress: requestLogout,
            },
        ];

        AlertComponent.alert(title, body, options, { cancelable: false });
    };

    const redirectProfile = () => {
        navigate(routes.PROFILE_SCREEN);
    };

    return (
        <ContainerScrollView>
            <ContainerView>
                <ContainerHeader>
                    <Title>Menu</Title>
                    <Icon nameIcon={'settings-sharp'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                    <Icon nameIcon={'search'} typeIcon={'FontAwesome5'} size={20} color={Color.black} />
                </ContainerHeader>
                <ButtonProfile
                    title={user?.username || 'Người dùng'}
                    message={'Xem trang cá nhân của bạn'}
                    onPress={redirectProfile}
                    imgIcon={user?.avatar === '-1' || user?.avatar === '' ? images.defaultAvatar : { uri: user.avatar }}
                    propsButton={{
                        height: 'auto',
                        width: '100',
                        marginBottom: '10',
                        backgroundColor: Color.mainBackgroundColor,
                    }}
                    propsTitle={{ size: 20, fontWeight: '500' }}
                    propsIcon={{ width: 50, height: 50, padding: 10, borderRadius: 50 }}
                    downIcon={false}
                    propsMessage={{ size: 16, color: Color.gray, fontWeight: '500' }}
                    propsDownIcon={{ size: 20, padding: 5, borderRadius: 50 }}
                />
                <ContainerItem>
                    {itemsSetting.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            onPress={item.onPress}
                            SVGIcon={item.SVGIcon}
                            propsIcon={{ width: 26, height: 26, marginBottom: 5, marginLeft: 10 }}
                            propsButton={{ width: 49, height: 72, marginBottom: 10, direction: 'column', alignItems: 'flex-start' }}
                            propsTitle={{ fontWeight: '500', size: 16 }}
                            isShadow={true}
                        />
                    ))}
                </ContainerItem>
                <ButtonIconComponent
                    title={'Xem thêm'}
                    SVGIcon={SVGMore}
                    propsButton={{ backgroundColor: Color.mainBackgroundColor, marginBottom: -10 }}
                    propsIcon={{ width: 26, height: 26 }}
                    downIcon={true}
                    onPress={() => setShowMore(!showMore)}
                    propsTitle={{ fontWeight: '500', size: 17 }}
                />
                <ShowMoreComponent items={moreItems} showMore={showMore} />
                <Hr />
                <ButtonIconComponent
                    title={'Trợ giúp & hỗ trợ'}
                    onPress={() => setShowMoreHelp(!showMoreHelp)}
                    SVGIcon={SVGQuestionMark}
                    propsButton={{
                        backgroundColor: Color.mainBackgroundColor,
                        width: '100',
                        height: '50',
                        borderRadius: 1,
                        marginBottom: -10,
                    }}
                    propsIcon={{ width: 26, height: 26 }}
                    propsTitle={{ fontWeight: '500', size: 17 }}
                    downIcon={true}
                />
                <ShowMoreComponent items={moreItemsSetting} showMore={showMoreHelp} />
                <Hr />
                <ButtonIconComponent
                    title={'Cài đặt & quyền riêng tư'}
                    onPress={() => setShowMoreNotification(!showMoreNotification)}
                    SVGIcon={SVGSetting}
                    propsButton={{
                        backgroundColor: Color.mainBackgroundColor,
                        width: '100',
                        borderRadius: 1,
                        marginBottom: -10,
                    }}
                    propsIcon={{ width: 26, height: 26 }}
                    propsTitle={{ fontWeight: '500', size: 17 }}
                    downIcon={true}
                />
                <ShowMoreComponent items={moreItemsPolicy} showMore={showMoreNotification} />
                <ButtonComponent
                    title={'Đăng xuất'}
                    onPress={handleLogout}
                    color={Color.black}
                    style={{
                        backgroundColor: Color.grayButton,
                        width: '90%',
                        height: 38,
                        borderRadius: 1,
                        marginBottom: 30,
                    }}
                    size={'15'}
                    fontWeight={'600'}
                />
            </ContainerView>
        </ContainerScrollView>
    );
}

export default SettingScreen;
