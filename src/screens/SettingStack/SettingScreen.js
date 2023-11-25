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
} from '../../../assets';
import { logout, selectUser } from '../../redux/features/auth/authSlice';
import { setLoading } from '../../redux/features/loading/loadingSlice';
import Color from '../../utils/Color';
import ShowMoreComponent from '../../components/ShowMoreComponent';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import { Alert } from 'react-native';

const ContainerScrollView = styled.ScrollView`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
`;

const ContainerView = styled.View`
    flex: 1;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${Color.black};
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

const ButtonProfile = styled(ButtonIconComponent)``;

function SettingScreen({ route, navigation }) {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const itemsSetting = [
        {
            title: 'Bạn bè',
            navigate: 'FriendsScreen',
            SVGIcon: SVGFriends,
        },
        {
            title: 'Bảng feed',
            navigate: 'SettingScreen',
            SVGIcon: SVGFeed,
        },
        {
            title: 'Nhóm',
            navigate: 'SettingScreen',
            SVGIcon: SVGGroups,
        },
        {
            title: 'Marketplace',
            navigate: 'SettingScreen',
            SVGIcon: SVGMarket,
        },
        {
            title: 'Video',
            navigate: 'SettingScreen',
            SVGIcon: SVGVideo,
        },
        {
            title: 'Kỷ niệm',
            navigate: 'SettingScreen',
            SVGIcon: SVGPast,
        },
        {
            title: 'Đã lưu',
            navigate: 'SettingScreen',
            SVGIcon: SVGBookmark,
        },
        {
            title: 'Trang',
            navigate: 'SettingScreen',
            SVGIcon: SVGPage,
        },
        {
            title: 'Reels',
            navigate: 'SettingScreen',
            SVGIcon: SVGReel,
        },
        {
            title: 'Hẹn hò',
            navigate: 'SettingScreen',
            SVGIcon: SVGDating,
        },
        {
            title: 'Sự kiện',
            navigate: 'SettingScreen',
            SVGIcon: SVGEvent,
        },
        {
            title: 'Trò chơi',
            navigate: 'SettingScreen',
            SVGIcon: SVGGame,
        },
    ];

    const moreItems = [
        {
            title: 'Trang',
            // navigate: 'SettingScreen',
            SVGIcon: SVGPage,
        },
        {
            title: 'Reels',
            // navigate: 'SettingScreen',
            SVGIcon: SVGReel,
        },
        {
            title: 'Hẹn hò',
            // navigate: 'SettingScreen',
            SVGIcon: SVGDating,
        },
        {
            title: 'Sự kiện',
            // navigate: 'SettingScreen',
            SVGIcon: SVGEvent,
        },
        {
            title: 'Trò chơi',
            // navigate: 'SettingScreen',
            SVGIcon: SVGGame,
        },
    ];

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
                onPress: async () => {
                    dispatch(setLoading(true));
                    dispatch(logout());
                    dispatch(setLoading(false));
                },
            },
        ];

        AlertComponent.alert(title, body, options, { cancelable: false });
    };

    const redirectProfile = () => {
        navigation.navigate('ProfileScreen');
    };

    return (
        <ContainerScrollView>
            <ContainerView>
                <Title>Menu</Title>
                <ButtonProfile
                    title={user?.username || 'Người dùng'}
                    onPress={redirectProfile}
                    imgIcon={user?.avatar !== '-1' || user?.avatar !== '' ? { uri: user?.avatar } : images.defaultAvatar}
                    propsButton={{
                        height: 'auto',
                        width: '95',
                        marginBottom: '10',
                    }}
                    propsIcon={{ width: 60, height: 60, padding: 10, borderRadius: 50 }}
                    downIcon={false}
                    propsDownIcon={{ size: 20, padding: 5, borderRadius: 50 }}
                    isShadow={true}
                />
                <ContainerItem>
                    {itemsSetting.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            onPress={() => navigation.navigate(item.navigate)}
                            SVGIcon={item.SVGIcon}
                            propsIcon={{ width: 30, height: 30, marginBottom: 5, marginLeft: 10, marginRight: 10 }}
                            propsButton={{ width: 48, height: 75, marginBottom: 10, direction: 'column', alignItems: 'flex-start' }}
                            isShadow={true}
                        />
                    ))}
                </ContainerItem>
                <ButtonIconComponent
                    title={'Xem thêm'}
                    SVGIcon={SVGMore}
                    propsButton={{ backgroundColor: Color.mainBackgroundColor, padding: 10 }}
                    propsIcon={{ width: 30, height: 30 }}
                    downIcon={true}
                    onPress={() => setShowMore(!showMore)}
                />
                <ShowMoreComponent items={moreItems} showMore={showMore} />

                <ButtonIconComponent
                    title={'Trợ giúp & hỗ trợ'}
                    onPress={() => setShowMoreHelp(!showMoreHelp)}
                    SVGIcon={SVGQuestionMark}
                    propsButton={{ backgroundColor: Color.mainBackgroundColor, width: '100', borderTopWidth: 1, borderRadius: 1, padding: 10, marginTop: 10 }}
                    propsIcon={{ width: 30, height: 30 }}
                    downIcon={true}
                />
                <ShowMoreComponent items={moreItems} showMore={showMoreHelp} />
                <ButtonIconComponent
                    title={'Cài đặt thông báo đẩy'}
                    onPress={() => setShowMoreNotification(!showMoreNotification)}
                    SVGIcon={SVGSetting}
                    propsButton={{ backgroundColor: Color.mainBackgroundColor, width: '100', borderTopWidth: 1, borderRadius: 1, padding: 10 }}
                    propsIcon={{ width: 30, height: 30 }}
                    downIcon={true}
                />
                <ShowMoreComponent items={moreItems} showMore={showMoreNotification} />
                <ButtonComponent
                    title={'Đăng xuất'}
                    onPress={handleLogout}
                    color={Color.black}
                    style={{
                        backgroundColor: Color.lightGray,
                        width: '90%',
                        borderRadius: 1,
                        marginVertical: 20,
                    }}
                />
            </ContainerView>
        </ContainerScrollView>
    );
}

export default SettingScreen;
