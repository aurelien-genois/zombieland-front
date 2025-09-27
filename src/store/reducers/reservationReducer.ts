import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import { axiosInstance } from "@/api/axiosInstance";
import type { AxiosError } from "axios";

import type { Product, CreateOrderPayload, IOrder } from "@/@types";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

type ReservationState = {
  products: Product[],
  loadingProducts: boolean,
  productsError: string | null,

  creating: boolean,
  createError: string | null,
  lastOrder: IOrder | null,

  loadingOrder: boolean,
  orderError: string | null,
  order: IOrder | null
};
  
const initialState: ReservationState = {
  products: [],
  loadingProducts: false,
  productsError: null,

  creating: false,
  createError: null,
  lastOrder: null,

  loadingOrder: false,
  orderError: null,
  order: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

// GET /products
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    "orders/fetchProducts",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.get<Product[]>("/products/published");
        return data.map(p => ({ id: p.id, name: p.name, unit_price: p.price }));
      } catch (e: any) {
        const err = e as AxiosError;
        return rejectWithValue(err.response?.data as string ?? "Failed to load products");
      }
    }
  );

// POST /checkout
export const createOrder = createAsyncThunk<IOrder, CreateOrderPayload, { rejectValue: string }>(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<IOrder>("/orders", payload);
      return data;
    } catch (e: any) {
      const err = e as AxiosError;
      const msg = (err.response?.data as any)?.message || err.message || "Order creation failed";
      return rejectWithValue(msg);
    }
  }
);
// GET /checkout/confirmation/id
export const fetchOrderById = createAsyncThunk<IOrder, number, { rejectValue: string }>(
  "orders/fetchOne", 
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/${id}`);
      return data as IOrder; 
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.error ?? "Unable to load order");
    }
});

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    // products
    .addCase(fetchProducts.pending, (s) => { s.loadingProducts = true; s.productsError = null; })
    .addCase(fetchProducts.fulfilled, (s, a) => { s.loadingProducts = false; s.products = a.payload; })
    .addCase(fetchProducts.rejected, (s, a) => { s.loadingProducts = false; s.productsError = a.payload || "Error"; })

    // create order
    .addCase(createOrder.pending, (s) => { s.creating = true; s.createError = null; s.lastOrder = null; })
    .addCase(createOrder.fulfilled, (s, a) => { s.creating = false; s.lastOrder = a.payload; })
    .addCase(createOrder.rejected, (s, a) => { s.creating = false; s.createError = a.payload || "Error"; })

    // order confirmation
    .addCase(fetchOrderById.pending,   (s)   => { s.loadingOrder = true;  s.orderError = null; s.order = null; })
    .addCase(fetchOrderById.fulfilled, (s,a) => { s.loadingOrder = false; s.order = a.payload; })
    .addCase(fetchOrderById.rejected,  (s,a) => { s.loadingOrder = false; s.orderError = a.payload || "Error"; })

    
});
  
export default ordersReducer;