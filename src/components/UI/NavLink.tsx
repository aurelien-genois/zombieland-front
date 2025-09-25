import { NavLink as RouterNavLink } from "react-router";

type Props = {
  to: string;
  label: string;
  iconSrc?: string;
  iconAlt?: string;
};

export default function NavLink({ to, label, iconSrc, iconAlt }: Props) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-lg transition-colors flex items-center",
          isActive
            ? "bg-red-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white",
        ].join(" ")
      }
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={iconAlt ?? ""}
          className="inline-block mr-2 w-5 h-5 text-white "
        />
      )}
      {label}
    </RouterNavLink>
  );
}
