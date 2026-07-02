import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        alert(data.detail);
      }
    } catch (err) {
      console.log(err);
      alert("Couldn't load users.");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      fetchUsers();
    } else {
      alert("Delete failed.");
    }
  }

  async function changeRole(id, currentRole) {
    const newRole =
      currentRole === "admin"
        ? "user"
        : "admin";

    const response = await fetch(
      `${API_URL}/users/${id}/role?role=${newRole}`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {
      fetchUsers();
    } else {
      alert("Couldn't update role.");
    }
  }

  async function changeStatus(id, active) {
    const response = await fetch(
      `${API_URL}/users/${id}/status?is_active=${!active}`,
      {
        method: "PUT"
      }
    );

    if (response.ok) {
      fetchUsers();
    } else {
      alert("Couldn't update status.");
    }
  }

  const filteredUsers = users.filter(user =>
    user.full_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div id="center">

      <div className="hero">
        <h1 className="base">
          User Management
        </h1>
      </div>

      <input
        placeholder="🔍 Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 && (
        <h3>No users found.</h3>
      )}

      {filteredUsers.map(user => (

        <div
          key={user.id}
          className="student-card"
        >

          <h2>{user.full_name}</h2>

          <p>
            📧 {user.email}
          </p>

          <p>
            📞 {user.phone || "No phone"}
          </p>

          <p>
            🌍 {user.country || "Not set"}
          </p>

          <p>
            🛡 Role:
            {" "}
            <b>{user.role}</b>
          </p>

          <p>
            Status:
            {" "}
            <b
              style={{
                color: user.is_active
                  ? "#22c55e"
                  : "#ef4444"
              }}
            >
              {user.is_active
                ? "ACTIVE"
                : "INACTIVE"}
            </b>
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "15px"
            }}
          >

            <button
              className="counter"
              onClick={() =>
                changeRole(
                  user.id,
                  user.role
                )
              }
            >
              {user.role === "admin"
                ? "Demote"
                : "Promote"}
            </button>

            <button
              className="counter"
              onClick={() =>
                changeStatus(
                  user.id,
                  user.is_active
                )
              }
            >
              {user.is_active
                ? "Deactivate"
                : "Activate"}
            </button>

            <button
              className="counter"
              onClick={() =>
                deleteUser(user.id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ManageUsers;