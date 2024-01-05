/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import Color from '../../utils/Color';

import ButtonComponent from '../../components/ButtonComponent';
import { navigate } from '../../navigation/RootNavigator';
import routes from '../../constants/route';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.grey6};
    align-items: center;
    padding-horizontal: 20px;
    padding-vertical: 20px;
`;

const Body = styled.Text`
    margin-bottom: 10px;
    font-family: OpenSans-Medium;
`;

const Bottom = styled.Text`
    margin-bottom: 30px;
    position: absolute;
    bottom: 0;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: OpenSans-Bold;
    margin-bottom: 10px;
`;

const Content = styled.Text`
    font-size: 14px;
    line-height: 22px;
    color: ${Color.black};
    opacity: 0.8;
    font-family: OpenSans-Medium;
`;

const Link = styled.Text`
    color: ${Color.blueButtonColor};
    font-size: 14px;
    line-height: 22px;
    font-family: OpenSans-Bold;
`;

const ContentBottom = styled.Text`
    font-size: 14px;
    line-height: 20px;
    color: ${Color.black};
    opacity: 0.8;
    font-family: OpenSans-Medium;
`;

const LinkBottom = styled.Text`
    color: ${Color.blueButtonColor};
    font-size: 14px;
    line-height: 20px;
    font-family: OpenSans-Bold;
`;

const ButtonNext = styled(ButtonComponent)`
    border-radius: 30px;
`;

const PolicyScreen = ({ route, navigation }) => {
    return (
        <Container>
            <Title>Đồng ý với điều khoản chính sách của Facebook</Title>
            <Body>
                <Content>Bằng việc nhấn vào nút Đăng ký, bạn đã đồng ý với </Content>
                <Link onPress={() => navigate(routes.WEB_VIEW_SCREEN, { webName: 'Terms' })}> Điều khoản </Link>
                <Content>và</Content>
                <Link onPress={() => navigate(routes.WEB_VIEW_SCREEN, { webName: 'Data' })}> Chính sách dữ liệu </Link>
                <Content>và</Content>
                <Link onPress={() => navigate(routes.WEB_VIEW_SCREEN, { webName: 'Cookie' })}> Chính sách cookie </Link>

                <Content>
                    của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất cứ lúc nào. Thông tin từ danh bạ của bạn sẽ được tải lên
                    Facebook liên tục để chúng tôi gợi ý bạn bè bạn, cung cấp cải thiện quảng cáo cho bạn và người khác, cũng như mang đến dịch vụ tốt hơn.
                </Content>
            </Body>
            <ButtonNext title={'Đăng ký'} onPress={() => navigate(routes.EMAIL_REGISTER_SCREEN, route.params)} />
            <ButtonNext
                title="Đăng ký mà không tải danh bạ của tôi lên"
                onPress={() => navigate(routes.EMAIL_REGISTER_SCREEN, route.params)}
                style={{ backgroundColor: Color.mainBackgroundColor, marginTop: 10 }}
                color={Color.blueButtonColor}
            />
            <Bottom>
                <ContentBottom>
                    Thông tin liên hệ trong danh bạ của bạn bao gồm tên, số điện thoại và biệt danh sẽ được gửi tới Facebook để chúng tôi có thể gợi ý bạn bè,
                    cung cấp cải thiện quảng cáo cho bạn và người dùng khác, cũng như mang đến dịch vụ tốt hơn. Bạn có thể tắt tính năng này trong phần Cài đặt,
                    quản lý hoặc xóa thông tin liên hệ của mình đã chia sẻ trên Facebook.
                </ContentBottom>
                <LinkBottom onPress={() => navigate(routes.WEB_VIEW_SCREEN, { webName: 'Data' })}> Tìm hiểu thêm </LinkBottom>
            </Bottom>
        </Container>
    );
};

export default PolicyScreen;
