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
import { changeProfileAfterSignupService } from '../../services/profileService';
import { useDispatch } from 'react-redux';
import { logout, mergeUser } from '../../redux/features/auth/authSlice';
import { mergeUserStorage } from '../../utils/userStorage';

const Container = styled.Modal`
    flex: 1;
    background-color: ${Color.grey6};
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
    font-size: 30px;
    font-family: 'OpenSans-Bold';
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
    height: 55px;
    font-size: 24px;
    font-family: OpenSans-SemiBold;
`;

const ButtonSetDefault = styled(ButtonComponent)`
    border-radius: 24px;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 0;
    width: auto;
    background-color: ${Color.white};
    border-color: ${Color.grey5};
    border-width: 1px;
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

const AvatarContainer = styled.View`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    border-width: 5px;
    border-color: ${Color.white};
    align-items: center;
    justify-content: center;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 75px;
`;
const AvatarIcon = styled.TouchableOpacity`
    position: absolute;
    bottom: 0px;
    left: 100px;
    border-radius: 50px;
    padding: 10px;
    background-color: ${Color.lightGray};
    z-index: 1;
`;

const Error = styled.Text`
    color: ${Color.red};
    font-size: 16px;
    font-family: 'OpenSans-Regular';
    margin-top: 10px;
`;

function ChangInfoAfterSignUp() {
    const [avatar, setAvatar] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState({
        changeProfile: false,
        logout: false,
    });
    const dispatch = useDispatch();

    const { mediaFiles, pickMedia, clearMedia } = useMediaPicker();

    const handleNext = () => {
        if (firstName === '') {
            setError('Vui lòng nhập tên');
            return;
        }
        if (lastName === '') {
            setError('Vui lòng nhập họ');
            return;
        }
        setLoading({ ...loading, changeProfile: true });
        const formData = new FormData();
        formData.append('username', lastName + ' ' + middleName + ' ' + firstName);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        changeProfileAfterSignupService(formData)
            .then((res) => {
                if (res.data.code === '1000') {
                    let userInfo = res.data.data;
                    userInfo.active = '1';
                    dispatch(mergeUser(userInfo));
                    mergeUserStorage(userInfo);
                    navigate(routes.HOME_STACK);
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

    const handleLogout = () => {
        setLoading({ ...loading, logout: true });
        dispatch(logout());
    };

    const handleSetDefault = () => {
        setAvatar(null);
        mediaFiles && clearMedia();
    };

    useEffect(() => {
        if (mediaFiles && mediaFiles.length > 0) {
            setAvatar(mediaFiles[0]);
        }
    }, [mediaFiles]);

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
                    placeholder="Tên"
                    label="Tên"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 2 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 20 }}
                    topClose={28}
                    style={{ paddingTop: 12 }}
                    value={firstName}
                    onChangeText={(text) => {
                        setFirstName(text);
                        setError('');
                    }}
                />
                <TextInPut
                    mode="outlined"
                    placeholder="Tên đệm"
                    label="Tên đệm"
                    outlineColor={Color.grey4}
                    placeholderTextColor={Color.grey4}
                    outlineStyle={{ borderRadius: 0, borderWidth: 2 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 10 }}
                    topClose={28}
                    style={{ marginTop: -7, paddingTop: 12 }}
                    value={middleName}
                    onChangeText={(text) => {
                        setMiddleName(text);
                        setError('');
                    }}
                />
                <TextInPut
                    mode="outlined"
                    placeholder="Họ"
                    placeholderTextColor={Color.grey4}
                    label="Họ"
                    outlineColor={Color.grey4}
                    outlineStyle={{ borderRadius: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderWidth: 2 }}
                    underlineColor={Color.grey4}
                    underlineStyle={{ borderRadius: 10 }}
                    topClose={28}
                    style={{ marginTop: -6, paddingTop: 12 }}
                    value={lastName}
                    onChangeText={(text) => {
                        setLastName(text);
                        setError('');
                    }}
                />
                <Error>{error}</Error>
                <Description>Bạn cần cập nhật một số thông tin trước sử sử dụng Facebook.</Description>
                <AvatarContainer>
                    <Avatar source={avatar?.uri ? { uri: avatar.uri } : images.defaultAvatar} />
                    <AvatarIcon onPress={() => pickMedia()}>
                        <VectorIcon nameIcon={'camera'} typeIcon={'FontAwesome5'} size={14} color={Color.black} />
                    </AvatarIcon>
                </AvatarContainer>
                {avatar && (
                    <ButtonSetDefault title={'Giữ avatar mặc định'} size={12} color={Color.black} onPress={handleSetDefault} fontFamily="Montserrat-SemiBold" />
                )}
                <ButtonContainer>
                    <ButtonNext title={'Đăng xuất'} onPress={handleLogout} disabled={loading.logout || loading.changeProfile} loading={loading.logout} />
                    <ButtonNext title={'Cập nhật'} onPress={handleNext} disabled={loading.logout || loading.changeProfile} loading={loading.changeProfile} />
                </ButtonContainer>
            </Body>
        </Container>
    );
}

export default ChangInfoAfterSignUp;
