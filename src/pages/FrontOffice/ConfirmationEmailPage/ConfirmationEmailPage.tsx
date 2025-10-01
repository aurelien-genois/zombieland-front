import { Link } from "react-router";

export default function ConfirmationEmailPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" text-center text-3xl font-bold underline py-8 text-white">
          Bienvenue
        </h1>
        <div>
          <p className="text-white text-center">
            Vous avez bien confirmé votre adresse mail.
          </p>
          <Link
            to="/"
            className="text-blue-500 underline text-center block mt-4"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  );
}
