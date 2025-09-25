import { Route, Routes } from "react-router";
// import FooterBack from "../Footer/FooterBack";
// import HeaderBack from "../Header/HeaderBack";
import Dashboard from "../../../pages/BackOffice/_Dashboard/Dashboard";
export default function LayoutBack() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
