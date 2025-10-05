import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { fetchOneOrder, updateOrderStatus } from "@/store/reducers/ordersReducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "./OrderPDF";
import QRCode from "qrcode";
import { ConfirmModal } from "@/components/Modals/ConfirmModal";
import type { OrderStatus } from "@/@types";


const mapPaymentMethod = (method: string) => {
  const paymentMethods: { [key: string]: string } = {
    credit_card: "Carte de crédit",
    paypal: "PayPal",
    bank_transfer: "Virement bancaire",
  };
  return paymentMethods[method] || method || "-";
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
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { order, loadingOrder, orderError } = useAppSelector(
    (state) => state.ordersStore
  );

  useEffect(() => {
    if (order?.ticket_code) {
      QRCode.toDataURL(order.ticket_code, {
        color: {
          dark: "#171717",
          light: "#FFFFFF"
        },
        width: 120,
        margin: 2,
        errorCorrectionLevel: "Q",
      })
        .then(setQrDataUrl)
        .catch(console.error);
    }
  }, [order?.ticket_code]);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOneOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);

  if (loadingOrder) {
    return <div className="text-grey-menu bg-gray-300">Loading...</div>;
  }

  if (orderError) {
    return <div className="text-grey-menu bg-gray-300">Error: {orderError}</div>;
  }

  if (!order) {
    return <div className="text-grey-menu bg-gray-300">Order not found</div>;
  }

  

    const cancelOrder = (visitDateString: string) => {
    const today = new Date();
    const visitDate = new Date(visitDateString);
    const diffDate = visitDate.getTime() - today.getTime();
    const diffDays = diffDate / (1000 * 60 * 60 * 24);
    return diffDays >= 10;
  };
  function changeStatus(s: OrderStatus) {
    if (!order || order.status === s) return;
    dispatch(updateOrderStatus({ id: order.id, status: s }));
    dispatch(fetchOneOrder(order.id));
    }

  const handleOpenCancelModal = () => setConfirmOpen(true);
  const handleCloseCancelModal = () => setConfirmOpen(false);

  const handleConfirmCancel = async () => {
    changeStatus("canceled")
    setConfirmOpen(false);
  };
  const isCancelDisabled = order.status === "canceled" || order.status === "refund";

  return (
    <>
      <div className="mx-auto px-4 text-grey-menu text-center max-w-250">
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
                {order.payment_method ? (mapPaymentMethod(order.payment_method)): null}  
              </span>
            </p>
            <p>
              Code Ticket :
              <span className="font-bold">{order.ticket_code}</span>
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-5">QR code des tickets</h3>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code" className="mx-auto" />
          ) : (
            <p>Chargement du QR code...</p>
          )}
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
                  <td className="py-2 px-4">{line.product?.name ?? "—"}</td>{""}
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
                <button
                  type="button"
                  onClick={handleOpenCancelModal}
                  disabled={isCancelDisabled}
                  title={isCancelDisabled ? "Commande déjà annulée" : "Annuler la réservation"}
                  className={[
                    "w-65 justify-center gap-2 px-4 py-3 rounded-xl font-extrabold text-white",
                    "bg-red-600 hover:bg-red-500",
                    // états disabled
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
                  ].join(" ")}
                  aria-disabled={isCancelDisabled}
                >
                  Annuler la réservation
                </button>
              )}
              {order && (
                <PDFDownloadLink
                  document={<OrderPDF order={order} />}
                  fileName={`commande-${order.id}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <span className="w-65 flex justify-center gap-2 px-4 py-3 rounded-xl font-extrabold bg-dark-blue-buttons hover:bg-blue-700 text-gray-400 opacity-70">Préparation du PDF...</span>
                    ) : (
                      <button className="w-65 flex justify-center gap-2 px-4 py-3 rounded-xl font-extrabold text-white bg-dark-blue-buttons hover:bg-blue-700">
                        Télécharger la facture
                      </button>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>
        </div>
      </div>

      {/* Modale de confirmation */}
      <ConfirmModal
        open={confirmOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        title="Confirmer l’annulation"
        message={`Tu es sur le point d’annuler la réservation n°${order.id} du ${formatDateToFrench(order.visit_date)}.`}
        confirmLabel="Oui, annuler"
        cancelLabel="Non, revenir"
      />
    </>
  );
}