import React from 'react';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/auth/authSlice';
import { images } from '../../assets';
import VectorIcon from '../utils/VectorIcon';
import { SVGFilter, SVGCheckIn, SVGPhotos, SVGEdit } from '../../assets';
import ButtonIconComponent from './ButtonIconComponent';
import { TouchableOpacity, View } from 'react-native';
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
    background-color: ${Color.white};
`;

const Input = styled.TextInput`
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: bold;
    background-color: ${Color.mainBackgroundHome};
`;

const Bottom = styled.View`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PostComposerComponent = ({ navigation, stylesInput, isHeader = false }) => {
    const user = useSelector(selectUser);
    const avatar = user.avatar === '-1' ? images.defaultAvatar : { uri: user.avatar };
    const { placeholderTextColor, ...styles } = stylesInput;

    const listItemsBottom = [
        {
            title: 'Trạng thái',
            onPress: () => {},
            SVGIcon: SVGEdit,
            styleIcon: { width: 16, height: 16 },
        },
        {
            title: 'Ảnh',
            onPress: () => {},
            SVGIcon: SVGPhotos,
            styleIcon: { width: 30, height: 30 },
        },
        {
            title: 'Check in',
            onPress: () => {},
            SVGIcon: SVGCheckIn,
            styleIcon: { width: 25, height: 25 },
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
                    <Avatar source={avatar} />
                </TouchableOpacity>
                <ButtonInput onPress={() => navigation.navigate('CreatePostScreen')}>
                    <Input placeholder="Bạn đang nghĩ gì?" placeholderTextColor={placeholderTextColor} style={styles} editable={false} />
                </ButtonInput>
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
