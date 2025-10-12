import TableData from "@/components/UI/BackOffice/Table/TableData";
import TableRow from "@/components/UI/BackOffice/Table/TableRow";
import { useAllActivities } from "@/hooks/activities";
import Pagination from "@/components/UI/Pagination";
import Button from "@/components/UI/BackOffice/Button";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import DeleteActivityModal from "@/components/Modals/DeleteActivityModal";
import {
  fetchAllActivities,
  publishActivity,
} from "@/store/reducers/activitiesReducer";
import { useCategories } from "@/hooks/categories";
import type { IActivity } from "@/@types";
import { useLocation } from "react-router";

export default function ActivitiesManagement() {
  const dispatch = useAppDispatch();
  const { activities, page, total, loading, error } = useAllActivities();

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<IActivity | null>(
    null
  );
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(10);
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
  const [highIntensityQuery, setHighIntensityQuery] = useState<
    string | undefined
  >(undefined);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [prevFilters, setPrevFilters] = useState({
    limit,
    searchQuery,
    statusQuery,
    categoryQuery,
    ageGroupQuery,
    disabledAccessQuery,
    highIntensityQuery,
    orderQuery,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [location.pathname]);

  const { categories } = useCategories();

  useEffect(() => {
    const filtersChanged =
      prevFilters.limit !== limit ||
      prevFilters.searchQuery !== searchQuery ||
      prevFilters.statusQuery !== statusQuery ||
      prevFilters.categoryQuery !== categoryQuery ||
      prevFilters.ageGroupQuery !== ageGroupQuery ||
      prevFilters.disabledAccessQuery !== disabledAccessQuery ||
      prevFilters.highIntensityQuery !== highIntensityQuery ||
      prevFilters.orderQuery !== orderQuery;

    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1);
    }

    setPrevFilters({
      limit,
      searchQuery,
      statusQuery,
      categoryQuery,
      ageGroupQuery,
      disabledAccessQuery,
      highIntensityQuery,
      orderQuery,
    });

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
    prevFilters.limit,
    prevFilters.searchQuery,
    prevFilters.statusQuery,
    prevFilters.categoryQuery,
    prevFilters.ageGroupQuery,
    prevFilters.disabledAccessQuery,
    prevFilters.highIntensityQuery,
    prevFilters.orderQuery,
  ]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    await dispatch(
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

  const handleNewStatus = async (activityId: number, saved: boolean) => {
    await dispatch(publishActivity({ id: activityId, saved: saved }));
    setSuccessMessage(
      saved
        ? `L'activité a bien été publiée.`
        : `L'activité est bien passée en brouillon.`
    );
  };

  const handleReset = () => {
    setLimit(10);
    setCurrentPage(1);
    setOrderQuery("");
    setAgeGroupQuery(undefined);
    setDisabledAccessQuery(undefined);
    setHighIntensityQuery(undefined);
    setCategoryQuery(undefined);
    setStatusQuery("");
  };

  const handleDeletionModal = (activity: IActivity) => {
    setActivityToDelete(activity);
    setIsModalDeleteOpen(true);
  };

  const displayActivitiesList = activities?.map((activity) => (
    <TableRow key={activity.id}>
      {/* Colonne Nom */}
      <TableData nowrap={false}>{activity.name}</TableData>

      {/* Colonne Frousse/age minimum */}
      <TableData nowrap={false}>{activity.minimum_age}</TableData>

      {/* Colonne Accès PMR */}
      <TableData nowrap={false}>
        {activity.disabled_access ? "OUI" : "NON"}
      </TableData>

      {/* Colonne Haute intensité */}
      <TableData nowrap={false}>
        {activity.high_intensity ? "OUI" : "NON"}
      </TableData>

      {/* Colonne catégorie */}
      <TableData nowrap={false}>{activity.category.name}</TableData>

      {/* Colonne Image */}
      <TableData nowrap={false}>
        {activity.image_url ? (
          <img
            src={activity.image_url}
            height="40"
            className="h-10 max-w-20 "
          />
        ) : (
          "Aucune image"
        )}
      </TableData>

      {/* Colonne statut */}
      <TableData nowrap={false}>
        {activity.status}&nbsp;
        <Button
          color="blue"
          onClick={() =>
            handleNewStatus(
              activity.id,
              activity.status === "published" ? false : true
            )
          }
        >
          {activity.status === "published" ? "Passer en brouillon" : "Publier"}
        </Button>
      </TableData>

      {/* Colonne Updated at */}
      <TableData nowrap={false}>{activity.updated_at}</TableData>

      {/* Colonne Actions */}
      <TableData nowrap={true}>
        <Button
          type="router-link"
          to={`/admin/management/activities/${activity.slug}`}
        >
          Voir
        </Button>
        <Button color="red" onClick={() => handleDeletionModal(activity)}>
          Delete
        </Button>
      </TableData>
    </TableRow>
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

      <Button type="router-link" to={"/admin/management/activities/creation"}>
        Créer une activité
      </Button>

      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 text-sm rounded-md bg-white p-4 mb-4 gap-3 w-max shadow border"
      >
        <div className="flex-1">
          <label className="sr-only">Recherche</label>
          <input
            name="search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Recherche"
            ref={inputRef}
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

        <label htmlFor="age_group" className="space-x-4 place-self-center">
          <p className="inline">
            Groupe d'âge <span className="text-xs">(frousse)</span> ?
          </p>
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
            className="rounded border border-gray-300 px-2 py-2 min-w-16"
          >
            <option value="">-</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>

        <label
          htmlFor="disabled_access"
          className="space-x-4 place-self-center"
        >
          <p className="inline">Accès PMR ?</p>
          <select
            name="disabled_access"
            value={disabledAccessQuery}
            onChange={(e) =>
              setDisabledAccessQuery(
                e.currentTarget.value !== "" ? e.currentTarget.value : undefined
              )
            }
            className="rounded border border-gray-300 px-2 py-2 min-w-16"
          >
            <option value="">-</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </label>

        <label
          htmlFor="hight_intensity"
          className="space-x-4 place-self-center"
        >
          <p className="inline">Haute intensité ?</p>
          <select
            name="hight_intensity"
            value={highIntensityQuery}
            onChange={(e) =>
              setHighIntensityQuery(
                e.currentTarget.value !== "" ? e.currentTarget.value : undefined
              )
            }
            className="rounded border border-gray-300 px-2 py-2 min-w-16"
          >
            <option value="">-</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </label>

        <label htmlFor="category" className="space-x-4 place-self-center">
          <p className="inline">Catégorie</p>
          <select
            name="category"
            value={String(categoryQuery)}
            onChange={(e) => setCategoryQuery(Number(e.currentTarget.value))}
            className="rounded border border-gray-300 px-2 py-2 min-w-16"
          >
            <option value="">-</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="limit" className="space-x-4 place-self-center">
          <p className="inline">Nb par page</p>
          <select
            name="limit"
            value={String(limit)}
            onChange={(e) => setLimit(Number(e.currentTarget.value))}
            className="rounded border border-gray-300 px-2 py-2 min-w-16"
          >
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

        <Button
          color="gray"
          onClick={handleReset}
          additionalClasses="col-span-full w-max mx-auto"
        >
          Reset
        </Button>
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
      ) : activities.length ? (
        <>
          <table className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 w-[10%]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age Group
                  <br />
                  <span className="text-xs">(frousse)</span>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
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

          {isModalDeleteOpen && activityToDelete != null && (
            <DeleteActivityModal
              setIsModalOpen={setIsModalDeleteOpen}
              setActivityToDelete={setActivityToDelete}
              activity={activityToDelete}
              queries={{
                limit,
                currentPage,
                searchQuery,
                statusQuery,
                categoryQuery,
                ageGroupQuery,
                disabledAccessQuery,
                highIntensityQuery,
                orderQuery,
              }}
            />
          )}
        </>
      ) : (
        <p className="text-center">Aucune activité trouvée</p>
      )}
    </div>
  );
}
