/* eslint-disable react/no-unstable-nested-components */
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

// function ListMarkComponent({ renderListMarkComponent, setRenderPopUpComponent, reacttions, felt }) {
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

// export default ListMarkComponent;

import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Color from '../../utils/Color';
import CommentInputPost from './CommentInputPost';
import { getMarkCommentService } from '../../services/commentService';
import MarkComponent from './MarkComponent';
import CommentInputMatk from './CommentInputMark';

const ModalContainer = styled(Modal)`
    flex: 1;
    margin: 0;
    justify-content: flex-end;
    z-index: 1000;
`;

const ScrollAbleModal = styled.ScrollView`
    max-height: 65%;
    height: auto;
    background-color: ${Color.white};
    padding-horizontal: 15px;
`;

// const ScrollAbleModal = styled.FlatList`
//     max-height: 60%;
//     height: auto;
//     background-color: ${Color.white};
//     padding-horizontal: 15px;
// `;

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
    height: ${Dimensions.get('window').height * 0.6}px;
`;

const Note = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Regular';
    color: ${Color.black};
`;

const ViewMarkLabel = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-vertical: 15px;
    background-color: ${Color.white};
`;

const MarkLabel = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Regular';
    color: ${Color.black};
`;

const TextLoadMore = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Bold';
    color: ${Color.black};
    padding-vertical: 20px;
`;

function ListMarkComponent({ renderPopUpComponent, setRenderPopUpComponent, onBackdropPress, reacttions, felt, data }) {
    const [page, setPage] = useState({
        index: -1,
        count: 10,
        isLoaded: false,
        hasMore: true,
        isLoadMore: false,
    });
    const [markComments, setMarkComments] = useState([]);
    const ref = createRef();

    const handleScrollToBottom = () => {
        ref.current.scrollToEnd({ animated: true });
    };

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
                if (res.data.code === '1000' && res.data.data.length === page.count) {
                    setMarkComments([...markComments, ...res.data.data]);
                    setPage({ ...page, index: res.data.data.length + page.index, isLoaded: true });
                } else if (res.data.code === '1000' && res.data.data.length < page.count) {
                    setMarkComments([...markComments, ...res.data.data]);
                    setPage({ ...page, isLoaded: true, hasMore: false });
                } else {
                    setPage({ ...page, isLoaded: true, hasMore: false });
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
            <ViewMarkLabel>
                <MarkLabel>Mark</MarkLabel>
            </ViewMarkLabel>
            {page.isLoaded && (
                <ScrollAbleModal showsVerticalScrollIndicator={false} ref={ref}>
                    {markComments.map((item, index) => (
                        <MarkComponent
                            key={index}
                            data={item}
                            renderPopUpComponent={renderPopUpComponent}
                            setRenderPopUpComponent={setRenderPopUpComponent}
                            setMarkComments={setMarkComments}
                        />
                    ))}
                    {page.isLoadMore ? (
                        <TextLoadMore>Đang tải...</TextLoadMore>
                    ) : page.hasMore ? (
                        <Pressable onPress={handleLoadMore}>
                            <TextLoadMore>Xem các mark trước...</TextLoadMore>
                        </Pressable>
                    ) : (
                        markComments.length === 0 && (
                            <NoteView>
                                <Note>Chưa có mark nào</Note>
                            </NoteView>
                        )
                    )}
                </ScrollAbleModal>
            )}
            <CommentInputMatk data={data} setMarkComments={setMarkComments} markComments={markComments} handleScrollToBottom={handleScrollToBottom} />
        </ModalContainer>
    );
}

export default ListMarkComponent;
