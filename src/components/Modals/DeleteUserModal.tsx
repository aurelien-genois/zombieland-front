import { useState } from "react";
import ModalContainer from "./ContainerModal";
import { useAppDispatch } from "@/hooks/redux";
import { deleteUser, getAllUsers } from "@/store/reducers/adminReducer";
import Button from "@/components/UI/BackOffice/Button";

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
        <h2 className="text-lg font-semibold mb-2">
          Supprimer cet utilisateur ?
        </h2>
        <p className="text-sm text-gray-600">
          Cette action est irréversible (ID: {userId}).
        </p>

        <form onSubmit={onSubmit}>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              color="gray"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" color="red" disabled={loading}>
              {loading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>

          {msg && <div className="mt-4 text-red-600">{msg}</div>}
        </form>
      </div>
    </ModalContainer>
  );
}
