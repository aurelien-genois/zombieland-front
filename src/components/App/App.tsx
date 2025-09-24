import { Route, Routes } from "react-router";
import "./App.css";
import LayoutFront from "../Layout/LayoutFront";
import LayoutBack from "../Layout/LayoutBack";
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { fetchMe } from "../../store/reducers/authReducer";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
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
