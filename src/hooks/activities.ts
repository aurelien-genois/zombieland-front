import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  fetchOneActivity,
  fetchActivities,
} from "../store/reducers/activitiesReducer";

export function useActivity(slug: string) {
  const dispatch = useAppDispatch();
  const { currentActivity, loading, error } = useAppSelector(
    (state) => state.activitiesStore
  );

  useEffect(() => {
    dispatch(fetchOneActivity(slug));
  }, [dispatch, slug]);

  return { currentActivity, loading, error };
}

interface IActivitiesFilters {
  perPage?: number;
  page?: number;
}

export function useActivities({ perPage = 20, page = 1 }: IActivitiesFilters) {
  const dispatch = useAppDispatch();
  const { activities, total, loading, error } = useAppSelector(
    (state) => state.activitiesStore
  );

  useEffect(() => {
    dispatch(fetchActivities({ perPage, page }));
  }, [dispatch, perPage, page]);

  return { activities, page, perPage, total, loading, error };
}
