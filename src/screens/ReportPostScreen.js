/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Button, Dimensions, Keyboard, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import Color from '../utils/Color';
import PopupScreenComponent from '../components/PopupScreenCompopnent';
import PopupComponent from '../components/PopupComponent';
import ButtonComponent from '../components/ButtonComponent';
import ButtonIconComponent from '../components/ButtonIconComponent';
import SelectComponent from '../components/SelectComponent';
import {
    SVGTagUser,
    SVGCalendar,
    SVGFeeling,
    SVGCheckIn,
    SVGPhotos,
    SVGTextFormat,
    SVGCamera,
    SVGGifSymbol,
    SVGMusic,
    SVGLiveStreaming,
    images,
} from '../../assets';
import ChoiceFeelingComponent from '../components/ChoiceFeelingComponent';
import { useMediaPicker } from '../hooks/useMediaPicker';
import PhotoGrid from '../components/PhotoGridComponent/PhotoGrid';
import VideoComponent from '../components/PostComponent/VideoComponent';
import { editPostService, reportPostService } from '../services/postService';
import LoadingComponent from '../components/LoadingComponent';
import VectorIcon from '../utils/VectorIcon';
import { setBlockService } from '../services/blockService';
import { useDispatch } from 'react-redux';
import { hiddenPostUser } from '../redux/features/post/postSlice';

const Container = styled(PopupScreenComponent)`
    background-color: ${Color.black};
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Header = styled.View`
    width: 100%;
    display: flex;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
    background-color: ${Color.mainBackgroundColor};
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const ViewTitle = styled.View`
    height: 50px;
    padding-top: 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TitleHeader = styled.Text`
    font-size: 20px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-left: 10px;
`;

const Content = styled.View`
    margin-top: 70px;
    margin-left: 0px;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const ContentHeader = styled.View`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 5px;
`;

const ViewAvatar = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin: 10px;
    margin-right: 6px;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const Info = styled.View`
    display: flex;
    flex-direction: column;
`;

const Description = styled.Text`
    font-size: 14px;
    color: ${Color.gray};
    margin-left: 10px;
`;

const Description2 = styled.Text`
    font-size: 16px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-left: 10px;
`;

const ViewButton = styled.TouchableOpacity`
    width: auto;
    height: 40px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin: 10px;
    margin-right: 6px;
    padding: 10px;
    align-items: center;
    justify-content: center;
`;

const TextButton = styled.Text`
    font-size: 14px;
    color: ${Color.black};
    width: auto;
    height: auto;
    font-family: Roboto-Bold;
`;

const Box = styled.View`
    width: 95%;
    height: auto;
    border-radius: 10px;
    background-color: ${Color.white};
    padding: 10px;
    border-width: 1px;
    border-color: ${Color.lightGray};
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
    flex-direction: row;
    align-items: center;
`;

function ReportPostScreen({ item, setShowReportPost, navigation, user, post, showReportPost }) {
    const dispatch = useDispatch();

    const [stateReport, setStateReport] = useState([]);
    const [blockUser, setBlockUser] = useState(false);
    const [active, setActive] = useState(false);
    const [loadingState, setLoadingState] = useState({ loading: false, message: '' });

    const listReport = [
        {
            id: 1,
            name: 'Ảnh khoả thân',
        },
        {
            id: 2,
            name: 'Bạo lực',
        },
        {
            id: 3,
            name: 'Quấy rối',
        },
        {
            id: 4,
            name: 'Tự tử, tự gây thương tích',
        },
        {
            id: 5,
            name: 'Tin giả',
        },
        {
            id: 6,
            name: 'Spam',
        },
        {
            id: 7,
            name: 'Bán hàng trái phép',
        },
        {
            id: 8,
            name: 'Ngôn ngữ thù ghét',
        },
        {
            id: 9,
            name: 'Khủng bố',
        },
        {
            id: 10,
            name: 'Vấn đề khác',
        },
    ];

    const handleBlock = () => {
        const body = {
            user_id: item.author.id,
        };
        setBlockService(body)
            .then((response) => {
                console.log('response', response.data);
                if (response.data.code === '1000') {
                    dispatch(hiddenPostUser(item.author.id));
                    setLoadingState({ loading: false, message: '' });
                    setShowReportPost(false);
                } else if (response.data.code === '3001') {
                    dispatch(hiddenPostUser(item.author.id));
                    setLoadingState({ loading: false, message: '' });
                    setShowReportPost(false);
                }
            })
            .catch((error) => {
                console.log('error', error);
                setLoadingState({ loading: false, message: '' });
            });
    };

    const handleReport = () => {
        setLoadingState({ loading: true, message: 'Đang báo cáo ...' });
        const stringReport = stateReport.map((i) => i.name).join(', ');
        const body = {
            id: item.id,
            subject: stringReport,
            details: 'details',
        };

        reportPostService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (blockUser) {
                        handleBlock();
                    } else {
                        dispatch(hiddenPostUser(item.author.id));
                        setLoadingState({ loading: false, message: '' });
                        setShowReportPost(false);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setLoadingState({ loading: false, message: '' });
            });
    };

    const handleAddReport = (i) => {
        // filer item have in stateReport
        const filterItem = stateReport.filter((ite) => ite.id === i.id);
        if (filterItem.length > 0) {
            setStateReport(stateReport.filter((ite) => ite.id !== i.id));
        } else {
            setStateReport([...stateReport, i]);
        }
    };

    const handleBackdropPress = () => {
        setShowReportPost(false);
    };

    const handleClose = () => {
        setShowReportPost(false);
    };

    useEffect(() => {
        if (stateReport.length > 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [stateReport]);

    return (
        <Container
            renderPopUpComponent={showReportPost}
            setRenderPopUpComponent={setShowReportPost}
            onBackdropPress={handleBackdropPress}
            handleClose={handleClose}
        >
            <Content>
                <ContentHeader>
                    <TitleHeader>Vui lòng chọn vấn đề để báo cáo</TitleHeader>
                    <Description>Bạn có thể báo cáo bài viết sau khi chọn vấn đề</Description>
                </ContentHeader>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    {listReport.map((ite, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ViewButton
                                    key={index}
                                    onPress={() => {
                                        handleAddReport(ite);
                                    }}
                                    style={{ backgroundColor: stateReport.filter((i) => i.id === ite.id).length > 0 ? Color.blueButtonColor : Color.lightGray }}
                                >
                                    <TextButton style={{ color: stateReport.filter((i) => i.id === ite.id).length > 0 ? Color.white : Color.black }}>
                                        {ite.name}
                                    </TextButton>
                                </ViewButton>
                            </View>
                        );
                    })}
                </View>
                <Description2>Các bước mà bạn có thể thực hiện</Description2>
                <ButtonIconComponent
                    title={`Chặn ${item.author.name}`}
                    message={'Các bạn không thể nhìn thấy hoặc liên hệ với nhau'}
                    nameIcon="block"
                    typeIcon="Entypo"
                    onPress={() => {
                        setBlockUser(!blockUser);
                    }}
                    propsButton={{
                        width: 90,
                        height: 70,
                        alignItems: 'center',
                        padding: '0 20',
                        backgroundColor: blockUser ? Color.lightGray : Color.white,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    propsIcon={{ size: 24, color: Color.black, padding: 1, backgroundColor: !blockUser ? Color.white : Color.lightGray }}
                    propsTitle={{ color: Color.black, fontWeight: '500', size: 17 }}
                    propsMessage={{ color: Color.gray, size: 15, fontWeight: '400' }}
                />

                <Box>
                    <VectorIcon nameIcon={'alert-circle'} typeIcon={'Feather'} size={24} color={Color.gray} />
                    <Text style={{ fontSize: 14, color: Color.gray, marginVertical: 10, marginLeft: 10, flex: 1 }}>
                        Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo cáo ngay cho dịch vụ cấp cứu địa phương.
                    </Text>
                </Box>
                <ButtonComponent
                    title={'Báo cáo'}
                    onPress={handleReport}
                    width={90}
                    height={50}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: active ? Color.blueButtonColor : Color.lightGray,
                    }}
                    color={active ? Color.white : Color.black}
                    disabled={!active}
                />
            </Content>
            <LoadingComponent visible={loadingState.loading} message={loadingState.message} />
        </Container>
    );
}

export default ReportPostScreen;
