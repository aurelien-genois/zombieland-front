import { Link } from "react-router";
import banner from "@/assets/img/redesign/banner2.0.webp";
import logoBanner from "@/assets/img/redesign/logo-banner-2.png"

export default function Banner() {
  return (
    <section className="relative">
      <div className="relative h-[42svh] sm:h-[56svh] lg:h-[68svh] max-h-[820px]">
        <img
          src={banner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute bottom-0 w-full text-center">
          <div className="bg-black/40 text-white p-2 sm:p-3 md:p-4 flex flex-col items-center">
            <img src={logoBanner} alt="logo Zombieland" className="max-w-115"/>
            <p className="font-bebas mt-1 text-xl sm:text-base md:text-6xl text-center font-extrabold">
              LE PARC D'ATTRACTION PRÉFÉRÉ DES FRANÇAIS
            </p>
            <p className="text-lg sm:text-base md:text-xl text-center md:text-left font-semibold mb-2">
              Venez affronter notre horde de zombies...
            </p>
            <div className="flex sm:gap-30 gap-3 my-5">
              <Link
                to="/checkout"
                className={
                  "font-bebas text-3xl sm:w-50 px-4 bg-white-bg hover:bg-dark-blue-buttons rounded-xl py-2 text-dark-blue-buttons hover:text-white-bg font-extrabold shadow-[0px_10px_12px_2px_rgba(255,_255,_255,_0.45)]"
                }
              >
                RESERVER
              </Link>
              <Link
                to="/"
                className={
                  "font-bebas text-3xl sm:w-50 w-auto px-4 bg-white-bg hover:bg-dark-blue-buttons rounded-xl py-2 text-dark-blue-buttons hover:text-white-bg font-extrabold shadow-[0px_10px_12px_2px_rgba(255,_255,_255,_0.45)]"
                }
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
