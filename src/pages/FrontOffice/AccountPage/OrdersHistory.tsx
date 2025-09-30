import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUserOrders } from "@/store/reducers/ordersReducer";
import type { IOrder } from "@/@types";
import { Link } from "react-router";

const OrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userStore.userInfo);
  const { userOrdersList, loading, error } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  if (loading) return <p>Chargement des commandes...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!userOrdersList || userOrdersList.length === 0)
    return <p>Aucune commande pour l’instant.</p>;

  return (
    <div className="space-y-6 pb-15">
      <h2 className="text-xl font-bold mx-auto text-center">Mes commandes</h2>

      {userOrdersList.map((order: IOrder) => (
        <div key={order.id} className="flex justify-center pb-5">
          <div className="rounded-2xl w-150 ring-1 p-5 sm:p-6 mx-4">
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-3">
              <div>
                <p className="sm:text-lg text-xl">N° de commande</p>
                <p className="font-extrabold sm:text-lg text-2xl tracking-wide">
                  {order.ticket_code}
                </p>
              </div>
              <div className="sm:text-lg text-xl">
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

            <div className="mt-5 grid md:gap-2 gap-3 sm:text-lg text-xl text-center">
              <Link
                to={`/order/${order.id}`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white bg-green-600 hover:bg-green-500"
              >
                Afficher ma réservation
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white bg-red-600 hover:bg-red-500"
              >
                Annuler la réservation
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;