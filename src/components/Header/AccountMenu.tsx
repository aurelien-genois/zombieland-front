import type {IUser} from "../../@types/user";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const fakeUser: IUser = {
    id: 101,
    nom: "John",
    prenom: "Doe",
    email: "john.doe@test.com",
    est_actif: true,
    telephone: "+33 6 12 34 56 78",
    date_naissance: "1998-04-15",
    derniere_connexion: new Date().toISOString(),
    roles: [
      { id: 1, nom: "ADMIN" },
    ],
  };

  const hasRole = (fakeUser: IUser, role: string) =>
    fakeUser.roles.some(r => r.nom === role);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative z-50">
      <button ref={btnRef} type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(value => !value)}
        className=" w-30 mb-0 bg-red-bg-btn hover:bg-red-500 rounded-xl py-1 px-3 text-white font-bold border-3 border-grey-border-btn text-center text-xs sm:text-sm"
      >
        Mon compte
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label="Menu compte"
          className="absolute left-1/2 -translate-x-1/2 mt-2 w-46 rounded-xl overflow-hidden
                     bg-black/95 backdrop-blur-sm ring-1 ring-white/10 shadow-xl"
        >
          <div className="py-1">
            <Link to="/account/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none">Mon profil</Link>
            <Link to="/account/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none">Mes réservations</Link>
            <Link to="/account/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none">Paramètres</Link>
            {hasRole(fakeUser, "ADMIN") && (
              <Link to="/account/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none">Backoffice</Link>
            )}
          </div>

          <div className="h-px bg-white/10" />
          <button
            role="menuitem"
            onClick={() => {
              // TODO
              console.log("logout");
              setOpen(false);
            }}
            className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm
                      text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 outline-none"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
