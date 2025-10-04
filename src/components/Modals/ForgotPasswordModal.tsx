import { useAppDispatch } from "@/hooks/redux";
import ModalContainer from "./ContainerModal";
import { forgotPassword } from "@/store/reducers/userReducer";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/UI/BackOffice/Button";

interface ForgotPasswordModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ForgotPasswordModal({ setIsModalOpen }: ForgotPasswordModalProps) {
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
          id="forgot-password-email"
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Entrez votre email"
          maxLength={254}
          autoComplete="email"
          aria-label="Adresse email pour réinitialisation"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {successMessage && (
          <div className="mb-4 text-sm" role="status" aria-live="polite">
            {successMessage}
          </div>
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

export default ForgotPasswordModal;
