import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export default loadingSlice.reducer;

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state) => state.loading.loading;
