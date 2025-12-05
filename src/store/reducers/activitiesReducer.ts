import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { IActivity } from "@/@types";
import { axiosInstance } from "@/api/axiosInstance";
import debug from "debug";

const logger = debug("app:redux");

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
      logger("DATA FROM FETCH ACTIVITIES: ", data);
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
      logger("DATA FROM FETCH ACTIVITIES: ", data);
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
      logger("DATA FROM FETCH ONE PUBLISHED ACTIVITY: ", data);
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
      logger("DATA FROM FETCH ONE ACTIVITY: ", data);
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
    params: { formData: FormData; action: "draft" | "publish" | undefined },
    { rejectWithValue }
  ) => {
    try {
      const objData = Object.fromEntries(params.formData);
      logger("objData ::>>>>", objData);

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

      const { data } = await axiosInstance.post("/activities", body);
      logger("data: CREATE ACTIVITY:", data);

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
    params: {
      formData: FormData;
      action: "draft" | "publish" | undefined;
      id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const objData = Object.fromEntries(params.formData);
      logger("objData ::>>>>", objData);

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

      const { data } = await axiosInstance.patch(
        `/activities/${params.id}`,
        body
      );
      logger("data: UPDATE ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch update activity");
    }
  }
);

export const publishActivity = createAsyncThunk(
  "activities/publish",
  async (params: { id: number; saved: boolean }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/activities/${params.id}`, {
        saved: params.saved,
      });
      logger("data: New status ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch publish activity");
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/activities/${id}`);
      logger("data: DELETE ACTIVITY:", data);

      // TODO Axios errors
      return data as IActivity;
    } catch {
      return rejectWithValue("Failed to fetch delete activity");
    }
  }
);

export const evaluateActivity = createAsyncThunk(
  "activities/evaluate",
  async (params: { id: number; formData: FormData }, { rejectWithValue }) => {
    try {
      logger("PARAMS ::>>>>", params);
      const objData = Object.fromEntries(params.formData);
      logger("objData ::>>>>", objData);

      const { data } = await axiosInstance.post(
        `/activities/${params.id}/evaluate`,
        {
          grade: Number(objData.grade),
          ...(objData.comment && { comment: objData.comment }),
        }
      );

      logger("data: EVALUATE ACTIVITY", data);

      return data as IActivity;
    } catch (error) {
      // if 404 "Activity not found"
      // if 409 "User already rates this activity"
      console.log("ERROR ERROR", error);
      return rejectWithValue("failed to evaluate activity");
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

  builder
    .addCase(evaluateActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(evaluateActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentActivity = action.payload;
    })
    .addCase(evaluateActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Evaluation failed";
    });
});

export default activitiesReducer;
