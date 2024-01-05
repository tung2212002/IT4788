import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native';

import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import { ActivityIndicator } from 'react-native-paper';
import { checkTime } from '../../utils/convertTimeAgo';
import NotificationComponent from '../../components/NotificationComponent';
import { getNotificationService } from '../../services/notificationService';
import { useScrollToTop } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
`;

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 57px;
    padding: 10px;
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

const Subtitle = styled.Text`
    font-size: 22px;
    font-family: 'Montserrat-Bold';
    color: ${Color.black};
    margin: 10px;
`;

const Body = styled.ScrollView`
    flex: 1;
`;

const NotNotification = styled.Text`
    font-size: 18px;
    font-family: 'Montserrat-Medium';
    color: ${Color.black};
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
`;

function NotificationScreen({ navigation }) {
    const [newNotification, setNewNotification] = useState([]);
    const [lastNotification, setLastNotification] = useState([]);
    const [previousNotification, setPreviousNotification] = useState([]);
    const ref = useRef(null);

    const [page, setPage] = useState({
        index: 0,
        count: 10,
        isRefreshing: false,
        isLoadMore: false,
        firstLoad: false,
        canGetMore: true,
    });

    const onRefresh = () => {
        setPage({ ...page, isRefreshing: true, index: 0, canGetMore: true });
    };

    const onLoadMore = () => {
        setPage({ ...page, isLoadMore: true });
    };

    const refreshControl = <RefreshControl refreshing={page.isRefreshing} onRefresh={onRefresh} />;

    const handleGetMoreNotification = async () => {
        const body = {
            index: page.index,
            count: page.count,
        };

        getNotificationService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    if (res.data.data.length === 0) {
                        setPage({ ...page, isLoadMore: false, firstLoad: true, canGetMore: false });
                        return;
                    }
                    const newNotif = [];
                    const lastNotif = [];
                    const previousNotif = [];
                    res.data.data.forEach((item, index) => {
                        if (checkTime(item.created) === 'now') {
                            newNotif.push(item);
                        } else if (checkTime(item.created) === 'today') {
                            lastNotif.push(item);
                        } else {
                            previousNotif.push(item);
                        }
                    });

                    setNewNotification((prev) => [...prev, ...newNotif]);
                    setLastNotification((prev) => [...prev, ...lastNotif]);
                    setPreviousNotification((prev) => [...prev, ...previousNotif]);

                    setPage({ ...page, index: page.index + res.data.data.length + 1, isLoadMore: false, firstLoad: true });
                } else {
                    setPage({ ...page, isLoadMore: false, firstLoad: true });
                }
            })
            .catch((error) => {
                console.log(error);
                setPage({ ...page, isLoadMore: false, firstLoad: true });
            });
    };

    const handleRefreshNotification = async () => {
        const body = {
            index: page.index,
            count: page.count,
        };

        getNotificationService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    if (res.data.data.length === 0) {
                        setPage({ ...page, isRefreshing: false });
                        return;
                    }

                    const newNotif = [];
                    const lastNotif = [];
                    const previousNotif = [];

                    res.data.data.forEach((item, index) => {
                        if (checkTime(item.created) === 'now') {
                            newNotif.push(item);
                        } else if (checkTime(item.created) === 'today') {
                            lastNotif.push(item);
                        } else {
                            previousNotif.push(item);
                        }
                    });

                    setNewNotification(newNotif);
                    setLastNotification(lastNotif);
                    setPreviousNotification(previousNotif);

                    setPage({ ...page, index: res.data.data.length, isRefreshing: false });
                } else {
                    setPage({ ...page, isRefreshing: false });
                }
            })
            .catch((error) => {
                console.log(error);
                setPage({ ...page, isRefreshing: false });
            });
    };

    useEffect(() => {
        if (page.isRefreshing && page.firstLoad) {
            handleRefreshNotification();
        }
    }, [page.isRefreshing]);

    useEffect(() => {
        if (page.isLoadMore || !page.firstLoad) {
            handleGetMoreNotification();
        }
    }, [page.isLoadMore]);

    useScrollToTop(ref);

    return (
        <Container>
            <Header>
                <Title>Thông báo</Title>
                <Icon nameIcon={'settings-sharp'} typeIcon={'Ionicons'} size={20} color={Color.black} />
                <Icon nameIcon={'search'} typeIcon={'FontAwesome5'} size={20} color={Color.black} />
            </Header>
            <Body refreshControl={refreshControl} showsVerticalScrollIndicator={false} ref={ref}>
                {newNotification.length > 0 && <Subtitle>Mới</Subtitle>}
                {newNotification.map((item, index) => {
                    return <NotificationComponent key={index} item={item} navigation={navigation} />;
                })}
                {lastNotification.length > 0 && <Subtitle>Hôm nay</Subtitle>}
                {lastNotification.map((item, index) => {
                    return <NotificationComponent key={index} item={item} navigation={navigation} />;
                })}
                {previousNotification.length > 0 && <Subtitle>Trước đó</Subtitle>}
                {previousNotification.map((item, index) => {
                    return <NotificationComponent key={index} item={item} navigation={navigation} />;
                })}
                {page.isLoadMore && <ActivityIndicator size="small" color={Color.blueButtonColor} style={{ marginTop: 10 }} />}
                {!page.canGetMore && <NotNotification>Không còn thông báo</NotNotification>}
                {page.canGetMore && (
                    <ButtonComponent
                        title={'Xem thông báo trước đó'}
                        onPress={onLoadMore}
                        width={'96'}
                        height={'40'}
                        size={15}
                        color={Color.black}
                        style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: Color.grey5 }}
                    />
                )}
            </Body>
        </Container>
    );
}

export default NotificationScreen;
