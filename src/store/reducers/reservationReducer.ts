import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import { axiosInstance } from "@/api/axiosInstance";
import type { AxiosError } from "axios";

import type { Product, CreateOrderPayload, IOrder, OrderStatus, OrdersSort, IMeta } from "@/@types";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

type FetchArgs = {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
  order?: OrdersSort;
};
type OrdersResponse = { data: IOrder[]; meta: IMeta };

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
  order: IOrder | null,

  orders: IOrder[],
  loadingOrders: boolean;
  ordersError: string | null;
  // contrôles de liste
  page: number;
  limit: number;
  search: string;
  status: OrderStatus | "all";
  orderSort: OrdersSort;
  meta: IMeta | null;
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

  orders: [],
  loadingOrders: false,
  ordersError: null,

  page: 1,
  limit: 10,
  search: "",
  status: "all",
  orderSort: "order_date:desc",

  meta: null,
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
      } catch (e) {
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
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data as string ?? "Order creation failed");
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
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data as string ?? "Unable to load order");
    }
});

// GET /orders/all
export const fetchAllOrders = createAsyncThunk<OrdersResponse,FetchArgs | void,{ rejectValue: string }>(
  "orders/fetchAll", 
  async (args, { rejectWithValue }) => {
    try {
      const params = {
        page: args?.page ?? 1,
        limit: args?.limit ?? 10,
        search: args?.search ?? undefined,
        status: args?.status ?? undefined,
        order: args?.order ?? "order_date:desc",
      };
      const { data } = await axiosInstance.get("/orders", { params });
      return data as OrdersResponse;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data as string ?? "Failed to fetch orders");
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

     // orders
     .addCase(fetchAllOrders.pending, (s, a) => {
        const args = a.meta.arg as FetchArgs | undefined;
        if (args?.page) s.page = args.page;
        if (args?.limit) s.limit = args.limit;
        if (typeof args?.search === "string") s.search = args.search;
        if (args?.status) s.status = args.status;
        if (args?.order) s.orderSort = args.order;

        s.loadingOrders = true;
        s.ordersError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (s, a) => {
        s.loadingOrders = false;
        s.orders = a.payload.data;
        s.meta = a.payload.meta ?? null;
        // meta peut remettre la page/limit si besoin
        if (a.payload.meta) {
          s.page = a.payload.meta.page;
          s.limit = a.payload.meta.limit;
        }
      })
      .addCase(fetchAllOrders.rejected, (s, a) => {
        s.loadingOrders = false;
        s.ordersError = a.payload || "Error";
      });

    
});
  
export default ordersReducer;