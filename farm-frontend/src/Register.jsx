import { useState } from "react";
import { toast } from "sonner";
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
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function register(e) {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (
      nameError !== "" &&
      nameError !== "Looks good."
    ) {
      return;
    }

    if (
      emailError !== "" &&
      emailError !== "Looks good."
    ) {
      return;
    }

    if (
      phoneError !== "" &&
      phoneError !== "Looks good."
    ) {
      return;
    }

    if (
      passwordError !== "" &&
      passwordError !== "Strong password 💪"
    ) {
      return;
    }

    setLoading(true);

    const user = {
      full_name: fullName,
      email,
      phone,
      password,
    };

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Registration failed.");
      }

      toast.success("Registration successful!");
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setPasswordError("");
      goLogin();
    } catch (error) {
      toast.error(error.message || "Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="center" className="auth-box">
      <div className="hero">
        <h1 className="base">Student Farm App</h1>
      </div>

      <form onSubmit={register}>
        <h2>Create Account</h2>

        <label>Full Name</label>
      <input
  placeholder="Full name"
  value={fullName}
 onChange={(e) => {

  const value = e.target.value;

  // Only allow letters and spaces
  if (!/^[A-Za-z\s]*$/.test(value)) {
    return;
  }

  setFullName(value);

  if (value === "") {

    setNameError("");

  } else if (value.trim().length < 3) {

    setNameError("Full name must be at least 3 characters.");

  } else {

    setNameError("Looks good.");

  }

}}
  required
/>
{nameError && (
  <p
    style={{
      color: nameError === "Looks good."
        ? "#22c55e"
        : "#ef4444",
      fontSize: "14px",
      marginTop: "5px"
    }}
  >
    {nameError}
  </p>
)}

        <label>Email</label>
       <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => {
    const value = e.target.value;

    setEmail(value);

    if (value === "") {
      setEmailError("");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("Looks good.");
    }
  }}
  required
/>
{emailError && (
  <p
    style={{
      color: emailError === "Looks good."
        ? "#22c55e"
        : "#ef4444",
      fontSize: "14px",
      marginTop: "5px"
    }}
  >
    {emailError}
  </p>
)}
        <label>Phone</label>
       <input
  type="tel"
  placeholder="Phone number"
  value={phone}
  maxLength={11}
  onChange={(e) => {

    const value = e.target.value.replace(/\D/g, "");

    setPhone(value);

    if (value === "") {

      setPhoneError("");

    } else if (value.length !== 11) {

      setPhoneError("Phone number must be exactly 11 digits.");

    } else if (!/^0[789]\d{9}$/.test(value)) {

      setPhoneError("Phone number must start with 07, 08 or 09.");

    } else {

      setPhoneError("Looks good.");

    }

  }}
/>
{phoneError && (
  <p
    style={{
      color:
        phoneError === "Looks good."
          ? "#22c55e"
          : "#ef4444",
      fontSize: "14px",
      marginTop: "5px"
    }}
  >
    {phoneError}
  </p>
)}

        <label>Password</label>
        <div className="password-box">
        <input
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  value={password}
  onChange={(e) => {

    const value = e.target.value;

    setPassword(value);

    if (value === "") {

      setPasswordError("");

    } else if (value.length < 8) {

      setPasswordError("Password must be at least 8 characters.");

    } else if (!/[A-Z]/.test(value)) {

      setPasswordError("Password must contain an uppercase letter.");

    } else if (!/[a-z]/.test(value)) {

      setPasswordError("Password must contain a lowercase letter.");

    } else if (!/\d/.test(value)) {

      setPasswordError("Password must contain a number.");

    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {

      setPasswordError("Password must contain a special character.");

    } else {

      setPasswordError("Strong password 💪");

    }

  }}
  required
/>
{passwordError && (
  <p
    style={{
      color:
        passwordError === "Strong password 💪"
          ? "#22c55e"
          : "#ef4444",
      fontSize: "14px",
      marginTop: "5px"
    }}
  >
    {passwordError}
  </p>
)}

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button className="counter" type="submit">
          Register
        </button>
      </form>

      <p>Already have an account?</p>
      <button className="counter" type="button" onClick={goLogin}>
        Login
      </button>
    </div>
  );

}

export default Register;
