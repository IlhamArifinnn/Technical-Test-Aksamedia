import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

function EditProfile() {
  const { user, updateFullname } = useAuth();
  const [fullname, setFullname] = useState(user?.fullname || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFullname(fullname);
    Swal.fire("Nama berhasil diperbarui!");
    navigate("/dashboard"); // redirect
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <div className="p-8 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
