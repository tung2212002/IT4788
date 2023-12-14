import styled from 'styled-components/native';
import { useState, useEffect, useRef } from 'react';
import VectorIcon from '../../utils/VectorIcon';
import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import { get_notification } from '../../services/userService';
import { images } from '../../../assets';
import {RefreshControl, Animated} from 'react-native';
import HeaderScren from '../../components/HeaderScreen';
import NotificationComponent from '../../components/NotificationComponent';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.white};
`;
const ItemSeparatorView = styled.View`
    height: 8px;
    background-color: ${Color.mainBackgroundHome};
`;

const Header = styled.View`
    flex-direction: row;
    width: 100%;
    height: 40px;
`;

const Title = styled.Text`
    font-size: 30px;
    font-family: 'Roboto-Bold';
    flex: 1;
    align-items: center;
`;

const Icon = styled(VectorIcon)`
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 6px;
    border-radius: 20px;
    background-color: ${Color.lightGray};
    margin-left: 10px;
`;

const ItemButton = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
    padding-bottom: 10px;
`;

const HeaderBody = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
`;

const TitleHeaderBody = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.black};
`;
const ErrorText = styled.Text`
    fontSize: 16px;
    color: ${Color.black};
`;
const ErrorSubText = styled.Text`
    fontSize: 14px;
    color: ${Color.black};
`;
const ErrorImage = styled.Image`
    width: 200;
    height: 200;
`;

const NumberRequest = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Color.gray};
`;

const TextMore = styled.Text`
    font-size: 16px;
    font-family: 'Roboto-Regular';
    color: ${Color.blueButtonColor};
    position: absolute;
    right: 0;
`;

const ButtonItem = styled(ButtonComponent)`
    border-radius: 20px;
    background-color: ${Color.lightGray};
    padding: 0 15px;
`;
const CONTAINER_HEIGHT = 60;

const listItems = [
    {
        nameIcon: 'search',
        typeIcon: 'FontAwesome',
    },
];

function NotificationScreen({navigation}) {
    [error, setError] = useState(0);
    [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        index: 0,
        isRefreshing: true,
        isLoadMore: false,
    });
    const scrollY = useRef(new Animated.Value(0)).current;
    const offsetAnim = useRef(new Animated.Value(0)).current;

    const getNotification = async () => {
        if( pagination.isLoadMore || pagination.isRefreshing){
        const params = {
            index: pagination.index,
            count: 10,
        };
        get_notification(params)
            .then((response) =>{{
                if(response.data.code == 1000){
                    if (response.data.data.length !== 0) {
                        if(pagination.isRefreshing){
                            if(data.length === 0){
                                setData(response.data.data);
                            }
                            else{
                                for(let i = 0; i < 10; i++){
                                    let id = response.data.data[i].notification_id;
                                    if(data[0].notification_id === id){
                                        console.log('khong co thong bao moi');
                                        break;
                                    }else{
                                        setData([response.data.data[i], ...data]);
                                    }
                                }
                            }
                            setPagination({
                                ...pagination,
                                index: data.length,
                                isRefreshing: false,
                            })
                        }
                        else if(pagination.isLoadMore){
                            setData([...data, ...response.data.data]);
                            setPagination({
                                ...pagination,
                                index: data.length,
                                isLoadMore: false,
                            })
                        }
                    } else {
                     // khong co thong bao
                        if (pagination.isRefreshing){
                            setError(1);
                            setPagination({...pagination, isRefreshing: false});
                        }
                        if(pagination.isLoadMore) setPagination({...pagination, isLoadMore: false});
                    }
                }
                else{
                    console.log(error);
                    if (pagination.isRefreshing) setPagination({...pagination, isRefreshing: false});
                        if(pagination.isLoadMore) setPagination({...pagination, isLoadMore: false});
                }
            }})
            .catch((error) => {
                if (pagination.isRefreshing) setPagination({...pagination, isRefreshing: false});
                if(pagination.isLoadMore) setPagination({...pagination, isLoadMore: false});
            })
        }
    }
    const onRefresh = () => {
        setPagination({ ...pagination, isRefreshing: true, index: 0 });
    };

    const onLoadMore = () => {
        setPagination({ ...pagination, isLoadMore: true });
    };

    const refreshControl = <RefreshControl refreshing={pagination.isRefreshing} onRefresh={onRefresh} progressViewOffset={CONTAINER_HEIGHT} />;
    useEffect(() =>{
        if(pagination.isRefreshing) getNotification();
        else if(pagination.isLoadMore) getNotification();
    }, [pagination]);
    return (
        <Container>
            <HeaderScren title = {'Thông báo'}
                         listItems={listItems}></HeaderScren>
            {pagination.isRefreshing&&(
                <RefreshControl refreshing = {pagination.isRefreshing} onRefresh={onRefresh} progressViewOffset={CONTAINER_HEIGHT}></RefreshControl>
            )}
            {error === 1 && (
                <Container style={{ alignItems: "center" }}>
                    <ErrorText>Không có thông báo</ErrorText>
                </Container>
            )}
            {error === 2 && (
                <Container style={{ alignItems: "center", marginTop: 50, }}>
                    <ErrorImage source={images.errorNotification} />
                    <ErrorText style={{ fontWeight: "bold", marginTop: 20,}}> Trang này chưa thể hiển thị ngay</ErrorText>
                    <ErrorSubText style={{ textAlign: "center" }}> Đây có thể là do lỗi kỹ thuật mà chúng tôi đang tìm cách khắc phục. Hãy thử lại.</ErrorSubText>
                    <ButtonComponent style={{width: 200, marginTop: 50,}}
                                     title={'Thử lại'}
                                     onPress={() => { 
                                        setError(0);
                                        onRefresh();}}
                    ></ButtonComponent>
                </Container>
            )}
            {error === 0 && (
                    <Animated.FlatList
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                        data={data}
                        refreshing = {pagination.isRefreshing}
                        refreshControl={refreshControl}
                        renderItem={({ item }) => <NotificationComponent item={item} navigation = {navigation} />}
                        onEndReached={onLoadMore}
                        >
                    </Animated.FlatList>
)}
        </Container>
    );
}

export default NotificationScreen;
