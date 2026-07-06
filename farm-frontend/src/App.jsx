import { useState } from "react";
import "./App.css";

import Login from "./Login";
import Register from "./Register";

import Layout from "./Layout";



import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";
import Profile from "./Profile";
import ManageUsers from "./ManageUsers";
import LandingPage from "./LandingPage";


function App() {

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("user_id")
  );

  const [showRegister, setShowRegister] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const [page, setPage] = useState("dashboard");

  const role = localStorage.getItem("role");

 function logout() {

  localStorage.clear();

  setLoggedIn(false);

  setShowRegister(false);

  setShowLanding(true);

  setPage("dashboard");

}

    // ==========================
  // LOGIN / REGISTER
  // ==========================
if (!loggedIn) {

  if (showLanding) {

    return (

      <LandingPage

        goLogin={() => setShowLanding(false)}

        goRegister={() => {

          setShowLanding(false);
          setShowRegister(true);

        }}

      />

    );

  }

  if (showRegister) {

    return (

      <Register

        goLogin={() => {

          setShowRegister(false);

        }}

      />

    );

  }

  return (

    <Login

      onLogin={() => {

        setLoggedIn(true);

        setPage("dashboard");

      }}

      goRegister={() => {

        setShowRegister(true);

      }}

    />

  );

}

  // ==========================
  // MAIN APP
  // ==========================

  return (

    <Layout

      role={role}

      page={page}

      setPage={setPage}

      logout={logout}

    >

     {
  page === "dashboard" && (

    role === "admin"

      ?

      <AdminDashboard
        goProfile={() => setPage("profile")}
        goStudents={() => setPage("students")}
        goManageUsers={() => setPage("users")}
      />

      :

      <StudentDashboard
        logout={logout}
        openProfile={() => setPage("profile")}
      />

  )
}

{
  page === "students" &&

  <StudentDashboard
    logout={logout}
    openProfile={() => setPage("profile")}
  />

}

{
  page === "profile" &&

  <Profile />

}

{
  role === "admin" &&
  page === "users" &&

  <ManageUsers />

}
    </Layout>

  );

}

export default App;