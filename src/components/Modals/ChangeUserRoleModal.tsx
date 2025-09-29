import { useState } from "react";
import ModalContainer from "./ContainerModal";
import { useAppDispatch } from "@/hooks/redux";
import { changeUserRole } from "@/store/reducers/adminReducer";
import type { IRole } from "@/@types";

type RoleName = IRole["name"]; // "admin" | "member"

interface ChangeUserRoleModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  currentRole: RoleName;
  /** Optionnel : pour refetch la liste après succès (ex: getAllUsers) */
  onChanged?: () => void;
}

export default function ChangeUserRoleModal({
  setIsModalOpen,
  userId,
  currentRole,
  onChanged,
}: ChangeUserRoleModalProps) {
  const dispatch = useAppDispatch();
  const [newRole, setNewRole] = useState<RoleName>(currentRole);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function confirm() {
    try {
      setLoading(true);
      setMsg(null);
      await dispatch(changeUserRole({ userId, newRole }));
      setMsg("Rôle mis à jour avec succès.");
      // callback externe (ex: rafraîchir la liste de users)
      onChanged?.();
      // fermer après un court délai (facultatif)
      setTimeout(() => setIsModalOpen(false), 350);
    } catch {
      setMsg("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalContainer setIsModalOpen={setIsModalOpen}>
      <div className="space-y-4 bg-white p-4 rounded">
        <h3 className="text-lg font-semibold">Changer le rôle de l’utilisateur</h3>

        <div className="text-sm text-gray-700">
          <div>
            <b>User ID :</b> {userId}
          </div>
          <div>
            <b>Rôle actuel :</b> {currentRole}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Nouveau rôle</label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as RoleName)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
        </div>

        {msg && <div className="text-sm text-blue-700">{msg}</div>}

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-3 py-1.5 rounded border text-sm hover:text-red-700"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={confirm}
            className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Changement..." : "Confirmer"}
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
