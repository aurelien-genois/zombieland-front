import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchOneActivity } from "../store/reducers/activitiesReducer";

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
