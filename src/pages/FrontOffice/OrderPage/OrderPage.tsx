import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchOneOrder } from "@/store/reducers/ordersReducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "./OrderPDF";

const mapPaymentMethod = (method: string) => {
  const paymentMethods: { [key: string]: string } = {
    credit_card: "Carte de crédit",
    paypal: "PayPal",
    bank_transfer: "Virement bancaire",
  };
  return paymentMethods[method] || method; // Retourne la valeur mappée ou la valeur brute
};

const mapOrderStatus = (method: string) => {
  const orderStatus: { [key: string]: string } = {
    confirmed: "Confirmée",
    pending: "En attente",
    canceled: "Annulée",
    refund: "Remboursée",
  };
  return orderStatus[method] || method; // Retourne la valeur mappée ou la valeur brute
};

const formatDateToFrench = (dateString: string) => {
  const date = new Date(dateString); // On transforme la string en objet Date
  const day = String(date.getDate()).padStart(2, "0"); // On récupère le jour et on le formate à 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Le mois (on ajoute 1 car les mois sont indexés de 0)
  const year = date.getFullYear(); // L'année

  return `${day}-${month}-${year}`; // Format DD-MM-YYYY
};

const getStatusClass = (status: string) => {
  const statusClasses: { [key: string]: string } = {
    confirmed: "text-green-500 font-bold",
    pending: "text-orange-500 font-bold",
    canceled: "text-red-500 font-bold",
    refund: "text-blue-500 font-bold",
  };
  return statusClasses[status] || "text-orange-500 font-bold";
};

export default function OrderPage() {
  const params = useParams();
  const orderId = Number(params.id);
  const dispatch = useAppDispatch();

  const { order, loadingOrder, orderError } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOneOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);

  if (loadingOrder) {
    return <div className="text-white bg-gray-300">Loading...</div>;
  }

  if (orderError) {
    return <div className="text-white bg-gray-300">Error: {orderError}</div>;
  }

  if (!order) {
    return <div className="text-white bg-gray-300">Order not found</div>;
  }

    const cancelOrder = (visitDateString: string) => {
    const today = new Date();
    const visitDate = new Date(visitDateString);
    const diffDate = visitDate.getTime() - today.getTime();
    const diffDays = diffDate / (1000 * 60 * 60 * 24);
    return diffDays >= 10;
  };

  return (
    <>
      <div className="mx-auto px-4 text-white text-center max-w-250">
        <h1 className="pt-7 pb-7 text-3xl font-bold">Ma commande</h1>
        <h2 className="pt-3 pb-7 text-xl font-bold">
          Détails de la commande numéro : {order.id}
        </h2>
        <div className="grid grid-cols-2 pb-7">
          <div className="text-lg">
            
            <p>
              Nom de la commande :{" "}
              <span className="font-bold">
                {mapOrderStatus(order.user.firstname)} {mapOrderStatus(order.user.lastname)}
                
              </span>
            </p>
            <p>
              Date de la commande :{" "}
              <span className="font-bold">
                {formatDateToFrench(order.order_date)}
              </span>
            </p>
            <p>
              Date de visite :{" "}
              <span className="font-bold">
                {formatDateToFrench(order.visit_date)}
              </span>
            </p>
          </div>
          <div className="text-lg">
            <p>
              Statut :{" "}
              <span className={getStatusClass(order.status)}>
                {mapOrderStatus(order.status)}
              </span>
            </p>
            <p>
              Méthode de paiement :{" "}
              <span className="font-bold">
                {mapPaymentMethod(order.payment_method)}
              </span>
            </p>
            <p>
              Code Ticket :{" "}
              <span className="font-bold">{order.ticket_code}</span>
            </p>
          </div>
        </div>
        <div className="mt-7 max-w-200 mx-auto">
          <h3 className="text-xl font-bold">Lignes de commande</h3>
          <table className="min-w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4">Produit</th>
                <th className="py-2 px-4">Prix unitaire</th>
                <th className="py-2 px-4">Quantité</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.order_lines.map((line) => (
                <tr key={line.id}>
                  <td className="py-2 px-4">{line.product.name}</td>{""}
                  {/* Affiche le product_id ou nom produit si tu l'as */}
                  <td className="py-2 px-4">{line.unit_price} €</td>
                  <td className="py-2 px-4">{line.quantity}</td>
                  <td className="py-2 px-4">
                    {line.unit_price * line.quantity} €
                  </td>
                </tr>
                
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t">
                <td colSpan={3} className="py-2 px-4 font-bold text-right">
                  TVA (5,5%) :
                </td>
                <td className="py-2 px-4 font-bold">{order.vat_amount} €</td>
                <td colSpan={4}></td>
              </tr>
              <tr className="border-t">
                <td colSpan={3} className="py-2 px-4 font-bold text-right">
                  Total :
                </td>
                <td className="py-2 px-4 font-bold">{order.total} €</td>
                <td colSpan={4}></td>
              </tr>
            </tfoot>
          </table>
          <div className="mt-15 flex sm:flex-row flex-col md:gap-2 gap-3 sm:text-lg text-xl text-center justify-center items-center mb-15">
              <Link
                to="/account"
                state={{ tab: "orders" }}
                className="w-65 justify-center gap-2 px-4 py-3 rounded-xl font-extrabold text-black bg-gray-400 hover:bg-gray-500"

              >
                Retour
              </Link>
              {cancelOrder(order.visit_date) && (
                <Link
                  to="#"
                  className="w-65 justify-center gap-2 px-4 py-3 rounded-xl font-extrabold text-white bg-red-600 hover:bg-red-500"
                >
                  Annuler la réservation
              </Link>
              )}
              {order && (
                <PDFDownloadLink
                  document={<OrderPDF order={order} />}
                  fileName={`commande-${order.id}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <span className="w-65 flex justify-center gap-2 px-4 py-3 rounded-xl font-extrabold bg-green-600 hover:bg-green-500 text-gray-400 opacity-70">Préparation du PDF...</span>
                    ) : (
                      <button className="w-65 flex justify-center gap-2 px-4 py-3 rounded-xl font-extrabold text-white bg-green-600 hover:bg-green-500">
                        Télécharger la facture
                      </button>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>
        </div>
      </div>
    </>
  );
}