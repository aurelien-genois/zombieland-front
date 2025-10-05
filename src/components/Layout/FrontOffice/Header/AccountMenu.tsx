import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/store/reducers/userReducer";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

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

  const dispatch = useAppDispatch();
  const { userInfo, isAuth } = useAppSelector((store) => store.userStore);
  console.log("user info: ", userInfo);
  console.log("isAuth: ", isAuth);

  return (
    <div className="relative z-50">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="cursor-pointer w-40 mb-0 bg-dark-blue-buttons rounded-xl py-1 px-3 text-white font-bold text-center text-xs sm:text-lg"
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
            {!isAuth ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10"
                >
                  Créer un compte
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/account/"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none"
                >
                  Mon profil
                </Link>
                <Link
                  to="/account/"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none"
                >
                  Mes réservations
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 outline-none"
                >
                  Backoffice
                </Link>
              </>
            )}
          </div>

          {isAuth && (
            <>
              <div className="h-px bg-white/10" />
              <button
                role="menuitem"
                onClick={async () => {
                  await dispatch(logout());
                  setOpen(false);
                }}
                className="cursor-pointer w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm
                      text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 outline-none"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
