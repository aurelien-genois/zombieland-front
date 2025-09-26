import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllUsers } from "@/store/reducers/adminReducer";
import { useEffect } from "react";

export default function UsersManagement() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminStore.usersList);

  console.log(">>>Users: !!", users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const displayUsersList = users?.data.map((user) => (
    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
      {/* Colonne Avatar + Prénom */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.firstname}
            </div>
          </div>
        </div>
      </td>

      {/* Colonne Nom */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.lastname}</div>
      </td>

      {/* Colonne Email */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.email}</div>
      </td>

      {/* Colonne Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Colonne Role */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user?.role?.name || "N/A"}
      </td>

      {/* Colonne Phone */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.phone || "N/A"}
      </td>

      {/* Colonne Last Login */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.last_login
          ? new Date(user.last_login).toLocaleDateString("fr-FR")
          : "Never"}
      </td>
    </tr>
  ));

  if (!users) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Users Management
        </h1>
        <p className="text-gray-600">Manage your users here...</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <span className="text-blue-800 font-medium">
            📊 Total Users: {users.data.length}
          </span>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayUsersList}
          </tbody>
        </table>
      </div>
    </div>
  );
}
