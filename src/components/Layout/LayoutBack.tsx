import { Route, Routes } from "react-router";
// import FooterBack from "../Footer/FooterBack";
// import HeaderBack from "../Header/HeaderBack";
import Dashboard from "../../pages/Dashboard/Dashboard";
export default function LayoutBack() {
  return (
    <div>    
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </div>
  )
}