/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Platform, NativeModules, BackHandler } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';
import ButtonIconComponent from './ButtonIconComponent';

const HEIGHT_DEVICE = Dimensions.get('window').height;
const WIDTH_DEVICE = Dimensions.get('window').width;
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT - 20;

const Container = styled.View`
    flex: 1;
`;

const StyledUnit = styled.View`
    flex-direction: row;
`;

const StyledScrollView = styled.ScrollView`
    flex: 1;
    background-color: ${Color.black};
`;

const StyledImage = styled.Image``;

const NumberOfImage = styled.Text`
    position: absolute;
    color: ${Color.white};
    font-size: 18px;
    font-weight: bold;
    top: ${STATUSBAR_HEIGHT + 6}px;
    z-index: 10;
    left: ${Dimensions.get('window').width / 2 - 15}px;
`;

const HeaderModal = styled.View`
    margin-top: ${STATUSBAR_HEIGHT}px;
    position: absolute;
    width: 100%;
    height: 45px;
    z-index: 1;
    background-color: ${Color.backGroundLoading};
    justify-content: center;
`;

const MoreImage = styled.View`
    position: absolute;
    align-self: center;
    align-items: center;
    justify-content: center;
    left: 3px;
    top: 3px;
    background-color: ${Color.black};
    height: 100%;
    width: 100%;
    opacity: 0.8;
`;

const NumberMore = styled.Text`
    color: ${Color.white};
    font-size: 24px;
    font-family: 'Roboto-Medium';
`;

const CloseButton = styled.TouchableOpacity`
    color: ${Color.white};
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    background-color: ${Color.white};
    left: 10px;
`;

const ContainerFooter = styled.View`
    position: absolute;
    bottom: 0px;
    width: 100%;
    background-color: ${Color.backGroundLoading};
    align-items: center;
`;

const ContainerInfo = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-horizontal: 10px;
    padding-vertical: 10px;
    width: 95%;
`;

const NameAuthor = styled.Text`
    color: ${Color.white};
    font-size: 14px;
    font-family: 'Roboto-Bold';
`;

const PostTimeContainer = styled.View`
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const PostTime = styled.Text`
    font-size: 13px;
    color: ${Color.gray};
    font-family: 'Roboto-Regular';
`;

const FooterPost = styled.View`
    border-top-width: 1px;
    border-top-color: ${Color.white};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
    padding-vertical: 2px;
    width: 95%;
    background-color: ${Color.backGroundLoading};
`;

const ButtonIcon = styled(ButtonIconComponent)``;

const GridImageView = ({ data, headers = null, renderModalFooter = null, transparent = 0.7, heightOfGridImage = Dimensions.get('window').height / 5.5 }) => {
    const [modal, setModal] = useState({ visible: false, data: 0 });
    const ref = useRef();
    const [numberOfImage, setNumberOfImage] = useState(data?.length);
    const [height, setHeight] = useState(STATUSBAR_HEIGHT);
    const [numberOut, setNumberOut] = useState(1);

    const onCloseModal = () => {
        setModal({ visible: false, data: 0 });
    };

    useEffect(() => {
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight((statusBarHeight) => {
                setHeight(statusBarHeight.height);
            });
        }
        BackHandler.addEventListener('hardwareBackPress', onCloseModal);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onCloseModal);
        };
    }, []);

    useEffect(() => {
        setNumberOfImage(data?.length);
    }, [data]);

    const Component = (number) => {
        const [numberOfImageScroll, setNumberOfImageScroll] = useState(1);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const handlePressImage = () => {
            setIsModalVisible(!isModalVisible);
        };

        useEffect(() => {
            setNumberOfImageScroll(numberOut);
        }, [numberOut]);
        return (
            <Container style={{ paddingTop: height }}>
                {isModalVisible && (
                    <HeaderModal>
                        <NumberOfImage>{`${numberOfImageScroll} / ${numberOfImage}`}</NumberOfImage>

                        <CloseButton
                            onPress={() => {
                                setModal({ visible: false, data: 0 });
                            }}
                        >
                            <VectorIcon nameIcon={'close'} typeIcon={'MaterialCommunityIcons'} size={20} color={Color.black} backgroundColor={Color.white} />
                        </CloseButton>
                    </HeaderModal>
                )}
                <StyledScrollView
                    showsHorizontalScrollIndicator={false}
                    ref={ref}
                    snapToInterval={Dimensions.get('window').width}
                    decelerationRate="fast"
                    pagingEnabled
                    horizontal
                    onMomentumScrollEnd={(event) => {
                        const viewSize = event.nativeEvent.layoutMeasurement.width;
                        const contentOffset = event.nativeEvent.contentOffset.x;
                        const pageNum = Math.floor(contentOffset / viewSize) + 1;
                        setNumberOfImageScroll(pageNum > 0 ? pageNum : 1);
                    }}
                >
                    {data &&
                        data?.map((item, index) => (
                            <Pressable key={index} onPress={handlePressImage}>
                                <StyledImage
                                    style={{
                                        height: Dimensions.get('window').height,
                                        width: Dimensions.get('window').width,
                                        resizeMode: 'contain',
                                        backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                                    }}
                                    source={{
                                        uri: item.url,
                                        ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                                    }}
                                />
                            </Pressable>
                        ))}
                </StyledScrollView>
                {renderModalFooter && isModalVisible && (
                    <ContainerFooter>
                        <ContainerInfo>
                            <NameAuthor>Nguyễn Văn A</NameAuthor>
                            <PostTimeContainer>
                                {/* <PostTime>{convertTimeAgo(item.created)}</PostTime> */}
                                <PostTime>1 giờ trước</PostTime>
                                <VectorIcon nameIcon={'dot-single'} typeIcon={'Entypo'} color={Color.gray} size={10} />
                                {/* {item.state !== 'published' ? ( */}
                                <VectorIcon nameIcon={'public'} typeIcon={'MaterialIcons'} color={Color.gray} size={16} />
                                {/* ) : (
                                    <VectorIcon nameIcon={'user-friends'} typeIcon={'FontAwesome5'} color={Color.gray} size={14} />
                                )} */}
                            </PostTimeContainer>
                        </ContainerInfo>

                        <FooterPost>
                            <ButtonIcon
                                title={'Thích'}
                                nameIcon={'like2'}
                                typeIcon={'AntDesign'}
                                propsIcon={{ color: Color.white, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                                propsTitle={{ color: Color.white, size: 13, fontWeight: 600 }}
                                propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                            />
                            <ButtonIcon
                                title={'Bình luận'}
                                nameIcon={'comment-o'}
                                typeIcon={'FontAwesome'}
                                propsIcon={{ color: Color.white, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                                propsTitle={{ color: Color.white, size: 13, fontWeight: 600 }}
                                propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                            />
                            <ButtonIcon
                                title={'Gửi'}
                                nameIcon={'message1'}
                                typeIcon={'AntDesign'}
                                propsIcon={{ color: Color.white, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                                propsTitle={{ color: Color.white, size: 13, fontWeight: 600 }}
                                propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                            />
                            <ButtonIcon
                                nameIcon={'sharealt'}
                                title={'Chia sẻ'}
                                typeIcon={'AntDesign'}
                                propsIcon={{ color: Color.white, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                                propsTitle={{ color: Color.white, size: 13, fontWeight: 600 }}
                                propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                            />
                        </FooterPost>
                    </ContainerFooter>
                )}
            </Container>
        );
    };

    const Component1 = (item) => {
        return (
            <StyledUnit
                style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxHeight: HEIGHT_DEVICE, paddingVertical: 8 }}
            >
                <Pressable
                    onPress={() => {
                        setModal({ visible: true, data: 0 });
                        setNumberOut(1);
                        setTimeout(() => {
                            ref.current.scrollTo({
                                x: Dimensions.get('window').width,
                                y: 0,
                                animated: false,
                            });
                        }, 1);
                    }}
                >
                    <StyledImage
                        style={{
                            width: WIDTH_DEVICE - 6,
                            maxHeight: HEIGHT_DEVICE * 0.6,
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: data[0].url,
                            ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                        }}
                    />
                </Pressable>
            </StyledUnit>
        );
    };

    const Component2 = (items) => {
        return (
            <StyledUnit
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    maxHeight: HEIGHT_DEVICE / 2,
                    paddingVertical: 8,
                }}
            >
                {items.item.map((item, index) => (
                    <Pressable
                        style={{ padding: 3 }}
                        key={index}
                        onPress={() => {
                            setModal({ visible: true, data: index });
                            setNumberOut(index + 1);
                            setTimeout(() => {
                                ref.current.scrollTo({
                                    x: Dimensions.get('window').width * index,
                                    y: 0,
                                    animated: false,
                                });
                            }, 1);
                        }}
                    >
                        <StyledImage
                            style={{
                                width: WIDTH_DEVICE - 6,
                                maxHeight: HEIGHT_DEVICE / 4,
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                            source={{
                                uri: item.url,
                                ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                            }}
                        />
                    </Pressable>
                ))}
            </StyledUnit>
        );
    };

    const Component3 = (items) => {
        return (
            <StyledUnit
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    maxHeight: HEIGHT_DEVICE * 0.6,
                    maxWidth: WIDTH_DEVICE,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    style={{ paddingHorizontal: 3, paddingVertical: 8 }}
                    onPress={() => {
                        setModal({ visible: true, data: 0 });
                        setNumberOut(1);
                        setTimeout(() => {
                            ref.current.scrollTo({
                                x: 0,
                                y: 0,
                                animated: false,
                            });
                        }, 1);
                    }}
                >
                    <StyledImage
                        style={{
                            width: (WIDTH_DEVICE * 2) / 3 - 6,
                            maxHeight: HEIGHT_DEVICE * 0.6,
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: items.item[0].url,
                            ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                        }}
                    />
                </Pressable>
                <StyledUnit
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        maxHeight: HEIGHT_DEVICE / 2 - 6,
                        maxWidth: WIDTH_DEVICE / 3,
                    }}
                >
                    {items.item.slice(1, 3).map((item, index) => (
                        <Pressable
                            style={{ padding: 3 }}
                            key={index}
                            onPress={() => {
                                setModal({ visible: true, data: index + 1 });
                                setNumberOut(index + 2);
                                setTimeout(() => {
                                    ref.current.scrollTo({
                                        x: Dimensions.get('window').width * (index + 1),
                                        y: 0,
                                        animated: false,
                                    });
                                }, 1);
                            }}
                        >
                            <StyledImage
                                style={{
                                    width: WIDTH_DEVICE / 3 - 6,
                                    maxHeight: (HEIGHT_DEVICE * 0.6) / 2 - 10,
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                                source={{
                                    uri: item.url,
                                    ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                                }}
                            />
                        </Pressable>
                    ))}
                </StyledUnit>
            </StyledUnit>
        );
    };

    const Component4 = (items) => {
        return (
            <StyledUnit
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    maxHeight: HEIGHT_DEVICE * 0.6,
                    maxWidth: WIDTH_DEVICE,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    style={{ paddingHorizontal: 3, paddingVertical: 8 }}
                    onPress={() => {
                        setModal({ visible: true, data: 0 });
                        setNumberOut(1);
                        setTimeout(() => {
                            ref.current.scrollTo({
                                x: 0,
                                y: 0,
                                animated: false,
                            });
                        }, 1);
                    }}
                >
                    <StyledImage
                        style={{
                            width: (WIDTH_DEVICE * 2) / 3 - 6,
                            maxHeight: HEIGHT_DEVICE * 0.6,
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: items.item[0].url,
                            ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                        }}
                    />
                </Pressable>
                <StyledUnit
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        maxHeight: HEIGHT_DEVICE / 2 - 6,
                        maxWidth: WIDTH_DEVICE / 3,
                    }}
                >
                    {items.item.slice(1, 4).map((item, index) => (
                        <Pressable
                            style={{ padding: 3 }}
                            key={index}
                            onPress={() => {
                                setModal({ visible: true, data: index + 1 });
                                setNumberOut(index + 2);
                                setTimeout(() => {
                                    ref.current.scrollTo({
                                        x: Dimensions.get('window').width * (index + 1),
                                        y: 0,
                                        animated: false,
                                    });
                                }, 1);
                            }}
                        >
                            <StyledImage
                                style={{
                                    width: WIDTH_DEVICE / 3 - 6,
                                    maxHeight: HEIGHT_DEVICE * 0.2 - 9,
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                                source={{
                                    uri: item.url,
                                    ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                                }}
                            />
                        </Pressable>
                    ))}
                </StyledUnit>
            </StyledUnit>
        );
    };

    const Component5 = (items) => {
        return (
            <StyledUnit
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    maxHeight: HEIGHT_DEVICE * 0.6,
                    maxWidth: WIDTH_DEVICE,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    style={{ paddingHorizontal: 3, paddingVertical: 8 }}
                    onPress={() => {
                        setModal({ visible: true, data: 0 });
                        setNumberOut(1);
                        setTimeout(() => {
                            ref.current.scrollTo({
                                x: 0,
                                y: 0,
                                animated: false,
                            });
                        }, 1);
                    }}
                >
                    <StyledImage
                        style={{
                            width: (WIDTH_DEVICE * 2) / 3 - 6,
                            maxHeight: HEIGHT_DEVICE * 0.6,
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={{
                            uri: items.item[0].url,
                            ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                        }}
                    />
                </Pressable>
                <StyledUnit
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        maxHeight: HEIGHT_DEVICE / 2 - 6,
                        maxWidth: WIDTH_DEVICE / 3,
                    }}
                >
                    {items.item.slice(1, 3).map((item, index) => (
                        <Pressable
                            style={{ padding: 3 }}
                            key={index}
                            onPress={() => {
                                setModal({ visible: true, data: index + 1 });
                                setNumberOut(index + 2);
                                setTimeout(() => {
                                    ref.current.scrollTo({
                                        x: Dimensions.get('window').width * (index + 1),
                                        y: 0,
                                        animated: false,
                                    });
                                }, 1);
                            }}
                        >
                            <StyledImage
                                style={{
                                    width: WIDTH_DEVICE / 3 - 6,
                                    maxHeight: HEIGHT_DEVICE * 0.2 - 9,
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                                source={{
                                    uri: item.url,
                                    ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                                }}
                            />
                        </Pressable>
                    ))}
                    <Pressable
                        style={{ padding: 3, opacity: 0.8 }}
                        onPress={() => {
                            setModal({ visible: true, data: 3 });
                            setNumberOut(4);
                            setTimeout(() => {
                                ref.current.scrollTo({
                                    x: Dimensions.get('window').width * 3,
                                    y: 0,
                                    animated: false,
                                });
                            }, 1);
                        }}
                    >
                        <StyledImage
                            style={{
                                width: WIDTH_DEVICE / 3 - 6,
                                maxHeight: HEIGHT_DEVICE * 0.2 - 9,
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                            source={{
                                uri: items.item[3].url,
                                ...(headers === null || headers === undefined ? {} : { method: 'POST', headers }),
                            }}
                        />

                        <MoreImage>
                            <NumberMore>{`+${items.item.length - 3}`}</NumberMore>
                        </MoreImage>
                    </Pressable>
                </StyledUnit>
            </StyledUnit>
        );
    };

    return (
        <Container>
            <Modal animationType="slide" transparent={true} visible={modal.visible} onRequestClose={onCloseModal}>
                <Component />
            </Modal>

            {numberOfImage === 1 ? (
                <Component1 item={data[0]} />
            ) : numberOfImage === 2 ? (
                <Component2 item={data} />
            ) : numberOfImage === 3 ? (
                <Component3 item={data} />
            ) : numberOfImage === 4 ? (
                <Component4 item={data} />
            ) : numberOfImage > 4 ? (
                <Component5 item={data} />
            ) : null}
        </Container>
    );
};

export default GridImageView;
