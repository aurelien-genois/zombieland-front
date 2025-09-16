import { Route, Routes } from "react-router";
// import FooterBack from "../Footer/FooterBack";
// import HeaderBack from "../Header/HeaderBack";
import Dashboard from "../../pages/Dashboard/Dashboard";
import UiKit from "../UiKit/UiKit";
import UiMain from "../UiKit/UiMAin";
export default function LayoutBack() {
  return (
    <div>
      {/* <HeaderBack /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/uikit" element={<UiKit />} />
          <Route path="/uikit/main" element={<UiMain />} />
        </Routes>
      {/* <FooterBack /> */}
    </div>
  )
}