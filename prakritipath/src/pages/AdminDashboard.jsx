const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">User Management</h3>
          <p className="text-sm text-gray-600">
            Activate / Deactivate users
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Contribution Moderation</h3>
          <p className="text-sm text-gray-600">
            Approve / Reject submissions
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Analytics</h3>
          <p className="text-sm text-gray-600">
            Institution & state insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
