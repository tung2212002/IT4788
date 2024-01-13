import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Color from '../../utils/Color';
import SkeletonComponent from './SkeletonComponent';

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

const Bio = styled.View`
    flex: 1;
    padding-horizontal: 15px;
    margin-top: ${Dimensions.get('window').height * 0.15}px;
`;

const FakeInfoComponent = () => {
    return (
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
    );
};

export default FakeInfoComponent;
