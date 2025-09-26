import { Route, Routes } from "react-router";
import Dashboard from "@/pages/BackOffice/_Dashboard/Dashboard";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import UsersManagement from "@/pages/BackOffice/UsersManagement/UsersManagment";
import ActivitiesManagement from "@/pages/BackOffice/ActivitiesManagement/ActivitiesManagement";
import ActivitiesManagementCreation from "@/pages/BackOffice/ActivitiesManagement/ActivitiesCreation";

export default function LayoutBack() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Main>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="management/users" element={<UsersManagement />} />
            <Route
              path="management/activities"
              element={<ActivitiesManagement />}
            />
            <Route
              path="management/activities/create"
              element={<ActivitiesManagementCreation />}
            />
          </Routes>
        </Main>
        <Footer />
      </div>
    </div>
  );
}
