import { Route, Routes } from "react-router";
import FooterFront from "../Footer/FooterFront";
import HeaderFront from "../Header/HeaderFront";
import HomePage from "../../pages/HomePage/HomePage";

export default function LayoutFront() {
  return (
    <>
      <HeaderFront />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      <FooterFront />
    </>
  )
}