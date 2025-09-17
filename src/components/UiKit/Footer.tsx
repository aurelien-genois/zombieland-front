export default function Footer() {
  return(
    <>
    <div className="bg-black flex justify-between items-center">
        <nav className="text-white text-l flex flex-col ml-5 mt-3 mb-3">
          <a href="">Accueil</a>
          <a href="">Activités</a>
          <a href="">Réservation</a>
          <a href="">Mentions légales</a>
        </nav>
        <img className="max-w-50 flex-auto" src="/icon/logo.svg" alt="Logo"/>
        <div className="flex flex-col mr-5">
          <p className="text-white text-l">ZombieLand<br />3 bd de la mer</p>
          <div className="flex justify-center mt-2">
            <a href=""><img className="max-w-8" src="/icon/facebook-logo.svg" alt="facebook" /></a>
            <a href=""><img className="max-w-8" src="/icon/instagram-logo.svg" alt="instagram" /></a>
          </div>
        </div>
      </div>
    </>
  )
}