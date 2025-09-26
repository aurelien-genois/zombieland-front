interface AccountTabsProps {
  activeTab: string;
  updateActiveTab: (tab: string) => void;
}

export default function AccountTabs({
  activeTab,
  updateActiveTab,
}: AccountTabsProps) {
  return (
    <>
      <div className="flex justify-center text-center flex-col sm:flex-row ">
        <button
          onClick={() => updateActiveTab("infos")}
          className={`mx-auto w-70 mb-5 text-center text-2xl sm:text-xl
            ${
              activeTab === "infos"
                ? "border-b-2 border-red-500 font-bold"
                : "cursor-pointer"
            }`}
        >
          Informations
        </button>
        <button
          onClick={() => updateActiveTab("password")}
          className={`mx-auto w-70 mb-5 text-center text-2xl sm:text-xl
            ${
              activeTab === "password"
                ? "border-b-2 border-red-500 font-bold"
                : "cursor-pointer"
            }`}
        >
          Mot de Passe
        </button>
        <button
          onClick={() => updateActiveTab("orders")}
          className={`mx-auto w-70 mb-5 text-2xl sm:text-xl
            ${
              activeTab === "orders"
                ? "border-b-2 border-red-500 font-bold"
                : "cursor-pointer"
            }`}
        >
          Commandes
        </button>
        <button
          onClick={() => updateActiveTab("delete")}
          className={`mx-auto w-70 mb-5 text-2xl sm:text-xl
            ${
              activeTab === "delete"
                ? "border-b-2 border-red-500 font-bold"
                : "cursor-pointer"
            }`}
        >
          Supprimer mon compte
        </button>
      </div>
    </>
  );
}
