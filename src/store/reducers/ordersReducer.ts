import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
import type { AxiosError } from "axios";
import type { IOrder, IPaginatedOrders } from "../../@types";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface OrdersState {
  ordersList:  IPaginatedOrders | null;
  userOrdersList: IOrder | null;
  currentOrder: IOrder | null;
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  ordersList: null,
  userOrdersList: null,
  currentOrder: null,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

// Get All Orders
export const getAllOrders = createAsyncThunk<
  IPaginatedOrders,
  void,
  { rejectValue: string }
>("admin/getAllActivities", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/orders");
    console.log(">>>> ORDER fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data as string);
    } else {
      return rejectWithValue(axiosError.message);
    }
  }
});

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId: number, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data as string);
    } else {
      return rejectWithValue(axiosError.message);
    }
  }
});

export const fetchOneOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId: number, { rejectWithValue }) => {
    try{
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      return data as IOrder;
    } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data as string);
    } else {
      return rejectWithValue(axiosError.message);
    }
  }
});

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

//
const ordersReducer = createReducer(initialState, (builder) => {
  builder.
  // Get All Orders
  addCase(getAllOrders.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(getAllOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.ordersList = action.payload;
  });
  builder.addCase(getAllOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Failed to fetch users";
  });

  builder
  // Get user's order
  .addCase(fetchUserOrders.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchUserOrders.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.userOrdersList = action.payload; // On met à jour la liste des commandes de l'utilisateur
  })
  .addCase(fetchUserOrders.rejected, (state, action) => {
    state.loading = false;
    state.error = (action.payload as string) || "Failed to fetch user orders";
  });
  
  builder.
  // Get One Order
  addCase(fetchOneOrder.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchOneOrder.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.currentOrder = action.payload;
  })
  .addCase(fetchOneOrder.rejected, (state, action) => {
    state.loading = false;
    state.error = (action.payload as string) || "Failed to fetch order";
  });
});


export default ordersReducer;
