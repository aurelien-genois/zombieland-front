import { NavLink as RouterNavLink } from "react-router";

type Props = {
  to: string;
  label: string;
};

export default function NavLink({ to, label }: Props) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-lg transition-colors",
          isActive
            ? "bg-red-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white",
        ].join(" ")
      }
    >
      {label}
    </RouterNavLink>
  );
}
