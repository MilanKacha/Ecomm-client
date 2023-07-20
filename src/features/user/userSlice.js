import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  updateUser,
} from "./userAPI";

const initialState = {
  // user  na order joy tena id par thi
  userOrders: [],
  status: "idle",
  // for fetch logged in user async
  userInfo: null, // this info. will be used for more detailed info. of user, while auth (user)
  // only be used for login user data
};

export const fetchLoggedInUserOrdersrAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);

    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);

    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (userId) => {
    const response = await fetchLoggedInUser(userId);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersrAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // user nu id fetch theine order aama store thase
        // user log in thase atle badha tena order aavse
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //user in information aama store thase
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
