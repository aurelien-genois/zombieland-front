import { Route, Routes } from "react-router";
import "./App.css";
import LayoutFront from "@/components/Layout/FrontOffice/LayoutFront";
import LayoutBack from "@/components/Layout/BackOffice/LayoutBack";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { getUserInfo } from "@/store/reducers/userReducer";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="App ">
      <Routes>
        <Route path="/admin/*" element={<LayoutBack />} />
        <Route path="*" element={<LayoutFront />} />
      </Routes>
    </div>
  );
}
