/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Pressable, Modal } from 'react-native';
import _ from 'lodash';
import { Image } from 'react-native';
import Color from '../../utils/Color';
import styled from 'styled-components/native';
import ButtonIconComponent from '../ButtonIconComponent';
import VectorIcon from '../../utils/VectorIcon';
import convertTimeAgo from '../../utils/convertTimeAgo';
import FeelComponent from '../PostComponent/FeelComponent';
import CachedImage from '../CachedImage';

const { width } = Dimensions.get('window');

const Container = styled.View`
    flex: 1;
`;

const StyledScrollView = styled.ScrollView`
    flex: 1;
    background-color: ${Color.black};
`;

const StyledImage = styled.Image``;

const NumberOfImage = styled.Text`
    position: absolute;
    color: ${Color.white};
    font-size: 16px;
    font-weight: bold;
    z-index: 10;
    left: ${Dimensions.get('window').width / 2 - 15}px;
    font-family: 'Roboto-Bold';
`;

const HeaderModal = styled.View`
    position: absolute;
    width: 100%;
    height: 60px;
    z-index: 1;
    background-color: ${Color.backGroundLoading};
    justify-content: center;
    padding-vertical: 15px;
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
    padding-top: 10px;
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
    color: ${Color.grey4};
    font-family: 'Roboto-Regular';
`;

const FooterPost = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
    padding-vertical: 2px;
    width: 95%;
    background-color: ${Color.backGroundTransparent};
`;

const ButtonIcon = styled(ButtonIconComponent)``;

const PhotoGrid = (props) => {
    const { imageProps, setAllImage, allImage, canDelete, renderModalFooter, renderMFooter, handleDeleteImage, setItemPost, cacheFolder } = props;
    const source = _.take(props.source, 5);
    const firstViewImages = [];
    const secondViewImages = [];
    const firstItemCount = source.length === 5 ? 2 : 1;
    let index = 0;
    source.forEach((img) => {
        if (index === 0 || (index === 1 && firstItemCount === 2)) {
            firstViewImages.push(img);
        } else {
            secondViewImages.push(img);
        }
        index++;
    });

    const { width, height } = props;
    let ratio = 0;

    if (secondViewImages.length === 0) {
        ratio = 0;
    } else if (secondViewImages.length === 1) {
        ratio = 1 / 2;
    } else {
        ratio = props.ratio;
    }

    const direction = source.length === 5 ? 'row' : 'column';

    const firstImageWidth = direction === 'column' ? width / firstViewImages.length : width * (1 - ratio);
    const firstImageHeight = direction === 'column' ? height * (1 - ratio) : height / firstViewImages.length;

    const secondImageWidth = direction === 'column' ? width / secondViewImages.length : width * ratio;
    const secondImageHeight = direction === 'column' ? height / secondViewImages.length : height * ratio;

    const secondViewWidth = direction === 'column' ? width : width * ratio;
    const secondViewHeight = direction === 'column' ? height * ratio : height;

    const [modal, setModal] = useState({ visible: false, data: 0 });
    const [numberOut, setNumberOut] = useState(1);
    const ref = useRef();
    const [numberOfImage, setNumberOfImage] = useState(props.source?.length);

    const onCloseModal = () => {
        setModal({ visible: false, data: 0 });
    };

    const Component = () => {
        const [numberOfImageScroll, setNumberOfImageScroll] = useState(modal.data + 1);
        const [isModalVisible, setIsModalVisible] = useState(true);
        const handlePressImage = () => {
            setIsModalVisible(!isModalVisible);
        };

        useEffect(() => {
            setNumberOfImageScroll(numberOut);
        }, [numberOut]);

        useEffect(() => {
            setNumberOfImage(props.source?.length);
        }, [props.source?.length]);

        useEffect(() => {
            if (isModalVisible) {
                setNumberOut(numberOfImageScroll);
            }
        }, [isModalVisible]);

        return (
            <Container>
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
                    {props.source &&
                        props.source?.map((item, key) => (
                            <Pressable key={key} onPress={handlePressImage}>
                                {canDelete && !isModalVisible && (
                                    <Pressable
                                        style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            backgroundColor: Color.backGroundTransparent5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            zIndex: 1011,
                                        }}
                                        onPress={() => {
                                            if (item?.url || item?.uri) {
                                                if (numberOfImageScroll === 1 && props.source.length === 1) {
                                                    setModal({ visible: false, data: 0 });
                                                    handleDeleteImage ? handleDeleteImage(item?.url ? item?.url : item?.uri) : null;
                                                } else if (numberOfImageScroll === 1 && props.source.length > 1) {
                                                    setModal({ ...modal, data: numberOfImageScroll });
                                                    setNumberOut(numberOfImageScroll + 1);
                                                    handleDeleteImage ? handleDeleteImage(item?.url ? item?.url : item?.uri) : null;
                                                } else if (numberOfImageScroll < props.source.length) {
                                                    setModal({ ...modal, data: numberOfImageScroll - 1 });
                                                    setNumberOut(numberOfImageScroll - 1);
                                                    setTimeout(() => {
                                                        ref.current.scrollTo({
                                                            x: Dimensions.get('window').width * (numberOfImageScroll - 1),
                                                            y: 0,
                                                            animated: false,
                                                        });
                                                    }, 1);
                                                    handleDeleteImage ? handleDeleteImage(item?.url ? item?.url : item?.uri) : null;
                                                } else if (numberOfImageScroll === props.source.length) {
                                                    setModal({ ...modal, data: numberOfImageScroll - 2 });
                                                    setNumberOut(numberOfImageScroll - 2);
                                                    setTimeout(() => {
                                                        ref.current.scrollTo({
                                                            x: Dimensions.get('window').width * (numberOfImageScroll - 2),
                                                            y: 0,
                                                            animated: false,
                                                        });
                                                    }, 1);
                                                    handleDeleteImage ? handleDeleteImage(item?.url ? item?.url : item?.uri) : null;
                                                }
                                                setAllImage(allImage.filter((i) => (i?.uri ? i?.uri : i?.url) !== item?.url));
                                            }
                                        }}
                                    >
                                        <Text style={{ color: Color.white, fontSize: 20 }}>Xóa</Text>
                                    </Pressable>
                                )}
                                {cacheFolder !== '' ? (
                                    <CachedImage
                                        style={{
                                            height: Dimensions.get('window').height,
                                            width: Dimensions.get('window').width,
                                            resizeMode: 'contain',
                                            backgroundColor: Color.backGroundTransparent5,
                                            zIndex: 1010,
                                        }}
                                        source={{
                                            uri: typeof item === 'string' ? item : item?.url,
                                        }}
                                        cacheKey={item?.url.split('/').pop()}
                                        cacheFolder={cacheFolder}
                                        image={true}
                                    />
                                ) : (
                                    <Image
                                        style={{
                                            height: Dimensions.get('window').height,
                                            width: Dimensions.get('window').width,
                                            resizeMode: 'contain',
                                            backgroundColor: Color.backGroundTransparent5,
                                        }}
                                        source={{
                                            uri: item?.url,
                                        }}
                                    />
                                )}
                            </Pressable>
                        ))}
                </StyledScrollView>
                {renderModalFooter && (
                    <ContainerFooter
                        pointerEvents={isModalVisible ? 'auto' : 'none'}
                        style={{
                            opacity: isModalVisible ? 1 : 0,
                        }}
                    >
                        <ContainerInfo>
                            <NameAuthor>{renderMFooter.author.name}</NameAuthor>
                            <PostTimeContainer>
                                <PostTime>{convertTimeAgo(renderMFooter.created)}</PostTime>
                                <VectorIcon nameIcon={'dot-single'} typeIcon={'Entypo'} color={Color.gray} size={10} />
                                {/* {item.state !== 'published' ? ( */}
                                <VectorIcon nameIcon={'public'} typeIcon={'MaterialIcons'} color={Color.gray} size={16} />
                                {/* ) : (
                                    <VectorIcon nameIcon={'user-friends'} typeIcon={'FontAwesome5'} color={Color.gray} size={14} />
                                )} */}
                            </PostTimeContainer>
                        </ContainerInfo>

                        <FooterPost>
                            <FeelComponent data={renderMFooter} setItemPost={setItemPost} />
                        </FooterPost>
                    </ContainerFooter>
                )}
            </Container>
        );
    };

    return source.length ? (
        <View style={[{ flexDirection: direction, width, height }, props.styles]}>
            <Modal animationType="slide" transparent={true} visible={modal.visible} onRequestClose={onCloseModal}>
                <Component />
            </Modal>
            <View style={{ flex: 1, flexDirection: direction === 'row' ? 'column' : 'row' }}>
                {firstViewImages.map((image, key) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={key}
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal({ visible: true, data: key });
                            setNumberOut(1);
                            setTimeout(() => {
                                ref.current.scrollTo({
                                    x: Dimensions.get('window').width * key,
                                    y: 0,
                                    animated: false,
                                });
                            }, 1);
                        }}
                    >
                        {/* <ImageLoad
                            style={[styles.image, { width: firstImageWidth, height: firstImageHeight }, props.imageStyle]}
                            source={typeof image === 'string' ? { uri: image } : image}
                            {...imageProps}
                        /> */}
                        {cacheFolder !== '' ? (
                            <CachedImage
                                imageStyle={[styles.image, { width: firstImageWidth, height: firstImageHeight }, props.imageStyle]}
                                source={{ uri: image?.url }}
                                cacheKey={image?.url.split('/').pop()}
                                cacheFolder={cacheFolder}
                            />
                        ) : (
                            <ImageBackground
                                style={[styles.image, { width: firstImageWidth, height: firstImageHeight }, props.imageStyle]}
                                source={{ uri: image?.url }}
                            />
                        )}

                        {canDelete && (
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    backgroundColor: Color.backGroundTransparent5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    if (image?.url) {
                                        handleDeleteImage ? handleDeleteImage(image.url ? image.url : image.uri) : null;
                                        setAllImage(allImage.filter((item) => (item.uri ? item.uri : item?.url) !== image?.url));
                                    }
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 20 }}>x</Text>
                            </Pressable>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            {secondViewImages.length ? (
                <View style={{ width: secondViewWidth, height: secondViewHeight, flexDirection: direction === 'row' ? 'column' : 'row' }}>
                    {secondViewImages.map((image, key) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={key}
                            style={{ flex: 1 }}
                            onPress={() => {
                                setModal({ visible: true, data: key + firstViewImages.length });
                                setNumberOut(1);
                                setTimeout(() => {
                                    ref.current.scrollTo({
                                        x: Dimensions.get('window').width * (key + firstViewImages.length),
                                        y: 0,
                                        animated: false,
                                    });
                                }, 1);
                            }}
                        >
                            {key < 4 && props.source.length > 5 && index === key + 3 ? (
                                cacheFolder !== '' ? (
                                    <CachedImage
                                        imageStyle={[styles.image, { width: secondImageWidth, height: secondImageHeight }, props.imageStyle]}
                                        source={{ uri: typeof image === 'string' ? image : image?.url }}
                                        cacheKey={image?.url.split('/').pop()}
                                        cacheFolder={cacheFolder}
                                    >
                                        <View style={styles.lastWrapper}>
                                            <Text style={[styles.textCount, props.textStyles]}>+{props.source.length - 5}</Text>
                                        </View>
                                    </CachedImage>
                                ) : (
                                    <ImageBackground
                                        style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, props.imageStyle]}
                                        source={{ uri: typeof image === 'string' ? image : image?.url }}
                                    >
                                        <View style={styles.lastWrapper}>
                                            <Text style={[styles.textCount, props.textStyles]}>+{props.source.length - 5}</Text>
                                        </View>
                                    </ImageBackground>
                                )
                            ) : (
                                key < 3 &&
                                (cacheFolder !== '' ? (
                                    <CachedImage
                                        style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, props.imageStyle]}
                                        source={{ uri: typeof image === 'string' ? image : image?.url }}
                                        cacheKey={image?.url.split('/').pop()}
                                        cacheFolder={cacheFolder}
                                    >
                                        {canDelete && (
                                            <Pressable
                                                imageStyle={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 10,
                                                    backgroundColor: Color.backGroundTransparent5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                onPress={() => {
                                                    if (image?.url) {
                                                        handleDeleteImage ? handleDeleteImage(image.url ? image.url : image.uri) : null;
                                                        setAllImage(allImage.filter((item) => (item.uri ? item.uri : item?.url) !== image.url));
                                                    }
                                                }}
                                            >
                                                <Text style={{ color: '#fff', fontSize: 20 }}>x</Text>
                                            </Pressable>
                                        )}
                                    </CachedImage>
                                ) : (
                                    <ImageBackground
                                        style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, props.imageStyle]}
                                        source={{ uri: typeof image === 'string' ? image : image?.url }}
                                    >
                                        {canDelete && (
                                            <Pressable
                                                style={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 10,
                                                    backgroundColor: Color.backGroundTransparent5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                onPress={() => {
                                                    if (image?.url) {
                                                        handleDeleteImage ? handleDeleteImage(image.url ? image.url : image.uri) : null;
                                                        setAllImage(allImage.filter((item) => (item.uri ? item.uri : item?.url) !== image.url));
                                                    }
                                                }}
                                            >
                                                <Text style={{ color: '#fff', fontSize: 20 }}>x</Text>
                                            </Pressable>
                                        )}
                                    </ImageBackground>
                                ))
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            ) : null}
        </View>
    ) : null;
};

PhotoGrid.defaultProps = {
    style: {},
    imageStyle: {},
    imageProps: {},
    width: width,
    height: 400,
    ratio: 1 / 3,
};

const styles = {
    image: {
        flex: 1,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: Color.white,
    },
    lastWrapper: {
        backgroundColor: Color.backGroundTransparent3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        top: 0,
    },
    textCount: {
        color: Color.white,
        fontSize: 30,
    },
};

export default PhotoGrid;
