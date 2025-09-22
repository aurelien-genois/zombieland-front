import { useAppDispatch } from "../../hooks/redux";
import ModalContainer from "./ContainerModal";
// importe bien ton thunk ou action creator
import { resendEmailConfirmation } from "../../store/reducers/userReducer";

interface EmailConfirmationModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({
  setIsModalOpen,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();

    if (!email) {
      console.error("Veuillez entrer un email.");
      return;
    }

    dispatch(resendEmailConfirmation(email));
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
};

export default EmailConfirmationModal;
