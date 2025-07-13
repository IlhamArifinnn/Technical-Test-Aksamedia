import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
