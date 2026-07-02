import { useState, useEffect } from "react";
import "./App.css";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";

function Dashboard({ logout, openProfile }) {

  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const [students, setStudents] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentLevel, setStudentLevel] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {

    try {

      const response = await fetch(
        `${API_URL}/student`,
        {
          headers: {
            "X-User-ID": userId
          }
        }
      );

      const data = await response.json();

      if (response.ok) {

        setStudents(data);

      }

    } catch (error) {

      console.log(error);

    }

  }

  async function addStudent(e) {

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

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            "X-User-ID": userId

          },

          body: JSON.stringify(student)

        }

      );

      if (response.ok) {

        setStudentName("");

        setStudentEmail("");

        setPhoneNumber("");

        setStudentLevel("");

        fetchStudents();

      }

    } catch (error) {

      console.log(error);

    }

  }

  async function updateStudent(id, student) {

    const updated = {

      student_name: prompt(
        "Student Name",
        student.student_name
      ),

      student_email: prompt(
        "Student Email",
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

    const response = await fetch(

      `${API_URL}/student/${id}`,

      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          "X-User-ID": userId

        },

        body: JSON.stringify(updated)

      }

    );

    if (response.ok) {

      fetchStudents();

    }

  }

  async function deleteStudent(id) {

    const response = await fetch(

      `${API_URL}/student/${id}`,

      {

        method: "DELETE",

        headers: {

          "X-User-ID": userId

        }

      }

    );

    if (response.ok) {

      fetchStudents();

    }

  }

  return (

    <div id="center">

      <button
        className="counter logout-btn"
        onClick={logout}
      >
        Logout
      </button>

      <div className="hero">

        <h1 className="base">
          Student Farm App
        </h1>

      </div>

      <div className="top-nav">

        <button className="counter">
          Dashboard
        </button>

        <button
          className="counter"
          onClick={openProfile}
        >
          My Profile
        </button>

      </div>

      <form onSubmit={addStudent}>

        <h2>Add Student</h2>

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

      <h2>Your Students</h2>

      {

        students.length === 0 ?

        (

          <p>No students found.</p>

        )

        :

        students.map(student => (

          <div
            className="student-card"
            key={student.id}
          >

            <h3>

              {student.student_name}

            </h3>

            <p>

              <strong>Email:</strong>{" "}

              {student.student_email}

            </p>

            <p>

              <strong>Phone:</strong>{" "}

              {student.student_phone_no}

            </p>

            <p>

              <strong>Level:</strong>{" "}

              {student.student_level}

            </p>

            <div
              style={{
                display:"flex",
                gap:"10px",
                marginTop:"15px",
                flexWrap:"wrap"
              }}
            >

              <button
                className="counter"
                onClick={() =>
                  updateStudent(student.id, student)
                }
              >
                Update
              </button>

              {

                role === "admin" &&

                <button
                  className="counter"
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                >
                  Delete
                </button>

              }

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default Dashboard;