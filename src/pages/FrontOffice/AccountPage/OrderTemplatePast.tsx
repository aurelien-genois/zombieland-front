//Cette page pourra etre supprimée pour ne garder que OrderTemplate quand la gestion des dates sera effective

// Récupérer les dates des commandes pour afficher ou non le bouton modifier la commande.

export default function OrderTemplatePast() {
  return(
    <div className="flex justify-center pb-5">
      <div className="rounded-2xl w-150 ring-1 p-5 sm:p-6 mx-4">
        <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-3">
          <div>
            <p className="sm:text-lg text-xl">N° de commande</p>
            <p className="font-extrabold sm:text-lg text-2xl tracking-wide">ZMB-2025-000427</p>
          </div>
          <div className="sm:text-lg text-xl">
            <p>Passée le{" "}
              <time dateTime={"2025/09/19"}>
                {new Date("2025/09/19").toLocaleDateString("fr")}
              </time>
            </p>
            <p>
              Date de visite :{" "}
              <time dateTime={"2025/09/21"}>
                {new Date("2025/09/21").toLocaleDateString("fr")}
              </time>
            </p>
          </div>
        </div>
        <div className="mt-5 grid md:gap-2 gap-3 sm:text-lg text-xl text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-extrabold text-white bg-green-600 hover:bg-green-500"
            >
            Afficher ma réservation
          </a>
        </div>
      </div>
    </div>
  )
}