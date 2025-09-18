import { Route, Routes } from "react-router";
import FooterFront from "../Footer/FooterFront";
import HeaderFront from "../Header/HeaderFront";
import HomePage from "../../pages/HomePage/HomePage";
import ActivitiesPage from "../../pages/ActivitiesPage/ActivitiesPage";
import ActivityPage from "../../pages/ActivityPage/ActivityPage";

export default function LayoutFront() {
  return (
    <>
      <HeaderFront />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activity" element={<ActivityPage />} />
        </Routes>
      <FooterFront />
    </>
  )
}