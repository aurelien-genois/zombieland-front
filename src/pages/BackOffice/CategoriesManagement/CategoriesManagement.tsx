import Pagination from "@/components/UI/Pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/store/reducers/categoriesReducer";

export default function CategoriesManagement() {
  const dispatch = useAppDispatch();
  const { categories, page, total, loading, error } = useAppSelector(
    (state) => state.categoriesStore
  );

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(page);

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

      {/* // TODO button create category (modal or open form) */}

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
            <thead className="bg-gray-50 w-[10%]"></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayCategoriesList}
            </tbody>
          </table>

          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={limit}
          />
        </>
      ) : (
        <p className="text-center">Aucune catégorie trouvée</p>
      )}
    </div>
  );
}
