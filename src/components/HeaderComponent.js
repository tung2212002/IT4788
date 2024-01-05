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

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import { SVGLogo } from '../../assets';
import SearchHistoryComponent from './SearchComponent.js/SearchHistoryComponent';
import { delSavedSearchService, getSavedSearchService, searchService } from '../services/searchService';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';

const { Value, timing } = Animated;
const { width, height } = Dimensions.get('window');

const HeaderComponent = ({ navigation, opacity, title, listItem }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [keyWord, setKeyWord] = useState('');
    const inputBoxTranslateX = useRef(new Value(width)).current;
    const backButtonOpacity = useRef(new Value(0)).current;
    const contentTranslateY = useRef(new Value(height)).current;
    const contentOpacity = useRef(new Value(0)).current;
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [historySearch, setHistorySearch] = useState([]);
    const [isLoadHistory, setIsLoadHistory] = useState(false);
    const [pageHistory, setPageHistory] = useState({
        index: 0,
        count: 10,
        hasNext: false,
        isRefresh: false,
    });

    const onFocus = () => {
        setIsFocused(true);
        Animated.parallel([
            timing(inputBoxTranslateX, { toValue: 0, duration: 200, easing: Easing.ease, useNativeDriver: false }),
            timing(backButtonOpacity, { toValue: 1, duration: 200, easing: Easing.ease, useNativeDriver: false }),
            timing(contentTranslateY, { toValue: 0, duration: 0, easing: Easing.ease, useNativeDriver: false }),
            timing(contentOpacity, { toValue: 1, duration: 200, easing: Easing.ease, useNativeDriver: false }),
        ]).start();
        inputRef.current.focus();
    };

    const onBlur = () => {
        setIsFocused(false);
        Animated.parallel([
            timing(inputBoxTranslateX, { toValue: width, duration: 200, easing: Easing.ease, useNativeDriver: false }),
            timing(backButtonOpacity, { toValue: 0, duration: 50, easing: Easing.ease, useNativeDriver: false }),
            timing(contentTranslateY, { toValue: height, duration: 0, easing: Easing.ease, useNativeDriver: false }),
            timing(contentOpacity, { toValue: 0, duration: 200, easing: Easing.ease, useNativeDriver: false }),
        ]).start();
        inputRef.current.blur();
    };

    const onRefresh = () => {
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

    const handleDeleteHistorySearch = (id, all = false) => {
        const body = {
            search_id: id,
            all: all,
        };

        delSavedSearchService(body)
            .then((response) => {
                if (response.data.code === '1000') {
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

    const handleSearch = () => {
        if (keyWord.trim() === '') {
            return;
        }
        navigation.push(routes.SEARCH_RESULT_SCREEN, { keyword: keyWord, navigation: navigation, refreshHistory: onRefresh });
        onRefresh();
    };

    useEffect(() => {
        handleGetHistorySearch();
    }, []);

    useEffect(() => {
        if (pageHistory.isRefresh && !isLoadHistory) {
            handleGetHistorySearch();
        }
    }, [pageHistory.isRefresh]);

    return title ? (
        <Header>
            <Title>{title}</Title>
            {listItem.map((item, index) => (
                <Icon key={index} nameIcon={item.nameIcon} typeIcon={item.typeIcon} size={22} color={Color.black} />
            ))}
        </Header>
    ) : (
        // <KeyboardAvoidingView style={{ opacity: opacity }}>
        <View style={{ opacity: opacity }}>
            <HeaderSafeArea>
                <HeaderView>
                    <SVGLogo width={170} height={60} />
                    <ListIcon>
                        <TouchableHighlight>
                            <VectorIcon nameIcon={'plus'} typeIcon={'Entypo'} size={22} color={Color.black} style={styles.search_input_box} />
                        </TouchableHighlight>
                        <TouchableHighlight activeOpacity={1} underlayColor={'ccd0d5'} onPress={onFocus}>
                            <VectorIcon nameIcon={'search'} typeIcon={'FontAwesome5'} size={20} color={Color.black} style={styles.search_input_box} />
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <VectorIcon
                                nameIcon={'facebook-messenger'}
                                typeIcon={'MaterialCommunityIcons'}
                                size={22}
                                color={Color.black}
                                style={styles.search_input_box}
                            />
                        </TouchableHighlight>
                    </ListIcon>
                    <AnimatedView style={{ transform: [{ translateX: inputBoxTranslateX }] }}>
                        <Animated.View style={{ opacity: backButtonOpacity }}>
                            <TouchableHighlight activeOpacity={1} underlayColor={Color.lightGray} onPress={onBlur} style={styles.back_icon_box}>
                                <VectorIcon nameIcon={'chevron-back'} typeIcon={'Ionicons'} size={24} color={Color.black} />
                            </TouchableHighlight>
                        </Animated.View>
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
                        />
                        {keyWord !== '' &&
                            (isLoading ? (
                                <View style={styles.item_loading}>
                                    <ActivityIndicator size="small" color={Color.gray} />
                                </View>
                            ) : (
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={Color.lightGray}
                                    onPress={() => setKeyWord('')}
                                    style={styles.item_loading}
                                >
                                    <VectorIcon
                                        nameIcon={'x'}
                                        typeIcon={'Feather'}
                                        size={16}
                                        color={'#000'}
                                        style={{ borderRadius: 20, backgroundColor: Color.grey4, padding: 2 }}
                                    />
                                </TouchableHighlight>
                            ))}
                    </AnimatedView>
                </HeaderView>
            </HeaderSafeArea>
            <Animated.View style={[styles.content, { opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] }]}>
                <ContentInner>
                    {keyWord.trim() === '' ? (
                        !isLoadHistory ? (
                            <Body refreshing={true} onRefresh={onRefresh} refreshControl={refreshControl}>
                                <Text style={styles.content_title}>Gần đây</Text>
                                <TouchableOpacity
                                    style={styles.button_view_all}
                                    onPress={() => navigation.push(routes.SEARCH_LOG_SCREEN, { refreshHistory: onRefresh })}
                                >
                                    <Text style={styles.keyword_text_search}>Xem tất cả</Text>
                                </TouchableOpacity>

                                {historySearch.length > 0 ? (
                                    historySearch.map((item, index) => (
                                        <SearchHistoryComponent
                                            key={item.id}
                                            item={item}
                                            navigation={navigation}
                                            handleDeleteHistorySearch={handleDeleteHistorySearch}
                                            refreshHistory={onRefresh}
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
                                <View style={{ height: 100, width: width }} />
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
        // </KeyboardAvoidingView>
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
        left: 0,
        backgroundColor: Color.white,
        width: width - 32,
    },
    search_input_box: {
        width: 36,
        height: 36,
        borderRadius: 36,
        backgroundColor: Color.lightGray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: Color.lightGray,
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 18,
        marginRight: 10,
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
        height: height,
        width: width,
        position: 'absolute',
        left: 0,
        top: 0,
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
        marginVertical: 20,
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

const ContentInner = styled.View`
    flex: 1;
    padding-top: 50px;
`;

const ListIcon = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 57px;
    padding: 10px;
    background-color: ${Color.white};
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

const Body = styled.ScrollView`
    flex: 1;
    background-color: ${Color.white};
    flex-direction: column;
    padding-vertical: 10px;
    padding-horizontal: 10px;
`;

const BodyLoad = styled.View`
    flex: 1;
    background-color: ${Color.white};
    flex-direction: column;
    align-items: center;
    padding-vertical: 10px;
    padding-horizontal: 10px;
`;

export default HeaderComponent;
