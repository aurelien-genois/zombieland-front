import logo from "@/assets/icon/logo.svg";
import account_zombie from "@/assets/icon/account_zombie.svg";
import { useState } from "react";
import { NavLink } from "react-router";
import AccountMenu from "./AccountMenu";
export default function HeaderFront() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b-3 shadow-md shadow-red-800 bg-black-bg-header/90 backdrop-blur">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="/" className="shrink-0">
          <img className="h-8 sm:h-10" src={logo} alt="ZombieLand" />
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-white text-sm font-bold lg:text-base">
            <NavLink to={`/`} end className={"hover:text-red-500"}>
              Accueil
            </NavLink>

            <NavLink to={`/activities`} end className={"hover:text-red-500"}>
              Attractions
            </NavLink>

            <NavLink to={`/`} end className={"hover:text-red-500"}>
              Restauration
            </NavLink>

            <NavLink to={`/checkout`} end className={"hover:text-red-500"}>
              Réservation
            </NavLink>
          </ul>
        </nav>
        <div className="flex flex-col items-center ">
          <img className="h-8 sm:h-10 " src={account_zombie} alt="Compte" />
          <AccountMenu />
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white p-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${open ? "block" : "hidden"} md:hidden`}
      >
        <div className="px-4 pb-4 space-y-2 text-white">
          <NavLink to={`/`} end className={"block py-2"}>
            Accueil
          </NavLink>

          <NavLink to={`/activities`} end className={"block py-2"}>
            Attractions
          </NavLink>

          <NavLink to={`/`} end className={"block py-2"}>
            Restauration
          </NavLink>

          <NavLink to={`/checkout`} end className={"block py-2"}>
            Réservation
          </NavLink>
        </div>
      </div>
    </header>
  );
}
