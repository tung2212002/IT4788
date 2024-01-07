import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import { SVGMultiply, SVGYes, images } from '../../../assets';
import { convertTimeDif } from '../../utils/convertTimeAgo';
import routes from '../../constants/route';
import { navigate } from '../../navigation/RootNavigator';
import Color from '../../utils/Color';
import { useNavigation } from '@react-navigation/native';
import PopupScreenComponent from '../PopupScreenCompopnent';
import CommentPopup from './CommentPopup';
import VectorIcon from '../../utils/VectorIcon';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import PopupComponent from '../PopupComponent';
import ButtonIconComponent from '../ButtonIconComponent';

const Container = styled.Pressable`
    flex: 1;
    background-color: ${Color.white};
    flex-direction: row;
    margin-bottom: 10px;
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
    padding-horizontal: 10px;
    border-radius: 10px;
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
    margin-right: 15px;
`;

const ListItem = styled.View`
    flex-direction: row;
    align-items: center;
    padding-vertical: 3px;
    padding-horizontal: 10px;
`;

function MarkComponent({ data, renderPopUpComponent, setRenderPopUpComponent, setMarkComments, setReactions }) {
    const navigation = useNavigation();

    const user = useSelector(selectUser);

    const [renderPopupComment, setRenderPopupComment] = useState(false);
    const [renderPopupChangeMark, setRenderPopupChangeMark] = useState(false);
    const handleNaviagteProfile = () => {
        setRenderPopUpComponent(false);
        navigation.push(routes.PROFILE_SCREEN, { user_id: data.poster.id });
    };

    return (
        <Container>
            <AvatarContainer onPress={handleNaviagteProfile}>
                <Avatar source={data.poster.avatar === '' ? images.defaultAvatar : { uri: data.poster.avatar }} />
            </AvatarContainer>
            <Info>
                <CommentContainer>
                    <ViewHeaderMark>
                        <Pressable onPress={handleNaviagteProfile}>
                            <Name>{data.poster.name}</Name>
                        </Pressable>
                        <Description> đánh giá bài viết </Description>
                        <Name>{data.type_of_mark === '1' ? 'Trust ' : 'Fake '}</Name>
                        {data.type_of_mark === '1' ? <SVGYes width={20} height={20} /> : <SVGMultiply width={20} height={20} />}
                    </ViewHeaderMark>
                    <Comment>{data.mark_content}</Comment>
                    {user.id === data.poster.id && (
                        <VectorIcon
                            nameIcon={'dots-three-horizontal'}
                            typeIcon={'Entypo'}
                            size={20}
                            color={Color.black}
                            style={{ position: 'absolute', right: -30 }}
                            onPress={() => setRenderPopupChangeMark(true)}
                        />
                    )}
                </CommentContainer>

                <ListItem>
                    <Time>{convertTimeDif(data.created)}</Time>
                    <Time>Thích</Time>
                    <Pressable onPress={() => setRenderPopupComment(true)}>
                        <Time>Trả lời</Time>
                    </Pressable>
                </ListItem>
            </Info>
            {renderPopupComment && (
                <PopupScreenComponent
                    renderPopUpComponent={renderPopupComment}
                    setRenderPopUpComponent={setRenderPopupComment}
                    onBackdropPress={() => true}
                    coverScreen={true}
                    hasBackdrop={false}
                >
                    <CommentPopup setRenderPopupComment={setRenderPopupComment} setMarkComments={setMarkComments} data={data} setReactions={setReactions} />
                </PopupScreenComponent>
            )}
            {renderPopupChangeMark && (
                <PopupComponent renderPopUpComponent={renderPopupChangeMark} setRenderPopUpComponent={setRenderPopupChangeMark} coverScreen={true}>
                    <ButtonIconComponent
                        nameIcon={'trash'}
                        typeIcon={'Entypo'}
                        title={'Xóa Mark'}
                        onPress={() => setRenderPopupChangeMark(false)}
                        propsButton={{ height: 60, marginBottom: 10 }}
                        propsTitle={{ marginLeft: 10, fontSize: 15 }}
                        propsIcon={{ marginLeft: 10, size: 20, color: Color.black }}
                    />
                </PopupComponent>
            )}
        </Container>
    );
}

export default MarkComponent;
