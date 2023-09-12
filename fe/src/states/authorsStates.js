import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    try {
      const response = await axios.get('http://localhost:6969/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'userState', // Change the slice name to 'userState'
  initialState,
  reducers: {
    filterUsers: (state, action) => {
      state.users = state.users.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Error while fetching users';
      });
  },
});

export const { filterUsers } = userSlice.actions;

export const selectAllUsers = (state) => state.userState.users;
export const selectIsUserLoading = (state) => state.userState.isLoading;
export const selectUsersError = (state) => state.userState.error;

export default userSlice.reducer;
