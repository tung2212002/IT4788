import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    requestFriendMain: [],
    suggestFriendMain: [],
    suggestFriendSub: [],
    friendSub: [],
};

export const setRequestFriendMain = createAsyncThunk('friend/setRequestFriendMain', async (data) => {
    return data;
});

export const addListRequestFriendMain = createAsyncThunk('friend/addListRequestFriendMain', async (data) => {
    return data;
});

export const deleteRequestFriendMain = createAsyncThunk('friend/deleteRequestFriendMain', async (id) => {
    return id;
});

export const setSuggestFriendMain = createAsyncThunk('friend/setSuggestFriendMain', async (data) => {
    return data;
});

export const addListSuggestFriendMain = createAsyncThunk('friend/addListSuggestFriendMain', async (data) => {
    return data;
});

export const setSuggestFriendSub = createAsyncThunk('friend/setSuggestFriendSub', async (data) => {
    return data;
});

export const addListSuggestFriendSub = createAsyncThunk('friend/addListSuggestFriendSub', async (data) => {
    return data;
});

export const setFriendSub = createAsyncThunk('friend/setFriendSub', async (data) => {
    return data;
});

export const addFriendSub = createAsyncThunk('friend/addFriendSub', async (data) => {
    return data;
});

export const deleteFriendSub = createAsyncThunk('friend/deleteFriendSub', async (id) => {
    return id;
});

export const deleteSuggestFriendMain = createAsyncThunk('friend/deleteSuggestFriendMain', async (id) => {
    return id;
});

export const deleteSuggestFriendSub = createAsyncThunk('friend/deleteSuggestFriendSub', async (id) => {
    return id;
});

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setRequestFriendMain.fulfilled, (state, action) => {
                state.requestFriendMain = action.payload;
            })
            .addCase(addListRequestFriendMain.fulfilled, (state, action) => {
                state.requestFriendMain = [...state.requestFriendMain, ...action.payload];
            })
            .addCase(setSuggestFriendMain.fulfilled, (state, action) => {
                state.suggestFriendMain = action.payload;
            })
            .addCase(addListSuggestFriendMain.fulfilled, (state, action) => {
                state.suggestFriendMain = [...state.suggestFriendMain, ...action.payload];
            })
            .addCase(setSuggestFriendSub.fulfilled, (state, action) => {
                state.suggestFriendSub = action.payload;
            })
            .addCase(addListSuggestFriendSub.fulfilled, (state, action) => {
                state.suggestFriendSub = [...state.suggestFriendSub, ...action.payload];
            })
            .addCase(setFriendSub.fulfilled, (state, action) => {
                state.friendSub = action.payload;
            })
            .addCase(addFriendSub.fulfilled, (state, action) => {
                state.friendSub = [...state.friendSub, ...action.payload];
            })
            .addCase(deleteSuggestFriendMain.fulfilled, (state, action) => {
                state.suggestFriendMain = state.suggestFriendMain.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteSuggestFriendSub.fulfilled, (state, action) => {
                state.suggestFriendSub = state.suggestFriendSub.filter((item) => item.id !== action.payload);
                state.suggestFriendMain = state.suggestFriendMain.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteFriendSub.fulfilled, (state, action) => {
                state.friendSub = state.friendSub.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteRequestFriendMain.fulfilled, (state, action) => {
                state.requestFriendMain = state.requestFriendMain.filter((item) => item.id !== action.payload);
            });
    },
});

export default friendSlice.reducer;

export const selectRequestFriendMain = (state) => state.friend.requestFriendMain;

export const selectSuggestFriendMain = (state) => state.friend.suggestFriendMain;

export const selectSuggestFriendSub = (state) => state.friend.suggestFriendSub;

export const selectFriendSub = (state) => state.friend.friendSub;
