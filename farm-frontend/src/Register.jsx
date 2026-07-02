import { useState } from "react";
import "./App.css";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";

function Register({ goLogin }) {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function register(e) {

    e.preventDefault();

    const user = {

      full_name: fullName,

      email: email,

      phone: phone,

      password: password,

      // Optional fields
      address: "",
      city: "",
      state: "",
      country: "",
      date_of_birth: "",
      profile_image_url: "",
      nin: "",
      specialization: "",
      marketing_consent: false

    };

    try {

      const response = await fetch(
        `${API_URL}/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(user)
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Account created successfully! 🔥");

        goLogin();

      } else {

        alert(data.detail || "Registration failed");

      }

    } catch (error) {

      console.log("Register error:", error);

      alert("Cannot connect to server");

    }

  }

  return (

    <div id="center" className="auth-box">

      <div className="hero">

        <h1 className="base">
          Student Farm App
        </h1>

      </div>

      <form onSubmit={register}>

        <h2>Create Account</h2>

        <label>Full Name</label>

        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Phone</label>

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Password</label>

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

        </div>

        <button
          className="counter"
          type="submit"
        >
          Register
        </button>

      </form>

      <p>Already have an account?</p>

      <button
        className="counter"
        type="button"
        onClick={goLogin}
      >
        Login
      </button>

    </div>

  );

}

export default Register;