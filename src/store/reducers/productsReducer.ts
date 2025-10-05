import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { axiosInstance } from "@/api/axiosInstance";

export const clearProductErrors = createAction("products/clearErrors");

export type Product = { id: number; name: string; price: number; status: "draft" | "published" };

type State = {
  products: Product[];
  loadingList: boolean;
  listError: string | null;

  creating: boolean;
  createError: string | null;

  updatingId: number | null;
  updateError: string | null;

  deletingId: number | null;
  deleteError: string | null;
};

const initialState: State = {
  products: [],
  loadingList: false,
  listError: null,

  creating: false,
  createError: null,

  updatingId: null,
  updateError: null,

  deletingId: null,
  deleteError: null,
};

// ─────────────────────────────────────────────────────────────
// Helpers
function toMessage(err: unknown): string {
  const e = err as AxiosError;
  return (
    (typeof e.response?.data === "object" && (e.response?.data as any)?.error) ||
    (typeof e.response?.data === "string" ? (e.response?.data as string) : undefined) ||
    e.message ||
    "Unknown error"
  );
}

// ─────────────────────────────────────────────────────────────
// Thunks
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/products");
      return data as Product[];
    } catch (err) {
      return rejectWithValue(toMessage(err));
    }
  }
);

export const createProduct = createAsyncThunk<
  Product,
  { name: string; price: number; status?: "draft" | "published" },
  { rejectValue: string }
>("products/create", async (payload, { rejectWithValue }) => {
  try {
    // status optionnel côté back (default: published), on force si pas fourni
    const body = { status: "published", ...payload };
    const { data } = await axiosInstance.post("/products", body);
    return data as Product;
  } catch (err) {
    return rejectWithValue(toMessage(err));
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; patch: Partial<Pick<Product, "name" | "price" | "status">> },
  { rejectValue: string }
>("products/update", async ({ id, patch }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/products/${id}`, patch);
    return data as Product;
  } catch (err) {
    return rejectWithValue(toMessage(err));
  }
});

export const deleteProduct = createAsyncThunk<number, { id: number }, { rejectValue: string }>(
  "products/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(toMessage(err));
    }
  }
);

// ⚠️ Toggle status via le nouvel endpoint PATCH /products/:id/status { status }
export const toggleProductStatus = createAsyncThunk<
  Product, // on attend le produit mis à jour
  { id: number; nextStatus: "draft" | "published" },
  { rejectValue: string }
>("products/toggleStatus", async ({ id, nextStatus }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.patch(`/products/${id}`, { status: nextStatus });
    return data as Product;
  } catch (err) {
    return rejectWithValue(toMessage(err));
  }
});

// ─────────────────────────────────────────────────────────────
// Reducer
const productsReducer = createReducer(initialState, (builder) => {
  builder
    // clear errors (quand on ouvre une modale par ex.)
    .addCase(clearProductErrors, (s) => {
      s.createError = null;
      s.updateError = null;
      s.deleteError = null;
      s.listError = null;
    })

    // list
    .addCase(fetchProducts.pending, (s) => {
      s.loadingList = true;
      s.listError = null;
    })
    .addCase(fetchProducts.fulfilled, (s, a) => {
      s.loadingList = false;
      s.products = a.payload;
    })
    .addCase(fetchProducts.rejected, (s, a) => {
      s.loadingList = false;
      s.listError = a.payload || "Failed to fetch products";
    })

    // create
    .addCase(createProduct.pending, (s) => {
      s.creating = true;
      s.createError = null;
    })
    .addCase(createProduct.fulfilled, (s, a) => {
      s.creating = false;
      s.products.unshift(a.payload);
    })
    .addCase(createProduct.rejected, (s, a) => {
      s.creating = false;
      s.createError = a.payload || "Failed to create product";
    })

    // update (name/price/status générique)
    .addCase(updateProduct.pending, (s, a) => {
      s.updatingId = a.meta.arg.id;
      s.updateError = null;
    })
    .addCase(updateProduct.fulfilled, (s, a) => {
      s.updatingId = null;
      const i = s.products.findIndex((p) => p.id === a.payload.id);
      if (i >= 0) s.products[i] = a.payload;
    })
    .addCase(updateProduct.rejected, (s, a) => {
      s.updateError = a.payload || "Failed to update product";
      s.updatingId = null;
    })

    // delete
    .addCase(deleteProduct.pending, (s, a) => {
      s.deletingId = a.meta.arg.id;
      s.deleteError = null;
    })
    .addCase(deleteProduct.fulfilled, (s, a) => {
      s.deletingId = null;
      s.products = s.products.filter((p) => p.id !== a.payload);
    })
    .addCase(deleteProduct.rejected, (s, a) => {
      s.deletingId = null;
      s.deleteError = a.payload || "Failed to delete product";
    })

    // toggle status
    .addCase(toggleProductStatus.pending, (s, a) => {
      s.updatingId = a.meta.arg.id;
      s.updateError = null;
    })
    .addCase(toggleProductStatus.fulfilled, (s, a) => {
      s.updatingId = null;
      const i = s.products.findIndex((p) => p.id === a.payload.id);
      if (i >= 0) s.products[i] = a.payload;
    })
    .addCase(toggleProductStatus.rejected, (s, a) => {
      s.updateError = a.payload || "Failed to toggle product status";
      s.updatingId = null;
    });
});

export default productsReducer;
