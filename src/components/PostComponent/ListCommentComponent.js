// import React from 'react';
// import { Dimensions, Text } from 'react-native';
// import styled from 'styled-components/native';
// import { images } from '../../../assets';
// import CommentComponent from './CommentComponent';
// import ReactPostComponent from './ReactPostComponent';
// import Color from '../../utils/Color';
// import { ScrollView } from 'react-native-gesture-handler';
// import CommentInputPost from './CommentInputPost';

// const Container = styled.Pressable`
//     flex: 1;
//     background-color: ${Color.white};
//     padding-horizontal: 15px;
// `;

// const Hr = styled.View`
//     height: 20px;
//     width: 100%;
// `;

// function ListCommentComponent({ renderListCommentComponent, setRenderPopUpComponent, reacttions, felt }) {
//     return (
//         <Container>
//             <ReactPostComponentView reacttions={reacttions} felt={felt} />
//             <Hr />
//             {fakeData.comments.map((item, index) => (
//                 <CommentComponent key={index} fakeData={item} renderPopUpComponent={renderPopUpComponent} setRenderPopUpComponent={setRenderPopUpComponent} />
//             ))}
//         </Container>
//     );
// }

// export default ListCommentComponent;

import React, { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Color from '../../utils/Color';
import ReactPostComponent from './ReactPostComponent';
import CommentComponent from './CommentComponent';
import CommentInputPost from './CommentInputPost';
import { getMarkCommentService } from '../../services/commentService';
import MarkComponent from './MarkComponent';

const ModalContainer = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
    z-index: 1000;
`;

const ScrollAbleModal = styled.ScrollView`
    max-height: 70%;
    height: auto;
    background-color: ${Color.white};
`;

const ScrollViewContainer = styled.Pressable`
    padding-horizontal: 15px;
`;

const ScrollAbleModalTopView = styled.View`
    height: 20px;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    align-self: center;
    background-color: ${Color.white};
`;

const ScrollAbleModalTop = styled.View`
    height: 5px;
    width: 50px;
    border-radius: 5px;
    align-self: center;
    margin-vertical: 10px;
    background-color: ${Color.gray};
`;

const NoteView = styled.View`
    align-items: center;
    justify-content: center;
    padding-vertical: 10px;
`;

const Note = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Regular';
    color: ${Color.black};
`;

function ListCommentComponent({ renderPopUpComponent, setRenderPopUpComponent, onBackdropPress, reacttions, felt, data }) {
    const [page, setPage] = useState({
        index: -1,
        count: 10,
    });
    const [comments, setComments] = useState([]);
    const [markComments, setMarkComments] = useState([]);

    const close = () => {
        setRenderPopUpComponent(!renderPopUpComponent);
    };

    const handleLoadMore = () => {
        const body = {
            id: data?.id,
            index: page.index + 1,
            count: page.count,
        };

        getMarkCommentService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    console.log('res.data.data', res.data.data);
                    // res.data.data?.comments?.forEach((item) => {
                    //     setComments([...comments, ...item.comments]);
                    // });
                    setMarkComments([...markComments, ...res.data.data]);
                    setPage({ ...page, index: res.data.data.length });
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        handleLoadMore();
    }, []);

    return (
        <ModalContainer
            isVisible={renderPopUpComponent}
            onSwipeComplete={close}
            swipeDirection={[]}
            onBackdropPress={onBackdropPress ? onBackdropPress : () => setRenderPopUpComponent(false)}
            onModalHide={() => setRenderPopUpComponent(false)}
            avoidKeyboard={true}
            animationOutTiming={1000}
        >
            <ScrollAbleModalTopView>
                <ScrollAbleModalTop />
            </ScrollAbleModalTopView>

            <ScrollAbleModal>
                {markComments.length > 0 ? (
                    <ScrollViewContainer>
                        {markComments.map((item, index) => (
                            <MarkComponent
                                key={item.created_at + index}
                                data={item}
                                renderPopUpComponent={renderPopUpComponent}
                                setRenderPopUpComponent={setRenderPopUpComponent}
                                setMarkComments={setMarkComments}
                            />
                        ))}
                    </ScrollViewContainer>
                ) : (
                    <NoteView>
                        <Note>Chưa có mark nào</Note>
                    </NoteView>
                )}
            </ScrollAbleModal>
            <CommentInputPost />
        </ModalContainer>
    );
}

export default ListCommentComponent;
