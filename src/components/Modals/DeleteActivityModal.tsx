import { useState } from "react";
import ModalContainer from "./ContainerModal";
import { useAppDispatch } from "@/hooks/redux";
import {
  deleteActivity,
  fetchAllActivities,
} from "@/store/reducers/activitiesReducer";
import type { IActivity } from "@/@types";

interface DeleteActivityModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activity: IActivity;
  // pour rafraîchir la liste après succès :
  queries: {
    currentPage: number;
    limit: number;
    searchQuery: string;
    statusQuery: string;
    categoryQuery: number | undefined;
    ageGroupQuery: number | undefined;
    disabledAccessQuery: string | undefined;
    highIntensityQuery: string | undefined;
    orderQuery: string;
  };
}

export default function DeleteActivityModal({
  setIsModalOpen,
  activity,
  queries,
}: DeleteActivityModalProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const activityName = activity.name;
      await dispatch(deleteActivity(activity.id));
      setMsg(`Activité ${activityName} supprimée avec succès.`);
      // refresh liste
      await dispatch(
        fetchAllActivities({
          perPage: queries.limit,
          page: queries.currentPage,
          search: queries.searchQuery,
          status: queries.statusQuery,
          age_group: queries.ageGroupQuery,
          category_id: queries.categoryQuery,
          disabled_access:
            queries.disabledAccessQuery !== undefined
              ? queries.disabledAccessQuery == "true"
              : undefined,
          high_intensity:
            queries.highIntensityQuery !== undefined
              ? queries.highIntensityQuery == "true"
              : undefined,
          order: queries.orderQuery,
        })
      );
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
          Supprimer cette activité ?
        </h2>
        <p className="text-xl">{activity.name}</p>
        <p className="text-sm text-gray-600">
          Cette action est irréversible (ID: {activity.id}).
        </p>

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
