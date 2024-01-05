import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.Pressable`
    position: absolute;
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('window').height}px;
    z-index: -1;
`;

const Backdrop = ({ ...rest }) => {
    return (
        <Container
            {...rest}
            style={{
                transform: [{ translateX: -16 }],
            }}
        />
    );
};

export default Backdrop;
