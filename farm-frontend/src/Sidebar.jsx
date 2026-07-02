import "./App.css";

function Sidebar({

  role,

  page,

  setPage,

  logout

}) {

  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        🌱

        <h2>Student Farm</h2>

      </div>

      <nav>

        <button

          className={page==="dashboard" ? "nav-btn active" : "nav-btn"}

          onClick={()=>setPage("dashboard")}

        >

          🏠 Dashboard

        </button>

        <button

          className={page==="students" ? "nav-btn active" : "nav-btn"}

          onClick={()=>setPage("students")}

        >

          🎓 Students

        </button>

        <button

          className={page==="profile" ? "nav-btn active" : "nav-btn"}

          onClick={()=>setPage("profile")}

        >

          👤 Profile

        </button>

        {

          role==="admin" &&

          <button

            className={page==="users" ? "nav-btn active" : "nav-btn"}

            onClick={()=>setPage("users")}

          >

            👥 Manage Users

          </button>

        }

      </nav>

      <button

        className="counter"

        onClick={logout}

      >

        🚪 Logout

      </button>

    </aside>

  );

}

export default Sidebar;