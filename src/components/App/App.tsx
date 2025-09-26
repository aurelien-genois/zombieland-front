import { Route, Routes } from "react-router";
import "./App.css";
import LayoutFront from "../Layout/LayoutFront";
import LayoutBack from "../Layout/LayoutBack";
import { useAppDispatch } from "../../hooks/redux";
import { useEffect } from "react";
import { getUserInfo } from "../../store/reducers/userReducer";
import { getAllOrders } from "../../store/reducers/ordersReducer";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

    useEffect(() => {
      const orders = dispatch(getAllOrders());
      console.log(">>>>>>ORDERS", orders)
      
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
