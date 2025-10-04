// Récupérer les données de l'utilisateur et les afficher dans le formulaire pour permettre les modifications
// Gérer l'affichage de cet élément en fonction du clic sur le tab

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateUserProfile } from "@/store/reducers/userReducer";

export default function InfosUpdate() {
  const { userInfo } = useAppSelector((store) => store.userStore);
  const { loading, error } = useAppSelector((state) => state.userStore);
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const formErrorId = "infos-form-error-id";
  const errorId = formError || error ? formErrorId : undefined;

  const firstnameRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    firstnameRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const {
      firstname = "",
      lastname = "",
      email = "",
      telephone = "",
      birthdate = "",
    } = Object.fromEntries(formData) as {
      firstname?: string;
      lastname?: string;
      email?: string;
      telephone?: string;
      birthdate?: string;
    };

    console.log(">>>>>Form Data:", {
      firstname,
      lastname,
      email,
      telephone,
      birthdate,
    });

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
    if (!birthdate) {
      setFormError("La date de naissance est requise");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Format d'email invalide");
      return;
    }

    setFormError(null);

    // Dispatch avec FormData pour l'update du profil
    dispatch(updateUserProfile(formData));
  };

  return (
    <>
      <div className="pt-10 pb-10 text-text-grey-menu">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="mx-auto px-5 md:max-w-200 sm:max-w-150"
        >
          <div className="grid gap-1.5 md:gap-6 mb-3 grid-cols-1 md:grid-cols-2">
            <div>
              <label
                className="block mb-0.5 text-xl md:text-base font-bold ml-1.5"
                htmlFor="firstname"
              >
                Prénom<span className="text-red-500 font-normal">*</span>
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                aria-label="Prénom"
                maxLength={50}
                aria-invalid={Boolean(formError || error)}
                aria-describedby={errorId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5"
                defaultValue={userInfo?.firstname || ""}
                placeholder="Prénom"
                disabled={loading}
                ref={firstnameRef}
                required
              />
            </div>
            <div>
              <label
                className="block mb-0.5 text-xl md:text-base font-bold ml-1.5"
                htmlFor="lastname"
              >
                Nom <span className="text-red-500 font-normal">*</span>
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                aria-label="Nom"
                maxLength={50}
                aria-invalid={Boolean(formError || error)}
                aria-describedby={errorId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5"
                defaultValue={userInfo?.lastname || ""}
                placeholder="Nom"
                disabled={loading}
                required
              />
            </div>
          </div>

          <label
            htmlFor="email"
            className="block mb-0.5 text-xl md:text-base font-bold ml-1.5"
          >
            E-mail <span className="text-red-500 font-normal">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            aria-label="Email"
            maxLength={254}
            aria-invalid={Boolean(formError || error)}
            aria-describedby={errorId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5"
            defaultValue={userInfo?.email || ""}
            placeholder="monemail@host.com"
            disabled={loading}
            required
          />
          <p className="mb-3 text-lg md:text-sm ml-2 text-gray-700">
            Vous recevrez un email de confirmation pour valider le nouvel email.
          </p>

          <label
            htmlFor="telephone"
            className="block mb-1.5 text-xl md:text-base font-bold ml-1.5"
          >
            Téléphone
          </label>
          <input
            id="telephone"
            type="tel"
            name="telephone"
            aria-label="Téléphone"
            maxLength={20}
            aria-invalid={Boolean(formError || error)}
            aria-describedby={errorId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 mb-1.5"
            defaultValue={userInfo?.phone || ""}
            placeholder="Indicatif + Téléphone"
            disabled={loading}
          />

          <label
            htmlFor="birthdate"
            className="block mb-0.5 text-xl md:text-base font-bold ml-1.5"
          >
            Date de naissance{" "}
            <span className="text-red-500 font-normal">*</span>
          </label>
          <input
            id="birthdate"
            type="date"
            lang="fr"
            name="birthdate"
            aria-label="Date de naissance"
            aria-invalid={Boolean(formError || error)}
            aria-describedby={errorId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 mb-10"
            defaultValue={
              userInfo?.birthday
                ? new Date(userInfo.birthday).toISOString().split("T")[0]
                : ""
            }
            disabled={loading}
            required
          />

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
