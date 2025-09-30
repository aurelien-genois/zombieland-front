import { Link } from "react-router";
import banner from "@/assets/img/banner.webp";

export default function Banner() {
  return (
    <section className="relative">
      <div className="relative h-[42svh] sm:h-[56svh] lg:h-[68svh] max-h-[820px] border-b-2 border-red-border-banner">
        <img
          src={banner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute max-w-150 lg:right-15 bottom-15">
          <div className="rounded-xl bg-black/60 text-white p-4 sm:p-6 md:p-8 backdrop-blur">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-center md:text-left">
              Bienvenue à ZombieLand
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-center md:text-left">
              Bienvenue à <span className="text-red-500 font-extrabold italic">ZombieLand</span> ! Après la fuite d'un contaminant puissant, la population s'est quelque peu... Transformée.
              Oserez-vous affronter vos peurs pour tenter de reprendre le contrôle ?
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                to="/checkout"
                className={
                  "w-full sm:w-auto px-4 bg-red-bg-btn hover:bg-red-500 rounded-xl py-2 text-white font-bold border-3 border-grey-border-btn"
                }
              >
                Réserver
              </Link>
              <Link
                to="/"
                className={
                  "w-full sm:w-auto px-4 bg-green-bg-btn hover:bg-green-600 rounded-xl py-2 text-white font-bold border-3 border-grey-border-btn"
                }
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
