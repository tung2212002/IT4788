/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import Color from '../../utils/Color';

import ButtonComponent from '../../components/ButtonComponent';

const Container = styled.View`
    flex: 1;
    background-color: ${Color.mainBackgroundColor};
    align-items: center;
    padding-horizontal: 20px;
    padding-vertical: 20px;
`;

const Body = styled.Text`
    text-align: center;
    margin-bottom: 30px;
`;

const Bottom = styled.Text`
    text-align: center;
    margin-bottom: 30px;
    position: absolute;
    bottom: 0;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const Content = styled.Text`
    font-size: 16px;
    line-height: 24px;
    color: ${Color.gray};
`;

const Link = styled.Text`
    color: ${Color.blueButtonColor};
    font-size: 16px;
    line-height: 24px;
`;

const ContentBottom = styled.Text`
    font-size: 14px;
    line-height: 20px;
    color: ${Color.gray};
`;

const LinkBottom = styled.Text`
    color: ${Color.blueButtonColor};
    font-size: 14px;
    line-height: 20px;
`;

const PolicyScreen = ({ route, navigation }) => {
    return (
        <Container>
            <Title>Hoàn tất đăng ký</Title>
            <Body>
                <Content>Bằng việc nhấn vào nút Đăng ký, bạn đã đồng ý với </Content>
                <Link onPress={() => navigation.navigate('WebViewScreen', { webName: 'Terms' })}> Điều khoản </Link>
                <Content>và</Content>
                <Link onPress={() => navigation.navigate('WebViewScreen', { webName: 'Data' })}> Chính sách dữ liệu </Link>
                <Content>và</Content>
                <Link onPress={() => navigation.navigate('WebViewScreen', { webName: 'Cookie' })}> Chính sách cookie </Link>

                <Content>
                    của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất cứ lúc nào. Thông tin từ danh bạ của bạn sẽ được tải lên
                    Facebook liên tục để chúng tôi gợi ý bạn bè bạn, cung cấp cải thiện quảng cáo cho bạn và người khác, cũng như mang đến dịch vụ tốt hơn.
                </Content>
            </Body>
            <ButtonComponent title="Đăng ký" onPress={() => navigation.navigate('EmailRegisterScreen', route.params)} />
            <ButtonComponent
                title="Đăng ký mà không tải danh bạ của tôi lên"
                onPress={() => navigation.navigate('LoginScreen')}
                style={{ backgroundColor: Color.mainBackgroundColor, marginTop: 20 }}
                color={Color.blueButtonColor}
            />
            <Bottom>
                <ContentBottom>
                    Thông tin liên hệ trong danh bạ của bạn bao gồm tên, số điện thoại và biệt danh sẽ được gửi tới Facebook để chúng tôi có thể gợi ý bạn bè,
                    cung cấp cải thiện quảng cáo cho bạn và người dùng khác, cũng như mang đến dịch vụ tốt hơn. Bạn có thể tắt tính năng này trong phần Cài đặt,
                    quản lý hoặc xóa thông tin liên hệ của mình đã chia sẻ trên Facebook.
                </ContentBottom>
                <LinkBottom onPress={() => navigation.navigate('WebViewScreen', { webName: 'Data' })}> Tìm hiểu thêm </LinkBottom>
            </Bottom>
        </Container>
    );
};

export default PolicyScreen;
