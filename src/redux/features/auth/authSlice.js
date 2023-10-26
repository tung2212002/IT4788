import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUserStorage, removeUserStorage } from '../../../utils/userStorage';

const initialState = {
    user: null,
    isAuth: false,
};

export const login = createAsyncThunk('auth/login', async () => {
    const user = await getUserStorage();
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await removeUserStorage();
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuth = false;
            })
            .addCase(login.rejected, (state) => {
                state.user = null;
                state.isAuth = false;
            })
            .addCase(logout.rejected, (state) => {
                state.user = null;
                state.isAuth = false;
            })
            .addDefaultCase((state) => {
                state.user = null;
                state.isAuth = false;
            });
    },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

export const selectIsAuth = (state) => state.auth.isAuth;

export const selectToken = (state) => state.auth.user?.token;
