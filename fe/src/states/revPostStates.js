import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const getPosts = createAsyncThunk(
  'Posts/getPosts',
  async () => {
    try {
      const response = await axios.get('http://localhost:6969/revPosts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const revPostSlice = createSlice({
  name: 'postState', // Change the slice name to 'postState'
  initialState,
  reducers: {
    filterPosts: (state, action) => {
      // Use filter instead of subtracting posts
      state.posts = state.posts.filter((post) =>
        post.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Error while fetching posts'; // Fix the error message
      });
  },
});

export const { filterPosts } = revPostSlice.actions;

export const selectAllPosts = (state) => state.postState.posts; // Use selectAllPosts
export const selectIsPostLoading = (state) => state.postState.isLoading; // Use selectIsPostLoading
export const selectPostsError = (state) => state.postState.error; // Use selectPostsError

export default revPostSlice.reducer;
