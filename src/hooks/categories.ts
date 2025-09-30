import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchCategories } from "@/store/reducers/categoriesReducer";

export function useCategories() {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categoriesStore);

  // get all (until 100)
  useEffect(() => {
    dispatch(fetchCategories({ perPage: 100 }));
  }, [dispatch]);

  return categoriesState;
}
