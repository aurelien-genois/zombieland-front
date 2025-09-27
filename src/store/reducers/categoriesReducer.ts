import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { ICategory } from "@/@types";
import { axiosInstance } from "@/api/axiosInstance";
// import type { AxiosError } from "axios";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface CategoriesState {
  categories: ICategory[];
  currentCategory?: ICategory;
  page: number;
  perPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export const initialState: CategoriesState = {
  categories: [],
  currentCategory: undefined,
  page: 1,
  perPage: 20,
  total: 0,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/categories", {
        params: {},
      });
      console.log("DATA FROM FETCH CATEGORIES: ", data);
      // TODO Axios errors
      return data as {
        items: ICategory[];
        totalFound: number;
      };
    } catch {
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

export const fetchOneCategory = createAsyncThunk(
  "categories/fetchOne",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/categories/${id}`, {
        params: {},
      });
      console.log("DATA FROM FETCH ONE CATEGORY: ", data);
      // TODO Axios errors
      return data as ICategory;
    } catch {
      return rejectWithValue("Failed to fetch one category");
    }
  }
);

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

const activitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.categories = action.payload.items;
      state.total = action.payload.totalFound;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch activities";
    });

  builder
    .addCase(fetchOneCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOneCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentCategory = action.payload;
    })
    .addCase(fetchOneCategory.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) || "Failed to fetch one category";
    });
});

export default activitiesReducer;
