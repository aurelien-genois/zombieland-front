import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { fetchCategories } from "@/store/reducers/categoriesReducer";

export function useCategories() {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categoriesStore);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return categoriesState;
}
