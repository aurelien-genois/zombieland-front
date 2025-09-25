import logo from "@/assets/icon/logo.svg";
export default function SideBar() {
  return (
    <aside className="w-[150px] h-full bg-gray-800 text-white p-4">
      <img src={logo} alt="My App Logo" />
      <nav>
        <ul>
          <li>Home</li>
          <li>Activity</li>
          <li>User</li>
        </ul>
      </nav>
      <button>Logout</button>
    </aside>
  );
}
