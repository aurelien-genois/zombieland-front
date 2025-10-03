import { useAppDispatch } from "@/hooks/redux";
import ModalContainer from "./ContainerModal";
import { deleteMyAccount } from "@/store/reducers/userReducer";
import { useState } from "react";
import Button from "@/components/UI/BackOffice/Button";

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
            <Button
              color="gray"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" color="red" disabled={loading}>
              {loading ? "Suppression..." : "Supprimer"}
            </Button>
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
