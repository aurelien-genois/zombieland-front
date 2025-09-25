import { useState } from "react";
import DeleteMyAccountModal from "@/components/Modals/DeleteMyAccountModal";

export default function DeleteMyAccount() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (showDeleteModal) {
    return <DeleteMyAccountModal setIsModalOpen={setShowDeleteModal} />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100svh-5rem-1.45rem)] bg-gray-50 gap-7">
      <h1 className="text-2xl font-bold">Suppression de compte</h1>
      <p>Cette action est irréversible. Vous êtes sûr de vouloir continuer ?</p>
      <button
        type="button"
        className="px-8 py-3 text-base bg-red-600 text-white rounded-lg cursor-pointer"
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
