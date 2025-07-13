import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import USER_CREDENTIAL from "../utils/auth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // Redirect jika user sudah login
  useEffect(() => {
    if (user) {
      // Kalau sudah login, arahkan langsung ke dashboard
      const savedParams = JSON.parse(localStorage.getItem("searchParams"));
      const search = savedParams?.search || "";
      const page = savedParams?.page || 1;
      navigate(`/dashboard?search=${search}&page=${page}`);
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === USER_CREDENTIAL.username &&
      password === USER_CREDENTIAL.password
    ) {
      login({ username, fullname: USER_CREDENTIAL.fullname });

      // Arahkan ke dashboard setelah login sukses
      const savedParams = JSON.parse(localStorage.getItem("searchParams"));
      const search = savedParams?.search || "";
      const page = savedParams?.page || 1;
      navigate(`/dashboard?search=${search}&page=${page}`);
    } else {
      setError("Username or password is incorrect");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${"/bg.png"})` }}
    >
      <div className="w-full md:w-[80%] lg:w-[60%] flex flex-col md:flex-row justify-around gap-6 md:gap-10 p-6 md:p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Gambar hanya tampil di md+ */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="/boy.jpg"
            alt="Login Illustration"
            className="w-full rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-slate-600 dark:text-white mb-2">
            Sign In
          </h1>

          {error && (
            <div className="bg-red-50 dark:bg-red-200 text-red-500 p-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form className="mt-3 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-200">
                  Username
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:ring-[#00baff] focus:border-[#00baff]"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-[#00baff] focus:border-[#00baff]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00baff] hover:bg-[#15b9be] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
