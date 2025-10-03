import { NavLink, useLocation } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function DropdownStores() {
  const location = useLocation();
  const isAnyCategoryActive = [
    "/activities/boutique",
    "/activities/restaurant",
  ].includes(location.pathname);

  return (
    <Menu as="div" className="relative inline-block text-lg font-bold">
      <MenuButton
        className={() =>
          // Appliquer la classe "font-extrabold" si une catégorie est active
          isAnyCategoryActive
            ? "text-dark-blue-buttons font-extrabold"
            : "hover:font-bold block"
        }
      >
        Magasins
      </MenuButton>

      <MenuItems
        transition
        className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 w-40 origin-top-right rounded-md text-center bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <NavLink
              to={`/activities/boutique`}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-dark-blue-buttons block font-extrabold px-4 py-2"
                  : "hover:text-dark-blue-buttons hover:font-bold block px-4 py-2"
              }
            >
              Boutiques
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to={`/activities/restaurant`}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-dark-blue-buttons block font-extrabold px-4 py-2"
                  : "hover:text-dark-blue-buttons hover:font-bold block px-4 py-2"
              }
            >
              Restaurants
            </NavLink>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
