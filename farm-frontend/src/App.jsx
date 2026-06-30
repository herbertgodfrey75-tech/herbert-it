
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = " http://127.0.0.1:8000";


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

      console.log("Fetching error:", error);

    }

  }




  useEffect(() => {

    fetchStudents();

  }, []);





  async function handleSubmit(event) {

    event.preventDefault();


    const newStudent = {

      student_name: studentName,
      student_email: studentEmail,
      student_phone_no: phoneNumber,
      student_level: Number(studentLevel)

    };



    try {


      const response = await fetch(`${API_URL}/student`, {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(newStudent)

      });



      if(!response.ok){

        const error = await response.json();

        console.log("Create error:", error);

        return;

      }



      // CLEAR INPUTS

      setStudentName("");
      setStudentEmail("");
      setPhoneNumber("");
      setStudentLevel("");



      // REFRESH STUDENT LIST

      fetchStudents();



    } catch(error) {

      console.log("Submit error:", error);

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


        <div>

          <label>Name</label>

          <input

            type="text"

            value={studentName}

            onChange={(e)=>setStudentName(e.target.value)}

          />

        </div>





        <div>

          <label>Email</label>

          <input

            type="email"

            value={studentEmail}

            onChange={(e)=>setStudentEmail(e.target.value)}

          />

        </div>





        <div>

          <label>Phone</label>

          <input

            type="text"

            value={phoneNumber}

            onChange={(e)=>setPhoneNumber(e.target.value)}

          />

        </div>





        <div>

          <label>Level</label>

          <input

            type="number"

            value={studentLevel}

            onChange={(e)=>setStudentLevel(e.target.value)}

          />

        </div>




        <button className="counter" type="submit">

          Add Student

        </button>



      </form>





      <div id="next-steps">


        <div>

          <h2>
            Preview
          </h2>


          <p>Name: {studentName}</p>
          <p>Email: {studentEmail}</p>
          <p>Phone: {phoneNumber}</p>
          <p>Level: {studentLevel}</p>


        </div>






        <div>


          <h2>
            Student List
          </h2>



          {students.map((student,index)=>(


            <div key={index}>


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



              <hr/>


            </div>


          ))}



        </div>


      </div>



    </div>

  );

}


export default App;