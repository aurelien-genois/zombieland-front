import { axiosInstance } from "@/api/axiosInstance";
import { useState, useRef, useEffect, type FormEvent } from "react";

export default function ContactPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // focus automatique sur le champ email
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
    <div className="bg-zinc-00 p-8 rounded shadow-md w-full max-w-md text-center border border-slate-600 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 underline">
        Contactez-nous&nbsp;!
      </h1>

      {/* Message global d'erreur annoncé immédiatement */}
      {errorMessage && (
        <p
          id={formErrorId}
          className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-left"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Message de succès annoncé poliment */}
      {submitted ? (
        <div
          className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-left"
          role="status"
          aria-live="polite"
        >
          Merci pour votre message&nbsp;!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-4 w-full max-w-md"
          aria-busy={isLoading}
          noValidate
        >
          {/* Zone de statut discrète pour l'état de chargement */}
          {isLoading && (
            <div role="status" aria-live="polite" className="sr-only">
              Envoi en cours…
            </div>
          )}

          <label htmlFor="email" className="text-left">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 mb-1.5"
            ref={emailRef}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorId}
          />

          <label htmlFor="subject" className="text-left">
            Sujet :
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 mb-1.5"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorId}
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="info">Information générale</option>
            <option value="sav">SAV</option>
            <option value="support">Support technique</option>
            <option value="autre">Autre</option>
          </select>

          <label htmlFor="description" className="text-white">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-base md:text-base rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 mb-1.5"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorId}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`font-bold text-white w-50 rounded-xl py-1 px-3 text-2xl sm:text-lg text-center block mx-auto ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-dark-blue-buttons hover:bg-blue-700"
            }`}
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}
