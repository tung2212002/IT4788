import React, { useState } from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import { Alert, Pressable, View } from 'react-native';
import ButtonIconComponent from './ButtonIconComponent';
import PopupComponent from './PopupComponent';
import { images } from '../../assets';
import { unblockService } from '../services/blockService';
import { useDispatch } from 'react-redux';
import { hiddenPostUser } from '../redux/features/post/postSlice';
import CachedImage from './CachedImage';

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

function BlockUserComponent({ item, setBlockUser, blockUser }) {
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);

    const handleUnBlock = () => {
        const body = {
            user_id: item.id,
        };

        unblockService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    console.log(item);
                    setBlockUser(blockUser.filter((user) => user.id !== item.id));
                    setRenderPopUpComponent(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <BlockUser>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Avatar source={item.avatar ? { uri: item.avatar } : images.defaultAvatar} /> */}
                {item.avatar === '' ? (
                    <Avatar source={images.defaultAvatar} />
                ) : (
                    <CachedImage
                        source={{ uri: item.avatar }}
                        cacheKey={item.avatar.split('/').pop()}
                        resizeMode="cover"
                        style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
                        image={true}
                        cacheFolder="avatar"
                        placeholderContent={<Avatar source={images.defaultAvatar} />}
                    />
                )}
                <Name>{item.name ? item.name : item.username}</Name>
            </View>
            <Pressable
                onPress={() => {
                    console.log(item);
                    setRenderPopUpComponent(true);
                    // handleUnBlock();
                }}
            >
                <TextBlock>BỎ CHẶN</TextBlock>
            </Pressable>
            {renderPopUpComponent && (
                <Modal renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                    <ButtonIconComponent
                        nameIcon="block"
                        typeIcon="Entypo"
                        title={'Bỏ chặn'}
                        message={'Bạn có chắc chắn muốn bỏ chặn người này?'}
                        onPress={handleUnBlock}
                        propsButton={{ width: 90, height: 70, backgroundColor: Color.white, alignItems: 'center', padding: '0 20' }}
                        propsIcon={{ size: 24, color: Color.black, backgroundColor: Color.lightGray, padding: 8 }}
                        propsTitle={{ color: Color.black, fontWeight: '500', size: 17 }}
                        propsMessage={{ color: Color.gray, size: 15, fontWeight: '400' }}
                    />
                </Modal>
            )}
        </BlockUser>
    );
}

export default BlockUserComponent;
