import logo from "@/assets/icon/logo.svg";
export default function FooterFront() {
  return (
    <>
      <div className="bg-black-bg-header/90 border-t-3 border-red-border-banner">
        <div className="flex justify-between items-center">
          <div className="flex ml-10 w-40">
            <nav className="text-white text-l flex flex-col mt-3 ">
              <a href="/activities" className="hover:text-red-500">
                Activités
              </a>
              <a href="/checkout" className="hover:text-red-500">
                Réservation
              </a>
              <a href="" className="hover:text-red-500">
                Mentions légales
              </a>
            </nav>
          </div>
          <div className="w-100 flex justify-center">
            <img className="w-45" src={logo} alt="Logo" />
          </div>
          <div className="text-center flex flex-col w-40 mr-10">
            <p className="text-white text-l">Nos réseaux sociaux :</p>
            <div className="flex justify-center mt-2">
              <a className="mr-1" href="">
                <span
                  aria-hidden
                  className="size-8 bg-white hover:bg-red-500 [mask:url(/src/assets/icon/facebook-logo.svg)_no-repeat_center/contain] inline-block"
                />
              </a>
              <a className="ml-1" href="">
                <span
                  aria-hidden
                  className="size-8 bg-white hover:bg-red-500 [mask:url(/src/assets/icon/instagram-logo.svg)_no-repeat_center/contain] inline-block"
                />
              </a>
            </div>
          </div>
        </div>
        <p className="text-grey-text-footer text-l text-center text-xs">
          SEO + Adresse
        </p>
      </div>
    </>
  );
}
