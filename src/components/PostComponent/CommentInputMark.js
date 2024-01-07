/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import VectorIcon from '../../utils/VectorIcon';
import { Alert, Dimensions, Pressable, Text } from 'react-native';
import { TextInput } from 'react-native';
import Color from '../../utils/Color';
import { SVGMultiply, SVGYes } from '../../../assets';
import { getMarkCommentService, setMarkCommentService } from '../../services/commentService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';

const Container = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: ${Color.white};
    border-top-width: 1px;
    border-color: ${Color.grey4};
`;

const InputContainer = styled.View`
    height: 45px;
    border-radius: 23px;
    background-color: ${Color.grey6};
`;

const Input = styled(TextInput)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 45px;
    padding-horizontal: 20px;
    color: ${Color.black};
    width: 100%;
`;

const GiftIcon = styled.View`
    border-radius: 8px;
    border-width: 2px;
    border-color: ${Color.grey2};
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 46px;
    top: 8px;
`;

const EmojiIcon = styled.View`
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 8px;
`;

function CommentInputMatk(props) {
    const user = useSelector(selectUser);

    const { data, setMarkComments, markComments, handleScrollToBottom, setReactions } = props;
    const [input, setInput] = useState('');
    const [markType, setMarkType] = useState(1);
    const [show, setShow] = useState(false);
    const [page, setPage] = useState({
        index: data.id,
        count: 10,
    });

    const handleSend = () => {
        const body = {
            id: data.id,
            content: input,
            index: 0,
            count: page.count,
            type: markType,
        };

        setMarkCommentService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setInput('');
                    setShow(false);
                    setMarkType(1);
                    const lastestComment = res.data.data;
                    const lastestMarkId = markComments.length > 0 ? markComments[0].id : 0;
                    const newComment = lastestComment.filter((item) => item.id > lastestMarkId || item.poster.id === user.id);
                    setMarkComments([...newComment, ...markComments.filter((item) => item.poster.id !== user.id)]);
                    if (newComment.length === page.count) {
                        setPage({
                            ...page,
                            index: page.index + page.count,
                        });
                    } else if (newComment.length < page.count) {
                        setPage({
                            ...page,
                            index: page.index + newComment.length,
                        });
                    }
                    handleScrollToBottom();
                } else {
                    console.log('err', res.data.message);
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    const handleGetMarkComment = () => {
        const body = {
            id: data.id,
            index: page.index,
            count: page.count,
        };
        getMarkCommentService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    const commens = res.data.data;
                    setMarkComments([...markComments, ...commens]);
                    setPage({
                        ...page,
                        index: page.index + commens.length,
                    });
                } else {
                    Alert.alert('Thông báo', 'Đã xảy ra lỗi, vui lòng thử lại sau!');
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    return (
        <Container>
            <VectorIcon nameIcon={'camera-outline'} typeIcon={'Ionicons'} size={26} color={Color.grey2} style={{ marginHorizontal: 12 }} />
            <InputContainer>
                <Input
                    placeholder={'Viết bình luận...'}
                    value={input}
                    onChangeText={(text) => {
                        setInput(text);
                        if (text.trim() === '') {
                            setShow(false);
                        } else {
                            setShow(true);
                        }
                    }}
                    style={{ width: show ? Dimensions.get('window').width - 200 : Dimensions.get('window').width - 60 }}
                />
                <EmojiIcon>
                    <VectorIcon nameIcon={'emoji-happy'} typeIcon={'Entypo'} size={26} color={Color.grey2} style={{ padding: 2 }} />
                </EmojiIcon>
                <Pressable
                    style={{
                        position: 'absolute',
                        right: -50,
                        backgroundColor: markType === 1 ? Color.greenLight : Color.grey6,
                        borderRadius: 8,
                        padding: 10,
                    }}
                    onPress={() => setMarkType(1)}
                >
                    <SVGYes width={20} height={20} />
                </Pressable>
                <Pressable
                    style={{
                        position: 'absolute',
                        right: -100,
                        backgroundColor: markType === 0 ? Color.greenLight : Color.grey6,
                        borderRadius: 8,
                        padding: 10,
                    }}
                    onPress={() => setMarkType(0)}
                >
                    <SVGMultiply width={20} height={20} />
                </Pressable>
            </InputContainer>
            {show && (
                <VectorIcon
                    nameIcon={'send'}
                    typeIcon={'Ionicons'}
                    size={26}
                    color={Color.blueButtonColor}
                    style={{ position: 'absolute', right: 10 }}
                    onPress={handleSend}
                />
            )}
        </Container>
    );
}

export default CommentInputMatk;
