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
  perPage: 50,
  total: 0,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (params: { page?: number; perPage?: number }, { rejectWithValue }) => {
    try {
      const page = params.page ? params.page : initialState.page;
      const perPage = params.perPage ? params.perPage : initialState.perPage;

      const { data } = await axiosInstance.get("/categories", {
        params: {
          limit: perPage,
          offset: (page - 1) * perPage,
          orderBy: "name:asc",
        },
      });
      console.log("DATA FROM FETCH CATEGORIES: ", data);
      // TODO Axios errors
      return {
        ...data,
        perPage: perPage,
        page: page,
      } as {
        items: ICategory[];
        totalFound: number;
        perPage: number;
        page: number;
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

export const createCategory = createAsyncThunk(
  "categories/create",
  async (params: { formData: FormData }, { rejectWithValue }) => {
    try {
      const objData = Object.fromEntries(params.formData);
      console.log("objData ::>>>>", objData);

      const body = {
        name: objData.name,
        color: objData.color,
      };

      const { data } = await axiosInstance.post("/categories", body);
      console.log("data: CREATE CATEGORY:", data);

      // TODO Axios errors
      return data as ICategory;
    } catch {
      return rejectWithValue("Failed to fetch create category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (params: { formData: FormData; id: number }, { rejectWithValue }) => {
    try {
      const objData = Object.fromEntries(params.formData);
      console.log("objData ::>>>>", objData);

      const body = {
        name: objData.name,
        color: objData.color,
      };

      const { data } = await axiosInstance.patch(
        `/categories/${params.id}`,
        body
      );
      console.log("data: UPDATE CATEGORY:", data);

      // TODO Axios errors
      return data as ICategory;
    } catch {
      return rejectWithValue("Failed to fetch update category");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/categories/${id}`);
      console.log("DATA FROM DELETE CATEGORY: ", data);

      // TODO Axios errors
      return data as ICategory;
    } catch {
      return rejectWithValue("Failed to delete category");
    }
  }
);

// patch /categories/:id (body name: string max(3 / color string Hexa)

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
      state.perPage = action.payload.perPage;
      state.page = action.payload.page;
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

  builder
    .addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createCategory.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Creation failed";
    });

  builder
    .addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCategory.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Update failed";
    });

  builder
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteCategory.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.currentCategory = undefined;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Deletion failed";
    });
});

export default activitiesReducer;
