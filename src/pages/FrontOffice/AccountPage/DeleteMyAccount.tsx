import { useState } from "react";
import DeleteMyAccountModal from "@/components/Modals/DeleteMyAccountModal";

export default function DeleteMyAccount() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (showDeleteModal) {
    return <DeleteMyAccountModal setIsModalOpen={setShowDeleteModal} />;
  }
  return (
    <div className="mt-10 flex flex-col items-center justify-center min-h-[calc(100svh-5rem-1.45rem) gap-7">
      <h1 className="text-2xl font-bold">Suppression de compte</h1>
      <p className="text-lg">Cette action est irréversible. Vous êtes sûr de vouloir continuer ?</p>
      <button
        type="button"
        className="px-8 py-3 text-lg bg-red-600 text-white-bg font-bold rounded-lg cursor-pointer"
        onClick={() => setShowDeleteModal(true)}
      >
        Suppression du compte
      </button>

      {/* ✅ Modal conditionnelle EN PLUS du contenu, pas À LA PLACE */}
      {showDeleteModal && (
        <DeleteMyAccountModal setIsModalOpen={setShowDeleteModal} />
      )}
    </div>
  );
}
