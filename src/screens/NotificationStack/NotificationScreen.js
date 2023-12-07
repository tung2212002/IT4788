import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
`;

const NotificationCard = styled.View`
    width: 90%;
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-offset: {
        width: 0;
        height: 2;
    }
    elevation: 2;
`;

const NotificationText = styled.Text`
    font-size: 16px;
`;

function NotificationScreen({ navigation }) {
    return (
        <Container>
            <NotificationCard>
                <NotificationText>A new notification!</NotificationText>
            </NotificationCard>
        </Container>
    );
}

export default NotificationScreen;
