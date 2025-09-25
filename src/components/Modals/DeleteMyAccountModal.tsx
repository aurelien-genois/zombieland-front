import { useAppDispatch } from "../../hooks/redux";
import ModalContainer from "./ContainerModal";
import { deleteMyAccount } from "../../store/reducers/userReducer";
import { useState } from "react";

interface DeleteMyAccountModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteMyAccountModal({ setIsModalOpen }: DeleteMyAccountModalProps) {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    try {
      await dispatch(deleteMyAccount());
      setSuccessMessage("Votre compte a été supprimé avec succès.");
    } catch {
      setSuccessMessage("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer setIsModalOpen={setIsModalOpen}>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center border border-red-600">
        <h1>êtes-vous sûr de vouloir supprimer votre compte ?</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Suppression..." : "Supprimer"}
            </button>
          </div>
          {successMessage && (
            <div className="mt-4 text-red-600">{successMessage}</div>
          )}
        </form>
      </div>
    </ModalContainer>
  );
}

export default DeleteMyAccountModal;
