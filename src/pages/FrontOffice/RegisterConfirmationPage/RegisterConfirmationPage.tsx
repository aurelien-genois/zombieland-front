export default function RegisterConfirmationPage() {
  return (
    <>
      <div className="pt-16 sm:pt-20 min-h-[calc(100svh-5rem-1.45rem)] px-4">
        <div className="max-w-200 mx-auto">
          <div className="flex items-center justify-center ">
            <span
              aria-hidden
              className="flex mt-3 size-12 bg-green-800 rounded-full shrink-0
              [mask:url(@/assets/icon/check.svg)_no-repeat_center/60%] mb-4 sm:mb-0 sm:mr-4"
            />
            <h1 className="text-center font-bold text-2xl sm:text-3xl pt-6 sm:pt-10 mb-7">
              Votre compte a été créé !
            </h1>
          </div>
          <div className="text-center">
            <p className="font-medium text-lg mb-4 sm:mb-7 max-w-xl mx-auto">
              L'e-mail de confirmation a été envoyé à : <br />
              <span className="font-bold">johndoe@provider.com</span>
            </p>
            <p className="font-medium text-lg mb-4 sm:mb-7 max-w-xl mx-auto">
              Rendez-vous dans votre boîte de réception pour confirmer la
              création du compte en cliquant sur le lien contenu dans l'e-mail.
            </p>
            <p className="font-medium text-lg mb-6 sm:mb-10 max-w-xl mx-auto">
              Si vous n'avez pas reçu l'e-mail, pensez à vérifier votre dossier
              spam.
            </p>

            <button className=" bg-dark-blue-buttons hover:bg-blue-700 rounded-xl py-2 px-4 text-white font-bold text-center text-lg md:text-base block mx-auto mb-7">
              Renvoyer l'e-mail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
