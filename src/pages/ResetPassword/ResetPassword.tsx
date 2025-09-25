import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { resetPassword } from "../../store/reducers/authReducer";
import { useNavigate, useSearchParams } from "react-router";

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.authStore);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newPassword = formData.get("newPassword") as string;
    const confirmation = formData.get("confirmation") as string;
    console.log("Form Data:", { newPassword, confirmation });

    // Récupérer le token depuis les paramètres de l'URL
    const token = searchParams.get("token");
    console.log("Token from URL:", token);

    if (!token) {
      console.error("Token manquant dans l'URL");
      return;
    }

    if (!regex.test(newPassword)) {
      console.error(
        "Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    // Validation basique
    if (!newPassword || !confirmation) {
      console.error("Tous les champs sont requis");
      return;
    }

    if (newPassword !== confirmation) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    // Préparer les données pour l'API
    const resetData = {
      newPassword,
      confirmation,
    };

    // Dispatch avec la structure correcte
    const result = dispatch(resetPassword({ token, formData: resetData }));
    if (resetPassword.fulfilled.match(result)) {
      navigate("/login"); // TODO: remplacer par la page d'accueil
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100svh-5rem-1.45rem)] bg-gray-50">
      <div className="bg-zinc-00 p-8 rounded shadow-md w-full max-w-md text-center border border-slate-600">
        <div className="text-2xl font-bold mb-6 underline">
          Réinitialisation du mot de passe
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-4 w-full max-w-md"
          noValidate
        >
          <div className="text-left">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="px-4 py-2 border border-gray-300 rounded w-full"
              disabled={loading}
            />
          </div>

          <div className="text-left">
            <input
              type="password"
              name="confirmation"
              placeholder="Confirmation"
              className="px-4 py-2 border border-gray-300 rounded w-full"
              disabled={loading}
            />
          </div>
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
            disabled={loading}
          >
            {loading
              ? "Réinitialisation en cours..."
              : "Réinitialiser le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
