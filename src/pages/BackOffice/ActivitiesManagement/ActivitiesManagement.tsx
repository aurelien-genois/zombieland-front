import { useActivities } from "@/hooks/activities";
import Pagination from "@/pages/FrontOffice/ActivitiesPage/Pagination";
import { Link } from "react-router";

export default function ActivitiesManagement() {
  const { activities, page, perPage, total, loading, error } = useActivities();

  const displayActivitiesList = activities?.map((activity) => (
    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
      {/* Colonne Nom */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{activity.name}</div>
      </td>

      {/* Colonne Slogan */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.slogan}
        </div>
      </td>

      {/* Colonne Frousse/age minimum */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.minimum_age}
        </div>
      </td>

      {/* Colonne Accès PMR */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.disabled_access ? "OUI" : "NON"}
        </div>
      </td>

      {/* Colonne Haute intensité */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.high_intensity ? "OUI" : "NON"}
        </div>
      </td>

      {/* Colonne catégorie */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.category.name}
        </div>
      </td>

      {/* Colonne Image */}
      <td className="px-6 py-4 whitespace-nowrap">
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
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.status}
        </div>
      </td>

      {/* Colonne Updated at */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {activity.updated_at}
        </div>
      </td>
    </tr>
  ));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading activities...</p>
        </div>
      </div>
    );
  }
  if (error || !activities) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Error loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Activities Management
        </h1>
        <p className="text-gray-600">Manage your activities here...</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <span className="text-blue-800 font-medium">
            📊 Total Users: {total}
          </span>
        </div>
      </div>

      <Link to={"/creation"}>Créer une activité</Link>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayActivitiesList}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={perPage}
      />
    </div>
  );
}
