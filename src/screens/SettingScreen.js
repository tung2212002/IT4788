/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';

import ButtonIconComponent from '../components/ButtonIconComponent';
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
    SVGExit,
} from '../../assets';
import { logout } from '../redux/features/auth/authSlice';
import { setLoading } from '../redux/features/loading/loadingSlice';
import Color from '../utils/Color';
import ShowMoreComponent from '../components/ShowMoreComponent';
import { useDispatch } from 'react-redux';

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

const ButtonProfile = styled(ButtonIconComponent)``;

function SettingScreen({ route, navigation }) {
    const user = route.params?.user;

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

    // const handleShowMore = () => {
    //     setShowMore(!showMore);
    // };

    // const handleSetNotification = () => {
    //     console.log('Set notification');
    // };

    const handleLogout = async () => {
        dispatch(setLoading(true));
        dispatch(logout());
        dispatch(setLoading(false));
    };

    const redirectProfile = () => {
        navigation.navigate('ProfileScreen');
    };

    useEffect(() => {
        if (user?.avatar !== '-1') {
            redirectProfile();
        }
    }, []);

    return (
        <ContainerScrollView>
            <ContainerView>
                <Title>Menu</Title>
                <ButtonProfile
                    title={user?.username || 'Đăng nhập/Đăng ký'}
                    onPress={redirectProfile}
                    imgIcon={user?.avatar !== '-1' ? { uri: user?.avatar } : images.defaultAvatar}
                    propsButton={{
                        height: 'auto',
                        width: '95',
                        marginBottom: '10',
                    }}
                    propsIcon={{ width: 60, height: 60, padding: 10, borderRadius: 50 }}
                    downIcon={true}
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
                <ButtonIconComponent
                    title={'Đăng xuất'}
                    onPress={handleLogout}
                    SVGIcon={SVGExit}
                    propsButton={{ backgroundColor: Color.mainBackgroundColor, width: '100', borderTopWidth: 1, borderRadius: 1, padding: 10 }}
                    propsIcon={{ width: 30, height: 30 }}
                />
            </ContainerView>
        </ContainerScrollView>
    );
}

export default SettingScreen;
