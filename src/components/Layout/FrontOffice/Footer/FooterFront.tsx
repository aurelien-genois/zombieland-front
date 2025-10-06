export default function FooterFront() {
  return (
    <footer className="bg-black-bg-header/90 border-t-0 shadow-[0_-2px_5px_0_rgba(0,0,0,0.05)] shadow-blue-border-banner/80 w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1 col en mobile, 3 cols >= md */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Col 1 : liens */}
          <nav className="text-grey-menu font-bold text-base flex flex-col gap-2">
            <a href="/contact" className="hover:text-dark-blue-buttons">Contact</a>
            <a href="/privacy" className="hover:text-dark-blue-buttons">Données personnelles</a>
            <a href="/legal" className="hover:text-dark-blue-buttons">Mentions légales</a>
          </nav>

          {/* Col 2 : logo centré */}
          <div className="flex justify-center">
            <span
              aria-hidden
              className="block shrink-0 w-40 h-10 sm:w-48 sm:h-12 bg-grey-menu
                         [mask:url(@/assets/icon/logo.svg)_no-repeat_center/contain]"
            />
          </div>

          {/* Col 3 : réseaux */}
          <div className="text-center md:text-right">
            <p className="text-grey-menu font-bold text-base">Nos réseaux sociaux :</p>
            <div className="mt-2 flex justify-center md:justify-end gap-2">
              <a aria-label="Facebook" href="#" className="inline-flex">
                <span
                  aria-hidden
                  className="size-8 bg-grey-menu inline-block
                             [mask:url(/src/assets/icon/facebook-logo.svg)_no-repeat_center/contain]"
                />
              </a>
              <a aria-label="Instagram" href="#" className="inline-flex">
                <span
                  aria-hidden
                  className="size-8 bg-grey-menu inline-block
                             [mask:url(/src/assets/icon/instagram-logo.svg)_no-repeat_center/contain]"
                />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-grey-text-footer text-center text-sm">
          SEO + Adresse
        </p>
      </div>
    </footer>
  );
}
