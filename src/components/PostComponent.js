/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';

import convertTimeAgo from '../utils/convertTimeAgo';
import VectorIcon from '../utils/VectorIcon';
import Color from '../utils/Color';
import PopupComponent from './PopupComponent';
import { useState } from 'react';
import ButtonIconComponent from './ButtonIconComponent';
import { Dimensions, View } from 'react-native';
import { images } from '../../assets';
import { deletePostService } from '../services/postService';
import { useDispatch } from 'react-redux';
import { logout, mergeUser } from '../redux/features/auth/authSlice';
import { Alert } from 'react-native';
import { SVGSad2, SVGHaha2 } from '../../assets';
import { listActivity, listFeeling } from '../constants/listItem';
import ButtonComponent from './ButtonComponent';
import { navigate } from '../navigation/RootNavigator';
import routes from '../constants/route';
import GridImageView from './GridImageView ';
import { Pressable } from 'react-native';

const ShadowSurface = styled(Surface)`
    width: 100%;
    elevation: 4;
`;

const PostContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
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
    color: ${Color.gray};
`;

const ThreeDotsContainer = styled.Pressable`
    position: absolute;
    right: 0;
    top: -4px;
    border-radius: 10px;
    padding: 15px;
`;

const ThreeDots = styled(VectorIcon)``;

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

const Info = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    width: ${Dimensions.get('window').width - 100}px;
    align-items: flex-end;
`;

const FeelView = styled.View`
    flex-direction: row;
    padding: 10px;
    margin-top: 10px;
`;

const Feel = styled.View`
    flex-direction: row;
    flex: 1;
`;

const CommentView = styled.View``;

const Comment = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${Color.gray};
`;

const FooterPost = styled.View`
    border-top-width: 1px;
    border-color: ${Color.lightGray};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 10px;
    padding-vertical: 2px;
`;

const Description = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
`;

const State = styled.Text`
    font-size: 14px;
    color: ${Color.gray};
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    margin-left: -2px;
`;

const ButtonIcon = styled(ButtonIconComponent)``;

const PostComponent = ({ item, user, navigation, post, setPost }) => {
    const [renderPopUpComponent, setRenderPopUpComponent] = useState(false);
    const [gridImageViewData, setGridImageViewData] = useState(item?.image);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        activitie: null,
        feel: null,
    });

    useEffect(() => {
        console.log('change');
    }, [item]);

    const handleDeletePost = () => {
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa bài viết này?', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xóa',
                onPress: () => {
                    deletePost();
                },
            },
        ]);
    };

    const deletePost = () => {
        const data = {
            id: item.id,
        };

        deletePostService(data).then((res) => {
            if (res.data.code === '1000') {
                const newListPost = post.filter((ite) => ite.id !== item.id);
                mergeUser({ ...user, coins: res.data.data.coins });
                setPost(newListPost);
                setRenderPopUpComponent(false);
            } else if (res.data.code === '9992') {
                Alert.alert(
                    'Thông báo',
                    'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                dispatch(logout());
                            },
                        },
                    ],
                    { cancelable: false },
                );
            }
        });
    };

    const listItems = [
        {
            title: 'Tắt thông báo bài viết này',
            name: 'bell-off',
            type: 'Feather',
            handlePress: () => {
                console.log(`Tắt thông báo bài viết này ${item.id}`);
            },
        },
        {
            title: 'Lưu bài viết',
            name: 'bookmark',
            type: 'Feather',
            handlePress: () => {
                console.log(`Lưu bài viết ${item.id}`);
            },
        },
        {
            title: 'Xóa bài viết',
            name: 'delete',
            type: 'AntDesign',
            handlePress: () => {
                handleDeletePost();
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

    useEffect(() => {
        try {
            const json = JSON.parse(item.state);
            const activitie = listActivity.find((it) => it.id === json.id && json.type === 'activities');
            const feel = listFeeling.find((it) => it.id === json.id && json.type === 'feelings');
            if (activitie || feel) {
                setState({ ...state, activitie, feel });
            }
        } catch (e) {
            return;
        }
    }, []);

    return (
        <ShadowSurface>
            <PostContainer>
                <PostHeader>
                    <Pressable
                        onPress={() => {
                            navigation.navigate(routes.PROFILE_SCREEN, { user_id: item.author.id });
                        }}
                    >
                        <PostAuthorAvatar
                            source={item.author?.avatar === '' || item.author?.avatar === '-1' ? images.defaultAvatar : { uri: item.author?.avatar }}
                        />
                    </Pressable>
                    <PostAuthor>
                        <Info>
                            <ButtonComponent
                                title={item.author.name || 'Author'}
                                onPress={() => navigate(routes.PROFILE_SCREEN, { user_id: item.author.id })}
                                color={Color.black}
                                fontWeight={'bold'}
                                size={16}
                                style={{
                                    backgroundColor: 'transparent',
                                    width: 'auto',
                                    height: 'auto',
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    marginBottom: 0,
                                    marginRight: 0,
                                    marginLeft: 0,
                                }}
                            />
                            {(state.activitie || state.feel) && (
                                <Description>
                                    <State> {state.activitie ? 'hiện' : 'hiện đang'} </State>
                                    <View style={{ width: 20, height: 20 }}>
                                        {state.activitie && <state.activitie.SVGIcon height={20} width={20} style={{ height: 20, width: 20 }} />}
                                        {state.feel && <state.feel.SVGIcon height={20} width={20} style={{ height: 20, width: 20 }} />}
                                    </View>
                                    <State>{state.activitie ? ' ' + state.activitie.title : ' cảm thấy ' + state.feel.title}</State>
                                </Description>
                            )}
                        </Info>
                        <PostTimeContainer>
                            <PostTime>{convertTimeAgo(item.created)}</PostTime>
                            <VectorIcon nameIcon={'dot-single'} typeIcon={'Entypo'} color={Color.gray} size={10} />
                            {item.state !== 'published' ? (
                                <VectorIcon nameIcon={'public'} typeIcon={'MaterialIcons'} color={Color.gray} size={16} />
                            ) : (
                                <VectorIcon nameIcon={'user-friends'} typeIcon={'FontAwesome5'} color={Color.gray} size={14} />
                            )}
                        </PostTimeContainer>
                    </PostAuthor>
                    <ThreeDotsContainer onPress={() => setRenderPopUpComponent(true)}>
                        <ThreeDots nameIcon={'dots-three-horizontal'} typeIcon={'Entypo'} size={20} color={Color.black} />
                    </ThreeDotsContainer>
                </PostHeader>
                <PostContent>
                    <PostContentText>{item?.described}</PostContentText>
                    <GridImageView renderModalFooter={true} data={gridImageViewData} />

                    <FeelView>
                        <Feel>
                            <SVGSad2 width={18} height={18} />
                            <SVGHaha2 width={18} height={18} />
                            {(item?.feel !== '0' && item.is_felt === '-1' && <Comment>{item?.feel}</Comment>) ||
                                (item.is_felt !== '-1' && <Comment>Bạn và {item.feel - 1} người khác</Comment>)}
                        </Feel>
                        <CommentView>{item.comment_mark && item.comment_mark !== '0' && <Comment>{item.comment_mark} bình luận</Comment>}</CommentView>
                    </FeelView>
                    <FooterPost>
                        <ButtonIcon
                            title={'Thích'}
                            nameIcon={'like2'}
                            typeIcon={'AntDesign'}
                            propsIcon={{ color: Color.gray, size: 24, padding: 1 }}
                            propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                            propsButton={{ backgroundColor: Color.white, width: 'auto', padding: 1, height: 40 }}
                        />
                        <ButtonIcon
                            title={'Bình luận'}
                            nameIcon={'comment-o'}
                            typeIcon={'FontAwesome'}
                            propsIcon={{ color: Color.gray, size: 24, padding: 1 }}
                            propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                            propsButton={{ backgroundColor: Color.white, width: 'auto', padding: 1, height: 40 }}
                        />
                        <ButtonIcon
                            title={'Gửi'}
                            nameIcon={'message1'}
                            typeIcon={'AntDesign'}
                            propsIcon={{ color: Color.gray, size: 24, padding: 1 }}
                            propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                            propsButton={{ backgroundColor: Color.white, width: 'auto', padding: 1, height: 40 }}
                        />
                        <ButtonIcon
                            nameIcon={'sharealt'}
                            title={'Chia sẻ'}
                            typeIcon={'AntDesign'}
                            propsIcon={{ color: Color.gray, size: 24, padding: 1 }}
                            propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                            propsButton={{ backgroundColor: Color.white, width: 'auto', padding: 1, height: 40 }}
                        />
                    </FooterPost>
                </PostContent>
            </PostContainer>
            {renderPopUpComponent && (
                <PopupComponent renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent}>
                    {listItems.map((button, index) =>
                        (button.title === 'Xóa bài viết' && item.author.id === user.id) ||
                        (button.title === 'Chỉnh sửa bài viết' && item.can_edit === '1') ||
                        (button.title !== 'Xóa bài viết' && button.title !== 'Chỉnh sửa bài viết') ? (
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
