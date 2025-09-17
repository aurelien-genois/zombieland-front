export default function FooterFront() {
  return(
    <>
    <div className="bg-black border-t-3 border-red-border-banner">
      <div className="flex justify-between items-center">
        <nav className="text-white text-l flex flex-col ml-10 mt-3 ">
          <a href="" className="hover:text-red-500">Activités</a>
          <a href="" className="hover:text-red-500">Réservation</a>
          <a href="" className="hover:text-red-500">Mentions légales</a>
        </nav>
        <a href="" className="max-w-50 flex-auto"><img src="/icon/logo.svg" alt="Logo"/></a>
        <div className="flex flex-col mr-10 text-center">
          <p className="text-white text-l">Nos réseaux sociaux :</p>
          <div className="flex justify-center mt-2">
            <a href=""><img className="max-w-8" src="/icon/facebook-logo.svg" alt="facebook" /></a>
            <a href=""><img className="max-w-8" src="/icon/instagram-logo.svg" alt="instagram" /></a>
          </div>
        </div>
      </div>
    <p className="text-grey-text-footer text-l text-center text-xs">SEO + Adresse</p>
    </div>
    </>
  )
}