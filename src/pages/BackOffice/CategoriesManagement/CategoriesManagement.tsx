import Pagination from "@/components/UI/Pagination";
import DeleteCategoryModal from "@/components/Modals/DeleteCategoryModal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import {
  createCategory,
  fetchCategories,
  updateCategory,
} from "@/store/reducers/categoriesReducer";
import type { ICategory } from "@/@types";

export default function CategoriesManagement() {
  const dispatch = useAppDispatch();
  const { categories, page, perPage, total, loading, error } = useAppSelector(
    (state) => state.categoriesStore
  );

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isEditingMode, setEditingMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
  const [isCreatingMode, setCreatingMode] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    dispatch(fetchCategories({ page: currentPage, perPage: 20 }));
  }, [dispatch, currentPage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const {
      name = "",
      color = "",
      category_id = "",
    } = Object.fromEntries(formData) as {
      name?: string;
      color?: string;
      category_id?: number;
    };

    setFormError(null);

    // TODO validation

    if (category_id && Number(category_id) > 0) {
      await dispatch(
        updateCategory({
          formData,
          id: category_id,
        })
      );
      setSuccessMessage("La catégorie a bien été mise à jour.");
    } else {
      await dispatch(
        createCategory({
          formData,
        })
      );
      setSuccessMessage("La catégorie a bien été créée.");
    }
    setEditingMode(false);
    setCreatingMode(false);
    setCategoryToEdit(null);
    // pour rafraîchir la liste après succès :
    dispatch(fetchCategories({ page: currentPage, perPage: 20 }));
  };

  const displayCategoriesList = categories?.map((category) => (
    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
      {/* Colonne Nom */}
      <td className="px-6 py-4 w-[10%] ">
        <div className="text-sm font-medium text-gray-900">{category.name}</div>
      </td>

      {/* Colonne Couleur */}
      <td className="px-6 py-4 w-[10%] ">
        <div className="text-sm font-medium text-gray-900">
          {category.color}
        </div>
      </td>
      {/* Colonne Actions */}
      <td className="px-6 py-4 w-[10%] ">
        <div className="text-sm font-medium text-gray-900">
          <button
            type="button"
            onClick={() => {
              setEditingMode(true);
              setCategoryToEdit(category);
            }}
            className="cursor-pointer bg-blue-500 text-white hover:bg-cyan-400 py-2 px-3 font-bold rounded-lg"
          >
            Modifier
          </button>
          <button
            type="button"
            onClick={() => {
              setIsModalDeleteOpen(true);
              setCategoryToDelete(category);
            }}
            className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="max-w-7xl min-w-full mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Categories Management
        </h1>
        <p className="text-gray-600">Manage your categories here...</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <span className="text-blue-800 font-medium">
            📊 Total Categories: {total}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCreatingMode(true)}
        className="cursor-pointer bg-blue-500 text-white hover:bg-cyan-400 py-2 px-3 font-bold rounded-lg"
      >
        Créer une catégorie
      </button>

      {successMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {isCreatingMode || (isEditingMode && categoryToEdit != null) ? (
        <form
          onSubmit={handleSubmit}
          className="mx-auto px-5 md:max-w-200 sm:max-w-150"
        >
          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError}
            </div>
          )}

          <input
            type="text"
            name="name"
            minLength={3}
            defaultValue={categoryToEdit ? categoryToEdit.name : ""}
            required
          />
          <input
            type="text"
            name="color"
            placeholder="#05AB45"
            maxLength={7}
            defaultValue={categoryToEdit ? categoryToEdit.color : ""}
            pattern="^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$"
            required
          />
          {categoryToEdit && (
            <input type="hidden" name="category_id" value={categoryToEdit.id} />
          )}

          <input
            type="submit"
            name="save"
            disabled={loading}
            className="cursor-pointer w-50 bg-green-bg-btn hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-1 px-3 text-white font-bold border-3 text-2xl sm:text-lg border-grey-border-btn text-center block mx-auto"
            value={loading ? "Enregistrement..." : "Enregistrer"}
          />
        </form>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      ) : error || !categories ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Error loading categories...</p>
          </div>
        </div>
      ) : categories.length ? (
        <>
          <table className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 w-[10%]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Couleur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayCategoriesList}
            </tbody>
          </table>

          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={perPage}
          />

          {isModalDeleteOpen && categoryToDelete != null && (
            <DeleteCategoryModal
              setIsModalOpen={setIsModalDeleteOpen}
              setCategoryToDelete={setCategoryToDelete}
              category={categoryToDelete}
              queries={{
                currentPage,
              }}
            />
          )}
        </>
      ) : (
        <p className="text-center">Aucune catégorie trouvée</p>
      )}
    </div>
  );
}
