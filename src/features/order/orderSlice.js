import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "./orderAPI";

const initialState = {
  // initial state ma order create karva no 6e atle orders no puro array banavi sakay
  orders: [],
  status: "idle",
  currentOrder: null,
  // fetch all order mate nu
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);

    return response.data;
  }
);

export const fetchAllOrderAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);

    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);

    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    //cart khali thay & order success  pa6i order juno reset
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // create ma badha ma khali array ma push j hoy
        state.orders.push(action.payload);
        // latest order no action.payload
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //update cart mathi copy //
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
//direct thunk vagar dispatch thay

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders; // ketla order 6e teni length

export default orderSlice.reducer;
