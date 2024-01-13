import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    title: '',
    iconName: '',
    iconType: '',
    propsButton: null,
    propsIcon: null,
    propsTitle: null,
};

const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        setNoti: (state, action) => {
            state.show = action.payload.show;
            state.title = action.payload.title;
            state.iconName = action.payload.iconName;
            state.iconType = action.payload.iconType;
            state.propsButton = action.payload.propsButton;
            state.propsIcon = action.payload.propsIcon;
            state.propsTitle = action.payload.propsTitle;
        },
        hiddenNoti: (state) => {
            state.show = false;
        },
    },
});

export default notiSlice.reducer;

export const { setNoti, hiddenNoti } = notiSlice.actions;

export const selectNoti = (state) => state.noti;
