import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import type { RootState, AppDispatch } from "@/store";
import { fetchOneOrder } from "@/store/reducers/ordersReducer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "../OrderPage/OrderPDF";

export default function CheckoutConfirmationPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loadingOrder, order, orderError } = useSelector((s: RootState) => s.ordersStore);

  // charge la commande
  useEffect(() => {
    const orderId = Number(id);
    if (!Number.isFinite(orderId)) return;
    dispatch(fetchOneOrder(orderId));
  }, [dispatch, id]);

  const lines = order?.order_lines ?? [];
  const subtotal   = lines.reduce((s,l) => s + l.unit_price * l.quantity, 0);
  const vatRate    = Number(order?.vat ?? 0);
  const vat_amount = +(subtotal * (vatRate / 100)).toFixed(2);
  const total      = +(subtotal + vat_amount).toFixed(2);

   // fallback UI
   if (!id || !Number.isFinite(Number(id))) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white">
        ID de commande invalide.
      </div>
    );
  }

  if (loadingOrder) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white">
        Chargement de votre commande…
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-400">
        Erreur : {orderError}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white">
        Aucune donnée pour cette commande.
      </div>
    );
  }

 
  return(

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-grey-menu">
    {/* Colonne 1-2 : contenu */}
    <section className="lg:col-span-2 space-y-6">
      {/* Bandeau succès */}
      <div className="rounded-2xl bg-green-800/80 ring-1 ring-green-500/30 p-4 sm:py-6 flex flex-col items-start gap-4">
          <h1 className="text-2xl text-white-bg sm:text-3xl font-extrabold tracking-wide">
            Commande confirmée !
          </h1>
          <p className="text-white-bg font-bold mt-1">
            Merci pour votre réservation. Vous recevrez un email de confirmation avec vos billets.
          </p>
      </div>
  
      {/* En-tête commande */}
      <div className="rounded-2xl ring-1 ring-white/10 bg-black/10 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-grey-menu text-sm">N° de commande</p>
            <p className="font-extrabold text-lg tracking-wide">
              {order.ticket_code ?? `#${order.id}`}
            </p>
          </div>
  
          <div className="text-sm text-grey-menu">
            <p>
              Passée le{" "}
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
  
        <div className="mt-4 text-sm text-grey-menu">
          <p>
            Acheteur :{" "}
            <strong>
              {order.user?.firstname} {order.user?.lastname}
            </strong>{" "}
            — {order.user?.email}
          </p>
        </div>
      </div>
  
      {/* Billets */}
      <div className="rounded-2xl ring-1 ring-white/10 bg-black/10 p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">
          Vos billets
        </h2>
  
        <ul className="mt-4 divide-y divide-white/10">
          {order.order_lines.map((line) => (
            <li key={line.id} className="py-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{line.product?.name}</p>
                <p className="text-sm text-grey-menu">
                  Quantité : <span className="tabular-nums">{line.quantity}</span>
                  {" "}— Prix unitaire : {line.unit_price.toFixed(2)} €
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold tabular-nums">
                  {(line.unit_price * line.quantity).toFixed(2)} €
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  
    {/* Colonne 3 : récap sticky */}
    <aside className="lg:col-span-1">
      <div className="lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl ring-1 ring-white/10 bg-black/10 p-5 sm:p-6">
          <h3 className="text-lg font-extrabold tracking-wide">Récapitulatif</h3>
  
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-grey-menu">Sous-total</span>
              <span className="tabular-nums">{subtotal.toFixed(2)} €</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-grey-menu">TVA ({Number(order.vat).toFixed(2)} %)</span>
              <span className="tabular-nums">{vat_amount.toFixed(2)} €</span>
            </li>
            <li className="flex justify-between text-base font-bold pt-1 border-t border-white/10">
              <span>Total</span>
              <span className="tabular-nums">{total.toFixed(2)} €</span>
            </li>
          </ul>
  
          <div className="mt-5 grid gap-2">
            {order && (
                <PDFDownloadLink
                  document={<OrderPDF order={order} />}
                  fileName={`commande-${order.id}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <span className="text-gray-6text-grey-menu00">Préparation du PDF...</span>
                    ) : (
                      <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white-bg bg-dark-blue-buttons hover:bg-blue-700">
                        Télécharger la facture
                      </button>
                    )
                  }
                </PDFDownloadLink>
              )}
  
            <Link
              to={`/order/${order.id}`}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-gray-400 hover:bg-gray-300"
            >
              Voir mes réservations
            </Link>
  
            <Link
              to="/activities"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-gray-400 hover:bg-gray-300"
            >
              Continuer à explorer le parc
            </Link>
          </div>
  
          <p className="mt-3 text-[12px] text-grey-menu">
            Un e-mail contenant votre reçu et vos billets a été envoyé à{" "}
            <strong>{order.user?.email}</strong>.
          </p>
        </div>
  
        <div className="rounded-xl bg-white/5 p-4 text-sm text-grey-menu">
          <p>
            Rappel : l’annulation est possible jusqu’à <strong>48 h</strong> avant la date de visite.
            Pour toute question, contactez-nous via la page Contact.
          </p>
        </div>
      </div>
    </aside>
  </div>

  )
}