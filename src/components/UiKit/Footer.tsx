export default function Footer() {
  return(
    <>
    <div className="bg-black flex justify-between items-center">
        <nav className="text-white text-xl flex flex-col">
          <a href="">Accueil</a>
          <a href="">Activités</a>
          <a href="">Réservation</a>
          <a href="">Mentions légales</a>
        </nav>
        <a href=""><img className="max-w-sm flex-auto" src="/icon/logo.svg" alt="Logo" /></a>
        <div className="flex flex-col">
          <p className="text-white text-xl">Adresse du Parc</p>
          <div className="flex justify-center">
            <a href=""><img className="max-w-8" src="/icon/facebook-logo.svg" alt="facebook" /></a>
            <a href=""><img className="max-w-8" src="/icon/instagram-logo.svg" alt="instagram" /></a>
          </div>
        </div>
      </div>
    </>
  )
}