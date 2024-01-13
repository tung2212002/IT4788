import React from 'react';
import styled from 'styled-components/native';
import Color from '../../utils/Color';
import { Dimensions, StatusBar, Text } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonComponent from '../../components/Skeletion/SkeletonComponent';
import VectorIcon from '../../utils/VectorIcon';
import FakePostComponent from '../../components/Skeletion/FakePostComponent';

const cardWidth = Dimensions.get('window').width * 0.8;

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${Color.grey4};
`;

const HeaderProfile = styled.View`
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: ${Color.white};
`;

const ItemRightComponent = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PressItem = styled.Pressable`
    margin-horizontal: 10px;
`;

const ProfileContainer = styled.View`
    margin-top: 50px;
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${Color.white};
`;

const BackGround = styled.View`
    height: ${Dimensions.get('window').height * 0.3}px;
    align-items: flex-start;
    justify-content: flex-end;
`;

const AvatarContainer = styled.View`
    border-radius: 100px;
    border-width: 5px;
    border-color: ${Color.white};
    margin-left: 20px;
    background-color: ${Color.white};
    position: absolute;
    bottom: -50px;
`;

const AvatarIcon = styled.TouchableOpacity`
    border-radius: 20px;
    background-color: ${Color.lightGray};
    z-index: 1;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: 10px;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    border-radius: 100px;
`;

const FullName = styled.View`
    margin-top: 10px;
    margin-left: 15px;
    position: absolute;
    bottom: -100px;
`;

const ButtonView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

const ButtonDot = styled(VectorIcon)`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    background-color: ${Color.lightGray};
    margin-left: ${Dimensions.get('window').width * 0.08 - 20}px;
`;

const FriendLabelContainer = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
    width: 100%;
    background-color: ${Color.white};
    margin-top: 10px;
`;

const LabelFriend = styled.Text`
    font-size: 20px;
    color: ${Color.black};
    font-family: 'Roboto-Bold';
    margin-left: 10px;
`;

const Friend = styled.Text`
    font-size: 16px;
    color: ${Color.gray};
    margin-left: 10px;
    font-family: 'Roboto-Medium';
`;

const SeeAll = styled.Text`
    font-size: 16px;
    color: ${Color.blueButtonColor};
    font-family: 'Roboto-Medium';
`;

const ListFriend = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${Color.white};
    padding: 10px 5px;
`;

const ItemSeparatorView = styled.View`
    height: 8px;
    background-color: ${Color.mainBackgroundHome};
`;

const FriendContainer = styled.Pressable`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: ${(Dimensions.get('window').width - 30) / 3}px;
    height: ${Dimensions.get('window').width * 0.45}px;
    background-color: ${Color.white};
    border-radius: 8px;
    margin-bottom: 20px;
`;

const FriendImage = styled.View`
    width: ${(Dimensions.get('window').width - 30) / 3}px;
    height: ${Dimensions.get('window').width / 3}px;
    overflow: hidden;
`;

const FriendAvatar = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const FriendName = styled.Text`
    font-size: 15px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-top: 5px;
    margin-left: 5px;
    flex-wrap: wrap;
`;

const Footer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
`;

const Bio = styled.View`
    flex: 1;
    padding-horizontal: 15px;
    margin-top: ${Dimensions.get('window').height * 0.15}px;
`;

const CONTAINER_HEIGHT = 60;

function TestScreen(props) {
    return (
        <Container>
            <HeaderProfile></HeaderProfile>
            <ScrollView style={{ flex: 1, backgroundColor: Color.white }} showsVerticalScrollIndicator={false}>
                <ProfileContainer>
                    <BackGround>
                        <SkeletonComponent width={Dimensions.get('window').width} height={Dimensions.get('window').height * 0.3} />
                        <AvatarContainer>
                            <SkeletonComponent width={200} height={200} style={{ borderRadius: 100 }} />
                        </AvatarContainer>
                        <FullName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.5} height={45} style={{ borderRadius: 8, marginTop: 10 }} />
                        </FullName>
                    </BackGround>
                    <Bio>
                        <SkeletonComponent width={Dimensions.get('window').width * 0.9} height={30} style={{ borderRadius: 8, marginTop: 10 }} />
                        <SkeletonComponent width={Dimensions.get('window').width * 0.4} height={30} style={{ borderRadius: 8, marginTop: 10 }} />
                        <SkeletonComponent width={Dimensions.get('window').width * 0.7} height={30} style={{ borderRadius: 8, marginTop: 10 }} />
                    </Bio>
                    <ButtonView>
                        <SkeletonComponent width={Dimensions.get('window').width * 0.95} height={45} style={{ borderRadius: 8, marginTop: 10 }} />
                        <SkeletonComponent width={Dimensions.get('window').width * 0.95} height={45} style={{ borderRadius: 8, marginTop: 10 }} />
                    </ButtonView>
                </ProfileContainer>
                <ItemSeparatorView />
                <ListFriend>
                    <FriendContainer>
                        <FriendImage>
                            <SkeletonComponent
                                width={(Dimensions.get('window').width - 30) / 3}
                                height={Dimensions.get('window').width / 3}
                                style={{ borderRadius: 8 }}
                            />
                        </FriendImage>
                        <FriendName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.25} height={15} style={{ borderRadius: 4 }} />
                        </FriendName>
                    </FriendContainer>
                    <FriendContainer>
                        <FriendImage>
                            <SkeletonComponent
                                width={(Dimensions.get('window').width - 30) / 3}
                                height={Dimensions.get('window').width / 3}
                                style={{ borderRadius: 8 }}
                            />
                        </FriendImage>
                        <FriendName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.25} height={15} style={{ borderRadius: 4 }} />
                        </FriendName>
                    </FriendContainer>
                    <FriendContainer>
                        <FriendImage>
                            <SkeletonComponent
                                width={(Dimensions.get('window').width - 30) / 3}
                                height={Dimensions.get('window').width / 3}
                                style={{ borderRadius: 8 }}
                            />
                        </FriendImage>
                        <FriendName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.25} height={15} style={{ borderRadius: 4 }} />
                        </FriendName>
                    </FriendContainer>
                    <FriendContainer>
                        <FriendImage>
                            <SkeletonComponent
                                width={(Dimensions.get('window').width - 30) / 3}
                                height={Dimensions.get('window').width / 3}
                                style={{ borderRadius: 8 }}
                            />
                        </FriendImage>
                        <FriendName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.25} height={15} style={{ borderRadius: 4 }} />
                        </FriendName>
                    </FriendContainer>
                    <FriendContainer>
                        <FriendImage>
                            <SkeletonComponent
                                width={(Dimensions.get('window').width - 30) / 3}
                                height={Dimensions.get('window').width / 3}
                                style={{ borderRadius: 8 }}
                            />
                        </FriendImage>
                        <FriendName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.25} height={15} style={{ borderRadius: 4 }} />
                        </FriendName>
                    </FriendContainer>
                    <FriendContainer>
                        <FriendImage>
                            <SkeletonComponent
                                width={(Dimensions.get('window').width - 30) / 3}
                                height={Dimensions.get('window').width / 3}
                                style={{ borderRadius: 8 }}
                            />
                        </FriendImage>
                        <FriendName>
                            <SkeletonComponent width={Dimensions.get('window').width * 0.25} height={15} style={{ borderRadius: 4 }} />
                        </FriendName>
                    </FriendContainer>
                </ListFriend>
                <ItemSeparatorView />
                <FakePostComponent />
                <ItemSeparatorView />
                <FakePostComponent />
                <ItemSeparatorView />
            </ScrollView>
        </Container>
    );
}

export default TestScreen;
