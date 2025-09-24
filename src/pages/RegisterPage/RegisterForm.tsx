export default function RegisterForm() {
  return(
    <>
      <div className="pb-8">
        <h1 className="text-center font-bold text-3xl pt-10 mb-3">Inscription</h1>
        <h2 className="text-center font-bold text-2xl mb-5 sm:text-xl">Mes informations personnelles</h2>
        
        <form method="get" className="mx-auto px-5 md:max-w-200 sm:max-w-150">
          <div className="grid gap-1.5 md:gap-6 mb-3 grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5" htmlFor="firstname">Prénom <span className="text-red-500 font-normal">*</span></label>
              <input type="text" name="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5" placeholder="Prénom" required />
            </div>
            <div >
              <label className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5" htmlFor="lastname">Nom <span className="text-red-500 font-normal">*</span></label>
              <input type="text" name="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5" placeholder="Nom" required />
            </div>
          </div>

          <label htmlFor="email" className="block mt-0.5 text-lg md:text-sm font-bold ml-1.5">E-mail <span className="text-red-500 font-normal">*</span></label>
          <input type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5" placeholder="monemail@host.com" required />
          <p className="mb-6 text-lg md:text-sm ml-2 text-gray-600">Vous recevrez un email de confirmation pour valider la création du compte.</p>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5">Mot de passe <span className="text-red-500 font-normal">*</span></label>
            <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5" required />
            <p className="mb-2 text-lg md:text-sm ml-2 text-gray-600">Le mot de passe doit contenir au minimum 10 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.</p>
            <label htmlFor="confirmpassword" className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5" >Retapez le mot de passe <span className="text-red-500 font-normal">*</span></label>
            <input type="password" name="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-5" required />
          </div>

          <label htmlFor="telephone" className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5">Téléphone</label>
          <input type="tel" name="telephone" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-3" placeholder="Indicatif + Téléphone"/>
          <label htmlFor="birthdate" className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5">Date de naissance <span className="text-red-500 font-normal">*</span></label>
          <input type="date" lang="fr" name="birthdate" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-7" required />
          <button type="submit" className="w-50 bg-green-bg-btn hover:bg-green-500 rounded-xl py-1 px-3 text-white font-bold border-3 text-2xl sm:text-lg border-grey-border-btn text-center block mx-auto">Envoyer</button>
        </form>
      </div>
    </>
  )
}