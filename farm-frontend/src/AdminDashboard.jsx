import "./App.css";

function AdminDashboard() {

  return (

    <div>

      <div className="hero">

        <h1 className="base">
          👑 Admin Dashboard
        </h1>

        <p>
          Welcome back, Administrator
        </p>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>👥 Manage Users</h2>

          <p>
            View all registered users, promote admins,
            deactivate accounts and delete users.
          </p>

        </div>

        <div className="dashboard-card">

          <h2>🎓 Manage Students</h2>

          <p>
            Add, update and remove student records.
          </p>

        </div>

        <div className="dashboard-card">

          <h2>🙍 My Profile</h2>

          <p>
            Update your profile information.
          </p>

        </div>

        <div className="dashboard-card">

          <h2>📊 Analytics</h2>

          <p>
            Coming Soon...
          </p>

        </div>

        <div className="dashboard-card">

          <h2>⚙ Settings</h2>

          <p>
            Coming Soon...
          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;