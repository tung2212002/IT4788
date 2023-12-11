import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Color from '../../utils/Color';
import { Animated } from 'react-native';
import HeaderScreen from '../../components/HeaderScreen';
import { get_notification } from '../../services/userService';
import NotificationComponent from '../../components/NotificationComponent';


const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${Color.mainBackgroundHome};
`;
const AnimatedHeader = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;
const Error = styled.Text`
    color: ${Color.red};
    margin-vertical: 10px;
    font-size: 16px;
`;

const ViewError = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
`;

const listItems = [
    {
        nameIcon: 'search',
        typeIcon: 'FontAwesome',
    },
];

function NotificationScreen({ navigation }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const getData = async () =>{
        const index = 0;
        const count = 10;
        const params = {
            index,
            count,
        };
        setLoading(true);
        get_notification(params)
            .then((response) =>{
                if(response.data.code == 1000){
                    console.log('Ok');
                    setLoading(false);
                    setData(response.data.data);
                }
                else{
                    setLoading(false);
                    setError('Có lỗi xảy ra');
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log('NotificationScreen: ', err);
            });
    }
    useEffect(() => {
        getData();
      }, []);
    return (
        <Container>
            <>
                <AnimatedHeader>
                    <HeaderScreen
                        title={'Thông báo'}
                        listItems={listItems}
                    ></HeaderScreen> 
                </AnimatedHeader>
                <ViewError>{error !== '' && <Error>{error}</Error>}</ViewError>
                {/* <Animated.FlatList
                data={data}
                keyExtractor={(item) => item.notification_id}
                renderItem={({ item }) => <NotificationComponent item={item} />}/> */}

                <NotificationComponent data = {data}></NotificationComponent>
            </>
        </Container>
    );
}

export default NotificationScreen;
