import logo from "@/assets/icon/logo.svg";

import NavLink from "@/components/UI/NavLink";

export default function SideBar() {
  return (
    <aside className="w-[250px] h-full bg-gray-800 text-white p-4">
      <img src={logo} alt="My App Logo" className="pb-10" />
      <div className="flex flex-col justify-between ">
        <nav className="flex flex-col">
          <NavLink to="/admin/dashboard" label="Tableau de bord" />
          <NavLink to="/admin/mangement/activity" label="Activités" />
          <NavLink to="/admin/management/users" label="Utilisateurs" />
          <NavLink to="/" label="Home" />
        </nav>
      </div>
    </aside>
  );
}
