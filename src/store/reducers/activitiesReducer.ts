import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IActivity } from "@/@types";
import { axiosInstance } from "@/api/axiosInstance";
// import type { AxiosError } from "axios";

// **********************************************************************************
// ** Types & Initial State
// **********************************************************************************

interface ActivitiesState {
  activities: IActivity[];
  currentActivity?: IActivity;
  page: number;
  perPage: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export const initialState: ActivitiesState = {
  activities: [],
  currentActivity: undefined,
  page: 1,
  perPage: 9,
  total: 0,
  loading: false,
  error: null,
};

// **********************************************************************************
// ** Actions (Async & Sync)
// **********************************************************************************

interface IFetchActivitiesParams {
  perPage?: number;
  page?: number;
  order?: string;
  category_id?: number;
  age_group?: number;
  high_intensity?: boolean;
  disabled_access?: boolean;
  search?: string;
  status?: string;
}
interface IFetchActivitiesReturn {
  activities: IActivity[];
  totalActivities: number;
  perPage: number;
  page: number;
}

export const fetchPublishedActivities = createAsyncThunk(
  "activities/fetchAllPublished",
  async (params: IFetchActivitiesParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/activities", {
        params: {
          ...(params.perPage
            ? { limit: params.perPage }
            : { limit: initialState.perPage }),
          ...(params.page && { page: params.page }),
          ...(params.category_id && { category: params.category_id }),
          ...(params.age_group !== undefined && {
            age_group: params.age_group,
          }),
          ...(params.high_intensity !== undefined && {
            high_intensity: params.high_intensity ? "true" : "false",
          }),
          ...(params.disabled_access !== undefined && {
            disabled_access: params.disabled_access ? "true" : "false",
          }),
          ...(params.order && { order: params.order }),
          ...(params.search && { search: params.search }),
        },
      });
      console.log("DATA FROM FETCH ACTIVITIES: ", data);
      // TODO Axios errors
      return {
        ...data,
        perPage: params.perPage || initialState.perPage,
        page: params.page || initialState.page,
      } as IFetchActivitiesReturn;
    } catch {
      return rejectWithValue("Failed to fetch activities");
    }
  }
);

export const fetchAllActivities = createAsyncThunk(
  "activities/fetchAll",
  async (params: IFetchActivitiesParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/activities/all", {
        params: {
          ...(params.perPage
            ? { limit: params.perPage }
            : { limit: initialState.perPage }),
          ...(params.page && { page: params.page }),
          ...(params.category_id && { category: params.category_id }),
          ...(params.age_group !== undefined && {
            age_group: params.age_group,
          }),
          ...(params.high_intensity !== undefined && {
            high_intensity: params.high_intensity ? "true" : "false",
          }),
          ...(params.disabled_access !== undefined && {
            disabled_access: params.disabled_access ? "true" : "false",
          }),
          ...(params.order && { order: params.order }),
          ...(params.status && { status: params.status }),
          ...(params.search && { search: params.search }),
        },
      });
      console.log("DATA FROM FETCH ACTIVITIES: ", data);
      // TODO Axios errors
      return {
        ...data,
        perPage: params.perPage || initialState.perPage,
        page: params.page || initialState.page,
      } as IFetchActivitiesReturn;
    } catch {
      return rejectWithValue("Failed to fetch activities");
    }
  }
);

export const fetchOnePublishedActivity = createAsyncThunk(
  "activities/fetchOnePublished",
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/activities/${slug}`, {
        params: {},
      });
      console.log("DATA FROM FETCH ONE PUBLISHED ACTIVITY: ", data);
      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch one published activity");
    }
  }
);

export const fetchOneActivity = createAsyncThunk(
  "activities/fetchOne",
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/activities/all/${slug}`, {
        params: {},
      });
      console.log("DATA FROM FETCH ONE ACTIVITY: ", data);
      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch one activity");
    }
  }
);

export const createActivity = createAsyncThunk(
  "activities/create",
  async (
    params: { formData: FormData; action: "draft" | "publish" },
    { rejectWithValue }
  ) => {
    try {
      const objData = Object.fromEntries(params.formData);
      console.log("objData ::>>>>", objData);

      const body = {
        name: objData.name,
        slogan: objData.slogan,
        description: objData.description,
        age_group: Number(objData.age_group),
        duration: objData.duration,
        disabled_access: objData.disabled_access === "on",
        high_intensity: objData.high_intensity === "on",
        image_url: objData.image_url,
        category_id: Number(objData.category_id),
        saved: params.action === "publish",
      };
      console.log("body ::>>>>", body);

      const { data } = await axiosInstance.post("/activities", body);
      console.log("data :CREATE ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch create activity");
    }
  }
);

export const updateActivity = createAsyncThunk(
  "activities/update",
  async (
    params: { formData: FormData; action: "draft" | "publish"; id: number },
    { rejectWithValue }
  ) => {
    try {
      const objData = Object.fromEntries(params.formData);
      console.log("objData ::>>>>", objData);

      const body = {
        name: objData.name,
        slogan: objData.slogan,
        description: objData.description,
        age_group: Number(objData.age_group),
        duration: objData.duration,
        disabled_access: objData.disabled_access === "on",
        high_intensity: objData.high_intensity === "on",
        image_url: objData.image_url,
        category_id: Number(objData.category_id),
        saved: params.action === "publish",
      };
      console.log("body ::>>>>", body);

      const { data } = await axiosInstance.patch(
        `/activities/${params.id}`,
        body
      );
      console.log("data :UPDATE ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch update activity");
    }
  }
);

export const publishActivity = createAsyncThunk(
  "activities/publish",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/activities/${id}/publish`);
      console.log("data :Publish ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch publish activity");
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (category_id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/activities/${category_id}`);
      console.log("data :DELETE ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch delete activity");
    }
  }
);

// **********************************************************************************
// ** Reducer & Associated Cases
// **********************************************************************************

const activitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPublishedActivities.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPublishedActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.activities = action.payload.activities;
      state.total = action.payload.totalActivities;
      state.perPage = action.payload.perPage;
      state.page = action.payload.page;
    })
    .addCase(fetchPublishedActivities.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch activities";
    });

  builder
    .addCase(fetchAllActivities.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.activities = action.payload.activities;
      state.total = action.payload.totalActivities;
      state.perPage = action.payload.perPage;
      state.page = action.payload.page;
    })
    .addCase(fetchAllActivities.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch activities";
    });

  builder
    .addCase(fetchOneActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOneActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = action.payload;
    })
    .addCase(fetchOneActivity.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) || "Failed to fetch one activity";
    });

  builder
    .addCase(fetchOnePublishedActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOnePublishedActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = action.payload;
    })
    .addCase(fetchOnePublishedActivity.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) || "Failed to fetch one published activity";
    });

  builder
    .addCase(createActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = action.payload;
    })
    .addCase(createActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Creation failed";
    });

  builder
    .addCase(updateActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = action.payload;
    })
    .addCase(updateActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Update failed";
    });

  builder
    .addCase(publishActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(publishActivity.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(publishActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Publish failed";
    });

  builder
    .addCase(deleteActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteActivity.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = undefined;
    })
    .addCase(deleteActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Deletion failed";
    });
});

export default activitiesReducer;
