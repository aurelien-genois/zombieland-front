import { Route, Routes } from "react-router";
import Dashboard from "@/pages/BackOffice/_Dashboard/Dashboard";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import UsersManagement from "@/pages/BackOffice/UsersManagement/UsersManagment";
import ActivitiesManagement from "@/pages/BackOffice/ActivitiesManagement/ActivitiesManagement";
import ActivitiesManagementCreation from "@/pages/BackOffice/ActivitiesManagement/ActivitiesCreation";
import ActivitiesManagementSingle from "@/pages/BackOffice/ActivitiesManagement/ActivitiesSingle";
import OrdersManagement from "@/pages/BackOffice/OrdersManagement/OrdersManagement";
import OrdersDetail from "@/pages/BackOffice/OrdersManagement/OrdersDetail";
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
              path="management/activities/:slug"
              element={<ActivitiesManagementSingle />}
            />
            <Route
              path="management/activities"
              element={<ActivitiesManagement />}
            />
            <Route
              path="management/activities/creation"
              element={<ActivitiesManagementCreation />}
            />
            <Route path="management/orders" element={<OrdersManagement />} />
            <Route path="management/orders/:id" element={<OrdersDetail />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </div>
  );
}
