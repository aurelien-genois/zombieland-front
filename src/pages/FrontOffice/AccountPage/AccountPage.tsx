import { useState } from "react";
import { useLocation } from "react-router";
import AccountTabs from "./AccountTabs";
import InfosUpdate from "./InfosUpdate";
import PasswordUpdate from "./PasswordUpdate";
import OrdersHistory from "./OrdersHistory";
import DeleteMyAccount from "./DeleteMyAccount";

export default function AccountPage() {
  const location = useLocation();
  const initialTab = location.state?.tab || "infos";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <>
      <div className="text-grey-menu">
        <h1 className="text-center font-bold text-3xl pt-10 pb-8">
          Mon compte
        </h1>
        <AccountTabs activeTab={activeTab} updateActiveTab={setActiveTab} />
        {activeTab === "infos" && <InfosUpdate />}
        {activeTab === "password" && <PasswordUpdate />}
        {activeTab === "orders" && <OrdersHistory />}
        {activeTab === "delete" && <DeleteMyAccount />}
      </div>
    </>
  );
}