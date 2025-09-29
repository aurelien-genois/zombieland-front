import { Route, Routes } from "react-router";
import "./App.css";
import LayoutFront from "@/components/Layout/FrontOffice/LayoutFront";
import LayoutBack from "@/components/Layout/BackOffice/LayoutBack";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/store/reducers/userReducer";

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuth, userInfo, loading, error } = useAppSelector(
    (store) => store.userStore
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(getUserInfo());
      } catch (error) {
        console.log("Authentication failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="App">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

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
            )
          }
        />
        <Route path="*" element={<LayoutFront />} />
      </Routes>
    </div>
  );
}
