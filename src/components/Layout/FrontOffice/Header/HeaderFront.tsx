import { useState } from "react";
import { NavLink } from "react-router";
import AccountMenu from "./AccountMenu";
import DropdownMenu from "./DropdownAttractions";
import DropdownStores from "./DropdownStores";
export default function HeaderFront() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white-bg/50 border-b-0 shadow-md shadow-blue-border-banner backdrop-blur">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="w-120 flex justify-start mx-auto">
          <a href="/" className="shrink-0 w-60 h-16 flex justify-center">
            <span
              aria-hidden
              className="bg-grey-menu [mask:url(@/assets/icon/logo.svg)_no-repeat_center/contain] inline-block w-full h-full"
            />
          </a>
        </div>
        <div className="flex w-200 justify-center mx-auto">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-grey-menu text-sm lg:text-base">
              <NavLink
                to={`/`}
                end
                className={({ isActive }) =>
                  `text-lg font-bold ${
                    isActive
                      ? "text-dark-blue-buttons"
                      : "hover:text-dark-blue-buttons hover:shadow-text-md"
                  } transition-all duration-200 ease-in-out`
                }
              >
                Accueil
              </NavLink>

              <DropdownMenu />

              <DropdownStores />

              <NavLink
                to={`/checkout`}
                end
                className={({ isActive }) =>
                  `text-lg font-bold ${
                    isActive
                      ? "text-dark-blue-buttons"
                      : "hover:text-dark-blue-buttons hover:shadow-text-md"
                  } transition-all duration-200 ease-in-out`
                }
              >
                Réservation
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="w-120 flex justify-end mx-auto">
          <div className="flex flex-col items-center ">
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
      </div>
      <div
        id="mobile-menu"
        className={`${open ? "block" : "hidden"} md:hidden`}
      >
        <div className="px-4 pb-4 space-y-2 text-white">
          <NavLink to={`/`} end className="block py-2 cursor-pointer">
            Accueil
          </NavLink>

          <NavLink to={`/activities`} end className="block py-2 cursor-pointer">
            Attractions
          </NavLink>

          <NavLink to={`/`} end className="block py-2 cursor-pointer">
            Boutiques
          </NavLink>

          <NavLink to={`/checkout`} end className="block py-2 cursor-pointer">
            Réservation
          </NavLink>
        </div>
      </div>
    </header>
  );
}
