import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://herbert-it.onrender.com";

function StudentDashboard() {

  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const [students, setStudents] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentLevel, setStudentLevel] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchStudents();

  }, []);

  async function fetchStudents() {

    try {

      const response = await fetch(

        `${API_URL}/student`,

        {

          headers:{

            "X-User-ID":userId

          }

        }

      );

      const data = await response.json();

      if(response.ok){

        setStudents(data);

      }

    }

    catch(error){

      console.log(error);

    }

  }

  async function submitStudent(e){

    e.preventDefault();

    const student={

      student_name:studentName,

      student_email:studentEmail,

      student_phone_no:phoneNumber,

      student_level:Number(studentLevel)

    };

    try{

      let response;

      if(editingId){

        response=await fetch(

          `${API_URL}/student/${editingId}`,

          {

            method:"PUT",

            headers:{

              "Content-Type":"application/json",

              "X-User-ID":userId

            },

            body:JSON.stringify(student)

          }

        );

      }

      else{

        response=await fetch(

          `${API_URL}/student`,

          {

            method:"POST",

            headers:{

              "Content-Type":"application/json",

              "X-User-ID":userId

            },

            body:JSON.stringify(student)

          }

        );

      }

      if(response.ok){

        clearForm();

        fetchStudents();

      }

    }

    catch(error){

      console.log(error);

    }

  }

  function editStudent(student){

    setEditingId(student.id);

    setStudentName(student.student_name);

    setStudentEmail(student.student_email);

    setPhoneNumber(student.student_phone_no);

    setStudentLevel(student.student_level);

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  }

  function clearForm(){

    setEditingId(null);

    setStudentName("");

    setStudentEmail("");

    setPhoneNumber("");

    setStudentLevel("");

  }

  async function deleteStudent(id){

    if(!window.confirm("Delete this student?")) return;

    const response=await fetch(

      `${API_URL}/student/${id}`,

      {

        method:"DELETE",

        headers:{

          "X-User-ID":userId

        }

      }

    );

    if(response.ok){

      fetchStudents();

    }

  }

  const filteredStudents=useMemo(()=>{

    return students.filter(student=>

      student.student_name
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      student.student_email
      .toLowerCase()
      .includes(search.toLowerCase())

    );

  },[students,search]);

  const averageLevel=

    students.length===0

    ?0

    :

    Math.round(

      students.reduce(

        (sum,s)=>sum+s.student_level,

        0

      )/students.length

    );

  const highestLevel=

    students.length===0

    ?0

    :

    Math.max(

      ...students.map(

        s=>s.student_level

      )

    );
    return (

<div id="center" className="fade">

  <div className="hero">

    <h1 className="base">
      🌱 Student Farm
    </h1>

    <p>
      Welcome back 👋
    </p>

  </div>

 
  {/* DASHBOARD STATS */}

  <div className="stats-grid">

    <div className="stat-card">

      <h3>Total Students</h3>

      <h1>{students.length}</h1>

      <span>Registered Students</span>

    </div>

    <div className="stat-card">

      <h3>Average Level</h3>

      <h1>{averageLevel}</h1>

      <span>Average Student Level</span>

    </div>

    <div className="stat-card">

      <h3>Highest Level</h3>

      <h1>{highestLevel}</h1>

      <span>Top Level</span>

    </div>

  </div>

  {/* FORM */}

  <form onSubmit={submitStudent}>

    <h2>

      {

        editingId

        ?

        "✏ Edit Student"

        :

        "➕ Add Student"

      }

    </h2>

    <label>Name</label>

    <input

      value={studentName}

      onChange={e=>setStudentName(e.target.value)}

      required

    />

    <label>Email</label>

    <input

      type="email"

      value={studentEmail}

      onChange={e=>setStudentEmail(e.target.value)}

      required

    />

    <label>Phone</label>

    <input

      value={phoneNumber}

      onChange={e=>setPhoneNumber(e.target.value)}

      required

    />

    <label>Level</label>

    <input

      type="number"

      value={studentLevel}

      onChange={e=>setStudentLevel(e.target.value)}

      required

    />

    <button
      className="counter"
      type="submit"
    >

      {

        editingId

        ?

        "💾 Save Changes"

        :

        "➕ Add Student"

      }

    </button>

    {

      editingId &&

      <button

        type="button"

        className="counter"

        onClick={clearForm}

      >

        ❌ Cancel

      </button>

    }

  </form>

  {/* SEARCH */}

  <div className="search-bar">

    <input

      placeholder="🔍 Search students..."

      value={search}

      onChange={e=>setSearch(e.target.value)}

    />

  </div>

  <h2>

    Your Students

  </h2>

  {

    filteredStudents.length===0

    ?

    (

      <div className="empty-state">

        <h2>

          📚 No Students Yet

        </h2>

        <p>

          Start by adding your first student.

        </p>

      </div>

    )

    :

    (

      <div className="students-list">

        {

          filteredStudents.map(student=>{

            const initials=

              student.student_name

              .split(" ")

              .map(name=>name[0])

              .join("")

              .toUpperCase();

            return(

              <div

                key={student.id}

                className="student-card"

              >

                <div className="student-details">

                  <div

                    style={{

                      display:"flex",

                      alignItems:"center",

                      gap:"15px"

                    }}

                  >

                    <div className="profile-avatar">

                      {initials}

                    </div>

                    <div>

                      <h3>

                        {student.student_name}

                      </h3>

                      <p>

                        📧 {student.student_email}

                      </p>

                      <p>

                        📞 {student.student_phone_no}

                      </p>

                      <p>

                        🎓 Level {student.student_level}

                      </p>

                    </div>

                  </div>

                </div>

                <div className="student-actions">

                  <button

                    className="counter"

                    onClick={()=>

                      editStudent(student)

                    }

                  >

                    ✏ Edit

                  </button>

                  {

                    role==="admin" &&

                    <button

                      className="counter"

                      onClick={()=>

                        deleteStudent(student.id)

                      }

                    >

                      🗑 Delete

                    </button>

                  }

                </div>

              </div>

            );

          })

        }

      </div>

    )

  }

</div>

);

}

export default StudentDashboard;