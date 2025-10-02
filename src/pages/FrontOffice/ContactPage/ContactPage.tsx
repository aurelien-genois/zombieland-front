import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    setErrorMessage(null);
    console.log(jsonData);

    if (!jsonData.email || !jsonData.subject || !jsonData.description) {
      setErrorMessage("Veuillez renseigner tous les champs.");
      return;
    }

    console.log("Form Data Submitted:", jsonData);
    setSubmitted(true);
    setIsLoading(false);
  };
  return (
    <div className=" max-w-lg mx-auto p-6 bg-gray-800 rounded shadow mt-30">
      <h1 className="text-white text-2xl mb-6">Contactez-nous !</h1>
      {errorMessage && <p className="text-red-400">{errorMessage}</p>}
      {submitted ? (
        <div className="text-green-400">Merci pour votre message !</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          aria-busy={isLoading}
          noValidate
        >
          <label htmlFor="email" className="text-white">
            Email :
            <input
              id="email"
              type="email"
              name="email"
              maxLength={100}
              required
              autoComplete="email"
              className="mt-1 p-2 w-full rounded bg-gray-700 text-white"
            />
          </label>
          <label htmlFor="subject" className="text-white">
            Sujet :
            <select
              id="subject"
              name="subject"
              required
              className="mt-1 p-2 w-full rounded bg-gray-700 text-white"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="support">Support</option>
              <option value="info">Informations</option>
              <option value="autre">Autre</option>
            </select>
          </label>
          <label htmlFor="description" className="text-white">
            Description :
            <textarea
              id="description"
              name="description"
              rows={4}
              maxLength={500}
              required
              className="mt-1 p-2 w-full rounded bg-gray-700 text-white"
            />
          </label>
          {errorMessage && (
            <p className="text-red-400" role="alert">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}
