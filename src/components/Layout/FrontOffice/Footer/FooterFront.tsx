export default function FooterFront() {
  return (
    <>
      <div className="bg-black-bg-header/90 border-t-0 shadow-blue-border-banner/80 shadow-[0px_-2px_5px_0px_rgba(0,_0,_0,_0.05)]">
        <div className="flex justify-between items-center">
          <div className="flex ml-10 w-40">
            <nav className="text-grey-menu font-bold text-l flex flex-col mt-3 ">
              <a href="/contact" className="hover:text-dark-blue-buttons">
                Contact
              </a>
              <a href="/legal" className="hover:text-dark-blue-buttons">
                CGV
              </a>
              <a href="/privacy" className="hover:text-dark-blue-buttons">
                Mentions légales
              </a>
            </nav>
          </div>
          <div className="w-100 h-16 flex justify-center">
            <span
              aria-hidden
              className="bg-grey-menu font-bold [mask:url(@/assets/icon/logo.svg)_no-repeat_center/contain] block w-50"
            />
          </div>
          <div className="text-center flex flex-col w-40 mr-10">
            <p className="text-grey-menu font-bold text-l">
              Nos réseaux sociaux :
            </p>
            <div className="flex justify-center mt-2">
              <a className="mr-1" href="">
                <span
                  aria-hidden
                  className="size-8 bg-grey-menu [mask:url(/src/assets/icon/facebook-logo.svg)_no-repeat_center/contain] inline-block"
                />
              </a>
              <a className="ml-1" href="">
                <span
                  aria-hidden
                  className="size-8 bg-grey-menu [mask:url(/src/assets/icon/instagram-logo.svg)_no-repeat_center/contain] inline-block"
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
