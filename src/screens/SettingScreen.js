import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';

import ButtonIconComponent from '../components/ButtonIconComponent';
import { removeUserStorage } from '../utils/userStorage';
import { SVGQuestionMark } from '../../assets';
import { logout } from '../redux/features/auth/authSlice';

const ContainerView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

function SettingScreen({ navigation }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await removeUserStorage();
        dispatch(logout());
        setLoading(false);
    };

    return (
        <ContainerView>
            <ButtonIconComponent
                title={'Đăng xuất'}
                onPress={handleLogout}
                SVGIcon={SVGQuestionMark}
                propsIcon={{ width: 30, height: 30, fill: 'red' }}
                loading={loading}
            />
        </ContainerView>
    );
}

export default SettingScreen;
