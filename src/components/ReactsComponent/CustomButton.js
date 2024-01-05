import React from 'react';
import styled from 'styled-components/native';

import { SVGHaha2, SVGSad2 } from '../../../assets';
import Color from '../../utils/Color';
import VectorIcon from '../../utils/VectorIcon';

const Container = styled.TouchableOpacity`
    padding: 8px;
`;

const Box = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Title = styled.Text`
    margin-left: 4px;
    text-transform: capitalize;
    font-size: 13px;
    font-family: 'OpenSans-Bold';
`;

const ButtonIcon = styled.View`
    margin-left: 4px;
    flex-direction: row;
`;

const TitleBox = styled.Text`
    font-size: 13px;
    color: ${Color.gray};
    font-weight: 600;
    margin-left: 6px;
`;

const items = [
    {
        id: '0',
        emojiSVG: SVGSad2,
        title: 'Buồn',
        color: Color.yellow1,
    },
    {
        id: '1',
        emojiSVG: SVGHaha2,
        title: 'Haha',
        color: Color.yellow1,
    },
];

const CustomButton = ({ emoji, id, text, color, ...rest }) => {
    return (
        <Container {...rest} activeOpacity={0.7}>
            {id !== '-1' &&
                items.map((item) => {
                    if (item.id === id) {
                        return (
                            <Box key={item.id}>
                                <item.emojiSVG width={'20'} height={'20'} />
                                <Title style={[{ color: item.color }]}>{item.title}</Title>
                            </Box>
                        );
                    }
                })}
            {id === '-1' && (
                <Box>
                    <VectorIcon nameIcon={'like2'} typeIcon={'AntDesign'} size={24} color={Color.gray} style={{ marginLeft: 4 }} />
                    <TitleBox>Thích</TitleBox>
                </Box>
            )}
        </Container>
    );
};

export default CustomButton;
