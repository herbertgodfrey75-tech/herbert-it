import { useEffect, useState } from "react";
import { toast } from "sonner";
import "./App.css";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";

function ManageUsers() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchUsers();

  }, []);

  async function fetchUsers() {

    setLoading(true);

    try {

      const response = await fetch(`${API_URL}/users`);

      const data = await response.json();

      if (response.ok) {

        setUsers(data);

      } else {

        toast.error(
          data.detail || "Couldn't load users."
        );

      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Couldn't connect to server."
      );

    } finally {

      setLoading(false);

    }

  }

  async function deleteUser(id) {

    if (!window.confirm("Delete this user?")) return;

    try {

      const response = await fetch(

        `${API_URL}/users/${id}`,

        {

          method: "DELETE"

        }

      );

      if (response.ok) {

        toast.success(
          "User deleted successfully."
        );

        fetchUsers();

      } else {

        toast.error(
          "Delete failed."
        );

      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Server error."
      );

    }

  }

  async function changeRole(id, currentRole) {

    const newRole =

      currentRole === "admin"

        ? "user"

        : "admin";

    try {

      const response = await fetch(

        `${API_URL}/users/${id}/role?role=${newRole}`,

        {

          method: "PUT"

        }

      );

      if (response.ok) {

        toast.success(
          `User ${
            newRole === "admin"
              ? "promoted"
              : "demoted"
          } successfully.`
        );

        fetchUsers();

      } else {

        toast.error(
          "Couldn't update role."
        );

      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Server error."
      );

    }

  }

  async function changeStatus(id, active) {

    try {

      const response = await fetch(

        `${API_URL}/users/${id}/status?is_active=${!active}`,

        {

          method: "PUT"

        }

      );

      if (response.ok) {

        toast.success(
          !active
            ? "User activated."
            : "User deactivated."
        );

        fetchUsers();

      } else {

        toast.error(
          "Couldn't update status."
        );

      }

    } catch (err) {

      console.log(err);

      toast.error(
        "Server error."
      );

    }

  }

  const filteredUsers = users.filter(user =>

    user.full_name
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    user.email
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div id="center">

      <div className="hero">

        <h1 className="base">

          👥 User Management

        </h1>

      </div>

      <input

        placeholder="🔍 Search users..."

        value={search}

        onChange={e => setSearch(e.target.value)}

      />

      {

        loading &&

        <h3>

          Loading users...

        </h3>

      }

      {

        !loading && filteredUsers.length === 0 && (

          <h3>

            No users found.

          </h3>

        )

      }
            {filteredUsers.map(user => (

        <div
          key={user.id}
          className="user-card"
        >

          <div className="profile-header">

            <div className="profile-avatar">

              {user.full_name
                .split(" ")
                .map(name => name[0])
                .join("")
                .toUpperCase()}

            </div>

            <div className="profile-info">

              <h2>{user.full_name}</h2>

              <p>📧 {user.email}</p>

              <p>📞 {user.phone || "No phone"}</p>

              <p>🌍 {user.country || "Not set"}</p>

            </div>

          </div>

          <hr />

          <div
            style={{
              display: "flex",
              gap: "25px",
              flexWrap: "wrap",
              marginBottom: "20px"
            }}
          >

            <p>

              🛡 <b>Role:</b>{" "}

              <span className={`badge ${user.role}`}>

                {user.role}

              </span>

            </p>

            <p>

              ❤️ <b>Status:</b>{" "}

              <span
                className={`badge ${
                  user.is_active
                    ? "user"
                    : "inactive"
                }`}
              >

                {user.is_active

                  ? "ACTIVE"

                  : "INACTIVE"}

              </span>

            </p>

          </div>

          <div className="student-actions">

            <button

              className="counter"

              onClick={() =>
                changeRole(
                  user.id,
                  user.role
                )
              }

            >

              {

                user.role === "admin"

                  ? "⬇ Demote"

                  : "⬆ Promote"

              }

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

              {

                user.is_active

                  ? "🚫 Deactivate"

                  : "✅ Activate"

              }

            </button>

            <button

              className="counter"

              onClick={() =>
                deleteUser(user.id)
              }

            >

              🗑 Delete

            </button>

          </div>

        </div>

      ))}

    </div>

  );

}

export default ManageUsers;