import Navbar from "../components/Navbar";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <div className="max-w-3/4 mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>

        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
