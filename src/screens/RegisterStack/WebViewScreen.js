import React, { useState } from 'react';
import styled from 'styled-components/native';
import WebView from 'react-native-webview';

import Color from '../../utils/Color';

const Loading = styled.ActivityIndicator`
    position: absolute;
    top: 50%;
    left: 50%;
`;

function WebViewScreen({ route }) {
    const { webName } = route.params;
    const [loading, setLoading] = useState(false);
    const web = {
        Terms: 'https://facebook.com/policies_center/',
        Data: 'https://www.facebook.com/',
        Cookie: 'https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0',
    };

    return (
        <>
            <WebView originWhitelist={['*']} source={{ uri: web[webName] }} onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} />
            {loading && <Loading size="large" color={Color.blueButtonColor} />}
        </>
    );
}

export default WebViewScreen;
