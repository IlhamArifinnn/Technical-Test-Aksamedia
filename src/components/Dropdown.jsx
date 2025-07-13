// src/components/Dropdown.jsx
import { useState, useRef, useEffect } from "react";

function Dropdown({ user, onLogout, onEdit }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md focus:outline-none cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-800 dark:text-white">
          {user?.fullname || user?.username}
        </span>

        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
          <button
            onClick={onEdit}
            className="block w-full text-left px-4 py-3 text-sm text-gray-800 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-md cursor-pointer"
          >
            Edit Profile
          </button>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
