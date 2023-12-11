import React from 'react';
import styled from 'styled-components/native';
import { ProgressBar } from 'react-native-paper';
import Color from '../utils/Color';
import { images } from '../../assets';

const Container = styled.View`
    border-top-width: 1px;
    border-top-color: ${Color.mainBackgroundHome};
    width: 90%;
    height: 70px;
    margin-top: 20px;
    margin-left: 5%;
    opacity: 0.4;
`;

const ItemSeparatorView = styled.View`
    height: 8px;
    width: 100%;
    background-color: ${Color.mainBackgroundHome};
    margin-vertical: 10px;
`;

const InfoView = styled.View`
    flex-direction: row;
`;

const AvatarView = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin: 10px;
    margin-right: 6px;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const Info = styled.View`
    flex-direction: colum;
    justify-content: center;
    margin-left: 1px;
`;

const FullName = styled.Text`
    font-size: 16px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-left: 2px;
`;

const Time = styled.Text`
    font-size: 13px;
    color: ${Color.gray};
`;

function ProgressBarCreatePost({ perc, user }) {
    return (
        <>
            <ItemSeparatorView />
            <ProgressBar progress={0.5} color={Color.blueButtonColor} visible={true} style={{ marginLeft: '5%', width: '90%', height: 6 }} />
            <Container>
                <InfoView>
                    <AvatarView>
                        <Avatar source={user?.avatar === '' || user?.avatar === '-1' ? images.defaultAvatar : { uri: user?.avatar }} />
                    </AvatarView>
                    <Info>
                        <FullName>{user?.username ? user.username : 'Người dùng'}</FullName>
                        <Time>Vừa xong</Time>
                    </Info>
                </InfoView>
            </Container>
        </>
    );
}

export default ProgressBarCreatePost;
