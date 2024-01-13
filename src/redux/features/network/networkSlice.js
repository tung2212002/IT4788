import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnented: true,
};

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setNetwork: (state, action) => {
            state.isConnented = action.payload;
        },
    },
});

export default networkSlice.reducer;

export const { setNetwork } = networkSlice.actions;

export const selectNetwork = (state) => state.network.isConnented;
