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
    <li key={user.id}>
      {user.firstname} {user.lastname} - {user.email} -{" "}
      {user.is_active ? "Active" : "Inactive"} - {user.last_login} -{" "}
      {user.birthday} - {user.phone} - Role: {user?.role?.name}
    </li>
  ));

  if (!users) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>Users Management</h1>
      <p>Manage your users here...</p>
      <ul>{displayUsersList}</ul>
    </div>
  );
}
