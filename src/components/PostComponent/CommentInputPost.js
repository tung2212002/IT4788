import React, { useState } from 'react';
import styled from 'styled-components/native';
import VectorIcon from '../../utils/VectorIcon';
import { Alert, Dimensions, Text } from 'react-native';
import { TextInput } from 'react-native';
import Color from '../../utils/Color';
import { getMarkCommentService, setMarkCommentService } from '../../services/commentService';

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

function CommentInputPost(props) {
    const { data, setMarkComments, markComments, handleScrollToBottom } = props;
    const [input, setInput] = useState('');
    const [show, setShow] = useState(false);
    const [page, setPage] = useState({
        index: 0,
        count: 10,
    });

    const handleSend = () => {
        const body = {
            mark_id: data.id,
            content: input,
            index: page.index,
            count: page.count,
        };

        setMarkCommentService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setInput('');
                    setShow(false);
                    const newComments = res.data.data.filter((item) => item.id === data.id);
                    setMarkComments(newComments[0].comments);
                    handleScrollToBottom();
                } else {
                    Alert.alert('Thông báo', res.data.message);
                }
            })
            .catch((err) => console.log(err));
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
                    style={{ width: show ? Dimensions.get('window').width - 100 : Dimensions.get('window').width - 60 }}
                />
                <GiftIcon>
                    <VectorIcon nameIcon={'gif'} typeIcon={'MaterialIcons'} size={24} color={Color.grey2} style={{ padding: 0 }} />
                </GiftIcon>
                <EmojiIcon>
                    <VectorIcon nameIcon={'emoji-happy'} typeIcon={'Entypo'} size={26} color={Color.grey2} style={{ padding: 2 }} />
                </EmojiIcon>
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

export default CommentInputPost;
