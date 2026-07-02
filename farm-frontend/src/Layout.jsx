import "./App.css";
import Sidebar from "./Sidebar";

function Layout({

  role,

  page,

  setPage,

  logout,

  children

}) {

  return (

    <div className="layout">

      <Sidebar

        role={role}

        page={page}

        setPage={setPage}

        logout={logout}

      />

      <main className="main-content">

        {children}

      </main>

    </div>

  );

}

export default Layout;