import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import Color from '../utils/Color';
// import { selectUser } from '../redux/features/user/userSlice';
import { selectUser } from '../redux/features/auth/authSlice';
import { images } from '../../assets';
import VectorIcon from '../utils/VectorIcon';
import { SVGFilter, SVGCheckIn, SVGPhotos, SVGEdit } from '../../assets';
import ButtonIconComponent from './ButtonIconComponent';
import ButtonComponent from './ButtonComponent';

const Container = styled.View`
    background-color: ${Color.white};
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Header = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
`;

const TitleHeader = styled.Text`
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    color: ${Color.black};
    flex: 2;
`;

const ListIcon = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const Icon = styled(VectorIcon)`
    margin-horizontal: 8px;
    padding: 7px 13px;
    border-radius: 10px;
    background-color: ${Color.lightGray};
`;

const ViewIcon = styled.View`
    padding: 5px 10px;
    background-color: ${Color.lightGray};
    border-radius: 10px;
`;

const FilterIcon = styled(SVGFilter)`
    background-color: ${Color.lightGray};
`;

const Content = styled.View`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: evenly;
    border-bottom-width: 1px;
    border-color: ${Color.mainBackgroundHome};
`;

const Avatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin-left: 10px;
`;

const ButtonInput = styled(ButtonComponent)`
    flex: 1;
    height: 50px;
    margin-horizontal: 10px;
    border-radius: 50px;
    align-items: flex-start;
    padding-left: 20px;
`;

const Bottom = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PostComposerComponent = ({ navigation, stylesInput, isHeader = false, setShowCreatePost }) => {
    const user = useSelector(selectUser);
    const { placeholderTextColor, ...styles } = stylesInput;

    const listItemsBottom = [
        {
            title: 'Trạng thái',
            onPress: () => {},
            SVGIcon: SVGEdit,
            styleIcon: { width: 22, height: 22 },
        },
        {
            title: 'Ảnh',
            onPress: () => {},
            SVGIcon: SVGPhotos,
            styleIcon: { width: 26, height: 26 },
        },
        {
            title: 'Check in',
            onPress: () => {},
            SVGIcon: SVGCheckIn,
            styleIcon: { width: 26, height: 26 },
        },
    ];

    return (
        <Container>
            {isHeader ? (
                <Header>
                    <TitleHeader>Bài viết</TitleHeader>
                    <ListIcon>
                        <ViewIcon>
                            <FilterIcon width={24} height={24} />
                        </ViewIcon>
                        <Icon nameIcon="settings-sharp" typeIcon="Ionicons" size={18} color={Color.black} />
                    </ListIcon>
                </Header>
            ) : null}
            <Content>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Avatar source={user?.avatar === '-1' || user?.avatar === '' ? images.defaultAvatar : { uri: user?.avatar }} />
                </TouchableOpacity>
                <ButtonInput
                    onPress={() => setShowCreatePost(true)}
                    title="Bạn đang nghĩ gì?"
                    color={Color.gray}
                    style={[styles, { backgroundColor: Color.white }]}
                />
            </Content>

            <Bottom>
                {listItemsBottom.map((item, index) => (
                    <ButtonIconComponent
                        key={index}
                        title={item.title}
                        onPress={item.onPress}
                        SVGIcon={item.SVGIcon}
                        propsIcon={item.styleIcon}
                        propsTitle={{ size: 14, color: Color.gray }}
                        propsButton={{
                            width: 100 / 3,
                            height: '32',
                            justifyContent: 'center',
                            borderLeftWidth: index === 0 ? 0 : 0.5,
                            borderRadius: '0',
                            padding: '0',
                        }}
                    />
                ))}
            </Bottom>
        </Container>
    );
};

export default PostComposerComponent;
