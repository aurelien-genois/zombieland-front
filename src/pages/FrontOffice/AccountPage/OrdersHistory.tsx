import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUserOrders } from "@/store/reducers/ordersReducer";
import type { IOrder } from "@/@types";
import { Link } from "react-router";

const OrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userStore.userInfo);
  const { userOrdersList, loadingUserOrders, userOrdersError } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  if (loadingUserOrders) return <p>Chargement des commandes...</p>;

  if (userOrdersError) return <p className="text-red-500">{userOrdersError}</p>;

  if (!userOrdersList || userOrdersList.length === 0)
    return <p>Aucune commande pour l’instant.</p>;

  const cancelOrder = (visitDateString: string) => {
    const today = new Date();
    const visitDate = new Date(visitDateString);
    const diffDate = visitDate.getTime() - today.getTime();
    const diffDays = diffDate / (1000 * 60 * 60 * 24);
    return diffDays >= 10;
  };

  const upcomingOrders = userOrdersList.filter((order) => {
    const visitDate = new Date(order.visit_date);
    const today = new Date();
    return visitDate >= today;
  });

  const pastOrders = userOrdersList.filter((order) => {
    const visitDate = new Date(order.visit_date);
    const today = new Date();
    return visitDate < today;
  });

  const renderOrderCard = (order: IOrder) => {
    const showCancelButton = cancelOrder(order.visit_date);

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
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white-bg hover:text-dark-blue-buttons bg-dark-blue-buttons hover:bg-dark-blue-buttons/500"
            >
              Afficher ma réservation
            </Link>

            {showCancelButton && (
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white bg-red-600 hover:bg-red-500"
              >
                Annuler la réservation
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-15">
      <h2 className="text-2xl font-bold mx-auto text-center">Mes commandes</h2>

      {upcomingOrders.length > 0 && (
        <div className="space-y-6">
          {upcomingOrders.map((order) => renderOrderCard(order))}
        </div>
      )}

      <h2 className="text-2xl font-bold mx-auto text-center">Historique des commandes</h2>

      {pastOrders.length > 0 && (
          <div className="space-y-6 opacity-70">
            {pastOrders.map((order) => renderOrderCard(order))}
          </div>
      )}
    </div>
  );
};

export default OrderHistory;