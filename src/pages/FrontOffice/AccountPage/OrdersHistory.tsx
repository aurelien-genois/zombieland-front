import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchOneOrder, fetchUserOrders, updateOrderStatus } from "@/store/reducers/ordersReducer";
import type { IOrder, OrderStatus } from "@/@types";
import { Link } from "react-router";
import { ConfirmModal } from "@/components/Modals/ConfirmModal";

const OrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userStore.userInfo);
  const { userOrdersList, loadingUserOrders, userOrdersError } = useAppSelector(
    (state) => state.ordersStore
  );

  // --- état du modale + commande ciblée ---
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (user?.id) dispatch(fetchUserOrders(user.id));
  }, [dispatch, user]);

  if (loadingUserOrders) return <p>Chargement des commandes...</p>;
  if (userOrdersError) return <p className="text-red-500">{userOrdersError}</p>;
  if (!userOrdersList || userOrdersList.length === 0) return <p>Aucune commande pour l’instant.</p>;

  const canCancel = (visitDateString: string) => {
    const today = new Date();
    const visitDate = new Date(visitDateString);
    const diffDays = (visitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 10;
  };

  const formatDateToFrench = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // change le statut POUR LA COMMANDE SÉLECTIONNÉE
  async function changeStatus(order: IOrder, s: OrderStatus) {
    if (!order || order.status === s) return;
    await dispatch(updateOrderStatus({ id: order.id, status: s }));
    // rafraîchir la liste + la fiche (au cas où tu l’ouvres derrière)
    if (user?.id) dispatch(fetchUserOrders(user.id));
    dispatch(fetchOneOrder(order.id));
  }

  const handleOpenCancelModal = (order: IOrder) => {
    setSelectedOrder(order);
    setConfirmOpen(true);
  };
  const handleCloseCancelModal = () => {
    setConfirmOpen(false);
    setSelectedOrder(null);
  };
  const handleConfirmCancel = async () => {
    if (!selectedOrder) return;
    await changeStatus(selectedOrder, "canceled");
    handleCloseCancelModal();
  };

  const upcomingOrders = userOrdersList.filter(o => new Date(o.visit_date) >= new Date());
  const pastOrders = userOrdersList.filter(o => new Date(o.visit_date) < new Date());

  const renderOrderCard = (order: IOrder) => {
    const showCancelButton = canCancel(order.visit_date) && order.status !== "canceled" && order.status !== "refund";

    return (
      <div key={order.id} className="flex justify-center pb-5">
        <div className="rounded-2xl w-150 ring-1 p-5 sm:p-6 mx-4">
          <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-3">
            <div>
              <p className="sm:text-base text-xl">N° de commande</p>
              <p className="font-extrabold sm:text-base text-xl tracking-wide">
                {order.ticket_code}
              </p>
            </div>
            <div className="sm:text-base text-xl">
              <p>
                Passée le :{" "}
                <time dateTime={order.order_date}>
                  {new Date(order.order_date).toLocaleDateString("fr")}
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

          <div className="mt-5 grid md:gap-2 gap-3 sm:text-base text-xl text-center">
            <Link
              to={`/order/${order.id}`}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white bg-dark-blue-buttons hover:bg-blue-700"
            >
              Afficher ma réservation
            </Link>

            {showCancelButton && (
              <button
                type="button"
                onClick={() => handleOpenCancelModal(order)}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white bg-red-600 hover:bg-red-500"
              >
                Annuler la réservation
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-10 pb-15">
      <h2 className="text-2xl font-bold mx-auto text-center">Mes commandes</h2>

      {upcomingOrders.length > 0 && (
        <div className="space-y-6">
          {upcomingOrders.map(renderOrderCard)}
        </div>
      )}

      <h2 className="text-2xl font-bold mx-auto text-center">Historique des commandes</h2>

      {pastOrders.length > 0 && (
        <div className="space-y-6 opacity-70">
          {pastOrders.map(renderOrderCard)}
        </div>
      )}

      {/* --- Un seul modale global, piloté par selectedOrder --- */}
      <ConfirmModal
        open={confirmOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        title="Confirmer l’annulation"
        message={
          selectedOrder
            ? `Tu es sur le point d’annuler la réservation n°${selectedOrder.id} du ${formatDateToFrench(selectedOrder.visit_date)}.`
            : "Confirmer l’annulation ?"
        }
        confirmLabel="Oui, annuler"
        cancelLabel="Non, revenir"
      />
    </div>
  );
};

export default OrderHistory;
