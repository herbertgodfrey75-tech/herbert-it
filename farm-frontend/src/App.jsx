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
import StudentPortal from "./StudentPortal";
import Assignments from "./Assignments";
import Timetable from "./Timetable";
import Results from "./Results";
import Notes from "./Notes";

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
        onLogin={(role) => {
          setLoggedIn(true);
          if (role === "student") {
            setPage("student");
          } else {
            setPage("dashboard");
          }
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
    <Layout role={role} page={page} setPage={setPage} logout={logout}>
      {page === "dashboard" && (
        role === "admin" ? (
          <AdminDashboard
            goProfile={() => setPage("profile")}
            goStudents={() => setPage("students")}
            goManageUsers={() => setPage("users")}
          />
        ) : role === "student" ? (
         <StudentPortal
  openAssignments={() => setPage("assignments")}
  openTimetable={() => setPage("timetable")}
  openResults={() => setPage("results")}
  openNotes={() => setPage("notes")}
/>
        ) : (
          <StudentDashboard logout={logout} openProfile={() => setPage("profile")} />
        )
      )}

      {page === "students" && (
        <StudentDashboard logout={logout} openProfile={() => setPage("profile")} />
      )}

      {page === "student" && (
       <StudentPortal
  openAssignments={() => setPage("assignments")}
  openTimetable={() => setPage("timetable")}
  openResults={() => setPage("results")}
  openNotes={() => setPage("notes")}
/>
      )}

      {page === "assignments" && (
        <Assignments goBack={() => setPage(role === "student" ? "student" : "dashboard")} />
      )}

      {page === "timetable" && (
  <Timetable
    goBack={() => setPage("student")}
  />
)}

{page === "results" && (
  <Results
    goBack={() => setPage("student")}
  />
)}

{page === "notes" && (
  <Notes
    goBack={() => setPage("student")}
  />
)}

      {page === "profile" && <Profile />}

      {role === "admin" && page === "users" && <ManageUsers />}
    </Layout>
  );

}

export default App;