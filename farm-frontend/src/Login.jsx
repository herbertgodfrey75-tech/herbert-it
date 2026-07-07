import { useState } from "react";
import "./App.css";
import { toast } from "sonner";


const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";





function Login({ onLogin, goRegister }) {


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");







 async function login(e){

  e.preventDefault();

  if (
  emailError !== "Looks good." ||
  passwordError !== "Looks good."
) {
  return;
}

  setLoading(true);

  try{

    const response = await fetch(

      `${API_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,

      {
        method:"POST"
      }

    );

    const data = await response.json();

    if(response.ok){

      localStorage.setItem(
        "user_id",
        data.user_id
      );

      localStorage.setItem(
        "role",
        data.role
      );

      toast.success("Welcome back! 👋");

      setTimeout(() => {

        onLogin();

      }, 800);

    }else{

     toast.error(data.detail || "Login failed");
    }

  }catch(error){

    console.log(error);

   toast.error(data.detail || "Cannot connect to server.");

  }

  setLoading(false);

}









  return (


    <div
      id="center"
      className="auth-box"
    >



      <div className="hero">


        <h1 className="base">

          Student Farm App

        </h1>


      </div>







      <form onSubmit={login}>


        <h2>
          Login
        </h2>





        <label>
          Email
        </label>


       <input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => {

    const value = e.target.value.replace(/\s/g, "");

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
      color:
        emailError === "Looks good."
          ? "#22c55e"
          : "#ef4444",
      fontSize: "14px",
      marginTop: "5px"
    }}
  >
    {emailError}
  </p>
)}







        <label>
          Password
        </label>



        <div className="password-box">


        <input
  type={
    showPassword
      ? "text"
      : "password"
  }
  placeholder="Enter password"
  value={password}
  onChange={(e) => {

    const value = e.target.value;

    setPassword(value);

    if (value === "") {

      setPasswordError("");

    } else if (value.length < 8) {

      setPasswordError("Password must be at least 8 characters.");

    } else {

      setPasswordError("Looks good.");

    }

  }}
  required
/>
{passwordError && (
  <p
    style={{
      color:
        passwordError === "Looks good."
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

            onClick={() =>
              setShowPassword(!showPassword)
            }

          >

            {
              showPassword
              ? "🙈"
              : "👁️"
            }


          </button>



        </div>








       <button

  className="counter"

  type="submit"

  disabled={loading}

>

  {

    loading

    ?

    "Signing In..."

    :

    "Login"

  }

</button>




      </form>








      <p>

        Don't have an account?

      </p>





      <button

        className="counter"

        type="button"

        onClick={goRegister}

      >

        Create Account

      </button>







    </div>


  );


}




export default Login;