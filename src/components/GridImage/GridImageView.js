/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Platform, NativeModules, BackHandler } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Pressable } from 'react-native';

import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';
import ButtonIconComponent from '../ButtonIconComponent';
import convertTimeAgo from '../../utils/convertTimeAgo';
import SingleLayout from './SingleLayout';
import DualLayout from './DualLayout';
import TripleLayout from './TripleLayout';
import QuadLayout from './QuadLayout';
import MultipleLayout from './MultipleLayout';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT - 20;

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
    height: 45px;
    z-index: 1;
    background-color: ${Color.backGroundLoading};
    justify-content: center;
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

const GridImageView = ({
    data,
    headers = null,
    renderModalFooter = null,
    transparent = 0.7,
    heightOfGridImage = Dimensions.get('window').height / 5.5,
    renderMFooter,
}) => {
    const imagesToShow =[...data]
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

    useEffect(() => {
        console.log('image', data);
    }, [data]);

    const Component = () => {
        const [numberOfImageScroll, setNumberOfImageScroll] = useState(1);
        const [isModalVisible, setIsModalVisible] = useState(true);
        const handlePressImage = () => {
            setIsModalVisible(!isModalVisible);
        };

        useEffect(() => {
            setNumberOfImageScroll(numberOut);
        }, [numberOut]);
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

    return (
        <Container>
            <Modal animationType="slide" transparent={true} visible={modal.visible} onRequestClose={onCloseModal}>
                <Component />
            </Modal>

            {imagesToShow.length === 1 && <SingleLayout item={imagesToShow[0]} setModal={setModal} setNumberOut={setNumberOut} header={headers} ref={ref} />}
            {imagesToShow.length === 2 && <DualLayout items={imagesToShow} setModal={setModal} setNumberOut={setNumberOut} header={headers} ref={ref} />}
            {imagesToShow.length === 3 && <TripleLayout items={imagesToShow} setModal={setModal} setNumberOut={setNumberOut} header={headers} ref={ref} />}
            {imagesToShow.length === 4 && <QuadLayout items={imagesToShow} setModal={setModal} setNumberOut={setNumberOut} header={headers} ref={ref} />}
            {imagesToShow.length > 4 && <MultipleLayout items={imagesToShow} setModal={setModal} setNumberOut={setNumberOut} header={headers} ref={ref} />}
        </Container>
    );
};

export default GridImageView;
