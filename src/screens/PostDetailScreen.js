import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import { getPostService } from '../services/postService';
import PostDetailComponent from '../components/PostComponent/PostDetailComponent';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/auth/authSlice';
import VectorIcon from '../utils/VectorIcon';
import { View } from 'moti';
import FakePostComponent from '../components/Skeletion/FakePostComponent';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
`;

const Body = styled.ScrollView`
    margin-top: 150px;
    flex: 1;
    flex-direction: column;
    background-color: ${Color.white};
    width: 100%;
    align-self: center;
    padding: 50px;
`;

const Header = styled.View`
    top: 0;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'Roboto-Medium';
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    margin-right: 30px;
`;

const TitleBody = styled.Text`
    font-size: 24px;
    font-family: 'Roboto-Medium';
    margin-top: 10px;
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'Roboto-Regular';
    color: ${Color.gray};
    margin-bottom: 10px;
`;

function PostDetailScreen({ navigation, route }) {
    const user = useSelector(selectUser);

    const { id } = route.params;
    const [postDetail, setPostDetail] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const handleGetPostDetail = () => {
        const body = {
            id: id,
        };

        getPostService(body)
            .then((response) => {
                if (response.data.code === '1000') {
                    setPostDetail(response.data.data);
                } else {
                    console.log(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        handleGetPostDetail();
    }, []);

    return (
        <Container>
            <Header>
                <VectorIcon
                    nameIcon={'arrow-left'}
                    typeIcon={'FontAwesome'}
                    size={24}
                    color={Color.black}
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.goBack()}
                />
                <Title>Chi tiết bài viết</Title>
            </Header>
            {postDetail ? <PostDetailComponent item={postDetail} user={user} navigation={navigation} cacheFolder="homePost" /> : <FakePostComponent />}
            {/* <FakePostComponent /> */}
            {notFound && (
                <Body>
                    <TitleBody>KHÔNG TÌM THẤY DỮ LIỆU</TitleBody>
                </Body>
            )}
            <View style={{ height: 1500, width: '100%', paddingBottom: 100 }} />
        </Container>
    );
}

export default PostDetailScreen;
