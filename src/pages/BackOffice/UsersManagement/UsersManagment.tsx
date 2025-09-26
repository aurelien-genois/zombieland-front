import TableData from "@/components/UI/BackOffice/Table/TableData";
import TableRow from "@/components/UI/BackOffice/Table/TableRow";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeUserRole, getAllUsers } from "@/store/reducers/adminReducer";
import { useEffect, useState } from "react";

export default function UsersManagement() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminStore.usersList);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAllTable, setShowAllTable] = useState(true);

  useEffect(() => {
    dispatch(
      getAllUsers({
        page: currentPage,
        limit,
        q: searchQuery || null,
      })
    );
  }, [dispatch, currentPage, limit, searchQuery, changeUserRole]);

  const handleViewUser = (userId: number) => {
    console.log("View user:", userId);
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ?`
      )
    ) {
      console.log("Delete user:", userId);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  function handleChangeRole(userId: number, currentRole: string) {
    console.log("Change role for user:", userId, "current role:", currentRole);
    const newRole = currentRole === "admin" ? "member" : "admin";

    dispatch(changeUserRole({ userId, newRole }));
  }

  const displayUsersList = users?.data.map((user) => (
    <TableRow key={user.id}>
      <TableData>
        <div className="text-sm font-medium text-gray-900">{user.lastname}</div>
      </TableData>
      <TableData>
        <div className="text-sm font-medium text-gray-900">
          {user.firstname}
        </div>
      </TableData>
      <TableData>
        <div className="text-sm text-gray-900">{user.email}</div>
      </TableData>
      {/* --------------------------------- */}
      {showAllTable && (
        <>
          <TableData>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>
          </TableData>
          <TableData>{user.phone || "N/A"}</TableData>
          <TableData>
            {user.last_login
              ? new Date(user.last_login).toLocaleDateString("fr-FR")
              : "Never"}
          </TableData>
        </>
      )}
      {/* ------------------ */}
      <TableData>
        <button
          onClick={() => handleViewUser(user.id)}
          className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          View
        </button>
      </TableData>
      <TableData>
        <button
          onClick={() => handleChangeRole(user.id, user.role?.name || "user")}
          className={` cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md ${
            user.role?.name === "admin"
              ? "bg-red-100 text-red-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {user?.role?.name || "N/A"}{" "}
        </button>
      </TableData>

      <TableData>
        <button
          onClick={() =>
            handleDeleteUser(user.id, `${user.firstname} ${user.lastname}`)
          }
          className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Delete
        </button>
      </TableData>
    </TableRow>
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
    <div className="max-w-full mx-auto p-6 overflow-x-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Users Management
        </h1>
        <p className="text-gray-600">Manage your users here...</p>
      </div>
      {/*------------------------------------------------------ Simple Search Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/*------------------------------------------------------ Search Bar */}
          <div className="md:col-span-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              🔍 Rechercher un utilisateur
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Prénom, nom ou email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/*------------------------------------------------------ Bouton Reset */}
          <div>
            <button
              onClick={handleResetFilters}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/*------------------------------------------------------ Compteurs et résultats */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <button
              onClick={() => setShowAllTable(!showAllTable)}
              className="cursor-pointer px-2 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Voir tout le tableau
            </button>
            <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full">
              Total: {users.meta.total}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-800 rounded-full">
              Page: {users.meta.page}/{users.meta.totalPages}
            </span>
            {searchQuery && (
              <span className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full">
                🔍 Recherche: "{searchQuery}"
              </span>
            )}
          </div>
          <div></div>

          {/*------------------------------------------------------ Selected Limit */}
          <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-sm text-gray-700">
              Afficher:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">par page</span>
          </div>
        </div>
      </div>

      {/*------------------------------------------------------ Table Header Cells */}

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
              {showAllTable && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    connexion
                  </th>
                </>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Détails
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayUsersList}
          </tbody>
        </table>
      </div>

      {/*------------------------------------------------------ Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={!users.meta.hasPrevPage}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Précédent
          </button>

          <span className="px-4 py-2 text-sm text-gray-700">
            Page {users.meta.page} sur {users.meta.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!users.meta.hasNextPage}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant →
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Affichage de {(users.meta.page - 1) * users.meta.limit + 1} à{" "}
          {Math.min(users.meta.page * users.meta.limit, users.meta.total)} sur{" "}
          {users.meta.total} résultats
        </div>
      </div>
    </div>
  );
}
