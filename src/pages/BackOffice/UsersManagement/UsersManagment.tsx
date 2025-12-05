import TableData from "@/components/UI/BackOffice/Table/TableData";
import TableRow from "@/components/UI/BackOffice/Table/TableRow";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import ChangeUserRoleModal from "@/components/Modals/ChangeUserRoleModal";
import DeleteUserModal from "@/components/Modals/DeleteUserModal";
import { getAllUsers } from "@/store/reducers/adminReducer";
import { useEffect, useRef, useState } from "react";
import Pagination from "@/components/UI/Pagination";
import Button from "@/components/UI/BackOffice/Button";
import type { IRole } from "@/@types";
import { useLocation } from "react-router";

export default function UsersManagement() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.adminStore.usersList);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAllTable, setShowAllTable] = useState(false);

  const location = useLocation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [location.pathname]);
  useEffect(() => {
    dispatch(
      getAllUsers({
        page: currentPage,
        limit,
        q: searchQuery || null,
      })
    );
  }, [dispatch, currentPage, limit, searchQuery]);

  type RoleName = IRole["name"];
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [modalUserRole, setModalUserRole] = useState<{
    id: number;
    role: RoleName;
  } | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  function handleChangeRole(
    userId: number,
    currentRole?: IRole | string | null
  ) {
    const name =
      typeof currentRole === "string" ? currentRole : currentRole?.name;
    const safeRole: RoleName = name === "admin" ? "admin" : "member";
    setModalUserRole({ id: userId, role: safeRole });
    setIsRoleModalOpen(true);
  }

  function handleDeleteUser(userId: number) {
    setDeleteUserId(userId);
    setIsDeleteOpen(true);
  }

  // ------------------------------------------------------ Display Users List ---------------------------------

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
        <Button type="router-link" to={`/admin/management/users/${user.id}`}>
          View
        </Button>
      </TableData>
      <TableData>
        <Button
          onClick={() => handleChangeRole(user.id, user.role?.name || "member")}
          color={user.role?.name === "admin" ? "red" : "orange"}
        >
          {user?.role?.name || "member"}
        </Button>
      </TableData>

      <TableData>
        <Button onClick={() => handleDeleteUser(user.id)} color="red">
          Delete
        </Button>
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
    <div className="mx-auto p-6 overflow-x-auto w-full lg:w-4xl xl:w-5xl">
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
              ref={inputRef}
              placeholder="Prénom, nom ou email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/*------------------------------------------------------ Bouton Reset */}
          <div>
            <Button onClick={handleResetFilters} color="gray">
              Reset
            </Button>
          </div>
        </div>

        {/*------------------------------------------------------ Compteurs et résultats */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Button onClick={() => setShowAllTable(!showAllTable)}>
              Voir tout le tableau
            </Button>
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

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalItems={users.meta.total}
        itemsPerPage={limit}
      />

      {isRoleModalOpen && modalUserRole && (
        <ChangeUserRoleModal
          setIsModalOpen={setIsRoleModalOpen}
          userId={modalUserRole.id}
          currentRole={modalUserRole.role}
          onChanged={() => {
            // rafraîchir la liste après succès
            dispatch(
              getAllUsers({ page: currentPage, limit, q: searchQuery || null })
            );
          }}
        />
      )}
      {isDeleteOpen && deleteUserId != null && (
        <DeleteUserModal
          setIsModalOpen={setIsDeleteOpen}
          userId={deleteUserId}
          page={currentPage}
          limit={limit}
          q={searchQuery || null}
        />
      )}
    </div>
  );
}
