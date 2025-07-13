import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { useSearchParams } from "react-router";
import Pagination from "./Pagination";
import Swal from "sweetalert2";

function Table() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // key penyimpanan data user di localStorage
  const STORAGE_KEY = "userList";

  const dummyUsers = [
    { id: 1, name: "Ilham Arifin", email: "ilham@mail.com" },
    { id: 2, name: "Arifin Ilham", email: "arifin@mail.com" },
    { id: 3, name: "Agus Saputra", email: "agus@mail.com" },
    { id: 4, name: "Sari Nurlaila", email: "sari@mail.com" },
    { id: 5, name: "Budi Santoso", email: "budi@mail.com" },
    { id: 6, name: "Rina Oktaviani", email: "rina@mail.com" },
  ];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedData && storedData.length > 0) {
      setUsers(storedData);
    } else {
      // Set data dummy ke localStorage jika belum ada data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyUsers));
      setUsers(dummyUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(keyword.toLowerCase()) ||
      user.email.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    setSearchParams({ search: keyword, page: 1 });
  };

  const handleUpdateUser = (updatedUser) => {
    const updated = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updated);
  };

  const handleDelete = (id) => {
    const filtered = users.filter((user) => user.id !== id);
    setUsers(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams({ search: value, page: 1 });
    localStorage.setItem(
      "searchParams",
      JSON.stringify({ search: value, page: 1 })
    );
  };

  return (
    <>
      <div className="flex items-center justify-between flex-col w-full gap-2 mb-4 md:flex-row">
        <button
          className="w-full md:w-[15%] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Tambah User
        </button>

        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="Cari nama atau email"
          className="px-3 py-2 border rounded-md w-full md:w-1/3 text-sm dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Nama
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  Data tidak ditemukan.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 space-x-3 cursor-pointer">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        // confirm("apakah kamu ingin menghapus data ini?")
                        Swal.fire({
                          title: "Apakah kamu yakin menghapus data ini?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Hapus!",
                          cancelButtonText: "Batal!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Hapus!",
                              text: "Data berhasil dihapus.",
                              icon: "success",
                            });
                          }
                        }) && handleDelete(user.id);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => {
            setSearchParams({ search: keyword, page });
            localStorage.setItem(
              "searchParams",
              JSON.stringify({ search: keyword, page })
            );
          }}
        />

        {showModal && (
          <AddUserModal
            onClose={() => setShowModal(false)}
            onAdd={handleAddUser}
          />
        )}

        {editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onUpdate={handleUpdateUser}
          />
        )}
      </div>
    </>
  );
}

export default Table;
