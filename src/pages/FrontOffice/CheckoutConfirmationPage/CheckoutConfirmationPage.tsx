import { useMemo } from "react";

type Line = {
  id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  code_ticket: string; // concidère que le code sera généré et envoyé a la page de confirmation mais a confirmer coté back
};

type Order = {
  id: string;
  status: "PAYÉ" | "EN_ATTENTE" | "ANNULÉ";
  placed_at: string;        
  visit_date: string;     
  tva_rate: number;          
  lines: Line[];
  buyer: { first_name: string; last_name: string; email: string };
};

const FakeOrder: Order = {
  id: "ZMB-2025-000427",
  status: "PAYÉ",
  placed_at: new Date().toISOString(),
  visit_date: "2025-10-31",
  tva_rate: 0.055,
  buyer: { first_name: "John", last_name: "Doe", email: "john.doe@mail.com" },
  lines: [
    { id: "L1", product_name: "Adulte", unit_price: 29.9, quantity: 2, code_ticket: "AD-9X2F3" },
    { id: "L2", product_name: "Enfant (-12 ans)", unit_price: 14.9, quantity: 1, code_ticket: "EN-41KQ7" },
    { id: "L3", product_name: "Réduit (PMR)", unit_price: 19.9, quantity: 1, code_ticket: "RD-7Z2B1" },
  ],
};

export default function CheckoutConfirmationPage() {


  const order = FakeOrder;

  const subtotal = useMemo(
    () => order.lines.reduce((prev, line) => prev + line.unit_price * line.quantity, 0),
    [order.lines]
  );
  const tva = useMemo(() => +(subtotal * order.tva_rate).toFixed(2), [subtotal, order.tva_rate]);
  const total = useMemo(() => +(subtotal + tva).toFixed(2), [subtotal, tva]);
  return(

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
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
                    <time dateTime={order.placed_at}>
                      {new Date(order.placed_at).toLocaleDateString("fr")}
                    </time>
                  </p>
                  <p>
                    Date de visite :{" "}
                    <time dateTime={order.visit_date}>
                      {new Date(order.visit_date).toLocaleDateString("fr")}
                    </time>
                  </p>
                </div>
              </div>

             
                <div className="mt-4 text-sm text-white/70">
                  <p>
                    Acheteur :{" "}
                    <strong>
                      {order.buyer.first_name} {order.buyer.last_name}
                    </strong>{" "}
                    — {order.buyer.email}
                  </p>
                </div>
         
            </div>

            {/* Billets */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">
                Vos billets
              </h2>

              <ul className="mt-4 divide-y divide-white/10">
                {order.lines.map((line) => (
                  <li key={line.id} className="py-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold">{line.product_name}</p>
                      <p className="text-sm text-white/70">
                        Quantité : <span className="tabular-nums">{line.quantity}</span> — Prix unitaire :{" "}
                        {line.unit_price.toFixed(2)} {" "} €
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold tabular-nums">
                        {(line.unit_price * line.quantity).toFixed(2)} {" "} €
                      </p>
                    </div>
                  </li>
                ))}
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
                    <span className="tabular-nums">{subtotal.toFixed(2)} {" "} €</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/70">TVA (5.5 %)</span>
                    <span className="tabular-nums">{tva.toFixed(2)} {" "} €</span>
                  </li>
                  <li className="flex justify-between text-base font-bold pt-1 border-t border-white/10">
                    <span>Total</span>
                    <span className="tabular-nums">{total.toFixed(2)} {" "} €</span>
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

  )
}