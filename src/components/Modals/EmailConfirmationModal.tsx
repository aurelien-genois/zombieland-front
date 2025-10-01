import { useAppDispatch } from "@/hooks/redux";
import ModalContainer from "./ContainerModal";
// importe bien ton thunk ou action creator
import { resendEmailConfirmation } from "@/store/reducers/userReducer";
import { useState } from "react";
import Button from "@/components/UI/BackOffice/Button";

interface EmailConfirmationModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EmailConfirmationModal({
  setIsModalOpen,
}: EmailConfirmationModalProps) {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();

    if (!email) {
      setSuccessMessage("Veuillez entrer un email valide.");
      return;
    }

    try {
      await dispatch(resendEmailConfirmation(email));
      setSuccessMessage("Un lien de confirmation a été envoyé à votre email.");
    } catch (err) {
      setSuccessMessage("Une erreur est survenue. Réessayez plus tard.");
    }
  };
  return (
    <ModalContainer setIsModalOpen={setIsModalOpen}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-md w-[90%] p-6 animate-fadeIn"
      >
        <div className="text-lg font-semibold mb-4 text-gray-800">
          Confirmation d'email
        </div>

        <input
          type="email"
          name="email"
          placeholder="Entrez votre email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {successMessage && (
          <div className="mb-4 text-sm ">{successMessage}</div>
        )}

        <div className="flex justify-end gap-2">
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Annuler
          </Button>
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </ModalContainer>
  );
}

export default EmailConfirmationModal;
