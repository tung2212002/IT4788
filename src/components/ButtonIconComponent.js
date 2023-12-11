import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Color from '../utils/Color';
import VectorIcon from '../utils/VectorIcon';

const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    align-items: ${(props) => props.alignItems || 'center'};
    justify-content: ${(props) => props.justifyContent || 'start'};
    padding: ${(props) => props.padding || 10}px;
    border-radius: ${(props) => props.borderRadius || 10}px;
    background-color: ${(props) => props.backgroundColor || Color.white};
    width: ${(props) => (props.width === 'auto' ? 'auto' : (props.width || 100) + '%')};
    height: ${(props) => (props.height === 'auto' ? 'auto' : (props.height || 50) + 'px')};
    margin-right: ${(props) => (props.marginRight === 'auto' ? 'auto' : props.marginRight ? props.marginRight + 'px' : 0)};
    margin-left: ${(props) => (props.marginLeft === 'auto' ? 'auto' : props.marginLeft ? props.marginLeft + 'px' : 0)};
    margin-top: ${(props) => props.marginTop || 0}px;
    margin-bottom: ${(props) => props.marginBottom || 0}px;
    border-top-width: ${(props) => props.borderTopWidth || 0}px;
    border-bottom-width: ${(props) => props.borderBottomWidth || 0}px;
    border-left-width: ${(props) => props.borderLeftWidth || 0}px;
    border-right-width: ${(props) => props.borderRightWidth || 0}px;
    border: ${(props) => props.border || 'none'};
    border-color: ${(props) => props.borderColor || Color.black};
    position: ${(props) => props.position || 'relative'};
    left: ${(props) => (props.left === 'auto' ? 'auto' : props.left ? props.left + 'px' : 0)};
    right: ${(props) => (props.right === 'auto' ? 'auto' : props.right ? props.right + 'px' : 0)};
    bottom: ${(props) => props.bottom || 0}px;
    z-index: ${(props) => props.zIndex || 0};
`;

const Title = styled.Text`
    font-size: ${(props) => props.size || 18}px;
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight || 'normal' : 'bold')};
    color: ${(props) => props.color || Color.black};
`;

const Message = styled.Text`
    font-size: ${(props) => props.size || 16}px;
    color: ${(props) => props.color || Color.black};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight || 'normal' : 'normal')};
`;

const Content = styled.View`
    flex-direction: column;
    margin-left: 10px;
`;

const Icon = styled(VectorIcon)`
    border-radius: 50px;
    background-color: ${(props) => props.backgroundColor || Color.white};
    padding: ${(props) => props.padding || 10}px;
    margin-left: ${(props) => props.marginLeft || 0}px;
    margin-right: ${(props) => props.marginRight || 0}px;
    margin-top: ${(props) => props.marginTop || 0}px;
    margin-bottom: ${(props) => props.marginBottom || 0}px;
`;

const Loading = styled.ActivityIndicator`
    margin-horizontal: auto;
    margin-right: auto;
    margin-left: auto;
`;

const DownIcon = styled(VectorIcon)`
    margin-left: auto;
    margin-right: 10px;
`;

const ContainerImage = styled.View`
    align-items: center;
    justify-content: center;
`;

const ImageIcon = styled.Image`
    width: 100%;
    height: 100%;
`;

function ButtonIconComponent({
    title,
    message,
    onPress,
    nameIcon,
    typeIcon,
    propsButton,
    propsTitle,
    propsMessage,
    propsIcon,
    SVGIcon,
    imgIcon,
    loading,
    downIcon = false,
    propsDownIcon,
    isShadow,
}) {
    const [showMore, setShowMore] = useState(false);
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    const generateBoxShadowStyle = () => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 1.5,
            };
        } else {
            return {
                elevation: 5,
            };
        }
    };
    return (
        <Container disabled={loading} {...propsButton} onPress={onPress || handleShowMore} style={[isShadow ? generateBoxShadowStyle() : {}]}>
            {loading ? (
                <Loading size="small" color={Color.blueButtonColor} />
            ) : (
                <>
                    {typeIcon ? (
                        <Icon nameIcon={nameIcon} typeIcon={typeIcon} {...propsIcon} />
                    ) : SVGIcon ? (
                        <SVGIcon {...propsIcon} />
                    ) : imgIcon ? (
                        <ContainerImage {...propsIcon}>
                            <ImageIcon
                                source={imgIcon}
                                style={{
                                    ...propsIcon,
                                }}
                            />
                        </ContainerImage>
                    ) : null}
                    <Content>
                        <Title {...propsTitle}>{title}</Title>
                        {message && <Message {...propsMessage}>{message}</Message>}
                    </Content>
                    {downIcon && (
                        <DownIcon nameIcon="chevron-down" typeIcon="FontAwesome" color={Color.gray} style={{ ...propsDownIcon }} size={11} {...propsDownIcon} />
                    )}
                </>
            )}
        </Container>
    );
}

ButtonIconComponent.defaultProps = {
    loading: false,
};

export default ButtonIconComponent;
