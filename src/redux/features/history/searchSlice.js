import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    historySearch: [],
    loading: false,
    update: false,
};

export const setHistorySearch = createAsyncThunk('search/setHistorySearch', async (data) => {
    return data;
});

export const addStartHistorySearch = createAsyncThunk('search/addStartHistorySearch', async (data) => {
    return data;
});

export const addEndHistorySearch = createAsyncThunk('search/addEndHistorySearch', async (data) => {
    return data;
});

export const removeHistorySearch = createAsyncThunk('search/removeHistorySearch', async (id) => {
    return id;
});

export const updateHistorySearch = createAsyncThunk('search/updateHistorySearch', async () => {
    return true;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setHistorySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(setHistorySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.historySearch = action.payload;
            })
            .addCase(addStartHistorySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(addStartHistorySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.historySearch = [...action.payload, ...state.historySearch];
            })
            .addCase(addEndHistorySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEndHistorySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.historySearch = [...state.historySearch, ...action.payload];
            })
            .addCase(removeHistorySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeHistorySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.historySearch = state.historySearch.filter((item) => item.id !== action.payload);
            })
            .addCase(updateHistorySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateHistorySearch.fulfilled, (state) => {
                state.loading = false;
                state.update = !state.update;
            });
    },
});

export default searchSlice.reducer;

export const selectHistorySearch = (state) => state.search.historySearch;

export const selectUpdate = (state) => state.search.update;

export const selectLoading = (state) => state.search.loading;
