import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { mergeUserStorage, removeUserStorage } from '../../../utils/userStorage';
import { logoutService } from '../../../services/userService';

const initialState = {
    user: null,
    isAuth: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async (user) => {
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});

export const logout = createAsyncThunk('auth/logout', async (requestLogout = true) => {
    try {
        logoutService()
            .then((res) => {
                removeUserStorage();
            })
            .catch((e) => {
                removeUserStorage();
            });
    } catch (error) {
        removeUserStorage();
    }
    return null;
});

export const mergeUser = createAsyncThunk('auth/mergeUser', async (user) => {
    try {
        const response = await mergeUserStorage(user);
        return response;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
});

export const setLoading = createAsyncThunk('auth/loading', async (loading) => {
    return loading;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
            })
            .addCase(mergeUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(mergeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // state.isAuth = true;
            })
            .addCase(mergeUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuth = false;
            })
            .addCase(setLoading.pending, (state) => {
                state.loading = true;
            })
            .addCase(setLoading.fulfilled, (state, action) => {
                state.loading = action.payload;
            })
            .addCase(setLoading.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuth = (state) => state.auth.isAuth;

export const selectAuth = (state) => state.auth;

export const selectToken = (state) => state.auth.user?.token;
