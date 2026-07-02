import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";

function Profile() {
  const userId = localStorage.getItem("user_id");

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    date_of_birth: "",
    specialization: "",
    nin: "",
    profile_image_url: "",
    marketing_consent: false,

    role: "",
    verification_status: "",
    is_active: true,
    is_available: true,
    created_at: "",
    updated_at: "",
    last_login_at: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`);

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.log(error);
      alert("Couldn't load profile.");
    }

    setLoading(false);
  }

  async function saveProfile(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully 🎉");
        loadProfile();
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.log(error);
      alert("Server error.");
    }
  }

  if (loading) {
    return (
      <div id="center">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div id="center">

      <div className="hero">
        <h1 className="base">
          My Profile
        </h1>
      </div>

      <form onSubmit={saveProfile}>

        <h2>Personal Information</h2>

        <label>Full Name</label>
        <input
          value={user.full_name || ""}
          onChange={(e) =>
            setUser({
              ...user,
              full_name: e.target.value
            })
          }
        />

        <label>Email</label>
        <input
          value={user.email || ""}
          disabled
        />

        <label>Phone Number</label>
        <input
          value={user.phone || ""}
          onChange={(e) =>
            setUser({
              ...user,
              phone: e.target.value
            })
          }
        />

        <label>Date of Birth</label>
        <input
          type="date"
          value={user.date_of_birth || ""}
          onChange={(e) =>
            setUser({
              ...user,
              date_of_birth: e.target.value
            })
          }
        />

        <hr />

        <h2>Address</h2>

        <label>Address</label>
        <input
          value={user.address || ""}
          onChange={(e) =>
            setUser({
              ...user,
              address: e.target.value
            })
          }
        />

        <label>City</label>
        <input
          value={user.city || ""}
          onChange={(e) =>
            setUser({
              ...user,
              city: e.target.value
            })
          }
        />

        <label>State</label>
        <input
          value={user.state || ""}
          onChange={(e) =>
            setUser({
              ...user,
              state: e.target.value
            })
          }
        />

        <label>Country</label>
        <input
          value={user.country || ""}
          onChange={(e) =>
            setUser({
              ...user,
              country: e.target.value
            })
          }
        />

        <hr />

        <h2>Professional</h2>

        <label>Specialization</label>
        <input
          value={user.specialization || ""}
          onChange={(e) =>
            setUser({
              ...user,
              specialization: e.target.value
            })
          }
        />

        <label>NIN</label>
        <input
          value={user.nin || ""}
          onChange={(e) =>
            setUser({
              ...user,
              nin: e.target.value
            })
          }
        />

        <label>Profile Image URL</label>
        <input
          value={user.profile_image_url || ""}
          onChange={(e) =>
            setUser({
              ...user,
              profile_image_url: e.target.value
            })
          }
        />

        <hr />

        <h2>Account Information</h2>

        <label>Role</label>
        <input
          value={user.role || ""}
          disabled
        />

        <label>Verification Status</label>
        <input
          value={user.verification_status || ""}
          disabled
        />

        <label>Account Active</label>
        <input
          value={user.is_active ? "Yes" : "No"}
          disabled
        />

        <label>Available</label>
        <input
          value={user.is_available ? "Yes" : "No"}
          disabled
        />

        <label>Created At</label>
        <input
          value={
            user.created_at
              ? new Date(user.created_at).toLocaleString()
              : ""
          }
          disabled
        />

        <label>Last Login</label>
        <input
          value={
            user.last_login_at
              ? new Date(user.last_login_at).toLocaleString()
              : "Never"
          }
          disabled
        />

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <input
            type="checkbox"
            checked={user.marketing_consent}
            onChange={(e) =>
              setUser({
                ...user,
                marketing_consent: e.target.checked
              })
            }
            style={{
              width: "18px",
              height: "18px"
            }}
          />

          Receive Marketing Emails
        </label>

        <button
          className="counter"
          type="submit"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}

export default Profile;