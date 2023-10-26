import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';

import ButtonIconComponent from '../components/ButtonIconComponent';
import { SVGQuestionMark } from '../../assets';
import { logout } from '../redux/features/auth/authSlice';
import { setLoading } from '../redux/features/loading/loadingSlice';

const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

function SettingScreen({ route, navigation }) {
    const avatar = route.params?.avatar;
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(setLoading(true));
        dispatch(logout());
        dispatch(setLoading(false));
    };

    const redirectProfile = () => {
        navigation.navigate('ProfileScreen');
    };

    useEffect(() => {
        if (avatar === '-1') {
            redirectProfile();
        }
    }, []);

    return (
        <ContainerView>
            <ButtonIconComponent
                title={'Trang cá nhân'}
                onPress={redirectProfile}
                SVGIcon={SVGQuestionMark}
                propsIcon={{ width: 30, height: 30, fill: 'red' }}
                // onPress={() => navigation.navigate('ProfileScreen')}
            />

            <ButtonIconComponent title={'Đăng xuất'} onPress={handleLogout} SVGIcon={SVGQuestionMark} propsIcon={{ width: 30, height: 30, fill: 'red' }} />
        </ContainerView>
    );
}

export default SettingScreen;
