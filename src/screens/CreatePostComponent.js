import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, Text, View } from 'react-native';

import Color from '../utils/Color';
import PopupScreenComponent from '../components/PopupScreenCompopnent';
import PopupComponent from '../components/PopupComponent';
import ButtonComponent from '../components/ButtonComponent';
import ButtonIconComponent from '../components/ButtonIconComponent';
import SelectComponent from '../components/SelectComponent';
import { SVGTagUser, SVGCalendar, SVGFeeling, SVGCheckIn, SVGPhotos, SVGTextFormat, SVGCamera, SVGGifSymbol, SVGMusic, SVGLiveStreaming } from '../../assets';

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
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    color: ${Color.black};
`;

const Content = styled.View`
    margin-top: 10px;
    width: 100%;
    height: 100%;
`;

const ContentHeader = styled.View`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ViewAvatar = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${Color.lightGray};
    margin: 10px;
`;

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 30px;
`;

const Info = styled.View`
    display: flex;
    flex-direction: column;
`;

const FullName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${Color.black};
    margin-left: 10px;
`;

const ViewSelectScope = styled.View`
    width: 135px;
`;

const SelectScope = styled(ButtonIconComponent)`
    width: 50px;
    height: 20px;
`;

const Scope = styled(SelectComponent)`
    width: 100%;
    height: 100px;
`;

function CreatePostScreen({ setShowCreatePost, showCreatePost }) {
    const [input, setInput] = useState('');
    const [scope, setScope] = useState('Công khai');
    const [showScope, setShowScope] = useState(false);
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(true);

    const ButtonSubmit = styled(ButtonComponent)`
        position: absolute;
        right: 0px;
        top: 0px;
        background-color: ${input.length > 0 ? Color.blueButtonColor : Color.lightGray};
        border-radius: 5px;
        padding: 10px;
        margin-top: 20px;
        margin-right: 20px;
        width: 70px;
        height: 40px;
    `;

    const itemsScope = [
        {
            title: 'Công khai',
            nameIcon: 'earth',
            typeIcon: 'MaterialCommunityIcons',
            onPress: () => {
                setScope('Công khai');
                setShowScope(false);
            },
        },
        {
            title: 'Bạn bè',
            nameIcon: 'account-group',
            typeIcon: 'MaterialCommunityIcons',
            onPress: () => {
                setScope('Bạn bè');
                setShowScope(false);
            },
        },
        {
            title: 'Chỉ mình tôi',
            nameIcon: 'lock',
            typeIcon: 'MaterialCommunityIcons',
            onPress: () => {
                setScope('Chỉ mình tôi');
                setShowScope(false);
            },
        },
    ];

    const listItems = [
        {
            title: 'Ảnh/Video',
            SVGIcon: SVGPhotos,
        },
        {
            title: 'Cảm xúc/Hoạt động',
            SVGIcon: SVGFeeling,
        },
        {
            title: 'Gắn thẻ người khác',
            SVGIcon: SVGTagUser,
        },
        {
            title: 'Check in',
            SVGIcon: SVGCheckIn,
        },
        {
            title: 'Live trực tiếp',
            SVGIcon: SVGLiveStreaming,
        },
        {
            title: 'Màu nền',
            SVGIcon: SVGTextFormat,
        },
        {
            title: 'Camera',
            SVGIcon: SVGCamera,
        },
        {
            title: 'File GIF',
            SVGIcon: SVGGifSymbol,
        },
        {
            title: 'Âm nhạc',
            SVGIcon: SVGMusic,
        },
        {
            title: 'Gắn thẻ sự kiện',
            SVGIcon: SVGCalendar,
        },
    ];

    const propsButton = {
        width: 100,
        height: 50,
        backgroundColor: Color.white,
        alignItems: 'center',
    };

    const propsIcon = {
        width: 30,
        height: 30,
        padding: 10,
    };

    const propsTitle = {
        size: 16,
        color: Color.black,
    };

    const handleCreatePost = () => {
        if (input.length > 0) {
            // setIsCreatePost(false);
        }
        return;
    };

    const handleCancelCreatePost = () => {
        // setIsCreatePost(false);
    };

    const handleInput = (text) => {
        if (text.length > 0) {
            // setIsCreatePost(true);
        } else {
            // setIsCreatePost(false);
        }
        setInput(text);
    };

    const handleBackdropPress = () => {
        // setIsCreatePost(false);
    };

    return (
        <Container renderPopUpComponent={showCreatePost} setRenderPopUpComponent={setShowCreatePost} onBackdropPress={handleBackdropPress}>
            <Header>
                <ViewTitle>
                    <TitleHeader>Tạo bài viết</TitleHeader>
                </ViewTitle>
                <ButtonSubmit onPress={handleCreatePost} title={'Đăng'} />
            </Header>
            <Content>
                <ContentHeader>
                    <ViewAvatar>
                        <Avatar source={{ uri: 'https://picsum.photos/200/300' }} />
                    </ViewAvatar>
                    <Info>
                        <FullName>Nguyễn Văn A</FullName>
                        <ViewSelectScope>
                            <SelectScope
                                title={scope}
                                propsButton={{ padding: 2, height: 25, width: 100 }}
                                nameIcon={scope === 'Công khai' ? 'earth' : scope === 'Bạn bè' ? 'account-group' : 'lock'}
                                propsIcon={{ size: 18, color: Color.gray, padding: 1, marginRight: -5 }}
                                typeIcon={
                                    scope === 'Công khai' ? 'MaterialCommunityIcons' : scope === 'Bạn bè' ? 'MaterialCommunityIcons' : 'MaterialCommunityIcons'
                                }
                                propsTitle={{ size: 14, color: Color.gray }}
                                onPress={() => setShowScope(!showScope)}
                                downIcon={true}
                            />
                            {showScope && (
                                <Scope
                                    items={itemsScope}
                                    showMore={showScope}
                                    propsButton={{ width: 100, height: 27, backgroundColor: Color.white, padding: 1, alignItems: 'center' }}
                                    propsIcon={{ size: 18, color: Color.gray, padding: 1, marginRight: -10 }}
                                    propsTitle={{ size: 14, color: Color.gray }}
                                    top={10}
                                />
                            )}
                        </ViewSelectScope>
                    </Info>
                </ContentHeader>
                <TextInput
                    placeholder="Bạn đang nghĩ gì?"
                    onChangeText={(text) => handleInput(text)}
                    placeholderTextColor={Color.gray}
                    style={{ color: Color.black, zIndex: -1 }}
                />
            </Content>
            <View>
                <Text>Test Create Post</Text>
                <TextInput
                    placeholder="What's on your mind?"
                    onChangeText={(text) => handleInput(text)}
                    placeholderTextColor={Color.gray}
                    style={{ color: Color.black }}
                />
            </View>

            {renderPopUpComponent && (
                <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                    {listItems.map((item, index) => (
                        <ButtonIconComponent
                            key={index}
                            title={item.title}
                            SVGIcon={item.SVGIcon}
                            propsButton={propsButton}
                            propsIcon={propsIcon}
                            propsTitle={propsTitle}
                            onPress={item.handlePress}
                        />
                    ))}
                </PopupComponent>
            )}
        </Container>
    );
}

export default CreatePostScreen;
