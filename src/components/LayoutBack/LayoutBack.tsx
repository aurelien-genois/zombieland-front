import { Route, Routes } from "react-router";
import FooterBack from "../Footer/FooterBack";
import HeaderBack from "../Header/HeaderBack";
import Dashboard from "../../pages/Dashboard/Dashboard";
import UiKit from "../UiKit/UiKit";
export default function LayoutBack() {
  return (
    <div>
      <h1>Layout Back</h1>
      <HeaderBack />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/uikit" element={<UiKit />} />
        </Routes>
      <FooterBack />
    </div>
  )
}