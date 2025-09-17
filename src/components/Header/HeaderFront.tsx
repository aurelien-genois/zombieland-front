import { useState } from "react";
import LinkButton from "../Utils/LinkButton";
export default function HeaderFront() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b-3 border-red-border-banner bg-black-bg-header/90 backdrop-blur">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="/" className="shrink-0">
          <img className="h-8 sm:h-10" src="/icon/logo.svg" alt="ZombieLand" />
        </a>

        
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-white text-sm font-bold lg:text-base">
            <li><a href="" className="hover:text-red-500">Accueil</a></li>
            <li><a href="" className="hover:text-red-500">Attractions</a></li>
            <li><a href="" className="hover:text-red-500">Restauration</a></li>
            <li><a href="" className="hover:text-red-500">Réservation</a></li>
          </ul>
        </nav>
        <div className="hidden md:flex flex-col items-center ">
          <img className="h-10" src="/icon/account_zombie.svg" alt="Compte" />
          <LinkButton
            linkBtnClass="w-30 mb-0 bg-red-bg-btn hover:bg-red-500 rounded-xl py-1 px-3 text-white font-bold border-3 border-grey-border-btn text-center text-sm"
            textBtn="Mon compte"
          />
        </div>
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden text-white p-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div id="mobile-menu" className={`${open ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-4 pb-4 space-y-2 text-white">
          <a className="block py-2" href="">Accueil</a>
          <a className="block py-2" href="">Attractions</a>
          <a className="block py-2" href="">Restauration</a>
          <a className="block py-2" href="">Réservation</a>

          <div className="flex flex-col items-center max-w-10 pt-2 ml-10">
            <img className="" src="/icon/account_zombie.svg" alt="Compte" />
            <LinkButton
              linkBtnClass="w-36 bg-red-bg-btn rounded-xl py-1 px-3 text-white font-bold border-3 border-grey-border-btn"
              textBtn="MON COMPTE"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
