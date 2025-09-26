import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import LayoutFront from "@/components/Layout/FrontOffice/LayoutFront";
import LayoutBack from "@/components/Layout/BackOffice/LayoutBack";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getUserInfo } from "@/store/reducers/userReducer";

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuth, userInfo, loading, error } = useAppSelector(
    (store) => store.userStore
  );

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="App ">
      <Routes>
        <Route
          path="/admin/*"
          element={
            loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error</p>
            ) : isAuth && userInfo?.role.name === "admin" ? (
              <LayoutBack />
            ) : (
              <p>Access denied</p>
              // <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<LayoutFront />} />
      </Routes>
    </div>
  );
}
