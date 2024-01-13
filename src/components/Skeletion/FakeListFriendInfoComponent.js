import React from 'react';
import styled from 'styled-components/native';
import Color from '../../utils/Color';
import { Dimensions, StatusBar, Text } from 'react-native';

import SkeletonComponent from './SkeletonComponent';

const ListFriend = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: ${Color.white};
    padding: 10px 5px;
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

const FriendName = styled.Text`
    font-size: 15px;
    font-family: Roboto-Bold;
    color: ${Color.black};
    margin-top: 5px;
    margin-left: 5px;
    flex-wrap: wrap;
`;

function FakeListFriendInfoComponent(props) {
    return (
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
    );
}

export default FakeListFriendInfoComponent;
