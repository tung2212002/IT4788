import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import Color from '../../utils/Color';
import CommentInputPost from './CommentInputPost';
import { getMarkCommentService } from '../../services/commentService';
import { Dimensions, Pressable } from 'react-native';
import CommentComponent from './CommentComponent';
import { SVGMultiply, SVGYes, images } from '../../../assets';
import { convertTimeDif } from '../../utils/convertTimeAgo';

const Container = styled.Pressable`
    flex: 1;
    background-color: ${Color.white};
`;

const ScrollAbleModal = styled.ScrollView`
    height: auto;
    background-color: ${Color.white};
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

const Mark = styled.View`
    flex: 1;
    background-color: ${Color.lightBlue1};
    flex-direction: row;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
`;

const AvatarContainer = styled.Pressable`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
`;

const Info = styled.View`
    margin-left: 10px;
    align-items: flex-start;
`;

const ViewHeaderMark = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Name = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Medium';
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Regular';
    color: ${Color.gray};
`;

const CommentContainer = styled.View`
    flex-direction: column;
    align-items: flex-start;
    background-color: ${Color.grey6};
    width: auto;
    padding-top: 8px;
    padding-bottom: 7px;
    border-radius: 10px;
    max-width: ${Dimensions.get('window').width - 80}px;
`;

const Comment = styled.Text`
    margin-top: 5px;
    font-size: 15px;
    color: ${Color.black};
    font-family: 'Roboto-Regular';
`;

const Time = styled.Text`
    font-size: 12px;
    color: ${Color.grey2};
    font-family: 'OpenSans-SemiBold';
`;

const ListItem = styled.View`
    flex-direction: row;
    align-items: center;
    padding-vertical: 3px;
`;

function CommentPopup(props) {
    const { renderPopUpComponent, setRenderPopUpComponent, data, onBackdropPress } = props;
    const [page, setPage] = useState({
        index: -1,
        count: 10,
        isLoaded: false,
        hasMore: true,
        isLoadMore: false,
    });
    const [markComments, setMarkComments] = useState(data.comments);
    const ref = useRef(null);

    const close = () => {
        setRenderPopUpComponent(!renderPopUpComponent);
    };

    const handleScrollToBottom = () => {
        ref.current.scrollToEnd({ animated: true });
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
        <Container>
            <ScrollAbleModalTopView>
                <ScrollAbleModalTop />
            </ScrollAbleModalTopView>
            <ViewMarkLabel>
                <MarkLabel>Mark</MarkLabel>
            </ViewMarkLabel>
            {page.isLoaded && (
                <ScrollAbleModal showsVerticalScrollIndicator={false} ref={ref}>
                    <Mark>
                        <AvatarContainer>
                            <Avatar source={data.poster.avatar === '' ? images.defaultAvatar : { uri: data.poster.avatar }} />
                        </AvatarContainer>
                        <Info>
                            <CommentContainer>
                                <ViewHeaderMark>
                                    <Pressable>
                                        <Name>{data.poster.name}</Name>
                                    </Pressable>
                                    <Description> đánh giá bài viết </Description>
                                    <Name>{data.type_of_mark === '1' ? 'Trust ' : 'Fake '}</Name>
                                    {data.type_of_mark === '1' ? <SVGYes width={20} height={20} /> : <SVGMultiply width={20} height={20} />}
                                </ViewHeaderMark>
                                <Comment>{data.mark_content}</Comment>
                            </CommentContainer>
                            <ListItem>
                                <Time>{convertTimeDif(data.created)}</Time>
                            </ListItem>
                        </Info>
                    </Mark>
                    {markComments.map((item, index) => (
                        <CommentComponent
                            key={index}
                            data={item}
                            renderPopUpComponent={renderPopUpComponent}
                            setRenderPopUpComponent={setRenderPopUpComponent}
                            setMarkComments={setMarkComments}
                            canEvent={false}
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
                                <Note>Hãy là người đầu tiên đánh giá mark này</Note>
                            </NoteView>
                        )
                    )}
                </ScrollAbleModal>
            )}
            <CommentInputPost data={data} setMarkComments={setMarkComments} markComments={markComments} handleScrollToBottom={handleScrollToBottom} />
        </Container>
    );
}

export default CommentPopup;
