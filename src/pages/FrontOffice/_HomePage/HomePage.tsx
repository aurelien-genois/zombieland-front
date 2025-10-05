import Banner from "./Banner";
import Carousel from "./Carousel";
import StaticLinks from "./StaticLinks";
import image1 from "@/assets/img/redesign/mon_compte.png";
import image2 from "@/assets/img/redesign/reserver.png";
import image3 from "@/assets/img/redesign/contact.png";

export default function HomePage() {
  return (
    <>
      <Banner />
      <h2 className="font-bebas mt-13 mb-5 text-xl sm:text-base md:text-5xl text-center font-extrabold text-shadow-lg/30">NOS ATTRACTIONS DE LA SEMAINE</h2>
      <Carousel />
      <h2 className="font-bebas mt-13 mb-5 text-xl sm:text-base md:text-5xl text-center font-extrabold text-shadow-lg/30">INFORMATIONS UTILES</h2>
      <section className="flex items-center justify-center w-full mt-20 mb-20">
        <div className="flex justify-center items-center w-full bg-green-static h-100 shadow-[0px_15px_7px_-8px_rgba(0,_0,_0,_0.1)]">
          <div className="flex justify-center items-center gap-20 mt-6 mb-6 bg-green-static h-80">
            <StaticLinks 
              imageSrc={image1}
              linkTo="/account"
              altText="Mon Compte"/>
            <StaticLinks 
              imageSrc={image2}
              linkTo="/checkout"
              altText="Réserver"/>
            <StaticLinks 
              imageSrc={image3}
              linkTo="/contact"
              altText="Contact"/>
          </div>  
        </div>
      </section>
    </>
  );
}
