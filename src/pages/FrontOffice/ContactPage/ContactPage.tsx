import { axiosInstance } from "@/api/axiosInstance";
import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries()) as {
      email?: string;
      subject?: string;
      description?: string;
    };

    // Validation minimale + focus sur le premier champ manquant
    if (!jsonData.email || !jsonData.subject || !jsonData.description) {
      setErrorMessage("Veuillez renseigner tous les champs.");
      // remet l'état de chargement correctement
      setIsLoading(false);

      // focus intelligent
      if (!jsonData.email) {
        (form.querySelector("#email") as HTMLInputElement | null)?.focus();
      } else if (!jsonData.subject) {
        (form.querySelector("#subject") as HTMLSelectElement | null)?.focus();
      } else {
        (
          form.querySelector("#description") as HTMLTextAreaElement | null
        )?.focus();
      }
      return;
    }

    try {
      await axiosInstance.post("/administration/contact", jsonData);
      setSubmitted(true);
    } catch {
      setErrorMessage("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const formErrorId = "form-error-id";
  // Quand un message d'erreur global existe, on le relie aux champs via cet id
  const errorId = errorMessage ? formErrorId : undefined;

  return (
    <div className="max-w-lg mx-auto p-6 rounded shadow mt-20 text-grey-menu border border-slate-600">
      <h1 className="text-grey-menu text-2xl font-semibold mb-6">Contactez-nous&nbsp;!</h1>

      {/* Message global d'erreur annoncé immédiatement */}
      {errorMessage && (
        <p id={formErrorId} className="text-red-400 mb-2" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Message de succès annoncé poliment */}
      {submitted ? (
        <div className="text-green-400" role="status" aria-live="polite">
          Merci pour votre message&nbsp;!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          aria-busy={isLoading}
          noValidate
        >
          {/* Zone de statut discrète pour l'état de chargement */}
          {isLoading && (
            <div role="status" aria-live="polite" className="sr-only">
              Envoi en cours…
            </div>
          )}

          <label htmlFor="email" className="text-grey-menu">
            Email :
          </label>
          <input
            id="email"
            type="email"
            name="email"
            maxLength={254}
            required
            autoComplete="email"
            inputMode="email"
            className="mt-1 p-2 w-full rounded bg-gray-300 text-grey-menu"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorId}
          />

          <label htmlFor="subject" className="text-grey-menu">
            Sujet :
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="mt-1 p-2 w-full rounded bg-gray-300 text-grey-menu"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorId}
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="info">Information générale</option>
            <option value="sav">SAV</option>
            <option value="support">Support technique</option>
            <option value="autre">Autre</option>
          </select>

          <label htmlFor="description" className="text-grey-menu">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            required
            className="mt-1 p-2 w-full rounded bg-gray-300 text-grey-menu"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorId}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-dark-blue-buttons text-white py-2 px-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-60"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}
