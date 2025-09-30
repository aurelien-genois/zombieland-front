import { useAllActivities } from "@/hooks/activities";
import Pagination from "@/components/UI/Pagination";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
  fetchAllActivities,
  deleteActivity,
} from "@/store/reducers/activitiesReducer";
import { useCategories } from "@/hooks/categories";

export default function ActivitiesManagement() {
  const dispatch = useAppDispatch();
  const { activities, page, perPage, total, loading, error } =
    useAllActivities();

  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(perPage);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState<number | undefined>(
    undefined
  );
  const [statusQuery, setStatusQuery] = useState("");
  const [orderQuery, setOrderQuery] = useState("");
  const [ageGroupQuery, setAgeGroupQuery] = useState<number | undefined>(
    undefined
  );
  const [disabledAccessQuery, setDisabledAccessQuery] = useState<
    string | undefined
  >(undefined);
  const [highIntensityQuery, setHighIntensityAccessQuery] = useState<
    string | undefined
  >(undefined);

  const { categories } = useCategories();

  useEffect(() => {
    dispatch(
      fetchAllActivities({
        perPage: limit,
        page: currentPage,
        search: searchQuery,
        status: statusQuery,
        age_group: ageGroupQuery,
        category_id: categoryQuery,
        disabled_access:
          disabledAccessQuery !== undefined
            ? disabledAccessQuery == "true"
            : undefined,
        high_intensity:
          highIntensityQuery !== undefined
            ? highIntensityQuery == "true"
            : undefined,
        order: orderQuery,
      })
    );
  }, [
    dispatch,
    limit,
    currentPage,
    searchQuery,
    statusQuery,
    categoryQuery,
    ageGroupQuery,
    disabledAccessQuery,
    highIntensityQuery,
    orderQuery,
    successMessage,
  ]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchAllActivities({
        perPage: limit,
        page: currentPage,
        search: searchQuery,
        status: statusQuery,
        age_group: ageGroupQuery,
        category_id: categoryQuery,
        disabled_access:
          disabledAccessQuery !== undefined
            ? disabledAccessQuery == "true"
            : undefined,
        high_intensity:
          highIntensityQuery !== undefined
            ? highIntensityQuery == "true"
            : undefined,
        order: orderQuery,
      })
    );
  };

  const handleDeletion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const activityId = Number(formData.get("activity_id"));
    const activityName = formData.get("activity_name");

    if (formData.get("activity_id") && activityId) {
      dispatch(deleteActivity(activityId));
      setSuccessMessage(`L'activité "${activityName}" a bien été supprimée.`);
      e.currentTarget.closest("tr")?.remove();
    }
  };

  const displayActivitiesList = activities?.map((activity) => (
    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
      {/* Colonne Nom */}
      <td className="px-6 py-4 w-[10%] ">
        <div className="text-sm font-medium text-gray-900">{activity.name}</div>
      </td>

      {/* Colonne Slogan */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.slogan}
        </div>
      </td>

      {/* Colonne Frousse/age minimum */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.minimum_age}
        </div>
      </td>

      {/* Colonne Accès PMR */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.disabled_access ? "OUI" : "NON"}
        </div>
      </td>

      {/* Colonne Haute intensité */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.high_intensity ? "OUI" : "NON"}
        </div>
      </td>

      {/* Colonne catégorie */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.category.name}
        </div>
      </td>

      {/* Colonne Image */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.image_url ? (
            <img
              src={activity.image_url}
              height="40"
              className="h-10 max-w-20 "
            />
          ) : (
            "Aucune image"
          )}
        </div>
      </td>

      {/* Colonne statut */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.status}
        </div>
      </td>

      {/* Colonne Updated at */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {activity.updated_at}
        </div>
      </td>

      {/* Colonne Action View */}
      <td className="px-6 py-4">
        <Link
          to={`/admin/management/activities/${activity.slug}`}
          className="cursor-pointer bg-blue-500 text-white hover:bg-cyan-400 py-2 px-3 font-bold rounded-lg"
        >
          Voir
        </Link>
      </td>

      {/* Colonne Action Detete */}
      <td className="px-6 py-4">
        <form onSubmit={handleDeletion}>
          <input type="hidden" name="activity_name" value={activity.name} />
          <input type="hidden" name="activity_id" value={activity.id} />
          <input
            type="submit"
            name="delete"
            value="Supprimer"
            className="cursor-pointer bg-red-500 text-white hover:bg-red-200 py-2 px-3 font-bold rounded-lg"
          />
        </form>
      </td>
    </tr>
  ));

  return (
    <div className="max-w-7xl min-w-full mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Activities Management
        </h1>
        <p className="text-gray-600">Manage your activities here...</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <span className="text-blue-800 font-medium">
            📊 Total Activities: {total}
          </span>
        </div>
      </div>

      <Link
        to={"/admin/management/activities/creation"}
        className="bg-blue-500 text-white hover:bg-cyan-400 py-2 px-3 font-bold rounded-lg"
      >
        Créer une activité
      </Link>

      <form
        onSubmit={handleSearchSubmit}
        className="rounded-md border border-gray-200 bg-white p-4 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex-1 flex gap-2">
          <div className="flex-1">
            <label className="sr-only">Recherche</label>
            <input
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              placeholder="Recherche"
              className="w-full rounded border border-gray-300 px-3 py-2 min-w-28 "
            />
          </div>

          <select
            name="status"
            value={statusQuery}
            onChange={(e) => setStatusQuery(e.currentTarget.value)}
            className="rounded border border-gray-300 px-2 py-2"
          >
            <option value="">Tous les statuts</option>
            <option value="published">Publiées</option>
            <option value="draft">Brouillons</option>
          </select>

          <label htmlFor="age_group">
            Groupe d'âge (niveau de frousse) ?
            <select
              name="age_group"
              value={String(ageGroupQuery)}
              onChange={(e) =>
                setAgeGroupQuery(
                  e.currentTarget.value !== ""
                    ? Number(e.currentTarget.value)
                    : undefined
                )
              }
              className="rounded border border-gray-300 px-2 py-2"
            >
              <option value="">-</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>

          <label htmlFor="disabled_access">
            Accès PMR ?
            <select
              name="disabled_access"
              value={disabledAccessQuery}
              onChange={(e) =>
                setDisabledAccessQuery(
                  e.currentTarget.value !== ""
                    ? e.currentTarget.value
                    : undefined
                )
              }
              className="rounded border border-gray-300 px-2 py-2"
            >
              <option value="">-</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </label>

          <label htmlFor="hight_intensity">
            Haute intensité ?
            <select
              name="hight_intensity"
              value={highIntensityQuery}
              onChange={(e) =>
                setHighIntensityAccessQuery(
                  e.currentTarget.value !== ""
                    ? e.currentTarget.value
                    : undefined
                )
              }
              className="rounded border border-gray-300 px-2 py-2"
            >
              <option value="">-</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </label>

          <label htmlFor="category">
            Catégorie
            <select
              name="category"
              value={String(categoryQuery)}
              onChange={(e) => setCategoryQuery(Number(e.currentTarget.value))}
              className="rounded border border-gray-300 px-2 py-2"
            >
              <option value="">-</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="limit">
            Nb par page
            <select
              name="limit"
              value={String(limit)}
              onChange={(e) => setLimit(Number(e.currentTarget.value))}
              className="rounded border border-gray-300 px-2 py-2"
            >
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </label>

          <select
            name="order"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.currentTarget.value)}
            className="rounded border border-gray-300 px-2 py-2"
          >
            <option value="name:asc">Noms croissants</option>
            <option value="name:desc">Noms décroissants</option>
          </select>
          {/*
      
      
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded border px-3 py-2"
                >
                  Reset
                </button>
              </div>
      
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Afficher :</span>
                <select
                  value={pageSize}
                  onChange={(e) => changeLimit(Number(e.target.value))}
                  className="rounded border border-gray-300 px-2 py-2"
                >
                  {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <span className="text-sm text-gray-500">par page</span>
                */}
        </div>
      </form>

      {successMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading activities...</p>
          </div>
        </div>
      ) : error || !activities ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Error loading activities...</p>
          </div>
        </div>
      ) : (
        <>
          <table className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 w-[10%]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slogan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age Group (niveau de frousse)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disabled access
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  High intensity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated at
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayActivitiesList}
            </tbody>
          </table>

          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={limit}
          />
        </>
      )}
    </div>
  );
}
