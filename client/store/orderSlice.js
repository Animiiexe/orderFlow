import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await API.get(`/orders?${params}`);
    return res.data.orders;
  }
);

export const updateQuantity = createAsyncThunk(
  "orders/updateQuantity",
  async ({ id, quantity }) => {
    const res = await API.patch(`/orders/${id}/quantity`, { quantity });
    return res.data.order;
  }
);

export const deleteOrder = createAsyncThunk("orders/delete", async (id) => {
  await API.delete(`/orders/${id}`);
  return id;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: { list: [], status: "idle" },
  reducers: {
    addOrderRealtime: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateOrderRealtime: (state, action) => {
      const idx = state.list.findIndex((o) => o._id === action.payload._id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteOrderRealtime: (state, action) => {
      state.list = state.list.filter((o) => o._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const idx = state.list.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((o) => o._id !== action.payload);
      });
  },
});

export const { addOrderRealtime, updateOrderRealtime, deleteOrderRealtime } =
  ordersSlice.actions;
export default ordersSlice.reducer;
