import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import useTheme from "../hooks/useTheme";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate(); //

  const handleEditProfile = () => {
    navigate("/edit-profile"); // <--- Navigasi ke halaman edit
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-900 shadow sticky z-10">
      <h1 className="text-lg font-bold text-gray-800 dark:text-white">
        <Link to="/">Dashboard</Link>
      </h1>

      <div className="flex items-center gap-4">
        {/* Toggle Theme */}
        <select
          value={theme}
          onChange={(e) => toggleTheme(e.target.value)}
          className="bg-gray-100 p-2 text-sm rounded-md dark:bg-gray-800 dark:text-white cursor-pointer"
        >
          <option value="system">🌐 System</option>
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>

        <Dropdown user={user} onLogout={logout} onEdit={handleEditProfile} />
      </div>
    </nav>
  );
};

export default Navbar;
