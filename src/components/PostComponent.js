import React from 'react';
import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';

import convertTimeAgo from '../utils/convertTimeAgo';
import VectorIcon from '../utils/VectorIcon';
import Color from '../utils/Color';
import PopupComponent from './PopupComponent';
import { useState } from 'react';
import ButtonIconComponent from './ButtonIconComponent';
import { Image, TouchableOpacity, View } from 'react-native';
import GridImageView from './GridImageViewer/GridImageView ';

const ShadowSurface = styled(Surface)`
    width: 100%;
    elevation: 4;
    margin-top: 10px;
`;

const PostContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-vertical: 8px;
    background-color: ${Color.white};
`;

const PostHeader = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PostAuthor = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const PostAuthorAvatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    resize-mode: cover;
    margin-horizontal: 12px;
`;

const PostAuthorName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const PostTimeContainer = styled.View`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const PostTime = styled.Text`
    font-size: 13px;
`;

const ThreeDots = styled(VectorIcon)`
    position: absolute;
    right: 20px;
    top: 10px;
`;

const PostContent = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const PostContentText = styled.Text`
    font-size: 16px;
    padding: 0 12px;
`;

const ImagesPost = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
`;

// const ImagePost = styled.Image`
//     width: 100px;
//     height: 100px;
//     resize-mode: cover;
// `;

const PostComponent = ({ item, user }) => {
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const post = {
        id: '1',
        name: 'Item 1',
        created: '2021-09-01',
        description: 'Description a post : ABCDEFGHIJKLMNOPQRSTUVWXYZ ABCDEFGHIJKac',
        modified: '2021-09-01',
        fake: '100',
        trush: '100',
        kudos: '100',
        disappointed: '100',
        is_rate: true,
        is_mark: true,
        image: [
            {
                id: '0',
                url: 'https://picsum.photos/200/300',
            },
            {
                id: '1',
                url: 'https://picsum.photos/200/300',
            },
            {
                id: '1',
                url: 'https://picsum.photos/200/300',
            },
        ],
        video: [],
        author: {
            id: '1',
            name: 'Author 1',
            username: 'admin1',
            avatar: 'https://picsum.photos/200/300',
            coins: '100',
            listing: 'Post A, Post B, Post C',
        },
        category: {
            id: '1',
            name: 'Category 1',
            has_name: true,
        },
        state: 'published',
        is_blocked: false,
        can_edit: true,
        banned: false,
        can_mark: true,
        can_rate: true,
        url: 'https://picsum.photos/200/300',
        message: 'Message',
    };

    const listItems = [
        {
            title: 'Tắt thông báo bài viết này',
            name: 'bell-off',
            type: 'Feather',
            handlePress: () => {
                console.log(`Tắt thông báo bài viết này ${post.id}`);
            },
        },
        {
            title: 'Lưu bài viết',
            name: 'bookmark',
            type: 'Feather',
            handlePress: () => {
                console.log(`Lưu bài viết ${post.id}`);
            },
        },
        {
            title: 'Xóa bài viết',
            name: 'delete',
            type: 'AntDesign',
            handlePress: () => {
                console.log(`Xóa bài viết ${post.id}`);
            },
        },
        {
            title: 'Chỉnh sửa bài viết',
            name: 'edit',
            type: 'Feather',
            handlePress: () => {},
        },
        {
            title: 'Sao chép liên kết',
            name: 'link',
            type: 'Feather',
            handlePress: () => {},
        },
    ];

    const lengthImage = post.image.length;
    let container = {};
    let itemStyle = {};
    let style = {};

    if (lengthImage === 1) {
        container = { width: '100%', height: 300 };
        style = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' };
        itemStyle = [
            {
                width: '100%',
                height: 300,
            },
        ];
    } else if (lengthImage === 2) {
        container = { width: '100%', height: 200 };
        style = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' };

        itemStyle = [
            {
                width: '50%',
                height: 200,
            },
            {
                width: '50%',
                height: 200,
            },
        ];
    } else if (lengthImage === 3) {
        container = { width: '100%', height: 200 };
        itemStyle = [
            {
                width: '50%',
                height: 200,
            },
            {
                width: '50%',
                height: 100,
            },
            {
                width: '50%',
                height: 100,
            },
        ];
    } else if (lengthImage === 4) {
        container = { width: '100%', height: 200 };
        itemStyle = [
            {
                width: '50%',
                height: 100,
            },
            {
                width: '50%',
                height: 100,
            },
            {
                width: '50%',
                height: 100,
            },
            {
                width: '50%',
                height: 100,
            },
        ];
    }

    return (
        <ShadowSurface>
            <PostContainer>
                <PostHeader>
                    <PostAuthorAvatar source={{ uri: post.author.avatar }} />
                    <PostAuthor>
                        <PostAuthorName>{post.author.name}</PostAuthorName>
                        <PostTimeContainer>
                            <PostTime>{convertTimeAgo(post.created)}</PostTime>
                            <VectorIcon nameIcon={'dot-single'} typeIcon={'Entypo'} size={14} />
                            {post.state === 'published' ? (
                                <VectorIcon nameIcon={'public'} typeIcon={'MaterialIcons'} size={16} />
                            ) : (
                                <VectorIcon nameIcon={'user-friends'} typeIcon={'FontAwesome5'} size={16} />
                            )}
                        </PostTimeContainer>
                    </PostAuthor>
                    <ThreeDots
                        nameIcon={'dots-three-horizontal'}
                        typeIcon={'Entypo'}
                        size={18}
                        color={Color.black}
                        onPress={() => setRenderPopUpComponent(true)}
                    />
                </PostHeader>
                <PostContent>
                    <PostContentText>{post.description}</PostContentText>
                    <PostContentText>{post.description}</PostContentText>
                    <PostContentText>{post.description}</PostContentText>
                    <View width="100%" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {post.image.map((it, index) => (
                            <View key={index} style={itemStyle[index]}>
                                <Image source={{ uri: it.url }} style={{ width: '100%', height: '100%' }} />
                            </View>
                        ))}
                    </View>
                </PostContent>
                {/* <View style={{ width: '100%', height: 1, backgroundColor: Color.gray }}>
                    <GridImageView data={['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300']} />
                </View> */}
            </PostContainer>
            {renderPopUpComponent && (
                <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                    {listItems.map((button, index) =>
                        (button.title === 'Xóa bài viết' && post.author.id === user.id) || button.title !== 'Xóa bài viết' ? (
                            <ButtonIconComponent
                                key={index}
                                title={button.title}
                                nameIcon={button.name}
                                typeIcon={button.type}
                                propsButton={{ height: 64 }}
                                propsIcon={{ size: 24, color: Color.black }}
                                propsTitle={{ size: 16, color: Color.black, fontWeight: 'normal' }}
                                onPress={button.handlePress}
                            />
                        ) : null,
                    )}
                </PopupComponent>
            )}
        </ShadowSurface>
    );
};

export default PostComponent;
