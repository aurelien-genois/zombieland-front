import { useNavigate, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useState, type FormEvent } from "react";
import { login } from "../../store/reducers/userReducer";
import EmailConfirmationModal from "../../components/Modals/EmailConfirmationModal";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuth } = useAppSelector((s) => s.userStore);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  console.log("LOADING:", loading);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    const { email = "", password = "" } = Object.fromEntries(formData) as {
      email?: string;
      password?: string;
    };

    setFormError(null);

    if (!email.trim()) {
      setFormError("Email requis");
      return;
    }
    if (!email.includes("@")) {
      setFormError("Format d'email invalide");
      return;
    }
    if (!password) {
      setFormError("Mot de passe requis");
      return;
    }
    if (password.length < 10) {
      setFormError("Le mot de passe doit contenir au moins 10 caractères");
      return;
    }

    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate("/"); // TODO: remplacer par la page d'accueil
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100svh-5rem-1.45rem)] bg-gray-50">
      <div className="bg-zinc-00 p-8 rounded shadow-md w-full max-w-md text-center border border-slate-600">
        <div className="text-2xl font-bold mb-6 underline">Connexion</div>

        {isAuth && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Connexion réussie !
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-4 w-full max-w-md"
          noValidate
        >
          <div className="text-left">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded w-full"
              disabled={loading}
            />
          </div>

          <div className="text-left">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded w-full"
              disabled={loading}
            />
          </div>
          {formError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-left">
              <strong>Erreur :</strong> {formError}
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-left">
              <strong>Erreur :</strong> {error}
            </div>
          )}

          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>

        <div className="mt-4">
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setShowForgotPasswordModal(true);
            }}
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="mt-2">
          <Link
            to="/resend-email-confirmation"
            className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmationModal(true);
            }}
          >
            Confirmation email
          </Link>
        </div>
      </div>

      {showConfirmationModal && (
        <EmailConfirmationModal setIsModalOpen={setShowConfirmationModal} />
      )}
      {showForgotPasswordModal && (
        <ForgotPasswordModal setIsModalOpen={setShowForgotPasswordModal} />
      )}
    </div>
  );
}
