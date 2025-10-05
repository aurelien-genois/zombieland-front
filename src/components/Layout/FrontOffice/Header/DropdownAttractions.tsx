import { NavLink } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function DropdownMenu() {

  return (
    <Menu as="div" className="relative inline-block text-lg font-bold">
      <MenuButton
        className="text-grey-menu text-lg font-bold hover:font-bold block hover:text-dark-blue-buttons"
      >
        Attractions
      </MenuButton>

      <MenuItems
        transition
        className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 w-40 origin-top-right rounded-md text-center bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <NavLink
              to={`/activities/jeu`}
              end
              className={({ isActive }) =>
                isActive ? "text-dark-blue-buttons block font-extrabold px-4 py-2" : "hover:text-dark-blue-buttons hover:font-bold block px-4 py-2"
              }
            >
              Jeux
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to={`/activities/spectacle`}
              end
              className={({ isActive }) =>
                isActive ? "text-dark-blue-buttons block font-extrabold px-4 py-2" : "hover:text-dark-blue-buttons hover:font-bold block px-4 py-2"
              }
            >
              Spectacles
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to={`/activities/manege`}
              end
              className={({ isActive }) =>
                isActive ? "text-grey-menu block font-extrabold px-4 py-2" : "hover:text-dark-blue-buttons hover:font-bold block px-4 py-2"
              }
            >
              Manèges
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to={`/activities/montagnerusse`}
              end
              className={({ isActive }) =>
                isActive ? "text-grey-menu block font-extrabold px-4 py-2" : "hover:text-dark-blue-buttons hover:font-bold block px-4 py-2"
              }
            >
              Montagnes Russes
            </NavLink>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}