import React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import { images } from '../../../assets';
import { convertTimeDif } from '../../utils/convertTimeAgo';
import routes from '../../constants/route';
import { navigate } from '../../navigation/RootNavigator';
import Color from '../../utils/Color';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';

const Container = styled.Pressable`
    flex: 1;
    background-color: ${Color.white};
    flex-direction: row;
    margin-bottom: 10px;
    max-width: ${Dimensions.get('window').width - 150}px;
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

const Name = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Medium';
    padding-top: 5px;
`;

const CommentContainer = styled.View`
    flex-direction: column;
    align-items: flex-start;
    background-color: ${Color.grey6};
    width: auto;
    padding-top: 0px;
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

function CommentComponent({ data, setMarkComments, canEvent = true }) {
    const handleNaviagteProfile = () => {
        // setRenderPopUpComponent(false);
        navigate(routes.PROFILE_SCREEN, { userId: data.poster.id });
    };

    return (
        <Container>
            <AvatarContainer onPress={canEvent ? handleNaviagteProfile : null}>
                <Avatar source={data.poster.avatar === '' ? images.defaultAvatar : { uri: data.poster.avatar }} />
            </AvatarContainer>
            <Info>
                <CommentContainer>
                    <Pressable onPress={canEvent ? handleNaviagteProfile : null}>
                        <Name>{data.poster.name}</Name>
                    </Pressable>
                    <Comment>{data.content}</Comment>
                </CommentContainer>
                <ListItem>
                    <Time>{convertTimeDif(data.created)}</Time>
                    {canEvent && <Time>Thích</Time>}
                    {canEvent && <Time>Trả lời</Time>}
                </ListItem>
            </Info>
        </Container>
    );
}

export default CommentComponent;
