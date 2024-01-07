import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../../utils/Color';
import { Alert, Animated, Pressable, Text } from 'react-native';
import ButtonIconComponent from '../../components/ButtonIconComponent';
import VectorIcon from '../../utils/VectorIcon';
import { View } from 'moti';
import { images } from '../../../assets';
import PopupComponent from '../../components/PopupComponent';
import HeaderSearchComponent from '../../components/HeaderSearchComponent';
import { getListBlocksService } from '../../services/blockService';
import BlockUserComponent from '../../components/BlockUserComponent';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.grey6};
    z-index: -1;
    padding-horizontal: 10px;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 50px;
`;

const AnimatedHeader = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const TextButton = styled.Text`
    font-size: 16px;
    font-family: 'OpenSans-Bold';
    color: ${Color.blueButtonColor};
    margin-left: 10px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'OpenSans-Bold';
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
`;

const TitleBody = styled.Text`
    font-size: 30px;
    font-family: 'OpenSans-Bold';
    margin-vertical: 10px;
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'OpenSans-Medium';
    color: ${Color.gray};
    margin-vertical: 10px;
`;

const BlockUser = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    background-color: ${Color.white};
    border-radius: 5px;
    margin-top: 10px;
`;

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 10px;
`;

const Name = styled.Text`
    font-size: 16px;
    font-family: 'OpenSans-Bold';
    color: ${Color.black};
`;

const TextBlock = styled.Text`
    font-size: 14px;
    font-family: 'OpenSans-Bold';
    color: ${Color.grey3};
`;

const Body = styled.ScrollView`
    flex: 1;
    width: 100%;
    padding: 10px;
`;

const Modal = styled(PopupComponent)`
    width: 100%;
    height: 100%;
    paddiing-bottom: 20px;
`;

const PaddingBottom = styled.View`
    width: 100%;
    height: 150px;
`;

function BlockUserScreen({ navigation }) {
    const [isFocused, setIsFocused] = useState(false);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const [blockUser, setBlockUser] = useState([]);
    const [page, setPage] = useState({
        index: 0,
        count: 10,
        hasNextPage: true,
    });
    const items = [
        {
            nameIcon: 'block',
            typeIcon: 'Entypo',
            title: 'Bỏ chặn',
            message: 'Bạn có chắc chắn muốn bỏ chặn người này?',
            onPress: () => {},
        },
    ];

    const handleGetListBlock = () => {
        const body = {
            index: page.index + 1,
            count: page.count,
        };
        getListBlocksService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    if (response.data.data.length === page.count) {
                        setPage({
                            ...page,
                            index: page.index + response.data.data.length,
                            hasNextPage: true,
                        });
                        setBlockUser([...blockUser, ...response.data.data]);
                    } else {
                        setPage({
                            ...page,
                            index: page.index + response.data.data.length,
                            hasNextPage: false,
                        });
                        setBlockUser([...blockUser, ...response.data.data]);
                    }
                } else {
                    setPage({
                        ...page,
                        hasNextPage: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const body = {
            index: page.index,
            count: page.count,
        };

        getListBlocksService(body)
            .then((response) => {
                console.log(response.data);
                if (response.data.code === '1000') {
                    console.log(response.data.data);
                    if (response.data.data.length === page.count) {
                        console.log(response.data.data);
                        setPage({
                            ...page,
                            index: page.index + response.data.data.length,
                            hasNextPage: true,
                        });
                        setBlockUser(response.data.data);
                    } else if (response.data.data.length > 0) {
                        setPage({
                            ...page,
                            index: page.index + response.data.data.length,
                            hasNextPage: false,
                        });
                        setBlockUser(response.data.data);
                    }
                } else {
                    setPage({
                        ...page,
                        hasNextPage: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Container>
            <AnimatedHeader>
                <HeaderSearchComponent title="Test" setIsFocused={setIsFocused} isFocused={isFocused} navigation={navigation} setBlockUser={setBlockUser} />
            </AnimatedHeader>
            <Title>Người bị chặn</Title>
            <Description>
                Một khi bạn chặn ai đó, bạn sẽ không nhận được các cuộc gọi hoặc tin nhắn từ người đó. Đồng thời, người đó sẽ không thể xem được trạng thái hoặc
                lịch sử trực tuyến của bạn.
            </Description>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }} onPress={() => setIsFocused(true)}>
                <View
                    style={{ width: 40, height: 40, backgroundColor: Color.blueButtonColor, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                >
                    <VectorIcon nameIcon={'plus'} typeIcon={'Entypo'} size={28} color={Color.white} backgroundColor={Color.blueButtonColor} />
                </View>
                <TextButton>THÊM VÀO DANH SÁCH CHẶN</TextButton>
            </Pressable>
            <Body showsVerticalScrollIndicator={false}>
                {blockUser.map((item, index) => (
                    <BlockUserComponent
                        key={index + item.id}
                        item={item}
                        renderPopUpComponent={renderPopUpComponent}
                        setRenderPopUpComponent={setRenderPopUpComponent}
                        setBlockUser={setBlockUser}
                        blockUser={blockUser}
                    />
                ))}

                {page.hasNextPage && (
                    <Pressable onPress={handleGetListBlock}>
                        <TextBlock>Xem thêm</TextBlock>
                    </Pressable>
                )}
                <PaddingBottom />
            </Body>
        </Container>
    );
}

export default BlockUserScreen;
