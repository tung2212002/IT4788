import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userPost: [],
    homePost: [],
    videoPost: [],
};

export const setListUserPost = createAsyncThunk('post/setListUserPost', async (data) => {
    return data;
});

export const setListHomePost = createAsyncThunk('post/setListHomePost', async (data) => {
    return data;
});

export const setListVideoPost = createAsyncThunk('post/setListVideoPost', async (data) => {
    return data;
});

export const addListPostUserStart = createAsyncThunk('post/addListPostUserStart', async (data) => {
    return data;
});

export const addListPostUserEnd = createAsyncThunk('post/addListPostUserEnd', async (data) => {
    return data;
});

export const addListPostHomeStart = createAsyncThunk('post/addListPostHomeStart', async (data) => {
    return data;
});

export const addListPostHomeEnd = createAsyncThunk('post/addListPostHomeEnd', async (data) => {
    return data;
});

export const addListPostVideoStart = createAsyncThunk('post/addListPostVideoStart', async (data) => {
    return data;
});

export const addListPostVideoEnd = createAsyncThunk('post/addListPostVideoEnd', async (data) => {
    return data;
});

export const addPost = createAsyncThunk('post/addPost', async ({ post, isVideo = false }) => {
    return { post, isVideo };
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
    return id;
});

export const updatePost = createAsyncThunk('post/updatePost', async ({ post, isVideo = false }) => {
    return { post, isVideo };
});

export const setLoading = createAsyncThunk('post/loading', async (loading) => {
    return loading;
});

export const hiddenPost = createAsyncThunk('post/hiddenPost', async ({ id, isVideo = false }) => {
    return { id, isVideo };
});

export const hiddenPostUser = createAsyncThunk('post/hiddenPostUser', async ({ id, isVideo = false }) => {
    return { id, isVideo };
});

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setListUserPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(setListUserPost.fulfilled, (state, action) => {
                state.loading = false;
                state.userPost = action.payload;
            })
            .addCase(setListHomePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(setListHomePost.fulfilled, (state, action) => {
                state.loading = false;
                state.homePost = action.payload;
            })
            .addCase(setListVideoPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(setListVideoPost.fulfilled, (state, action) => {
                state.loading = false;
                state.videoPost = action.payload;
            })
            .addCase(addListPostUserStart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListPostUserStart.fulfilled, (state, action) => {
                state.loading = false;
                state.userPost = [...action.payload, ...state.userPost];
            })
            .addCase(addListPostHomeStart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListPostHomeStart.fulfilled, (state, action) => {
                state.loading = false;
                state.homePost = [...action.payload, ...state.homePost];
            })
            .addCase(addListPostVideoStart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListPostVideoStart.fulfilled, (state, action) => {
                state.loading = false;
                state.videoPost = [...action.payload, ...state.videoPost];
            })
            .addCase(addListPostUserEnd.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListPostUserEnd.fulfilled, (state, action) => {
                state.loading = false;
                state.userPost = [...state.userPost, ...action.payload];
            })
            .addCase(addListPostHomeEnd.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListPostHomeEnd.fulfilled, (state, action) => {
                state.loading = false;
                state.homePost = [...state.homePost, ...action.payload];
            })
            .addCase(addListPostVideoEnd.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListPostVideoEnd.fulfilled, (state, action) => {
                state.loading = false;
                state.videoPost = [...state.videoPost, ...action.payload];
            })
            .addCase(addPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.isVideo) {
                    state.videoPost = [action.payload.post, ...state.videoPost];
                    state.homePost = [action.payload.post, ...state.homePost];
                    state.userPost = [action.payload.post, ...state.userPost];
                } else {
                    state.homePost = [action.payload.post, ...state.homePost];
                    state.userPost = [action.payload.post, ...state.userPost];
                }
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.videoPost = state.videoPost.filter((post) => post.id !== action.payload);
                state.homePost = state.homePost.filter((post) => post.id !== action.payload);
                state.userPost = state.userPost.filter((post) => post.id !== action.payload);
            })
            .addCase(setLoading.pending, (state) => {
                state.loading = true;
            })
            .addCase(setLoading.fulfilled, (state, action) => {
                state.loading = action.payload;
            })
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.isVideo) {
                    const postId = action.payload.post.id;
                    state.videoPost.forEach((post) => {
                        if (post.id === postId) {
                            post = action.payload.post;
                        }
                    });

                    state.homePost.forEach((post) => {
                        if (post.id === postId) {
                            post = action.payload.post;
                        }
                    });

                    state.userPost.forEach((post) => {
                        if (post.id === postId) {
                            post = action.payload.post;
                        }
                    });
                } else {
                    const postId = action.payload.post.id;
                    state.homePost.forEach((post) => {
                        if (post.id === postId) {
                            post = action.payload.post;
                        }
                    });

                    state.userPost.forEach((post) => {
                        if (post.id === postId) {
                            post = action.payload.post;
                        }
                    });
                }
            })
            .addCase(hiddenPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(hiddenPost.fulfilled, (state, action) => {
                state.loading = false;
                state.videoPost = state.videoPost.filter((post) => post.id !== action.payload.id);
            })
            .addCase(hiddenPostUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(hiddenPostUser.fulfilled, (state, action) => {
                state.loading = false;
                state.homePost = state.homePost.filter((post) => post.author.id !== action.payload.id);
                state.videoPost = state.videoPost.filter((post) => post.author.id !== action.payload.id);
            });
    },
});

export default postSlice.reducer;

export const selectUserPost = (state) => state.post.userPost;

export const selectHomePost = (state) => state.post.homePost;

export const selectVideoPost = (state) => state.post.videoPost;

export const selectPost = (state) => state.post;

export const selectLoading = (state) => state.post.loading;
