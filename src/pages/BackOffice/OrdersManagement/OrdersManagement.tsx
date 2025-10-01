import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchAllOrders } from "@/store/reducers/ordersReducer";
import type { IOrder, OrderStatus, OrdersSort } from "@/@types/order";
import { Link } from "react-router";
import Pagination from "@/components/UI/Pagination";

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

function computeTotal(order: IOrder) {
  // fallback si le back ne renvoie pas total/subtotal
  if (typeof order.total === "number") return order.total;
  const subtotal = order.order_lines.reduce(
    (s, l) => s + l.unit_price * l.quantity,
    0
  );
  const vatRate = Number(order.vat) || 0;
  const vat = +(subtotal * (vatRate / 100)).toFixed(2);
  return +(subtotal + vat).toFixed(2);
}

export default function OrdersManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    orders,
    loadingOrders,
    ordersError,
    page,
    perPage,
    total,
    search,
    status,
    orderSort,
    meta,
  } = useSelector((s: RootState) => s.ordersStore);


  const [currentPage, setCurrentPage] = useState(page || 1);
  const [limit, setLimit] = useState(perPage || 10);

  const [q, setQ] = useState(search ?? "");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">(status);
  const [sort, setSort] = useState<OrdersSort>(orderSort);

  useEffect(() => {
      dispatch(fetchAllOrders({
        perPage: limit, page: currentPage, search: q || undefined, status: statusFilter !== "all" ? statusFilter : undefined, order: sort,
        total: 0,
        totalCount: 0,
        totalPages: 0,
        hasPrev: false,
        hasNext: false
      }));
    }, [dispatch, limit, currentPage, q, statusFilter, sort]);

    function handleSearchSubmit(e: React.FormEvent) {
      e.preventDefault();
      setCurrentPage(1); 
      dispatch(fetchAllOrders({
        page: 1,
        perPage: limit,
        search: q || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        order: sort,
        total: 0,
        totalCount: 0,
        totalPages: 0,
        hasPrev: false,
        hasNext: false
      }));
    }

    function resetFilters() {
      setQ("");
      setLimit(10);
      setCurrentPage(1);
      setStatusFilter("all");
      setSort("order_date:desc");
      dispatch(fetchAllOrders({
        page: 1, perPage: 10, order: "order_date:desc",
        total: 0,
        totalCount: 0,
        totalPages: 0,
        hasPrev: false,
        hasNext: false
      }));
    }

    const totalItems = (typeof total === "number" ? total : (meta?.totalCount ?? orders.length)) || 0;





  const headerTitle = useMemo(
    () => `Orders Management`,
    []
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold mb-1">{headerTitle}</h1>
      <p className="text-sm text-gray-500 mb-4">Manage your orders here…</p>

      {/* Barre d’actions */}
      <form onSubmit={handleSearchSubmit} className="rounded-md border border-gray-200 bg-white p-4 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <label className="sr-only">Recherche</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Recherche (email, nom, moyen de paiement...)"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
            className="rounded border border-gray-300 px-2 py-2"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="canceled">canceled</option>
            <option value="refund">refund</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as OrdersSort)}
            className="no-arrow rounded border border-gray-300 py-2 pl-2 pr-8 bg-white focus:outline-none"
          >
            <option value="order_date:desc">Order date</option>
            <option value="order_date:asc">Order date</option>
            <option value="visit_date:desc">Visit date</option>
            <option value="visit_date:asc">Visit date</option>
            <option value="status:asc">Status</option>
            <option value="status:desc">Status</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded border px-3 py-2"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Afficher :</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1); // reset page quand on change le nombre par page
            }}
            className="rounded border border-gray-300 px-2 py-2"
          >
            {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="text-sm text-gray-500">par page</span>
        </div>
      </form>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Visit</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Lines</th>
              <th className="px-4 py-3 text-left">Détails</th>
            </tr>
          </thead>

          <tbody>
            {loadingOrders && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  Chargement des commandes…
                </td>
              </tr>
            )}

            {!loadingOrders && ordersError && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-red-500">
                  {ordersError}
                </td>
              </tr>
            )}

            {!loadingOrders && !ordersError && orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  Aucune commande.
                </td>
              </tr>
            )}

            {!loadingOrders && !ordersError && orders.map((o) => {
              const total = computeTotal(o);
              const client =
                o.user
                  ? `${o.user.firstname ?? ""} ${o.user.lastname ?? ""}`.trim() || o.user.email
                  : "-";
              return (
                <tr key={o.id} className="border-t">
                  <td className="px-4 py-3">#{o.id}</td>
                  <td className="px-4 py-3">{client}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(o.visit_date)}</td>
                  <td className="px-4 py-3">{formatDate(o.visit_date)}</td>
                  <td className="px-4 py-3 tabular-nums">{total.toFixed(2)} €</td>
                  <td className="px-4 py-3">{o.order_lines.length}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/management/orders/${o.id}`}
                      className="inline-flex items-center rounded bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={limit}
        totalItems={totalItems}
      />
    </div>
  );
}
