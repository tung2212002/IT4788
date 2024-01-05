import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';
import { delSavedSearchService, getSavedSearchService } from '../../services/searchService';
import { Alert, Dimensions, FlatList, Pressable, RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native';
import routes from '../../constants/route';
import SearchHistoryComponent from '../../components/SearchComponent.js/SearchHistoryComponent';
import SearchLogComponent from '../../components/SearchComponent.js/SearchLogComponent';
import { ScrollView } from 'react-native-gesture-handler';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
`;

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 57px;
    padding: 10px;
    align-items: center;
    background-color: ${Color.white};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.grey5};
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: 'OpenSans-Bold';
    flex: 1;
    align-items: center;
    margin-left: 10px;
`;

const TextDeleteAll = styled.Text`
    font-size: 18px;
    font-family: 'OpenSans-Medium';
    color: ${Color.blueButtonColor};
    margin-right: auto;
    margin-left: auto;
    margin-vertical: 10px;
`;

const ButtonMore = styled.Pressable`
    width: 100%;
    height: 50px;
    background-color: ${Color.white};
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    font-size: 17px;
    font-family: 'OpenSans-Medium';
    color: ${Color.blueButtonColor};
    margin-bottom: 20px;
`;

const TextDate = styled.Text`
    font-size: 24px;
    font-family: 'OpenSans-Bold';
    margin: 10px;
`;

const TextEmpty = styled.Text`
    font-size: 20px;
    font-family: 'OpenSans-Bold';
    margin: 10px;
    color: ${Color.grey3};
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`;

function SearchLogScreen({ navigation, route }) {
    const { refreshHistory } = route.params;
    const [historySearch, setHistorySearch] = useState([]);
    const [isLoadHistory, setIsLoadHistory] = useState(false);
    const [pageHistory, setPageHistory] = useState({
        index: 0,
        count: 10,
        hasNext: false,
        isRefresh: false,
    });

    const processData = (data) => {
        const result = [];
        data.forEach((item) => {
            const date = new Date(item.created);
            const dateStr = `${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
            const index = result.findIndex((i) => i.title === dateStr);
            if (index === -1) {
                result.push({
                    title: dateStr,
                    data: [item],
                });
            } else {
                result[index].data.push(item);
            }
        });
        return result;
    };

    const handleGetHistorySearch = () => {
        const body = {
            index: pageHistory.index,
            count: pageHistory.count,
        };

        getSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000' && response.data.data.length === 10) {
                    setHistorySearch(response.data.data);
                    setPageHistory({
                        ...pageHistory,
                        index: pageHistory.index + response.data.data.length,
                        isRefresh: false,
                        hasNext: true,
                    });
                    setIsLoadHistory(false);
                } else if (response.data.code === '1000' && response.data.data.length < 10) {
                    setHistorySearch(response.data.data);
                    setPageHistory({
                        ...pageHistory,
                        index: pageHistory.index + response.data.data.length,
                        hasNext: false,
                        isRefresh: false,
                    });
                    setIsLoadHistory(false);
                } else {
                    setPageHistory({
                        ...pageHistory,
                        hasNext: false,
                        isRefresh: false,
                    });
                    setIsLoadHistory(false);
                }
            })
            .catch((error) => {
                console.log('error', error);
                setIsLoadHistory(false);
            });
    };

    const handleLoadMoreHistorySearch = () => {
        const body = {
            index: pageHistory.index,
            count: pageHistory.count,
        };

        getSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000' && response.data.data.length === 10) {
                    setHistorySearch([...historySearch, ...response.data.data]);
                    setPageHistory({
                        ...pageHistory,
                        index: pageHistory.index + response.data.data.length,
                        hasNext: true,
                    });
                } else if (response.data.code === '1000' && response.data.data.length < 10) {
                    setPageHistory({
                        ...pageHistory,
                        hasNext: false,
                    });
                    setHistorySearch([...historySearch, ...response.data.data]);
                } else {
                    setPageHistory({
                        ...pageHistory,
                        hasNext: false,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleAlertDeleteHistorySearch = () => {
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa tất cả lịch sử tìm kiếm?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Đồng ý',
                onPress: () => handleDeleteHistorySearch(null, true),
            },
        ]);
    };

    const handleDeleteHistorySearch = (id, all = false) => {
        const body = {
            search_id: id,
            all: all,
        };

        delSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    refreshHistory();
                    if (all) {
                        setPageHistory({
                            ...pageHistory,
                            index: 0,
                        });
                        setHistorySearch([]);
                    } else {
                        setPageHistory({
                            ...pageHistory,
                            index: pageHistory.index - 1,
                        });
                        setHistorySearch(historySearch.filter((item) => item.id !== id));
                    }
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    useEffect(() => {
        handleGetHistorySearch();
    }, []);

    useEffect(() => {
        if (pageHistory.isRefresh && !isLoadHistory) {
            handleGetHistorySearch();
        }
    }, [pageHistory.isRefresh]);

    return (
        <Container>
            <Header>
                <VectorIcon nameIcon="arrow-left" typeIcon="Feather" size={30} color={Color.black} onPress={() => navigation.goBack()} />
                <Title>Nhật ký hoạt động</Title>
            </Header>
            {isLoadHistory ? (
                <Text>Loading...</Text>
            ) : (
                historySearch.length > 0 && (
                    <Pressable onPress={() => handleAlertDeleteHistorySearch()}>
                        <TextDeleteAll>Xóa tất cả hoạt động</TextDeleteAll>
                    </Pressable>
                )
            )}

            <ScrollView>
                {!isLoadHistory && historySearch.length > 0
                    ? processData(historySearch).map((item, index) => (
                          <View key={index}>
                              <TextDate>{item.title}</TextDate>
                              {item.data.map((i, idx) => (
                                  <SearchLogComponent key={idx} item={i} navigation={navigation} handleDeleteHistorySearch={handleDeleteHistorySearch} />
                              ))}
                          </View>
                      ))
                    : isLoadHistory && <TextEmpty>Không có hoạt động nào</TextEmpty>}
                {pageHistory.hasNext && historySearch.length > 0 ? (
                    <ButtonMore onPress={() => handleLoadMoreHistorySearch()}>
                        <ButtonText>Xem thêm</ButtonText>
                    </ButtonMore>
                ) : null}
            </ScrollView>
        </Container>
    );
}

export default SearchLogScreen;
