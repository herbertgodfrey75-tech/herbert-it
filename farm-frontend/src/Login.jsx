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







 async function login(e){

  e.preventDefault();

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

          onChange={
            e=>setEmail(e.target.value)
          }

          required

        />







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


            onChange={
              e=>setPassword(e.target.value)
            }


            required


          />



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