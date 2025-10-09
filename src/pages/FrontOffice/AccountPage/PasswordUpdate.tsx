// Récupérer les données de l'utilisateur et les afficher dans le formulaire pour permettre les modifications
// Gérer l'affichage de cet élément en fonction du clic sur le tab

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changePassword } from "@/store/reducers/userReducer";
import { useLocation } from "react-router";

export default function PasswordUpdate() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.userStore);
  const [formError, setFormError] = useState<string | null>(null);

  const formErrorId = "password-form-error-id";
  const errorId = formError || error ? formErrorId : undefined;

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  useEffect(() => {
    passwordRef.current?.focus();
  }, [location.pathname]);

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const {
      oldPassword = "",
      newPassword = "",
      confirmation = "",
    } = Object.fromEntries(formData) as {
      oldPassword?: string;
      newPassword?: string;
      confirmation?: string;
    };

    console.log("Form Data:", { oldPassword, newPassword, confirmation });

    if (!oldPassword) {
      setFormError("Ancien mot de passe requis");
      return;
    }
    if (!newPassword) {
      setFormError("Nouveau mot de passe requis");
      return;
    }

    if (!regexPassword.test(newPassword)) {
      setFormError(
        "Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
      return;
    }
    if (!confirmation) {
      setFormError("Confirmation du mot de passe requise");
      return;
    }
    if (newPassword !== confirmation) {
      setFormError("Les mots de passe ne correspondent pas");
      return;
    }

    const changePasswordData = {
      oldPassword,
      newPassword,
      confirmation,
    };

    console.log("Change Password Data:", changePasswordData);

    setFormError(null);

    dispatch(changePassword({ formData: changePasswordData }));
  };

  return (
    <>
      <div className="pt-10 pb-10">
        <form
          method="patch"
          onSubmit={handleSubmit}
          className="mx-auto px-5 md:max-w-150 sm:max-w-150"
        >
          <div className="grid gap-1.5 md:gap-6 mb-3 grid-cols-1">
            <div className="mb-6">
              <label
                htmlFor="oldPassword"
                className="block mb-0.5 text-xl md:text-base font-bold ml-1.5"
              >
                Ancien mot de passe{" "}
                <span className="text-red-500 font-normal">*</span>
              </label>
              <input
                id="oldPassword"
                type="password"
                name="oldPassword"
                ref={passwordRef}
                aria-label="Ancien mot de passe"
                maxLength={128}
                aria-invalid={Boolean(formError || error)}
                aria-describedby={errorId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5"
                required
              />
              <p className="mb-1.5 text-lg md:text-sm ml-2 text-gray-700">
                Le mot de passe doit contenir au minimum 10 caractères dont 1
                majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
              </p>

              <label
                htmlFor="newPassword"
                className="block mb-1.5 text-xl md:text-base font-bold ml-1.5"
              >
                Nouveau mot de passe{" "}
                <span className="text-red-500 font-normal">*</span>
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                aria-label="Nouveau mot de passe"
                maxLength={128}
                aria-invalid={Boolean(formError || error)}
                aria-describedby={errorId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 mb-1.5"
                required
              />

              <label
                htmlFor="confirmation"
                className="block mb-0.5 text-xl md:text-base font-bold ml-1.5"
              >
                Retapez le nouveau mot de passe{" "}
                <span className="text-red-500 font-normal">*</span>
              </label>
              <input
                id="confirmation"
                type="password"
                name="confirmation"
                aria-label="Confirmation du nouveau mot de passe"
                maxLength={128}
                aria-invalid={Boolean(formError || error)}
                aria-describedby={errorId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 pb-10"
                required
              />
            </div>
          </div>

          {formError && (
            <div
              id={formErrorId}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center"
            >
              <strong>Erreur :</strong> {formError}
            </div>
          )}
          {error && !formError && (
            <div
              id={formErrorId}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center"
            >
              <strong>Erreur :</strong> {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-50 rounded-xl py-1 px-3 text-white hover:text-dark-blue-buttons font-bold text-2xl sm:text-lg text-center block mx-auto ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-dark-blue-buttons hover:bg-white-bg"
            }`}
            disabled={loading}
          >
            {loading ? "Modification en cours..." : "Modifier"}
          </button>
        </form>
      </div>
    </>
  );
}
