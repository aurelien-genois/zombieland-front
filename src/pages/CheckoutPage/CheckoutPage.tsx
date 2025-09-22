import { useMemo, useState } from "react";

type Product = { 
  id: number; 
  name: string; 
  unit_price: number
};
export default function CheckoutPage() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products: Product[] = [
    { id: 1, name: "Adulte", unit_price: 29.9 },
    { id: 2, name: "Enfant (-12 ans)", unit_price: 14.9 },
    { id: 3, name: "Réduit (PMR)", unit_price: 19.9 },
    { id: 4, name: "Groupe (10 personnes)", unit_price: 249.9 },
  ];
  const [qty, setQty] = useState<Record<number, number>>({});
  const inc = (id: number) => setQty(prevQty => ({ ...prevQty, [id]: (prevQty[id] ?? 0) + 1 }));
  const dec = (id: number) => setQty(prevQty => ({ ...prevQty, [id]: Math.max(0, (prevQty[id] ?? 0) - 1) }));

  // (LIGNE-COMMANDE) (recap et passage au back)
  const lines = useMemo(() => {
    return products
      .map(product => {
        const quantity = qty[product.id] ?? 0;
        const line_total = +(quantity * product.unit_price).toFixed(2);
        return { product_id: product.id, name: product.name, unit_price: product.unit_price, quantity, line_total };
      })
      .filter(line => line.quantity > 0);
  }, [qty, products]);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.line_total, 0), [lines]);
  const tvaRate = 0.055;
  const tva = useMemo(() => +(subtotal * tvaRate).toFixed(2), [subtotal]);
  const total = useMemo(() => +(subtotal + tva).toFixed(2), [subtotal, tva]);
  const totalCount = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);
  const [date, setDate] = useState("");
  const canPay = totalCount > 0 && !!date;

  // Payload (COMMANDE + LIGNES)
  const orderDraft = {
    statut: "PANIER", // à convertir en "PAYÉ" après paiement
    date_commande: new Date().toISOString(),
    date_visite: date,
    tva: tvaRate,
    mode_paiement: "CB", // sélectionné plus tard
    lignes: lines.map(line => ({
      product_id: line.product_id,
      quantity: line.quantity,
      unit_price: line.unit_price,
      price_total_ligne: line.line_total,
      // code_ticket généré côté back lors de l’émission (ou après paiement)
    })),
  };

  function handlePay() {
    if (!canPay) return;
    // plus tard: POST /api/commandes { ...orderDraft }
    console.log("ORDER_DRAFT", orderDraft);
    alert("Fake: redirection vers paiement…");
  }

  return(
    <div className="bg-black-bg-main min-h-[calc(100svh-5rem-1.45rem)] text-white">
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
                {products.map((product) => (
                  <div key={product.id} className="py-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">{product.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="tabular-nums text-white/90">{product.unit_price.toFixed(2)} €</p>
                      <div className="inline-flex items-center rounded-full bg-white/5">
                        <button
                          onClick={() => dec(product.id)}
                          className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                          aria-label={`Retirer un billet ${product.name}`}
                        >-</button>
                        <span className="w-10 text-center tabular-nums">{qty[product.id] ?? 0}</span>
                        <button
                          onClick={() => inc(product.id)}
                          className="w-9 h-9 grid place-items-center text-white/90 hover:bg-white/10 rounded-full"
                          aria-label={`Ajouter un billet ${product.name}`}
                        >+</button>
                      </div>
                    </div>
                  </div>
                ))}
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                  {lines.map(line => (
                    <li key={line.product_id} className="flex justify-between text-sm">
                      <span className="text-white/85">{line.name} x {line.quantity}</span>
                      <span className="tabular-nums">{line.line_total.toFixed(2)} €</span>
                    </li>
                  ))}
                  <li className="flex justify-between text-sm pt-2 border-t border-white/10">
                    <span className="text-white/70">Sous-total</span>
                    <span className="tabular-nums">{subtotal.toFixed(2)} €</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-white/70">TVA (5,5%)</span>
                    <span className="tabular-nums">{tva.toFixed(2)} €</span>
                  </li>
                  <li className="flex justify-between text-base font-bold pt-1">
                    <span>Total</span>
                    <span className="tabular-nums">{total.toFixed(2)} €</span>
                  </li>
                </ul>
                <button
                  className={`mt-4 w-full px-4 py-3 rounded-xl font-extrabold border
                    ${canPay ? "bg-green-bg-btn border-white/10 hover:brightness-110" : "bg-white/10 border-white/10 text-white/50 cursor-not-allowed"}  
                  `}
                  disabled={!canPay}
                  onClick={handlePay}
                >
                  Passer au paiement
                </button>
                <p className="mt-2 text-[12px] text-white/60">
                  En cliquant, vous serez redirigé vers la page de paiement (Stripe).
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