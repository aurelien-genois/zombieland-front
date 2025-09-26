import logo from "@/assets/icon/logo.svg";
import home from "@/assets/icon/home.svg";
import user from "@/assets/icon/user.svg";
import activity from "@/assets/icon/activity.svg";
import dashboard from "@/assets/icon/dashboard.svg";
import NavLink from "@/components/UI/NavLink";

export default function SideBar() {
  return (
    <aside className="w-[250px] h-[calc(100%-20px)] bg-gray-800 text-white p-4 rounded-2xl my-[8px] ml-1">
      <img src={logo} alt="My App Logo" className="pb-10" />
      <div className="flex flex-col justify-between ">
        <nav className="flex flex-col">
          <NavLink
            iconAlt="Dashboard"
            iconSrc={dashboard}
            to="/admin/dashboard"
            label="Tableau de bord"
          />
          <NavLink
            iconAlt="Activity"
            iconSrc={activity}
            to="/admin/management/activities"
            label="Activités"
          />
          <NavLink
            iconAlt="User"
            iconSrc={user}
            to="/admin/management/users"
            label="Utilisateurs"
          />
          <NavLink iconAlt="Home" iconSrc={home} to="/" label="Home" />
        </nav>
      </div>
    </aside>
  );
}
