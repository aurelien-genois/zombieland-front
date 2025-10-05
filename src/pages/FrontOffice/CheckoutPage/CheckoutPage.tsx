import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchProducts, createOrder } from "@/store/reducers/ordersReducer";
import type { OrderLineInput } from "@/@types";

function toISO(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toISOString();
}

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loadingProducts, productsError, creating } = useSelector(
    (s: RootState) => s.ordersStore
  );
  const LS_KEY = "checkout.cart";
  const [qty, setQty] = useState<Record<number, number>>({});
  const [date, setDate] = useState("");
  const inc = (id: number) => setQty(q => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const dec = (id: number) => setQty(q => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  const lines = useMemo(() =>
    products
      .map(p => {
        const quantity = qty[p.id] ?? 0;
        const line_total = +(quantity * p.unit_price).toFixed(2);
        return { product_id: p.id, name: p.name, price: p.unit_price, quantity, line_total };
      })
      .filter(l => l.quantity > 0)
  , [qty, products]);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.line_total, 0), [lines]);
  const vatRate = 5.5;
  const tva = useMemo(() => +(subtotal * (vatRate / 100)).toFixed(2), [subtotal]);
  const total = useMemo(() => +(subtotal + tva).toFixed(2), [subtotal, tva]);
  const totalCount = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);

  const canPay = totalCount > 0 && !!date;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { qty: Record<number, number>; date: string };
      setQty(parsed.qty ?? {});
      setDate(parsed.date ?? "");
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    const payload = JSON.stringify({ qty, date });
    localStorage.setItem(LS_KEY, payload);
  }, [qty, date]);

  async function handlePay() {
    if (creating) return;
    if (!canPay) {
      alert("Sélectionnez au moins un billet et une date.");
      return;
    }
  
    const order_lines: OrderLineInput[] = lines.map(l => ({
      product_id: l.product_id,
      quantity: l.quantity,
    }));
  
    try {
      const order = await dispatch(
        createOrder({
          visit_date: toISO(date),
          vat: vatRate,
          order_lines,
        })
      ).unwrap();

      // add redirection to stripe session
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${order.id}/checkout/stripe`,
        { method: "POST", credentials: "include" }
      );
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.message || `HTTP ${res.status}`);
      }
      const { url } = await res.json();
  
      localStorage.removeItem(LS_KEY);

      window.location.href = url;
    } catch (err) {
      alert(typeof err === "string" ? err : "Une erreur est survenue lors de la création de la commande.");
    }
  }

  return(

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-grey-menu">
  {/* COLONNE CONTENU */}
  <section className="lg:col-span-2 space-y-8">
    <h1 className="text-3xl sm:text-4xl font-bebas font-extrabold text-dark-blue-buttons mb-6">
      RÉSERVEZ VOS BILLETS
    </h1>
    <div className="rounded-2xl ring-1 ring-white/10 bg-black/10 p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">
        Choisissez vos billets
      </h2>
      {loadingProducts && (
        <p className="mt-4 text-grey-menu">Chargement des tarifs…</p>
      )}
      {productsError && (
        <p className="mt-4 text-red-400">Erreur : {productsError}</p>
      )}
      {!loadingProducts && !productsError && (
        <div className="mt-4 divide-y divide-black/6">
          {products.map((product) => (
            <div key={product.id} className="py-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold">{product.name}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="tabular-nums text-grey-menu">
                  {product.unit_price.toFixed(2)} €
                </p>

                <div className="inline-flex items-center rounded-full bg-white/5">
                  <button
                    onClick={() => dec(product.id)}
                    className="w-9 h-9 grid place-items-center text-grey-menu hover:bg-black/30 rounded-full"
                    aria-label={`Retirer un billet ${product.name}`}
                  >
                    −
                  </button>
                  <span className="w-10 text-center tabular-nums">
                    {qty[product.id] ?? 0}
                  </span>
                  <button
                    onClick={() => inc(product.id)}
                    className="w-9 h-9 grid place-items-center text-grey-menu hover:bg-black/30 rounded-full"
                    aria-label={`Ajouter un billet ${product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="py-4 text-white/70">Aucun produit disponible.</p>
          )}
        </div>
      )}
    </div>

    {/* Date */}
    <div className="rounded-2xl ring-1 ring-white/10 bg-black/10 p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">
        Date &amp; horaire
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-grey-menu">Date de visite</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-xl bg-black/20 border border-white/10 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </label>
      </div>
      <p className="mt-3 text-xs text-grey-menu">
        * Dans la limite de la capacité du parc.
      </p>
    </div>
  </section>

  {/* COLONNE RÉCAP */}
  <aside className="lg:col-span-1">
    <div className="mt-16">
      <div className="rounded-2xl ring-1 ring-white/10 bg-black/10 p-5 sm:p-6">
        <h3 className="text-lg font-extrabold tracking-wide">Récapitulatif</h3>

        <ul className="mt-3 space-y-2">
          {lines.map((line) => (
            <li key={line.product_id} className="flex justify-between text-sm">
              <span className="text-grey-menu">
                {line.name} × {line.quantity}
              </span>
              <span className="tabular-nums">
                {line.line_total.toFixed(2)} €
              </span>
            </li>
          ))}

        {/* Sous-total / TVA / Total */}
          <li className="flex justify-between text-sm pt-2 border-t border-white/10">
            <span className="text-grey-menu">Sous-total</span>
            <span className="tabular-nums">{subtotal.toFixed(2)} €</span>
          </li>
          <li className="flex justify-between text-sm">
            <span className="text-grey-menu">TVA (5,5%)</span>
            <span className="tabular-nums">{tva.toFixed(2)} €</span>
          </li>
          <li className="flex justify-between text-base font-bold pt-1">
            <span>Total</span>
            <span className="tabular-nums">{total.toFixed(2)} €</span>
          </li>
        </ul>

        <button
          className={`mt-4 w-full px-4 py-3 rounded-xl font-extrabold border
            ${canPay ? "bg-dark-blue-buttons hover:bg-white-bg text-white-bg hover:text-dark-blue-buttons border-white/10 hover:brightness-110" : "bg-white/10 border-white/10 text-white/50 cursor-not-allowed"}
          `}
          disabled={!canPay || creating}
          onClick={handlePay}
        >
          {creating ? "Création…" : "Passer au paiement"}
        </button>

        <p className="mt-2 text-[12px] text-grey-menu">
          En cliquant, vous serez redirigé vers la page de paiement (Stripe).
        </p>
      </div>

      <div className="rounded-xl bg-white/5 p-4 text-sm text-grey-menu">
        <p>
          Annulation possible jusqu’à <strong>10 jours</strong> avant la date de visite.
        </p>
      </div>
    </div>
  </aside>
</div>

  )
}