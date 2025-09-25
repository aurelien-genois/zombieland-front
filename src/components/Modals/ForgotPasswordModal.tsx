import { useAppDispatch } from "../../hooks/redux";
import ModalContainer from "./ContainerModal";
import { forgotPassword } from "../../store/reducers/userReducer";
import { useState } from "react";

interface ForgotPasswordModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ForgotPasswordModal({ setIsModalOpen }: ForgotPasswordModalProps) {
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
      await dispatch(forgotPassword(email));
      setSuccessMessage(
        "Un lien de réinitialisation a été envoyé à votre email."
      );
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
          Mot de passe oublié ?
        </div>

        <input
          type="email"
          name="email"
          placeholder="Entrez votre email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {successMessage && <div className="mb-4 text-sm">{successMessage}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Envoyer
          </button>
        </div>
      </form>
    </ModalContainer>
  );
}

export default ForgotPasswordModal;
