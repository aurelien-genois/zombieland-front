import { Link } from "react-router";
import banner from "@/assets/img/redesign/banner2.0.webp";
import logoBanner from "@/assets/img/redesign/logo-banner-2.png";

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[42svh] sm:h-[56svh] lg:h-[68svh] max-h-[820px]">
        <img
          src={banner}
          alt="Zombieland - parc d'attractions"
          className="absolute inset-0 w-full h-full object-cover block"
          loading="eager"
        />

        {/* Bandeau texte collé en bas */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-black/40 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex flex-col items-center">
            {/* Logo borné pour éviter l'overflow en mobile */}
            <img
              src={logoBanner}
              alt="Logo Zombieland"
              className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] h-auto"
            />

            <p className="font-bebas mt-2 text-2xl sm:text-3xl md:text-5xl text-center font-extrabold [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
              LE PARC D&apos;ATTRACTION PRÉFÉRÉ DES FRANÇAIS
            </p>

            <p className="mt-1 text-base sm:text-lg md:text-xl text-center font-semibold">
              Venez affronter notre horde de zombies...
            </p>

            <div className="mt-4 mb-2 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                to="/checkout"
                className="font-bebas inline-flex items-center justify-center px-5 py-2.5 text-xl sm:text-2xl rounded-xl font-extrabold bg-white-bg text-dark-blue-buttons hover:bg-dark-blue-buttons hover:text-white-bg transition-colors shadow-[0_10px_12px_2px_rgba(255,255,255,0.45)]"
              >
                RÉSERVER
              </Link>

              <Link
                to="/"
                className="font-bebas inline-flex items-center justify-center px-5 py-2.5 text-xl sm:text-2xl rounded-xl font-extrabold bg-white-bg text-dark-blue-buttons hover:bg-dark-blue-buttons hover:text-white-bg transition-colors shadow-[0_10px_12px_2px_rgba(255,255,255,0.45)]"
              >
                EN SAVOIR PLUS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
