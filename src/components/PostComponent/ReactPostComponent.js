import React from 'react';
import styled from 'styled-components/native';
import { SVGHaha2, SVGSad2 } from '../../../assets';
import Color from '../../utils/Color';

const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

const Feel = styled.View`
    flex-direction: row;
    flex: 1;
`;

const Reactions = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${Color.gray};
    margin-left: 3px;
`;

const SVGSad = styled(SVGSad2)`
    margin-left: 3px;
`;

const SVGHaha = styled(SVGHaha2)`
    margin-left: 3px;
`;

function ReactPostComponent(props) {
    let { reacttions, felt } = props;

    return (
        <Container>
            {reacttions.kudos !== '0' && reacttions.disappointed !== '0' && reacttions.kudos > reacttions.disappointed && (
                <Feel>
                    <SVGHaha width={18} height={18} />
                    <SVGSad width={18} height={18} />
                    {felt !== '-1' ? (
                        <Reactions>Bạn và {parseInt(reacttions.kudos, 10) + parseInt(reacttions.disappointed, 10) - 1} người khác</Reactions>
                    ) : (
                        <Reactions>{parseInt(reacttions.kudos, 10) + parseInt(reacttions.disappointed, 10)}</Reactions>
                    )}
                </Feel>
            )}
            {reacttions.kudos !== '0' && reacttions.disappointed !== '0' && !(reacttions.kudos > reacttions.disappointed) && (
                <Feel>
                    <SVGSad width={18} height={18} />
                    <SVGHaha width={18} height={18} />
                    {felt !== '-1' ? (
                        <Reactions>Bạn và {parseInt(reacttions.kudos, 10) + parseInt(reacttions.disappointed, 10) - 1} người khác</Reactions>
                    ) : (
                        <Reactions>{parseInt(reacttions.kudos, 10) + parseInt(reacttions.disappointed, 10)}</Reactions>
                    )}
                </Feel>
            )}
            {reacttions.kudos !== '0' && reacttions.disappointed === '0' && (
                <Feel>
                    <SVGHaha width={18} height={18} />
                    {felt !== '-1' && reacttions.kudos > '1' ? (
                        <Reactions>Bạn và {reacttions.kudos - 1} người khác</Reactions>
                    ) : (
                        <Reactions>{reacttions.kudos}</Reactions>
                    )}
                </Feel>
            )}
            {reacttions.kudos === '0' && reacttions.disappointed !== '0' && (
                <Feel>
                    <SVGSad width={18} height={18} />
                    {felt !== '-1' && reacttions.disappointed > '1' ? (
                        <Reactions>Bạn và {reacttions.disappointed - 1} người khác</Reactions>
                    ) : (
                        <Reactions>{reacttions.disappointed}</Reactions>
                    )}
                </Feel>
            )}
        </Container>
    );
}

export default ReactPostComponent;
