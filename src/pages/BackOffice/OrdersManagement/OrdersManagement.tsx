import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  clearProductErrors,
  type Product,
  toggleProductStatus,
} from "@/store/reducers/productsReducer";

type Draft = { name: string; price: string; status: "draft" | "published" };

export default function ProductsManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    loadingList,
    listError,
    creating,
    createError,
    updateError,
    updatingId,
    deletingId,
  } = useSelector((s: RootState) => s.productsStore);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState<Draft>({ name: "", price: "", status: "published" });

  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const headerTitle = useMemo(() => `Products Management`, []);

  const openCreate = () => {
    dispatch(clearProductErrors());
    setEditing(null);
    setDraft({ name: "", price: "", status: "published" });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    dispatch(clearProductErrors());
    setEditing(p);
    setDraft({
      name: p.name,
      price: String(p.price),
      status: (p.status as "draft" | "published") ?? "published",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    if (creating || updatingId) return; // évite de fermer pendant submit
    setShowForm(false);
    setEditing(null);
    setDraft({ name: "", price: "", status: "published" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = draft.name.trim();
    const price = Number(draft.price);

    if (!name || !Number.isFinite(price) || price <= 0) {
      alert("Nom et prix (> 0) requis.");
      return;
    }
    try {
      if (editing) {
        await dispatch(
          updateProduct({
            id: editing.id,
            patch: { name, price: +price.toFixed(2), status: draft.status },
          })
        ).unwrap();
      } else {
        await dispatch(
          createProduct({
            name,
            price: +price.toFixed(2),
            status: draft.status,
          })
        ).unwrap();
      }
      closeForm();
    } catch (err) {
      // les messages sont gérés via createError / updateError
      console.log(err);
    }
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;
    try {
      await dispatch(deleteProduct({ id: deleteId })).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.log(err);
    }
  };

  function StatusBadge({ status }: { status: "draft" | "published" | string }) {
    const isPublished = status === "published";
    const cls = isPublished ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700";
    const label = isPublished ? "Publié" : "Brouillon";
    return (
      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${cls}`}>
        {label}
      </span>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold mb-1">{headerTitle}</h1>
      <p className="text-sm text-gray-500 mb-4">Gérez vos produits ici…</p>

      <button
        onClick={openCreate}
        className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 transition-colors"
      >
        Ajouter
      </button>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white mt-3">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Prix</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 mx-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loadingList && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  Chargement des produits...
                </td>
              </tr>
            )}

            {!loadingList && listError && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-red-500">
                  {listError}
                </td>
              </tr>
            )}

            {!loadingList && !listError && products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  Aucun produit.
                </td>
              </tr>
            )}

            {!loadingList &&
              !listError &&
              products.map((product) => {
                const isUpdating = updatingId === product.id;
                const isDeleting = deletingId === product.id;

                const nextStatus: "draft" | "published" =
                  product.status === "published" ? "draft" : "published";

                return (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-3">#{product.id}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.price.toFixed(2)}€</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => openEdit(product)}
                        disabled={isDeleting}
                        className="cursor-pointer inline-flex items-center px-3 py-1 mx-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors disabled:opacity-50"
                      >
                        {isUpdating ? "…" : "Éditer"}
                      </button>

                      <button
                        onClick={() => setDeleteId(product.id)}
                        disabled={isUpdating}
                        className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors disabled:opacity-50"
                      >
                        {isDeleting ? "…" : "Supprimer"}
                      </button>

                      <button
                        onClick={() =>
                          dispatch(toggleProductStatus({ id: product.id, nextStatus })).unwrap().catch(console.error)
                        }
                        disabled={isDeleting || isUpdating}
                        className="cursor-pointer inline-flex items-center px-3 py-1 mx-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50"
                        title="Basculer le statut"
                      >
                        {product.status === "published" ? "Mettre en brouillon" : "Publier"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50">
          <div className="bg-white rounded-lg shadow w-full max-w-md p-5">
            <h3 className="text-lg font-bold mb-3">
              {editing ? "Modifier un produit" : "Ajouter un produit"}
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nom</label>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Nom du produit"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Prix (€)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={draft.price}
                  onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Statut</label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, status: e.target.value as Draft["status"] }))
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>

              {(editing ? updateError : createError) && (
                <p className="text-sm text-red-600">{editing ? updateError : createError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating || !!updatingId}
                  className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
                >
                  {editing
                    ? updatingId
                      ? "Enregistrement…"
                      : "Enregistrer"
                    : creating
                    ? "Création…"
                    : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Delete confirm */}
      {deleteId != null && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50">
          <div className="bg-white rounded-lg shadow w-full max-w-md p-5">
            <h3 className="text-lg font-bold mb-3">Supprimer le produit</h3>
            <p className="text-sm text-gray-600">
              Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible.
            </p>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === deleteId}
                className="px-3 py-2 rounded bg-red-600 hover:bg-red-500 text-white disabled:opacity-50"
              >
                {deletingId === deleteId ? "Suppression…" : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}