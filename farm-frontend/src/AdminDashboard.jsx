import "./App.css";

function AdminDashboard({

  goStudents,

  goManageUsers,

  goProfile

}) {

  return (

    <div className="dashboard-page fade">

      <div className="hero">

        <h1 className="base">
          👑 Admin Dashboard
        </h1>

        <p>
          Welcome back, Administrator 👋
        </p>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>👥 Manage Users</h2>

          <p>
            View, promote and manage all registered users.
          </p>

          <button
            className="counter"
            onClick={goManageUsers}
          >
            Open
          </button>

        </div>

        <div className="dashboard-card">

          <h2>🎓 Manage Students</h2>

          <p>
            View and manage every student in the system.
          </p>

          <button
            className="counter"
            onClick={goStudents}
          >
            Open
          </button>

        </div>

        <div className="dashboard-card">

          <h2>👤 My Profile</h2>

          <p>
            Update your account information.
          </p>

          <button
            className="counter"
            onClick={goProfile}
          >
            Open
          </button>

        </div>

        <div className="dashboard-card">

          <h2>📊 Analytics</h2>

          <p>
            Coming Soon...
          </p>

          <button
            className="counter"
            disabled
          >
            Soon
          </button>

        </div>

        <div className="dashboard-card">

          <h2>⚙ Settings</h2>

          <p>
            Coming Soon...
          </p>

          <button
            className="counter"
            disabled
          >
            Soon
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;