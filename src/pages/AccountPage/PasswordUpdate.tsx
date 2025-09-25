// Récupérer les données de l'utilisateur et les afficher dans le formulaire pour permettre les modifications
// Gérer l'affichage de cet élément en fonction du clic sur le tab


export default function PasswordUpdate() {
  return(
    <>
      <div className="pb-10">        
        <form method="get" className="mx-auto px-5 md:max-w-150 sm:max-w-150">
          <div className="grid gap-1.5 md:gap-6 mb-3 grid-cols-1">
            <div className="mb-6">
              <label htmlFor="password" className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5">Ancien mot de passe <span className="text-red-500 font-normal">*</span></label>
              <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5" required />
              <p className="mb-1.5 text-lg md:text-sm ml-2 text-gray-600">Le mot de passe doit contenir au minimum 10 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.</p>

              <label htmlFor="password" className="block mb-1.5 text-lg md:text-sm font-bold ml-1.5">Nouveau mot de passe <span className="text-red-500 font-normal">*</span></label>
              <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5 mb-1.5" required />

              <label htmlFor="confirmpassword" className="block mb-0.5 text-lg md:text-sm font-bold ml-1.5" >Retapez le nouveau mot de passe <span className="text-red-500 font-normal">*</span></label>
              <input type="password" name="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg md:text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full p-2.5" required />
            </div>
          </div>
          <button type="submit" className="w-50 bg-green-bg-btn hover:bg-green-500 rounded-xl py-1 px-3 text-white font-bold border-3 text-2xl sm:text-lg border-grey-border-btn text-center block mx-auto">Modifier</button>
        </form>
      </div>
    </>
  )
}