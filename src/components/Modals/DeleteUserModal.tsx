import { useState } from "react";
import ModalContainer from "./ContainerModal";
import { useAppDispatch } from "@/hooks/redux";
import { deleteUser, getAllUsers } from "@/store/reducers/adminReducer";

interface DeleteUserModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  // pour rafraîchir la liste après succès :
  page: number;
  limit: number;
  q: string | null;
}

export default function DeleteUserModal({
  setIsModalOpen,
  userId,
  page,
  limit,
  q,
}: DeleteUserModalProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await dispatch(deleteUser({ userId }));
      setMsg("Utilisateur supprimé avec succès.");
      // refresh liste
      await dispatch(getAllUsers({ page, limit, q }));
      // ferme après un petit délai (optionnel)
      setTimeout(() => setIsModalOpen(false), 300);
    } catch {
      setMsg("Une erreur est survenue. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalContainer setIsModalOpen={setIsModalOpen}>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center border border-red-600">
        <h2 className="text-lg font-semibold mb-2">Supprimer cet utilisateur ?</h2>
        <p className="text-sm text-gray-600">Cette action est irréversible (ID: {userId}).</p>

        <form onSubmit={onSubmit}>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Suppression..." : "Supprimer"}
            </button>
          </div>

          {msg && <div className="mt-4 text-red-600">{msg}</div>}
        </form>
      </div>
    </ModalContainer>
  );
}
