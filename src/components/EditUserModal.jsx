import { useState } from "react";

function EditUserModal({ user, onClose, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      email,
    };
    onUpdate(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          Edit User
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">
              Nama
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-md outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
