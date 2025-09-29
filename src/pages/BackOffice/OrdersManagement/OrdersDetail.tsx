import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchOneOrder, updateOrderStatus } from "@/store/reducers/ordersReducer";
import type { IOrder, OrderLineLike, OrderStatus } from "@/@types";

const statusColor: Record<OrderStatus, string> = {
  pending:  "bg-yellow-100 text-yellow-800",
  confirmed:"bg-green-100 text-green-800",
  canceled: "bg-red-100 text-red-800",
  refund:   "bg-indigo-100 text-indigo-800",
};

function formatDate(d?: string) {
  if (!d) return "-";
  try { return new Date(d).toLocaleDateString("fr-FR"); } catch { return "-"; }
}
function euro(n: number) { return `${n.toFixed(2)} €`; }

function computeTotals(order: IOrder) {
  const subtotal = order.order_lines.reduce((s, l) => s + l.unit_price * l.quantity, 0);
  const vatRate = Number(order.vat) || 0;
  const vat = +(subtotal * (vatRate / 100)).toFixed(2);
  const total = order.total ? order.total : +(subtotal + vat).toFixed(2);
  return { subtotal, vatRate, vat, total };
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const orderId = Number(id);
  const dispatch = useAppDispatch();

  const { order: o, loadingOrder, orderError } = useAppSelector(s => s.ordersStore);

  useEffect(() => {
    if (!Number.isNaN(orderId)) dispatch(fetchOneOrder(orderId));
  }, [dispatch, orderId]);

  const header = useMemo(() => (o ? `Order #${o.id}` : "Order details"), [o]);

  // -------- utils
  function safeLineName(l: OrderLineLike) {
    return l?.product?.name ?? l?.product_name ?? l?.name ?? `#${l?.product_id ?? l?.id ?? "?"}`;
  }
  function safeUnitPrice(l: OrderLineLike) {
    const v = l?.unit_price ?? l?.product?.price ?? 0;
    return typeof v === "number" ? v : Number(v) || 0;
  }

  function changeStatus(s: OrderStatus) {
    if (!o || o.status === s) return;
    dispatch(updateOrderStatus({ id: o.id, status: s }));
    dispatch(fetchOneOrder(o.id));
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">{header}</h1>
        <Link to="/admin/management/orders" className="rounded border px-3 py-2 hover:bg-gray-50">
          ← Retour liste
        </Link>
      </div>

      {loadingOrder && (
        <div className="rounded-md border border-gray-200 bg-white p-6 text-gray-500">
          Chargement…
        </div>
      )}

      {!loadingOrder && orderError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {orderError}
        </div>
      )}

      {!loadingOrder && !orderError && o && (
        <div className="grid gap-4 md:grid-cols-3">
          {/* ===================== Carte commande ===================== */}
          <section className="md:col-span-2 rounded-md border border-gray-200 bg-white overflow-hidden">
            <div className="border-b px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${statusColor[o.status]}`}>
                  {o.status}
                </span>
                <span className="text-sm text-gray-500">
                  Passée le <b>{formatDate(o.order_date ?? o.visit_date)}</b> — Visite le <b>{formatDate(o.visit_date)}</b>
                </span>
              </div>
            </div>

            {/* Lignes */}
            <div className="px-5 py-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr>
                    <th className="py-2 pr-2">Article</th>
                    <th className="py-2 pr-2">PU</th>
                    <th className="py-2 pr-2">Qté</th>
                    <th className="py-2 pr-2">Sous-total</th>
                  </tr>
                </thead>
                <tbody>
                  {(o.order_lines ?? []).map((l) => (
                    <tr key={l.id ?? `${safeLineName(l)}-${safeUnitPrice(l)}`}>
                      <td className="py-2 pr-2">{safeLineName(l)}</td>
                      <td className="py-2 pr-2 tabular-nums">{euro(safeUnitPrice(l))}</td>
                      <td className="py-2 pr-2">{l?.quantity ?? 0}</td>
                      <td className="py-2 pr-2 tabular-nums">{euro(safeUnitPrice(l) * (l?.quantity ?? 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totaux */}
            <OrderTotals order={o} />
          </section>

          {/* ===================== Carte latérale ===================== */}
          <aside className="rounded-md border border-gray-200 bg-white p-5 flex flex-col gap-5">
            <div>
              <h2 className="font-semibold">Client</h2>
              <div className="mt-2 text-sm text-gray-700">
                {o.user ? (
                  <>
                    <div>{[o.user.firstname, o.user.lastname].filter(Boolean).join(" ") || o.user.email}</div>
                    {o.user.email && <div className="text-gray-500">{o.user.email}</div>}
                  </>
                ) : <div>-</div>}
              </div>
            </div>

            <div>
              <h2 className="font-semibold">Paiement</h2>
              <div className="mt-2 text-sm text-gray-700">
                <div>Méthode : {o.payment_method ?? "-"}</div>
                <div>TVA : {o.vat ?? 0}%</div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Actions</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => changeStatus("confirmed")}
                  className="rounded bg-green-600 px-3 py-1.5 text-white hover:bg-green-700 disabled:opacity-50"
                  disabled={o.status === "confirmed" || o.status === "canceled"}
                >
                  confirmé
                </button>
                <button
                  onClick={() => changeStatus("canceled")}
                  className="rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-700 disabled:opacity-50"
                  disabled={o.status === "canceled"}
                >
                  Annuler
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function OrderTotals({ order }: { order: IOrder }) {
  const { subtotal, vatRate, vat, total } = computeTotals(order);
  return (
    <div className="border-t px-5 py-4">
      <div className="ml-auto w-full max-w-sm text-sm">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">Sous-total</span>
          <span className="tabular-nums">{euro(subtotal)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-600">TVA ({vatRate}%)</span>
          <span className="tabular-nums">{euro(vat)}</span>
        </div>
        <div className="flex justify-between py-2 border-t mt-2 font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{euro(total)}</span>
        </div>
      </div>
    </div>
  );
}
