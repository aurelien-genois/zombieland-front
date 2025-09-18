
export default function CheckoutConfirmationPage() {


  return(
    <div className="bg-black-bg-main min-h-[calc(100svh-5rem-1.45rem)] text-white">
      <main className="pt-16 sm:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne 1-2 : contenu */}
          <section className="lg:col-span-2 space-y-6">

            {/* Bandeau succès */}
            <div className="rounded-2xl bg-green-500/10 ring-1 ring-green-500/30 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="inline-block size-8 bg-green-400 rounded-full shrink-0
                  [mask:url(/icon/check.svg)_no-repeat_center/60%]"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
                    Commande confirmée !
                  </h1>
                  <p className="text-white/80 mt-1">
                    Merci pour votre réservation. Vous recevrez un email de confirmation avec vos billets.
                  </p>
                </div>
              </div>
            </div>

            {/* En-tête commande */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-white/60 text-sm">N° de commande</p>
                  <p className="font-extrabold text-lg tracking-wide">ZMB-2025-000427</p>
                </div>
                <div className="text-sm text-white/80">
                  <p>
                    Passée le{" "}
                    <time dateTime={"2025/09/19"}>
                      {new Date("2025/09/19").toLocaleDateString("fr")}
                    </time>
                  </p>
                  <p>
                    Date de visite :{" "}
                    <time dateTime={"2025/09/21"}>
                      {new Date("2025/09/21").toLocaleDateString("fr")}
                    </time>
                  </p>
                </div>
              </div>

             
                <div className="mt-4 text-sm text-white/70">
                  <p>
                    Acheteur :{" "}
                    <strong>
                      John Doe
                    </strong>{" "}
                    — {"johndoe@test.com"}
                  </p>
                </div>
         
            </div>

            {/* Billets */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">
                Vos billets
              </h2>

              <ul className="mt-4 divide-y divide-white/10">
               
                  <li  className="py-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold">Adult</p>
                      <p className="text-sm text-white/70">
                        Quantité : <span className="tabular-nums">2</span> — Prix unitaire :{" "}
                        29,90 €
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold tabular-nums">
                        59.80 €
                      </p>
                    </div>
                  </li>
             
              </ul>
            </div>
          </section>

          {/* Colonne 3 : récap sticky */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-2xl ring-1 ring-white/10 bg-black/50 p-5 sm:p-6">
                <h3 className="text-lg font-extrabold tracking-wide">Récapitulatif</h3>

                <ul className="mt-3 space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-white/70">Sous-total</span>
                    <span className="tabular-nums">59,80</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/70">TVA (5.5 %)</span>
                    <span className="tabular-nums">3,29</span>
                  </li>
                  <li className="flex justify-between text-base font-bold pt-1 border-t border-white/10">
                    <span>Total</span>
                    <span className="tabular-nums">63,09</span>
                  </li>
                </ul>

                <div className="mt-5 grid gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-green-600 hover:bg-green-500"
                  >
                    Télécharger les billets (PDF)
                  </a>

                  <a
                    href="/account/orders"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-white/10 hover:bg-white/15"
                  >
                    Voir mes réservations
                  </a>

                  <a
                    href="/activities"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-white/5 hover:bg-white/10"
                  >
                    Continuer à explorer le parc
                  </a>
                </div>

                <p className="mt-3 text-[12px] text-white/60">
                  Un e-mail contenant votre reçu et vos billets a été envoyé à{" "}
                  <strong>johndoe@test.com</strong>.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4 text-sm text-white/70">
                <p>
                  Rappel : l’annulation est possible jusqu’à <strong>48 h</strong> avant la date de
                  visite. Pour toute question, contactez-nous via la page Contact.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}