import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserById } from "@/store/reducers/adminReducer";
import type { IOrder } from "@/@types";
import { fetchUserOrders } from "@/store/reducers/ordersReducer";

function formatDate(d?: string) {
  if (!d) return "-";
  try { return new Date(d).toLocaleDateString("fr-FR"); } catch { return "-"; }
}
function euro(n: number) { return `${n.toFixed(2)} €`; }

export default function UsersDetail() {
  const { id } = useParams();
  const userId = Number(id);
  const dispatch = useAppDispatch();

  const { userDetails, loading, error } = useAppSelector(s => s.adminStore);
  const { userOrdersList, loadingUserOrders, userOrdersError } = useAppSelector(s => s.ordersStore);

  useEffect(() => {
    if (!Number.isNaN(userId)) {
      dispatch(getUserById({userId}));
      dispatch(fetchUserOrders(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">User #{id}</h1>
        <Link to="/admin/management/users" className="rounded border px-3 py-2 hover:bg-gray-50">
          ← Retour liste
        </Link>
      </div>

      {/* Infos utilisateur */}
      {loading && <div className="text-gray-500">Chargement utilisateur…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {userDetails && (
        <div className="rounded-md border border-gray-200 bg-white p-5 mb-6">
          <h2 className="font-semibold mb-2">Infos utilisateur</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <div><b>ID :</b> {userDetails.id}</div>
            <div><b>Nom :</b> {[userDetails.firstname, userDetails.lastname].filter(Boolean).join(" ")}</div>
            <div><b>Email :</b> {userDetails.email}</div>
            {userDetails.role && <div><b>Rôle :</b> {userDetails.role.name}</div>}
          </div>
        </div>
      )}

      {/* Liste des commandes */}
      <div className="rounded-md border border-gray-200 bg-white overflow-hidden">
        <div className="border-b px-5 py-3 font-semibold">Commandes</div>
        {loadingUserOrders && (
          <div className="p-5 text-gray-500">Chargement des commandes…</div>
        )}
        {userOrdersError && (
          <div className="p-5 text-red-600">{userOrdersError}</div>
        )}
        {!loadingUserOrders && !userOrdersError && (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date commande</th>
                <th className="px-4 py-2 text-left">Visite</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Détails</th>
              </tr>
            </thead>
            <tbody>
              {(userOrdersList ?? []).map((o: IOrder) => (
                <tr key={o.id} className="border-t">
                  <td className="px-4 py-2">#{o.id}</td>
                  <td className="px-4 py-2">{o.status}</td>
                  <td className="px-4 py-2">{formatDate(o.order_date)}</td>
                  <td className="px-4 py-2">{formatDate(o.visit_date)}</td>
                  <td className="px-4 py-2 tabular-nums">{o.total ? euro(o.total) : "-"}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/management/orders/${o.id}`}
                      className="rounded bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-700"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
              {(!userOrdersList || userOrdersList.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    Aucune commande pour cet utilisateur.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
