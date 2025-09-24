import { useState } from "react";
import AccountTabs from "./AccoutTabs";
import InfosUpdate from "./InfosUpdate";
import OrdersHistory from "./OrdersHistory";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("infos");

  return(
    <>
      <div className='bg-gray-300' >
        <h1 className="text-center font-bold text-3xl pt-10 pb-8">Mon compte</h1>
        <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        {activeTab === "infos" && <InfosUpdate />}
        {activeTab === "orders" && <OrdersHistory />}
      </div>
    </>
  )
}