/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
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
import { selectNetwork } from '../../redux/features/network/networkSlice';
import { useSelector } from 'react-redux';
import { addDataTailAsyncStorage, getAsyncStorage, setAsyncStorage } from '../../utils/asyncCacheStorage';
import ButtonIconComponent from '../../components/ButtonIconComponent';

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
    const isConnected = useSelector(selectNetwork);

    const [newNotification, setNewNotification] = useState([]);
    const [lastNotification, setLastNotification] = useState([]);
    const [previousNotification, setPreviousNotification] = useState([]);
    const [backupNotifications, setBackupNotifications] = useState({
        backup: [],
        index: 0,
        list: '',
    });
    const [show, setShow] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const ref = useRef(null);

    const [page, setPage] = useState({
        index: 0,
        count: 10,
        isRefreshing: false,
        isLoadMore: false,
        firstLoad: true,
        canGetMore: true,
    });

    const onRefresh = () => {
        setPage({ ...page, isRefreshing: true, index: 0, canGetMore: true, firstLoad: false });
    };

    const onLoadMore = () => {
        setPage({ ...page, isLoadMore: true, firstLoad: false });
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
                        setPage({ ...page, isLoadMore: false, firstLoad: false, canGetMore: false });
                        return;
                    }

                    addDataTailAsyncStorage('notification', res.data.data);

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

                    setPage({ ...page, index: page.index + res.data.data.length + 1, isLoadMore: false, firstLoad: false });
                } else {
                    setPage({ ...page, isLoadMore: false, firstLoad: false });
                }
            })
            .catch((error) => {
                console.log(error);
                setPage({ ...page, isLoadMore: false });
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
                        setPage({ ...page, isRefreshing: false, firstLoad: false });
                        setNewNotification([]);
                        return;
                    }

                    setAsyncStorage('notification', res.data.data);

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

                    setPage({ ...page, index: res.data.data.length, isRefreshing: false, firstLoad: false });
                } else {
                    setPage({ ...page, isRefreshing: false });
                }
            })
            .catch((error) => {
                console.log(error);
                setPage({ ...page, isRefreshing: false });
            });
    };

    const handleUndo = () => {
        if (backupNotifications.list === 'new') {
            setNewNotification(backupNotifications.backup);
        }
        if (backupNotifications.list === 'last') {
            setLastNotification(backupNotifications.backup);
        }
        if (backupNotifications.list === 'previous') {
            setPreviousNotification(backupNotifications.backup);
        }
        setShow(false);
    };

    useEffect(() => {
        if (page.isRefreshing && !page.firstLoad) {
            handleRefreshNotification();
        }
    }, [page.isRefreshing]);

    useEffect(() => {
        if ((page.isLoadMore || page.firstLoad) && isConnected) {
            handleGetMoreNotification();
        }
        if (!isConnected) {
            getAsyncStorage('notification').then((res) => {
                if (res) {
                    const newNotif = [];
                    const lastNotif = [];
                    const previousNotif = [];

                    res.forEach((item, index) => {
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
                }
            });
        }
    }, [page.isLoadMore]);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [show]);

    const handleShow = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setShow(false);
        }, 3000);

        setTimeoutId(newTimeoutId);

        setShow(true);
    };
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
                    return (
                        <NotificationComponent
                            key={item.notification_id}
                            item={item}
                            navigation={navigation}
                            show={show}
                            setShow={handleShow}
                            newNotification={newNotification}
                            setNewNotification={setNewNotification}
                            backupNotifications={backupNotifications}
                            setBackupNotifications={setBackupNotifications}
                        />
                    );
                })}
                {lastNotification.length > 0 && <Subtitle>Hôm nay</Subtitle>}
                {lastNotification.map((item, index) => {
                    return (
                        <NotificationComponent
                            key={item.notification_id}
                            item={item}
                            navigation={navigation}
                            show={show}
                            setShow={handleShow}
                            lastNotification={lastNotification}
                            setLastNotification={setLastNotification}
                            backupNotifications={backupNotifications}
                            setBackupNotifications={setBackupNotifications}
                        />
                    );
                })}
                {previousNotification.length > 0 && <Subtitle>Trước đó</Subtitle>}
                {previousNotification.map((item, index) => {
                    return (
                        <NotificationComponent
                            key={item.notification_id}
                            item={item}
                            navigation={navigation}
                            show={show}
                            setShow={handleShow}
                            previousNotification={previousNotification}
                            setPreviousNotification={setPreviousNotification}
                            backupNotifications={backupNotifications}
                            setBackupNotifications={setBackupNotifications}
                        />
                    );
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
            {show && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        width: Dimensions.get('window').width - 20,
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginLeft: 10,
                        backgroundColor: Color.grey3,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        setShow(false);
                    }}
                >
                    <Text style={{ fontSize: 20, color: Color.white, backgroundColor: Color.grey3, padding: 10 }}>Đã gỡ thông báo</Text>
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 10 }}
                        onPress={() => {
                            handleUndo();
                        }}
                    >
                        <Text style={{ fontSize: 20, color: Color.white, backgroundColor: Color.grey3, padding: 10 }}>HOÀN TÁC</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
        </Container>
    );
}

export default NotificationScreen;
