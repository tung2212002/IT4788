import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

import store from './src/redux/store';
import ProviderScreen from './src/app/ProviderScreen';

export default function App() {
    return (
        <Provider store={store}>
            <ProviderScreen />
        </Provider>
    );
}
