import React, { useState } from 'react';
import styled from 'styled-components/native';
import VectorIcon from '../utils/VectorIcon';

import { images } from '../../assets';
import Color from '../utils/Color';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '../redux/features/modal/modalSlice';
import PopupComponent from './PopupComponent';
import { selectUser } from '../redux/features/auth/authSlice';
import CreateStoryComponent from './CreateStoryComponent';
const Container = styled.FlatList`
    flex: 1;
    background-color: ${Color.white};
    padding-horizontal: 4px;
`;
const CreateItem = styled.Pressable`
    width: ${Dimensions.get('window').width / 3.5}px;
    height: ${Dimensions.get('window').width / 1.9}px;
    align-items: center;
    margin-horizontal: 3px;
    margin-vertical: 10px;
    border-radius: 12px;
    border-width: 2px;
    border-color: ${Color.grey5};
`;

const Item = styled.Pressable`
    width: ${Dimensions.get('window').width / 3.55}px;
    height: ${Dimensions.get('window').width / 1.9}px;
    align-items: center;
    margin-horizontal: 1px;
    margin-vertical: 10px;
    border-radius: 12px;
    border-width: 2px;
    border-color: ${Color.lightGray};
`;

const ImageItem = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const ImageCreateItem = styled.Image`
    width: 100%;
    height: 70%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const ContainerAvatar = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top: 3%;
    left: 5%;
    border-width: 2px;
    border-color: ${Color.blueButtonColor};
    padding: 2px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 25px;
`;

const Name = styled.Text`
    font-size: 13px;
    font-family: OpenSans-SemiBold;
    margin-left: 10px;
    position: absolute;
    z-index: 1;
    bottom: 3%;
    left: 0;
    color: ${Color.white};
`;

const Title = styled.Text`
    font-size: 14px;
    font-family: OpenSans-Bold;
    margin-left: 10px;
    color: ${Color.black};
    position: absolute;
    z-index: 1;
    bottom: 3%;
`;

const ButtonAdd = styled(VectorIcon)`
    position: absolute;
    z-index: 1;
    bottom: 20%;
    right: auto;
    left: auto;
    background-color: ${Color.blueButtonColor};
    border-radius: 20px;
`;

const data = [
    {
        id: 1,
        name: 'Your Story',
    },
    {
        id: 2,
        name: 'He Story',
    },
    {
        id: 3,
        name: 'His Story',
    },
    {
        id: 4,
        name: 'Name Story',
    },
    {
        id: 5,
        name: 'Tung Story',
    },
    {
        id: 6,
        name: 'Tung Story',
    },
];
const ProfileContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    margin-top: 50px;
`;

const BackGround = styled.ImageBackground`
    width: 100%;
    height: 50%;
    align-items: center;
    padding-top: 50px;
`;

const AvatarContainer = styled.View`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border-width: 5px;
    border-color: ${Color.white};
`;

const AvatarIcon = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 140px;
    border-radius: 50px;
    padding: 10px;
    background-color: ${Color.lightGray};
    z-index: 1;
`;

const FullName = styled.Text`
    font-size: 30px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-top: 10px;
`;

const StoryComponent = () => {
    const dispatch = useDispatch();
    const modal = useSelector(selectModal);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const user = useSelector(selectUser);

    const firstItem = ({ item }) => {
        return (
            <CreateItem>
                <>
                    <ButtonAdd nameIcon="pluscircleo" typeIcon="AntDesign" size={40} color={Color.white} onPress={() => setRenderPopUpComponent(true)} />
                    <Title>Tạo tin</Title>
                    <ProfileContainer>
                        <BackGround source={images.defaultBackground}>
                            <AvatarContainer>
                                <ImageCreateItem source={images.defaultBackground} />
                                {/* <Avatar source={user?.avatar === '-1' || user?.avatar === '' ? images.defaultAvatar : { uri: user.avatar }} /> */}
                                <AvatarIcon onPress={() => setRenderPopUpComponent(true)}>
                                    <VectorIcon nameIcon="camera" typeIcon="FontAwesome5" size={30} color={Color.black} />
                                </AvatarIcon>
                            </AvatarContainer>

                            <FullName>{user?.username}</FullName>
                        </BackGround>
                    </ProfileContainer>
                </>
                {renderPopUpComponent && (
                    // <Modal
                    //     visible={renderPopUpComponent}
                    //     contentContainerStyle={{
                    //         backgroundColor: 'rgba(0,0,0,0.5)',
                    //         flex: 1,
                    //         position: 'absolute',
                    //         top: 0,
                    //         left: 0,
                    //         right: 0,
                    //         bottom: 0,
                    //     }}
                    //     transparent={true}
                    //     animationType="slide"
                    // >
                    //     <Title>Modal</Title>
                    //     <TouchableOpacity onPress={() => setRenderPopUpComponent(false)} style={{ position: 'absolute', top: '90%', right: '50%' }}>
                    //         <Title style={{ color: Color.black, fontSize: 30 }}>Close</Title>
                    //     </TouchableOpacity>
                    // </Modal>
                    <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                        <ButtonAdd nameIcon="pluscircleo" typeIcon="AntDesign" size={40} color={Color.white} onPress={() => setRenderPopUpComponent(true)} />
                        <Title>Tạo tin</Title>
                        <ImageCreateItem source={images.defaultBackground} />
                    </PopupComponent>
                )}
            </CreateItem>
        );
    };

    const renderItem = ({ item }) => {
        return (
            <Item>
                <ContainerAvatar>
                    <Avatar source={images.defaultAvatar} />
                </ContainerAvatar>
                <Name>{item.name}</Name>
                <ImageItem source={images.defaultBackground} />
            </Item>
        );
    };

    return (
        <Container
            data={data}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // ListHeaderComponent={<CreateStoryComponent />}
        />
    );
};

export default StoryComponent;
