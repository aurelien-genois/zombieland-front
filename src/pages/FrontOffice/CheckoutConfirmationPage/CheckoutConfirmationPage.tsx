import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import type { RootState, AppDispatch } from "@/store";
import { fetchOneOrder } from "@/store/reducers/ordersReducer";






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

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
    {/* Colonne 1-2 : contenu */}
    <section className="lg:col-span-2 space-y-6">
      {/* Bandeau succès */}
      <div className="rounded-2xl bg-green-500/10 ring-1 ring-green-500/30 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="inline-block size-8 bg-green-400 rounded-full shrink-0
            [mask:url(/icon/check.svg)_no-repeat_center/60%]"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
              Commande confirmée !
            </h1>
            <p className="text-white/80 mt-1">
              Merci pour votre réservation. Vous recevrez un email de confirmation avec vos billets.
            </p>
          </div>
        </div>
      </div>
  
      {/* En-tête commande */}
      <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-white/60 text-sm">N° de commande</p>
            <p className="font-extrabold text-lg tracking-wide">
              {order.ticket_code ?? `#${order.id}`}
            </p>
          </div>
  
          <div className="text-sm text-white/80">
            <p>
              Passée le{" "}
              <time dateTime={order.visit_date}>
                {new Date(order.visit_date).toLocaleDateString("fr")}
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
  
        <div className="mt-4 text-sm text-white/70">
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
      <div className="rounded-2xl ring-1 ring-white/10 bg-black/40 p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide text-brand">
          Vos billets
        </h2>
  
        <ul className="mt-4 divide-y divide-white/10">
          {order.order_lines.map((line) => (
            <li key={line.id} className="py-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{line.product?.name}</p>
                <p className="text-sm text-white/70">
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
        <div className="rounded-2xl ring-1 ring-white/10 bg-black/50 p-5 sm:p-6">
          <h3 className="text-lg font-extrabold tracking-wide">Récapitulatif</h3>
  
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-white/70">Sous-total</span>
              <span className="tabular-nums">{subtotal.toFixed(2)} €</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-white/70">TVA ({Number(order.vat).toFixed(2)} %)</span>
              <span className="tabular-nums">{vat_amount.toFixed(2)} €</span>
            </li>
            <li className="flex justify-between text-base font-bold pt-1 border-t border-white/10">
              <span>Total</span>
              <span className="tabular-nums">{total.toFixed(2)} €</span>
            </li>
          </ul>
  
          <div className="mt-5 grid gap-2">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-green-600 hover:bg-green-500"
            >
              Télécharger les billets (PDF)
            </a>
  
            <Link
              to="/account/orders"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-white/10 hover:bg-white/15"
            >
              Voir mes réservations
            </Link>
  
            <Link
              to="/activities"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold bg-white/5 hover:bg-white/10"
            >
              Continuer à explorer le parc
            </Link>
          </div>
  
          <p className="mt-3 text-[12px] text-white/60">
            Un e-mail contenant votre reçu et vos billets a été envoyé à{" "}
            <strong>{order.user?.email}</strong>.
          </p>
        </div>
  
        <div className="rounded-xl bg-white/5 p-4 text-sm text-white/70">
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