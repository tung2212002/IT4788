import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import Color from '../../utils/Color';
import ButtonComponent from '../../components/ButtonComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

import TextInputComponent from '../../components/TextInputComponent';
import { View } from 'react-native';
import { images } from '../../../assets';
import VectorIcon from '../../utils/VectorIcon';
import { useMediaPicker } from '../../hooks/useMediaPicker';
import { changeProfileAfterSignupService, setUserInfoService } from '../../services/profileService';
import { useDispatch, useSelector } from 'react-redux';
import { logout, mergeUser, selectUser } from '../../redux/features/auth/authSlice';
import { mergeUserStorage } from '../../utils/userStorage';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.grey6};
    padding-vertical: 40px;
`;

const Body = styled.View`
    background-color: ${Color.grey6};
    width: 100%;
    padding-horizontal: 10px;
    align-items: center;
    flex: 1;
`;

const Header = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.lightGray};
    background-color: ${Color.grey6};
`;

const Title = styled.Text`
    font-size: 18px;
    font-family: 'OpenSans-Bold';
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const TitleBody = styled.Text`
    font-size: 26px;
    font-family: 'OpenSans-Bold';
    margin-vertical: 10px;
`;

const LabelDescription = styled.Text`
    font-size: 15px;
    font-family: 'OpenSans-Bold';
    color: ${Color.black};
    margin-vertical: 10px;
`;

const Description = styled.Text`
    font-size: 15px;
    font-family: 'OpenSans-Medium';
    color: ${Color.gray};
    margin-vertical: 10px;
`;

const TextInPut = styled(TextInputComponent)`
    background-color: ${Color.white};
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: OpenSans-SemiBold;
`;

const ButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: ${Color.grey6};
`;

const ButtonNext = styled(ButtonComponent)`
    height: 48px;
    width: 40%;
`;

const Error = styled.Text`
    color: ${Color.red};
    font-size: 16px;
    font-family: 'OpenSans-Regular';
    margin-top: 10px;
`;

function ChangUserInfo({ navigation, renderPopUpComponent, setRenderPopUpComponent }) {
    const user = useSelector(selectUser);
    const [username, setUsername] = useState(user.username || '');
    const [description, setDescription] = useState(user.description || '');
    const [address, setAddress] = useState(user.address || '');
    const [city, setCity] = useState(user.city || '');
    const [country, setCountry] = useState(user.country || '');
    const [link, setLink] = useState(user.link || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState({
        changeProfile: false,
    });
    const dispatch = useDispatch();

    const handleNext = () => {
        if (username === '') {
            setError('Vui lòng nhập tên');
            return;
        }
        setLoading({ ...loading, changeProfile: true });
        const formData = new FormData();
        formData.append('username', username);
        if (description) {
            formData.append('description', description);
        }
        if (address) {
            formData.append('address', address);
        }
        if (city) {
            formData.append('city', city);
        }

        setUserInfoService(formData)
            .then((res) => {
                if (res.data.code === '1000') {
                    let userInfo = {
                        ...user,
                        username: username,
                        description: description,
                        address: address,
                        city: city,
                        country: country,
                        link: link,
                    };
                    dispatch(mergeUser(userInfo));
                    mergeUserStorage(userInfo);
                    setRenderPopUpComponent(false);
                    setLoading({ ...loading, changeProfile: false });
                } else {
                    setError('Cập nhật thông tin thất bại');
                    setLoading({ ...loading, changeProfile: false });
                }
            })
            .catch((err) => {
                setLoading({ ...loading, changeProfile: false });
                setError(err.message);
            });
    };

    return (
        <Container>
            <Header>
                <Title>Cập nhật thông tin</Title>
            </Header>
            <Body>
                <View style={{ width: '100%', alignItems: 'left' }}>
                    <TitleBody>Tên</TitleBody>
                </View>
                <TextInPut
                    mode="outlined"
                    placeholder="Nhập tên"
                    label="Tên"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 20 }}
                    topClose={28}
                    style={{ paddingTop: 12 }}
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                        setError('');
                    }}
                />
                <View style={{ width: '100%', alignItems: 'left' }}>
                    <TitleBody>Mô tả</TitleBody>
                </View>
                <TextInPut
                    mode="outlined"
                    placeholder="Nhập địa chỉ"
                    label="Địa chỉ"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 20 }}
                    topClose={28}
                    style={{ paddingTop: 12 }}
                    value={address}
                    onChangeText={(text) => {
                        setAddress(text);
                        setError('');
                    }}
                />
                <TextInPut
                    mode="outlined"
                    placeholder="Nhập thành phố"
                    label="Thành phố"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 20 }}
                    topClose={28}
                    style={{ paddingTop: 12 }}
                    value={city}
                    onChangeText={(text) => {
                        setCity(text);
                        setError('');
                    }}
                />
                <TextInPut
                    mode="outlined"
                    placeholder="Nhập quốc gia"
                    label="Quốc gia"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 20 }}
                    topClose={28}
                    style={{ paddingTop: 12 }}
                    value={country}
                    onChangeText={(text) => {
                        setCountry(text);
                        setError('');
                    }}
                />
                <TextInPut
                    mode="outlined"
                    placeholder="Nhập link"
                    label="Link"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 10 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 20 }}
                    topClose={28}
                    style={{ paddingTop: 12 }}
                    value={link}
                    onChangeText={(text) => {
                        setLink(text);
                        setError('');
                    }}
                />
                <Error>{error}</Error>
                <Description>
                    <LabelDescription>Xin lưu ý rắng: </LabelDescription>
                    Nếu bạn đổi tên trên Facebook, bạn không thể đổi lại tên trong 60 ngày. Đừng thêm bất cứ cách viết hoa khác thường , dấu câu, kí tự hoặc
                    thêm các từ ngẫu nhiên.
                </Description>
                <ButtonContainer>
                    <ButtonNext title={'Thoát'} onPress={() => setRenderPopUpComponent(false)} disabled={loading.changeProfile} />
                    <ButtonNext title={'Cập nhật'} onPress={handleNext} disabled={loading.changeProfile} loading={loading.changeProfile} />
                </ButtonContainer>
            </Body>
        </Container>
    );
}

export default ChangUserInfo;
