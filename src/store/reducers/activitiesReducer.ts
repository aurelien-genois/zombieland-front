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
      // TODO manage params (category (id), age_group (0/1/2/3), high_intensity (bool), disabled_access (bool), limit (int), status, page (int), order (name:asc/name:desc))
      const { data } = await axiosInstance.get("/activities", {
        params: {
          ...(params.perPage
            ? { limit: params.perPage }
            : { limit: initialState.perPage }),
          ...(params.page && { page: params.page }),
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
      // TODO manage params (category (id), age_group (0/1/2/3), high_intensity (bool), disabled_access (bool), limit (int), status, page (int), order (name:asc/name:desc))
      const { data } = await axiosInstance.get("/activities/all", {
        params: {
          ...(params.perPage
            ? { limit: params.perPage }
            : { limit: initialState.perPage }),
          ...(params.page && { page: params.page }),
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
    .addCase(createActivity.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(createActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Creation failed";
    });
});

export default activitiesReducer;
