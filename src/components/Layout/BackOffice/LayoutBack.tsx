import { Route, Routes } from "react-router";
import Dashboard from "@/pages/BackOffice/_Dashboard/Dashboard";
import SideBar from "./SideBar/SideBar";
import Footer from "./Fonter/Footer";
import Main from "./Main/Main";
import UsersManagement from "@/pages/BackOffice/UsersManagement/UsersManagment";
export default function LayoutBack() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Main>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="users" element={<UsersManagement />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </div>
  );
}
