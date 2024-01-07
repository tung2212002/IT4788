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
import { logout, mergeUser, selectUser } from '../../redux/features/auth/authSlice';
import Color from '../../utils/Color';
import ShowMoreComponent from '../../components/ShowMoreComponent';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import { Alert } from 'react-native';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';
import VectorIcon from '../../utils/VectorIcon';
import { buyCoinsService } from '../../services/settingService';
import ChangInfoAfterSignUp from './ChangInfoAfterSignUp';

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

const Subtitle = styled.Text`
    font-size: 16px;
    font-family: Roboto-Regular;
    color: ${Color.gray};
    margin: 10px;
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

    const isChangeInfo = user?.active;
    console.log(isChangeInfo);

    const dispatch = useDispatch();

    const itemsSetting = [
        {
            title: 'Bạn bè',
            onPress: () => navigate(routes.FRIEND_STACK, { screen: routes.FRIEND_SCREEN }),
            SVGIcon: SVGFriends,
        },
        {
            title: 'Bảng feed',
            SVGIcon: SVGFeed,
        },
        {
            title: 'Nhóm',
            SVGIcon: SVGGroups,
        },
        {
            title: 'Marketplace',
            SVGIcon: SVGMarket,
        },
        {
            title: 'Video',
            onPress: () => navigate(routes.VIDEO_SCREEN),
            SVGIcon: SVGVideo,
        },
        {
            title: 'Kỷ niệm',
            SVGIcon: SVGPast,
        },
        {
            title: 'Đã lưu',
            SVGIcon: SVGBookmark,
        },
        {
            title: 'Trang',
            SVGIcon: SVGPage,
        },
        {
            title: 'Reels',
            SVGIcon: SVGReel,
        },
        {
            title: 'Hẹn hò',
            SVGIcon: SVGDating,
        },
        {
            title: 'Sự kiện',
            SVGIcon: SVGEvent,
        },
        {
            title: 'Trò chơi',
            SVGIcon: SVGGame,
        },
    ];

    const moreItemsPolicy = [
        {
            title: 'Điều khoản & chính sách',
            SVGIcon: SVGPrivateAccount,
        },
    ];

    const moreItems = [
        {
            title: 'Cài đặt',
            SVGIcon: SVGProfile,
            onPress: () => navigate(routes.SUB_SETTING_SCREEN),
        },
        {
            title: 'Điều khoản & chính sách',
            SVGIcon: SVGPrivateAccount,
        },
    ];

    const moreItemsSetting = [
        {
            title: 'Cài đặt',
            SVGIcon: SVGProfile,
            onPress: () => navigate(routes.SUB_SETTING_SCREEN),
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
        navigate(routes.PROFILE_SCREEN, { user_id: user.id });
    };

    const handleGetCoin = () => {
        const data = {
            code: 'string',
            coins: '3000',
        };

        buyCoinsService(data)
            .then((res) => {
                console.log(res.data.data);
                if (res.data.code === '1000') {
                    const userCoins = {
                        coins: res.data.data.coins,
                    };
                    dispatch(mergeUser(userCoins));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <ContainerScrollView showsVerticalScrollIndicator={false}>
            <ContainerView>
                <ContainerHeader>
                    <Title>Menu</Title>
                    <Subtitle>Coins: {user?.coins || 0}</Subtitle>
                    <Icon nameIcon={'plus'} typeIcon={'FontAwesome5'} size={20} color={Color.gray} onPress={handleGetCoin} />
                    <Icon nameIcon={'settings-sharp'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                    <Icon nameIcon={'search'} typeIcon={'FontAwesome5'} size={20} color={Color.black} />
                </ContainerHeader>
                <ButtonProfile
                    title={user?.username || 'Người dùng'}
                    message={'Xem trang cá nhân của bạn'}
                    onPress={redirectProfile}
                    imgIcon={user?.avatar === '' ? images.defaultAvatar : { uri: user.avatar }}
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
                        height: 40,
                        borderRadius: 1,
                        marginBottom: 30,
                    }}
                    size={'15'}
                    fontWeight={'600'}
                />
            </ContainerView>
            {(isChangeInfo === '-1' || !isChangeInfo) && <ChangInfoAfterSignUp />}
        </ContainerScrollView>
    );
}

export default SettingScreen;
