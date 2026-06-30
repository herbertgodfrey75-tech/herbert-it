import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://herbert-it.onrender.com";


function App() {

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentLevel, setStudentLevel] = useState("");

  const [students, setStudents] = useState([]);



  async function fetchStudents() {

    try {

      const response = await fetch(`${API_URL}/student`);

      const data = await response.json();

      setStudents(data);


    } catch(error) {

      console.log("Fetch error:", error);

    }

  }



  useEffect(() => {

    fetchStudents();

  }, []);






  async function handleSubmit(e) {

    e.preventDefault();


    const student = {

      student_name: studentName,
      student_email: studentEmail,
      student_phone_no: phoneNumber,
      student_level: Number(studentLevel)

    };



    try {


      const response = await fetch(
        `${API_URL}/student`,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(student)

        }
      );



      const data = await response.json();



      if(!response.ok){

        console.log("Backend error:", data);
        return;

      }




      setStudentName("");
      setStudentEmail("");
      setPhoneNumber("");
      setStudentLevel("");



      fetchStudents();



    } catch(error) {

      console.log("Connection error:", error);

    }

  }








  async function deleteStudent(id){


    try {


      const response = await fetch(
        `${API_URL}/student/${id}`,
        {
          method:"DELETE"
        }
      );



      if(response.ok){

        fetchStudents();

      }



    } catch(error){

      console.log("Delete error:", error);

    }


  }









  async function updateStudent(id, student){


    const updatedStudent = {


      student_name: prompt(
        "Name",
        student.student_name
      ),


      student_email: prompt(
        "Email",
        student.student_email
      ),


      student_phone_no: prompt(
        "Phone",
        student.student_phone_no
      ),


      student_level: Number(
        prompt(
          "Level",
          student.student_level
        )
      )


    };



    try {


      const response = await fetch(
        `${API_URL}/student/${id}`,
        {

          method:"PUT",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(updatedStudent)

        }
      );



      if(response.ok){

        fetchStudents();

      }



    } catch(error){

      console.log("Update error:", error);

    }


  }









  return (

    <div id="center">


      <div className="hero">

        <h1 className="base">
          Student Farm App
        </h1>

      </div>



      <p>
        React + FastAPI + MongoDB Student System
      </p>





      <form onSubmit={handleSubmit}>


        <label>Name</label>

        <input

          value={studentName}

          onChange={(e)=>setStudentName(e.target.value)}

          required

        />




        <label>Email</label>

        <input

          type="email"

          value={studentEmail}

          onChange={(e)=>setStudentEmail(e.target.value)}

          required

        />





        <label>Phone</label>

        <input

          value={phoneNumber}

          onChange={(e)=>setPhoneNumber(e.target.value)}

          required

        />






        <label>Level</label>

        <input

          type="number"

          value={studentLevel}

          onChange={(e)=>setStudentLevel(e.target.value)}

          required

        />





        <button
          className="counter"
          type="submit"
        >

          Add Student

        </button>


      </form>







      <h2>
        Student List
      </h2>






      {students.map((student)=>(


        <div key={student.id}>


          <p>
            Name: {student.student_name}
          </p>



          <p>
            Email: {student.student_email}
          </p>



          <p>
            Phone: {student.student_phone_no}
          </p>



          <p>
            Level: {student.student_level}
          </p>





          <button

            className="counter"

            onClick={() =>
              updateStudent(student.id, student)
            }

          >

            Update

          </button>






          <button

            className="counter"

            onClick={() =>
              deleteStudent(student.id)
            }

          >

            Delete

          </button>




          <hr/>


        </div>


      ))}



    </div>

  );

}


export default App;