import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import loadingReducer from './features/loading/loadingSlice';
import modalReducer from './features/modal/modalSlice';
import postSlice from './features/post/postSlice';
import friendSlice from './features/friend/friendSlice';
import networkSlice from './features/network/networkSlice';
import notiSlice from './features/noti/notiSlice';
import searchSlice from './features/history/searchSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        modal: modalReducer,
        post: postSlice,
        friend: friendSlice,
        network: networkSlice,
        noti: notiSlice,
        search: searchSlice,
    },
});

export default store;
