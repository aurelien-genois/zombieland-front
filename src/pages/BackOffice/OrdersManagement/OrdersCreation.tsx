import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchProducts, createOrder } from "@/store/reducers/ordersReducer";
import type { OrderLineInput } from "@/@types/order";
import { useNavigate } from "react-router";

function toISO(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toISOString();
}

export default function OrderCreatePage() {
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    products,
    loadingProducts,
    productsError,
    creating,
    createError,
  } = useSelector((s: RootState) => s.ordersStore);

  const { userInfo } = useSelector((s: RootState) => s.userStore);
  const isAdmin = userInfo?.role?.name === "admin";

  // Etat du formulaire
  const [visitDate, setVisitDate] = useState("");
  const [vatRate, setVatRate] = useState<number>(5.5);
  const [qty, setQty] = useState<Record<number, number>>({});
  const [targetUserId, setTargetUserId] = useState<string>(""); // uniquement si admin

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Helpers quantité
  const inc = (id: number) => setQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const dec = (id: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  // Lignes choisies
  const lines = useMemo(
    () =>
      products
        .map((p) => {
          const unit = (p as any).unit_price ?? (p as any).price ?? 0;
          const quantity = qty[p.id] ?? 0;
          const line_total = +(quantity * unit).toFixed(2);
          return { product_id: p.id, name: p.name, price: unit, quantity, line_total };
        })
        .filter((l) => l.quantity > 0),
    [products, qty]
  );

  // Récap
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.line_total, 0),
    [lines]
  );
  const tva = useMemo(
    () => +(subtotal * (vatRate / 100)).toFixed(2),
    [subtotal, vatRate]
  );
  const total = useMemo(() => +(subtotal + tva).toFixed(2), [subtotal, tva]);
  const totalCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines]
  );

  const canSubmit = totalCount > 0 && !!visitDate && !creating;

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const order_lines: OrderLineInput[] = lines.map((l) => ({
      product_id: l.product_id,
      quantity: l.quantity,
    }));

    // payload de base
    const payload: any = {
      visit_date: toISO(visitDate),
      vat: vatRate,
      order_lines,
    };

    // si admin & user_id fourni => on l’envoie au back
    if (isAdmin && targetUserId.trim() !== "" && Number(targetUserId) > 0) {
      payload.user_id = Number(targetUserId);
    }

    try {
      const order = await dispatch(createOrder(payload)).unwrap();
      navigate(`/admin/management/orders/${order.id}`);
    } catch (err) {
      setFormError(typeof err === "string" ? err : "Une erreur est survenue");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold mb-1">Create Order</h1>
      <p className="text-sm text-gray-500 mb-4">
        Créez une nouvelle commande (admin).
      </p>

      <form onSubmit={handleCreateOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne produits */}
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-md border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold">Produits</h2>

            {loadingProducts && (
              <p className="mt-3 text-gray-500">Chargement des produits…</p>
            )}
            {formError && (
              <div className="mt-2 rounded bg-red-50 text-red-700 px-3 py-2 text-sm">
                {formError}
              </div>
            )}
            {!loadingProducts && !productsError && (
              <div className="mt-4 divide-y">
                {products.map((p) => {
                  const unit = (p as any).unit_price ?? (p as any).price ?? 0;
                  const q = qty[p.id] ?? 0;
                  return (
                    <div
                      key={p.id}
                      className="py-3 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-gray-500">
                          {unit.toFixed(2)} €
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center rounded bg-gray-100">
                          <button
                            type="button"
                            onClick={() => dec(p.id)}
                            className="w-8 h-8 grid place-items-center hover:bg-gray-200 rounded-l"
                            aria-label={`Retirer ${p.name}`}
                          >
                            −
                          </button>
                          <span className="w-10 text-center tabular-nums">
                            {q}
                          </span>
                          <button
                            type="button"
                            onClick={() => inc(p.id)}
                            className="w-8 h-8 grid place-items-center hover:bg-gray-200 rounded-r"
                            aria-label={`Ajouter ${p.name}`}
                          >
                            +
                          </button>
                        </div>

                        <div className="w-20 text-right tabular-nums">
                          {(q * unit).toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  );
                })}

                {products.length === 0 && (
                  <p className="py-4 text-gray-500">
                    Aucun produit disponible.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Date & TVA (+ sélection client si admin) */}
          <div className="rounded-md border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold">Paramètres</h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-600">Date de visite</span>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">TVA (%)</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                />
              </label>

              {isAdmin && (
                <label className="block sm:col-span-2">
                  <span className="text-sm text-gray-600">Client (user_id)</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Laisser vide pour soi-même"
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  />
                  <span className="text-xs text-gray-500">
                    Si renseigné, la commande sera créée pour cet utilisateur.
                  </span>
                </label>
              )}
            </div>
          </div>
        </section>

        {/* Colonne récap */}
        <aside className="lg:col-span-1">
          <div className="rounded-md border border-gray-200 bg-white p-5">
            <h3 className="text-lg font-bold">Récapitulatif</h3>

            <ul className="mt-3 space-y-2">
              {lines.map((l) => (
                <li key={l.product_id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {l.name} × {l.quantity}
                  </span>
                  <span className="tabular-nums">{l.line_total.toFixed(2)} €</span>
                </li>
              ))}

              <li className="flex justify-between text-sm pt-2 border-t">
                <span className="text-gray-600">Sous-total</span>
                <span className="tabular-nums">{subtotal.toFixed(2)} €</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">TVA ({vatRate}%)</span>
                <span className="tabular-nums">{tva.toFixed(2)} €</span>
              </li>
              <li className="flex justify-between text-base font-bold pt-1">
                <span>Total</span>
                <span className="tabular-nums">{total.toFixed(2)} €</span>
              </li>
            </ul>

            {createError && (
              <p className="mt-3 text-sm text-red-600">{createError}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className={`mt-4 w-full px-4 py-2 rounded text-white font-semibold ${
                canSubmit
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {creating ? "Création…" : "Créer la commande"}
            </button>

            <p className="mt-2 text-xs text-gray-500">
              Si “Client (user_id)” est vide, la commande sera créée pour l’utilisateur connecté.  
              (On pourra plus tard remplacer ce champ par un auto-complete email.)
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
