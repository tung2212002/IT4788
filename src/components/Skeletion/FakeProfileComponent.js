import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Color from '../../utils/Color';
import SkeletonComponent from './SkeletonComponent';

const cardWidth = Dimensions.get('window').width;
const skeWidth = cardWidth * 0.9;

const Container = styled.View`
    flex: 1;
    background-color: ${Color.gray1};
    justify-content: center;
    align-items: center;
`;

const Card = styled.View`
    background-color: ${Color.white};
    padding: 16px;
    elevation: 3;
    shadow-color: ${Color.black};
    shadow-offset: 0px 3px;
    shadow-opacity: 0.24;
    shadow-radius: 4px;
    border-radius: 8px;
    width: ${cardWidth}px;
`;

const CardHeader = styled.View`
    flex-direction: row;
    align-items: center;
`;

const CardHeaderInfo = styled.View`
    flex-direction: column;
    margin-left: 8px;
`;

const CardBody = styled.View`
    margin-top: 16px;
    flex-direction: column;
    padding-bottom: 70px;
`;

function FakeProfileComponent() {
    return (
        <Container>
            <Card>
                <CardHeader>
                    <SkeletonComponent width={40} height={40} style={{ borderRadius: 20 }} />
                    <CardHeaderInfo>
                        <SkeletonComponent width={skeWidth / 3} height={12} style={{ borderRadius: 4 }} />
                        <SkeletonComponent width={skeWidth / 4} height={12} style={{ marginTop: 4, borderRadius: 4 }} />
                    </CardHeaderInfo>
                </CardHeader>
                <CardBody>
                    <SkeletonComponent width={skeWidth * 0.8} height={15} style={{ borderRadius: 4 }} />
                    <SkeletonComponent width={skeWidth * 0.6} height={15} style={{ marginTop: 8, borderRadius: 4 }} />
                    <SkeletonComponent width={skeWidth * 0.7} height={15} style={{ marginTop: 8, borderRadius: 4 }} />
                </CardBody>
            </Card>
        </Container>
    );
}

export default FakeProfileComponent;
