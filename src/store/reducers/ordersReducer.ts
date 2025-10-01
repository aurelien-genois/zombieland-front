import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { axiosInstance } from "@/api/axiosInstance";

import type {
  Product,
  CreateOrderPayload,
  IOrder,
  OrderStatus,
  OrdersSort,
  IMeta,
  // IPaginatedOrders, // si tu l’as déjà, sinon IMeta + data:IOrder[]
} from "@/@types";

/** ─────────────────────────────────────────────────────────────────────────────
 * STATE
 * ────────────────────────────────────────────────────────────────────────────*/
type FetchArgs = {
  page?: number;
  perPage?: number;
  total?: number;
  search?: string;
  status?: OrderStatus;
  order?: OrdersSort;
};

type OrdersState = {
  // catalogue
  products: Product[];
  loadingProducts: boolean;
  productsError: string | null;

  // checkout / création
  creating: boolean;
  createError: string | null;
  lastOrder: IOrder | null;

  // détail
  loadingOrder: boolean;
  orderError: string | null;
  order: IOrder | null;

  // admin list
  orders: IOrder[];
  loadingOrders: boolean;
  ordersError: string | null;
  page: number;
  perPage: number;
  total: number;
  search: string;
  status: OrderStatus | "all";
  orderSort: OrdersSort;
  meta: IMeta | null;

  // user list (Wilfried)
  loadingUserOrders: boolean;
  userOrdersError: string | null;
  userOrdersList: IOrder[]; // <— tableau clair (si ton endpoint renvoie autre chose, dis-moi)
};

const initialState: OrdersState = {
  // catalogue
  products: [],
  loadingProducts: false,
  productsError: null,

  // checkout
  creating: false,
  createError: null,
  lastOrder: null,

  // détail
  loadingOrder: false,
  orderError: null,
  order: null,

  // admin list
  orders: [],
  loadingOrders: false,
  ordersError: null,
  page: 1,
  perPage: 9,
  total: 0,
  search: "",
  status: "all",
  orderSort: "order_date:desc",
  meta: null,

  // user list
  loadingUserOrders: false,
  userOrdersError: null,
  userOrdersList: [],
};

/** ─────────────────────────────────────────────────────────────────────────────
 * THUNKS
 * ────────────────────────────────────────────────────────────────────────────*/
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "orders/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Product[]>("/products/published");
      return data.map((p) => ({ id: p.id, name: p.name, unit_price: p.price } as unknown as Product));
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue((err.response?.data as string) ?? "Failed to load products");
    }
  }
);

export const createOrder = createAsyncThunk<IOrder, CreateOrderPayload & { user_id?: number }, { rejectValue: string }>(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<IOrder>("/orders", payload);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      const msg =
        (typeof err.response?.data === "object" && (err.response?.data as any)?.error) ||
        (typeof err.response?.data === "string" ? err.response.data : undefined) ||
        err.message ||
        "Order creation failed";
      return rejectWithValue(msg);
    }
  }
);

export const fetchOneOrder = createAsyncThunk<IOrder, number, { rejectValue: string }>(
  "orders/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/${id}`);
      return data as IOrder;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue((err.response?.data as string) ?? "Unable to load order");
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (args: IMeta, { rejectWithValue }) => {
    try {
      const { page = 1, perPage = 10, search, status, order = "order_date:desc" } = args ?? {};
      const { data } = await axiosInstance.get("/orders", {
        params: {
          page,
          limit: perPage,
          search,
          status,
          order,
        },
      });
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err?.response?.data ?? "Failed to fetch orders");
    }
  }
);

// Liste des commandes d’un utilisateur
export const fetchUserOrders = createAsyncThunk<IOrder[], number, { rejectValue: string }>(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/orders/user/${userId}`);
      return (Array.isArray(data) ? data : data?.data) as IOrder[];
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue((err.response?.data as string) ?? "Failed to fetch user orders");
    }
  }
);

// MAJ statut (admin)
export const updateOrderStatus = createAsyncThunk<IOrder, { id: number; status: OrderStatus }, { rejectValue: string }>(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/orders/${id}/status`, { status });
      return data as IOrder;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue((err.response?.data as string) ?? "Failed to update status");
    }
  }
);

/** ─────────────────────────────────────────────────────────────────────────────
 * SLICE
 * ────────────────────────────────────────────────────────────────────────────*/
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // reset filtre/sort rapide pour la liste admin
    resetAdminList(state, action) {
      state.total = action.payload.totalActivities;
      state.perPage = action.payload.perPage;
      state.page = action.payload.page;
      state.search = "";
      state.status = "all";
      state.orderSort = "order_date:desc";
    },
  },
  extraReducers: (builder) => {
    // products
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.loadingProducts = true;
        s.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loadingProducts = false;
        s.products = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loadingProducts = false;
        s.productsError = a.payload || "Error";
      });

    // create
    builder
      .addCase(createOrder.pending, (s) => {
        s.creating = true;
        s.createError = null;
        s.lastOrder = null;
      })
      .addCase(createOrder.fulfilled, (s, a) => {
        s.creating = false;
        s.lastOrder = a.payload;
      })
      .addCase(createOrder.rejected, (s, a) => {
        s.creating = false;
        s.createError = a.payload || "Error";
      });

    // detail
    builder
      .addCase(fetchOneOrder.pending, (s) => {
        s.loadingOrder = true;
        s.orderError = null;
        s.order = null;
      })
      .addCase(fetchOneOrder.fulfilled, (s, a) => {
        s.loadingOrder = false;
        s.order = a.payload;
      })
      .addCase(fetchOneOrder.rejected, (s, a) => {
        s.loadingOrder = false;
        s.orderError = a.payload || "Error";
      });

    // admin list
    builder
      .addCase(fetchAllOrders.pending, (s, a) => {
        const args = a.meta.arg as FetchArgs | undefined;
        if (args?.page) s.page = args.page;
        if (args?.perPage) s.perPage = args.perPage;
        if (args?.total) s.total = args.total;
        if (typeof args?.search === "string") s.search = args.search;
        if (args?.status) s.status = args.status;
        if (args?.order) s.orderSort = args.order;

        s.loadingOrders = true;
        s.ordersError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (s, a) => {
        const { data, meta } = a.payload;
        s.loadingOrders = false;
        s.orders = data;
        if (meta) {
          s.page    = meta.page ?? s.page;
          s.perPage = meta.limit ?? s.perPage;
          s.total   = meta.totalCount ?? s.total;
          s.meta    = meta;
        }
      })
      .addCase(fetchAllOrders.rejected, (s, a) => {
        s.loadingOrders = false;
        s.ordersError = a.payload as string || "Error";
      });

    // user list
    builder
      .addCase(fetchUserOrders.pending, (s) => {
        s.loadingUserOrders = true;
        s.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (s, a) => {
        s.loadingUserOrders = false;
        s.userOrdersList = a.payload;
      })
      .addCase(fetchUserOrders.rejected, (s, a) => {
        s.loadingUserOrders = false;
        s.userOrdersError = a.payload || "Error";
      });

    // update status (admin)
    builder
      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        const updated = a.payload;
        // met à jour le détail
        if (s.order?.id === updated.id) s.order = updated;
        // met à jour la ligne dans la liste admin si présente
        const idx = s.orders.findIndex((o) => o.id === updated.id);
        if (idx !== -1) s.orders[idx] = updated;
      });
  },
});

export const { resetAdminList } = ordersSlice.actions;
export default ordersSlice.reducer;