import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../utils/Color';
import ButtonIcon from '../ButtonIconComponent';
import ReactionBox from '../ReactsComponent';
import { deleteFeelService, feelService } from '../../services/commentService';
import { getPostService } from '../../services/postService';
import ListCommentComponent from './ListCommentComponent';
import ReactPostComponent from './ReactPostComponent';
import ListMarkComponent from './ListMarkComponent';

const FooterPost = styled.View`
    border-top-width: 1px;
    border-color: ${Color.lightGray};
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding-horizontal: 10px;
    padding-vertical: 2px;
`;

const FeelView = styled.View`
    flex-direction: row;
    padding: 10px;
`;

const CommentView = styled.View`
    flex: 1;
    align-items: flex-end;
`;

const Comment = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${Color.gray};
    margin-left: 3px;
`;

const CommentInputPostView = styled.View`
    position: absolute;
    top: 10px;
    height: 50px;
    width: 100%;
`;

function FeelComponent({ data, setItemPost }) {
    const [felt, setFelt] = useState('-1');
    const [reacttions, setReactions] = useState({
        kudos: '0',
        disappointed: '0',
        comment_mark: data.comment_mark,
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFelt = () => {
        if (felt !== '-1') {
            const body = {
                id: data?.id,
                type: felt,
            };
            feelService(body)
                .then((res) => {
                    if (res.data.code === '1000') {
                        setReactions({ ...reacttions, kudos: res.data.data.kudos, disappointed: res.data.data.disappointed });
                        // setItemPost({ ...data, is_felt: felt });
                    }
                })
                .catch((err) => console.log(err));
        } else {
            const body = {
                id: data?.id,
            };
            deleteFeelService(body)
                .then((res) => {
                    if (res.data.code === '1000') {
                        setReactions({ ...reacttions, kudos: res.data.data.kudos, disappointed: res.data.data.disappointed });
                        // setItemPost({ ...data, is_felt: felt });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        if (loading && (felt || felt === 0)) {
            handleFelt();
        }
    }, [felt]);

    // useEffect(() => {
    //     setReactions({ ...reacttions, comment_mark: data.comment_mark });
    // }, [data.is_felt]);

    useEffect(() => {
        const body = {
            id: data?.id,
        };
        getPostService(body)
            .then((res) => {
                if (res.data.code === '1000') {
                    setFelt(res.data.data.is_felt);
                    setReactions({
                        kudos: res.data.data.kudos,
                        disappointed: res.data.data.disappointed,
                        comment_mark: res.data.data.comment_mark,
                    });

                    setLoading(true);
                }
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <FeelView>
                <ReactPostComponent reacttions={reacttions} felt={felt} />

                <CommentView>{data.comment_mark && data.comment_mark !== '0' && <Comment>{data.comment_mark} mark và bình luận</Comment>}</CommentView>
            </FeelView>
            <FooterPost>
                <ReactionBox setCurrent={setFelt} current={felt} />
                <ButtonIcon
                    title={'Bình luận'}
                    nameIcon={'comment-o'}
                    typeIcon={'FontAwesome'}
                    propsIcon={{ color: Color.gray, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                    propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                    propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                    onPress={() => setShow(true)}
                />
                <ButtonIcon
                    title={'Gửi'}
                    nameIcon={'message1'}
                    typeIcon={'AntDesign'}
                    propsIcon={{ color: Color.gray, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                    propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                    propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                />
                <ButtonIcon
                    nameIcon={'sharealt'}
                    title={'Chia sẻ'}
                    typeIcon={'AntDesign'}
                    propsIcon={{ color: Color.gray, size: 24, padding: 1, backgroundColor: Color.backGroundTransparent }}
                    propsTitle={{ color: Color.gray, size: 13, fontWeight: 600 }}
                    propsButton={{ backgroundColor: Color.backGroundTransparent, width: 'auto', padding: 1, height: 40 }}
                />
            </FooterPost>

            {/* <PopupComponent renderPopUpComponent={show} setRenderPopUpComponent={setShow} disableHandleSwipeMoveBottom={true}> */}
            {show && (
                <ListMarkComponent
                    renderPopUpComponent={show}
                    setRenderPopUpComponent={setShow}
                    data={data}
                    reacttions={reacttions}
                    felt={felt}
                    setReactions={setReactions}
                />
            )}
            {/* </PopupComponent> */}
        </View>
    );
}

export default FeelComponent;
