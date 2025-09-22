import { useNavigate, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type { FormEvent } from "react";
import { login } from "../../store/reducers/userReducer";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuth } = useAppSelector((state) => state.userStore);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Convertit les valeurs du formulaire en FormData
    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();

    console.log("email, password ::", email, password);

    if (!email || !password) {
      console.error("Form invalide");
      return;
    }

    try {
      const result = await dispatch(login(formData));
      if (login.fulfilled.match(result)) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-2xl font-bold mb-6">Connexion</div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Erreur:</strong> {error}
        </div>
      )}

      {isAuth && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Connexion réussie!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 w-full max-w-md"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-4 py-2 border border-gray-300 rounded"
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-4 py-2 border border-gray-300 rounded"
          required
          disabled={loading}
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Connexion en cours..." : "Connexion"}
        </button>
      </form>
      <div className="mt-4">
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>
      <div className="mt-4">
        <Link
          to="/register-confirmation"
          className="text-blue-500 hover:underline"
        >
          Confirmation email
        </Link>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
