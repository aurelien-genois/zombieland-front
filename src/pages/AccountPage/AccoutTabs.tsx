export default function AccountTabs({activeTab, setActiveTab}) {
  return(
    <>
      <div className="flex justify-center text-center">
          <button onClick={() => setActiveTab("infos")} className={`w-70 mb-5 text-center text-2xl sm:text-xl
            ${activeTab === "infos" ? "border-b-2 border-red-500 font-bold" : "cursor-pointer"}`}>Informations personnelles</button>
          <button onClick={() => setActiveTab("orders")} className={`w-70 mb-5 text-2xl sm:text-xl
            ${activeTab === "orders" ? "border-b-2 border-red-500 font-bold" : "cursor-pointer"}`}>Historique des commandes</button>
      </div>
    </>
  )
}