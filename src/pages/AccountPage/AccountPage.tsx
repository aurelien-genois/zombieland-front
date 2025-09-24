import { useState } from "react";
import AccountTabs from "./AccoutTabs";
import InfosUpdate from "./InfosUpdate";
import OrdersHistory from "./OrdersHistory";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("infos");

  function updateActiveTab(tab: string): void {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="bg-gray-300 pt-16 sm:pt-20  min-h-[calc(100svh-5rem-1.45rem)]">
        <h1 className="text-center font-bold text-3xl pt-10 pb-8">
          Mon compte
        </h1>
        <AccountTabs activeTab={activeTab} updateActiveTab={updateActiveTab} />
        {activeTab === "infos" && <InfosUpdate />}
        {activeTab === "orders" && <OrdersHistory />}
      </div>
    </>
  );
}
