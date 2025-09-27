import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  fetchOnePublishedActivity,
  fetchPublishedActivities,
  fetchAllActivities,
} from "@/store/reducers/activitiesReducer";

export function useActivity(slug: string) {
  const dispatch = useAppDispatch();
  const { currentActivity, loading, error } = useAppSelector(
    (state) => state.activitiesStore
  );

  useEffect(() => {
    dispatch(fetchOnePublishedActivity(slug));
  }, [dispatch, slug]);

  return { currentActivity, loading, error };
}

interface IActivitiesFilters {
  perPage?: number;
  page?: number;
}

export function useActivities({ perPage, page }: IActivitiesFilters = {}) {
  const dispatch = useAppDispatch();
  const activitiesState = useAppSelector((state) => state.activitiesStore);

  useEffect(() => {
    dispatch(fetchPublishedActivities({ perPage, page }));
  }, [dispatch, perPage, page]);

  return activitiesState;
}

export function useAllActivities({ perPage, page }: IActivitiesFilters = {}) {
  const dispatch = useAppDispatch();
  const activitiesState = useAppSelector((state) => state.activitiesStore);

  useEffect(() => {
    dispatch(fetchAllActivities({ perPage, page }));
  }, [dispatch, perPage, page]);

  return activitiesState;
}
