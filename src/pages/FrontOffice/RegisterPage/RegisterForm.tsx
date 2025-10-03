import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { register } from "@/store/reducers/userReducer"; // ✅ Import correct
import { useState } from "react";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.userStore);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const {
      firstname = "",
      lastname = "",
      email = "",
      password = "",
      confirmation = "",
      // phone = "",
      birthday = "",
    } = Object.fromEntries(formData) as {
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
      confirmation?: string;
      phone?: string;
      birthday?: string;
    };

    setFormError(null);

    // Validation basique
    if (!firstname.trim()) {
      setFormError("Le prénom est requis");
      return;
    }
    if (!lastname.trim()) {
      setFormError("Le nom est requis");
      return;
    }
    if (!email.trim()) {
      setFormError("L'email est requis");
      return;
    }
    if (!birthday) {
      setFormError("La date de naissance est requise");
      return;
    }
    if (!password) {
      setFormError("Le mot de passe est requis");
      return;
    }
    if (!confirmation) {
      setFormError("La confirmation du mot de passe est requise");
      return;
    }
    if (password !== confirmation) {
      setFormError("Les mots de passe ne correspondent pas");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Format d'email invalide");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{10,}$/;
    if (!passwordRegex.test(password)) {
      setFormError(
        "Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    // Dispatch avec FormData pour l'inscription
    dispatch(register(formData));
    setSuccessMessage("Veuillez valider votre email pour activer le compte.");
  };

  return (
    <div className="pb-8">
      <h1 className="text-center font-bold text-3xl pt-10 mb-3">Inscription</h1>
      <h2 className="text-center font-bold text-2xl mb-5 sm:text-xl">
        Mes informations personnelles
      </h2>
      {successMessage && (
        <div className="mb-4 p-3 font-bold bg-green-100 border border-green-400 text-green-700 rounded text-center">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto px-5 md:max-w-200 sm:max-w-150"
      >
        {/* Affichage des erreurs */}
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError || error}
          </div>
        )}

        <div className="grid gap-1.5 md:gap-6 mb-3 grid-cols-1 md:grid-cols-2">
          <div>
            <label
              className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5"
              htmlFor="firstname"
            >
              Prénom <span className="text-red-500 font-normal">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
              placeholder="Prénom"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5"
              htmlFor="lastname"
            >
              Nom <span className="text-red-500 font-normal">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
              placeholder="Nom"
              required
              disabled={loading}
            />
          </div>
        </div>

        <label
          htmlFor="email"
          className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          E-mail <span className="text-red-500 font-normal">*</span>
        </label>
        <input
          type="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
          placeholder="monemail@host.com"
          required
          disabled={loading}
        />
        <p className="mb-6 text-lg md:text-sm ml-2 text-gray-600">
          Vous recevrez un email de confirmation pour valider la création du
          compte.
        </p>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5"
          >
            Mot de passe <span className="text-red-500 font-normal">*</span>
          </label>
          <input
            type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5"
            required
            disabled={loading}
          />
          <p className="mb-2 text-lg md:text-sm ml-2 text-gray-600">
            Le mot de passe doit contenir au minimum 10 caractères dont 1
            majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
          </p>
          <label
            htmlFor="confirmation"
            className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5"
          >
            Retapez le mot de passe{" "}
            <span className="text-red-500 font-normal">*</span>
          </label>
          <input
            type="password"
            name="confirmation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-5"
            required
            disabled={loading}
          />
        </div>

        <label
          htmlFor="phone"
          className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Téléphone
        </label>
        <input
          type="tel"
          name="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-3"
          placeholder="Indicatif + Téléphone"
          disabled={loading}
        />
        <label
          htmlFor="birthdate"
          className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5"
        >
          Date de naissance <span className="text-red-500 font-normal">*</span>
        </label>
        <input
          type="date"
          name="birthday"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-7"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-50 bg-green-bg-btn hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-1 px-3 text-white font-bold border-3 text-2xl sm:text-lg border-grey-border-btn text-center block mx-auto"
        >
          {loading ? "Inscription..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
