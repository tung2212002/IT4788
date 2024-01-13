import React, { useState, useRef, useEffect } from 'react';
import {
    Dimensions,
    Animated,
    Easing,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Pressable,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';

import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';
import SearchHistoryComponent from './SearchHistoryComponent';
import { delSavedSearchService, getSavedSearchService } from '../../services/searchService';
import routes from '../../constants/route';
import PopupComponent from '../PopupComponent';
import ButtonIconComponent from '../ButtonIconComponent';
import { navigate } from '../../navigation/RootNavigator';
import { useDispatch } from 'react-redux';
import { removeHistorySearch, updateHistorySearch } from '../../redux/features/history/searchSlice';

const { Value, timing } = Animated;
const { width, height } = Dimensions.get('window');

const SearchInputComponent = ({ keyword, navigation, refreshHistory }) => {
    const dispatch = useDispatch();

    const [isFocused, setIsFocused] = useState(false);
    const [keyWord, setKeyWord] = useState(keyword || '');
    const contentTranslateY = useRef(new Value(height)).current;
    const contentOpacity = useRef(new Value(0)).current;
    const [isLoading, setIsLoading] = useState(false);
    const [historySearch, setHistorySearch] = useState([]);
    const [isLoadHistory, setIsLoadHistory] = useState(false);
    const [pageHistory, setPageHistory] = useState({
        index: 0,
        count: 10,
        hasNext: false,
        isRefresh: false,
    });
    const inputRef = useRef(null);

    const onFocus = () => {
        console.log('onFocus');
        setIsFocused(true);
        Animated.parallel([
            timing(contentTranslateY, { toValue: 0, duration: 0, easing: Easing.ease, useNativeDriver: false }),
            timing(contentOpacity, { toValue: 1, duration: 200, easing: Easing.ease, useNativeDriver: false }),
        ]).start();
        // inputRef.current.focus();
    };

    const onBlur = () => {
        setIsFocused(false);
        Animated.parallel([
            timing(contentTranslateY, { toValue: height, duration: 0, easing: Easing.ease, useNativeDriver: false }),
            timing(contentOpacity, { toValue: 0, duration: 200, easing: Easing.ease, useNativeDriver: false }),
        ]).start();
        inputRef.current.blur();
    };

    const onBlur1 = () => {
        // check if onpress item search history

        setIsFocused(false);
        Animated.parallel([
            timing(contentTranslateY, { toValue: height, duration: 0, easing: Easing.ease, useNativeDriver: false }),
            timing(contentOpacity, { toValue: 0, duration: 200, easing: Easing.ease, useNativeDriver: false }),
        ]).start();
        inputRef.current.blur();
    };

    const onRefresh = () => {
        console.log('onRefresh');
        setPageHistory({
            ...pageHistory,
            index: 0,
            isRefresh: true,
        });
    };

    const refreshControl = <RefreshControl refreshing={pageHistory.isRefresh} onRefresh={onRefresh} />;

    const handleGetHistorySearch = () => {
        const body = {
            index: pageHistory.index,
            count: pageHistory.count,
        };

        getSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    setHistorySearch(response.data.data);
                    setPageHistory({
                        ...pageHistory,
                        index: pageHistory.index + response.data.data.length,
                        isRefresh: false,
                    });
                    if (response.data.data.length === 10) {
                        setIsLoadHistory(true);
                    }
                    setIsLoadHistory(false);
                } else {
                    setIsLoadHistory(false);
                    setPageHistory({
                        ...pageHistory,
                        isRefresh: false,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error);
                setIsLoadHistory(false);
                setPageHistory({
                    ...pageHistory,
                    isRefresh: false,
                });
            });
    };

    const handleLoadMoreHistorySearch = () => {
        const body = {
            index: pageHistory.index,
            count: pageHistory.count,
        };

        getSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    setHistorySearch([...historySearch, ...response.data.data]);
                    setPageHistory({
                        ...pageHistory,
                        index: pageHistory.index + response.data.data.length,
                    });
                    if (response.data.data.length === 10) {
                        setIsLoadHistory(true);
                    }
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleDeleteHistorySearch = (id, all = false) => {
        const body = {
            search_id: id,
            all: all,
        };

        delSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    // refreshHistory();
                    dispatch(updateHistorySearch());
                    if (all) {
                        setPageHistory({
                            ...pageHistory,
                            index: 0,
                        });
                        setHistorySearch([]);
                        dispatch(setHistorySearch([]));
                    } else {
                        setPageHistory({
                            ...pageHistory,
                            index: pageHistory.index - 1,
                        });
                        setHistorySearch(historySearch.filter((item) => item.id !== id));
                        dispatch(removeHistorySearch(id));
                    }
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
    const handleSearch = () => {
        if (keyWord.trim() === '') {
            return;
        }
        navigation.push(routes.SEARCH_RESULT_SCREEN, { keyword: keyWord });
        // refreshHistory();
    };

    useState(() => {
        handleGetHistorySearch();
    }, []);

    useEffect(() => {
        console.log('pageHistory.isRefresh', pageHistory.isRefresh);
        if (pageHistory.isRefresh && !isLoadHistory) {
            console.log('pageHistory.isRefresh', pageHistory.isRefresh);
            handleGetHistorySearch();
        }
    }, [pageHistory.isRefresh]);

    return (
        <View>
            <HeaderSafeArea>
                <HeaderView>
                    {!isFocused && (
                        <TouchableHighlight underlayColor={Color.white} onPress={() => navigation.goBack()} style={[styles.back_icon_box, { marginTop: -10 }]}>
                            <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={24} color={Color.black} />
                        </TouchableHighlight>
                    )}

                    <TextInput
                        ref={inputRef}
                        placeholder="Tìm kiếm trên Facebook"
                        placeholderTextColor={Color.gray}
                        value={keyWord}
                        onChangeText={(text) => {
                            setKeyWord(text);
                        }}
                        style={styles.input}
                        onSubmitEditing={handleSearch}
                        onFocus={onFocus}
                        // onBlur={onBlur1}
                    />

                    {keyWord !== '' &&
                        (isLoading ? (
                            <View style={styles.item_loading}>
                                <ActivityIndicator size="small" color={Color.gray} />
                            </View>
                        ) : (
                            <TouchableHighlight activeOpacity={1} underlayColor={Color.lightGray} onPress={() => setKeyWord('')} style={styles.item_loading}>
                                <VectorIcon
                                    nameIcon={'x'}
                                    typeIcon={'Feather'}
                                    size={16}
                                    color={'#000'}
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor: Color.grey4,
                                        padding: 2,
                                        marginBottom: 8,
                                    }}
                                />
                            </TouchableHighlight>
                        ))}
                </HeaderView>
            </HeaderSafeArea>

            {isFocused && (
                <TouchableHighlight
                    underlayColor={Color.white}
                    onPress={onBlur}
                    style={[styles.back_icon_box, { marginTop: -55, zIndex: 1000111, marginRight: 10, marginLeft: 10 }]}
                >
                    <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={24} color={Color.black} />
                </TouchableHighlight>
            )}
            <Animated.View style={[styles.content, { opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] }]}>
                <ContentInner>
                    {keyWord === '' ? (
                        !isLoadHistory ? (
                            <Body refreshing={pageHistory.isRefresh} onRefresh={onRefresh} refreshControl={refreshControl}>
                                <Text style={styles.content_title}>Gần đây</Text>
                                <TouchableOpacity style={styles.button_view_all} onPress={() => navigate(routes.SEARCH_LOG_SCREEN)}>
                                    <Text style={styles.keyword_text_search}>Xem tất cả</Text>
                                </TouchableOpacity>

                                {historySearch.length > 0 ? (
                                    historySearch.map((item, index) => (
                                        <SearchHistoryComponent
                                            key={item.id}
                                            item={item}
                                            navigation={navigation}
                                            handleDeleteHistorySearch={handleDeleteHistorySearch}
                                        />
                                    ))
                                ) : (
                                    <Text style={styles.content_text}>Không có tìm kiếm nào gần đây</Text>
                                )}
                                {pageHistory.hasNext && (
                                    <TouchableOpacity onPress={handleLoadMoreHistorySearch}>
                                        <Text style={styles.keyword_text_search}>Xem thêm</Text>
                                    </TouchableOpacity>
                                )}
                                <View style={{ height: 200, width: width }} />
                            </Body>
                        ) : (
                            <BodyLoad>
                                <ActivityIndicator size="small" color={Color.gray} />
                            </BodyLoad>
                        )
                    ) : (
                        <Body>
                            <TouchableOpacity style={styles.search_item} onPress={handleSearch}>
                                <Text style={styles.keyword_text_search}>
                                    Xem tất cả kết quả cho <Text style={styles.keyword_text}>{keyWord}</Text>
                                </Text>
                            </TouchableOpacity>
                        </Body>
                    )}
                </ContentInner>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        paddingHorizontal: 16,
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: Color.white,
        width: width - 32,
    },
    search_input_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Color.lightGray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    input: {
        height: 40,
        backgroundColor: Color.lightGray,
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 18,
        marginRight: 10,
        width: width - 60,
        position: 'absolute',
        right: 0,
        top: 5,
    },
    input_text: {
        flex: 1,
        fontWeight: '700',
        paddingHorizontal: 10,
        fontSize: 15,
        color: Color.gray,
    },
    microphone_icon: {
        fontSize: 18,
        color: Color.gray,
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back_icon: {
        fontSize: 23,
        color: Color.gray,
    },
    content_safe_area: {
        flex: 1,
        backgroundColor: Color.white,
    },
    content: {
        height: height - 50,
        width: width,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1000,
    },
    content_title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    content_text: {
        textAlign: 'center',
        marginBottom: 20,
        color: Color.gray,
        fontSize: 18,
    },
    content_inner: {
        flex: 1,
        paddingTop: 50,
        width: width,
        height: height,
        backgroundColor: Color.white,
    },
    tap_to_close_text: {
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '700',
        color: Color.gray,
    },
    search_icon: {
        fontSize: 20,
        color: Color.gray,
    },
    image_placeholder_text: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    keyword_text_search: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: Color.blueButtonColor,
    },
    keyword_text: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: Color.blueButtonColor,
    },
    search_item: {
        backgroundColor: Color.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    button_view_all: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    item_icon: {
        marginRight: 15,
    },
    item_loading: {
        position: 'absolute',
        right: 20,
        alignItems: 'center',
    },
});
const HeaderSafeArea = styled(SafeAreaView)`
    z-index: 1000;
`;

const HeaderView = styled(View)`
    width: 100%;
    height: 60px;
    background-color: ${Color.white};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
`;

const AnimatedView = styled(Animated.View)`
    height: 50px;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${Color.white};
    width: ${width}px;
`;

const ContentInner = styled(View)`
    flex: 1;
    padding-top: 50px;
`;

const Body = styled.ScrollView`
    background-color: ${Color.white};
    flex-direction: column;
    padding-vertical: 10px;
    padding-horizontal: 10px;
    z-index: 11111100;
    height: ${height}px;
`;

const BodyLoad = styled.View`
    flex: 1;
    background-color: ${Color.white};
    flex-direction: column;
    align-items: center;
    padding-vertical: 10px;
    padding-horizontal: 10px;
`;

export default SearchInputComponent;
