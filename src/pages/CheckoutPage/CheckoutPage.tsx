
export default function CheckoutPage() {
  return(
    <div className="bg-black-bg-main min-h-[calc(100svh-5rem-1.45rem)] text-white">
      {/* header fixe au-dessus dans ton layout */}
      <main className="pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE CONTENU */}
          <section className="lg:col-span-2 space-y-8">
            {/* Récap activité */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-green-text mb-6">
              RESERVEZ VOS BILLETS
            </h1>

            {/* Choix des billets */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">Choisissez vos billets</h2>
              <div className="mt-4 divide-y divide-white/5">
                <div className="py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Adult</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="tabular-nums text-white/90">29.90 €</p>
                    <div className="inline-flex items-center rounded-full bg-white/5">
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Retirer un billet Adult`}
                      >-</button>
                      <span className="w-10 text-center tabular-nums">0</span>
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Ajouter un billet Adult`}
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className="py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Adult</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="tabular-nums text-white/90">29.90 €</p>
                    <div className="inline-flex items-center rounded-full bg-white/5">
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Retirer un billet Adult`}
                      >-</button>
                      <span className="w-10 text-center tabular-nums">0</span>
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Ajouter un billet Adult`}
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className="py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Adult</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="tabular-nums text-white/90">29.90 €</p>
                    <div className="inline-flex items-center rounded-full bg-white/5">
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Retirer un billet Adult`}
                      >-</button>
                      <span className="w-10 text-center tabular-nums">0</span>
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Ajouter un billet Adult`}
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className="py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Adult</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="tabular-nums text-white/90">29.90 €</p>
                    <div className="inline-flex items-center rounded-full bg-white/5">
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Retirer un billet Adult`}
                      >-</button>
                      <span className="w-10 text-center tabular-nums">0</span>
                      <button
                        onClick={() => ""}
                        className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                        aria-label={`Ajouter un billet Adult`}
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Date */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">Date & horaire</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-white/70">Date de visite</span>
                  <input
                    type="date"
                    value={"10/02/2025"}
                    onChange={() => ""}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </label>
              </div>
              <p className="mt-3 text-xs text-white/60">
                * Dans la limite de la capacité du parc.
              </p>
            </div>
          </section>
          {/* COLONNE RÉCAP */}
          <aside className="lg:col-span-1">
            <div className="mt-16">
              <div className="rounded-2xl ring-1 ring-white/10 bg-black/50 p-5 sm:p-6">
                <h3 className="text-lg font-extrabold tracking-wide">Récapitulatif</h3>
                {/* lignes */}
                <ul className="mt-3 space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-white/85">Adult x 0</span>
                    <span className="tabular-nums">29.90 €</span>
                  </li>
                  <li className="flex justify-between text-sm pt-2 border-t border-white/10">
                    <span className="text-white/70">Sous-total</span>
                    <span className="tabular-nums">29.90 €</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/70">TVA (5,5%)</span>
                    <span className="tabular-nums">2 €</span>
                  </li>
                  <li className="flex justify-between text-base font-bold pt-1">
                    <span>Total</span>
                    <span className="tabular-nums">31.90 €</span>
                  </li>
                </ul>
                <button
                  className={`mt-4 w-full px-4 py-3 rounded-xl font-extrabold border`}
                >
                  Passer au paiement
                </button>
                <p className="mt-2 text-[12px] text-white/60">
                  En cliquant, vous serez redirigé vers la page de paiement (mock Stripe).
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 text-sm text-white/70">
                <p>Annulation possible jusqu’à <strong>48h</strong> avant la date de visite.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}