import { useState } from "react";
import AccountTabs from "./AccountTabs";
import InfosUpdate from "./InfosUpdate";
import PasswordUpdate from "./PasswordUpdate";
import OrdersHistory from "./OrdersHistory";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("infos");

  function updateActiveTab(tab: string): void {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="bg-gray-300">
        <h1 className="text-center font-bold text-3xl pt-10 pb-8">
          Mon compte
        </h1>
        <AccountTabs activeTab={activeTab} updateActiveTab={setActiveTab} />
        {activeTab === "infos" && <InfosUpdate />}
        {activeTab === "password" && <PasswordUpdate />}
        {activeTab === "orders" && <OrdersHistory />}
      </div>
    </>
  );
}
