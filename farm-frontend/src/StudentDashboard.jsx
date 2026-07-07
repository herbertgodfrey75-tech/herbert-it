import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import "./App.css";
import DashboardChart from "./Components/DashboardChart";

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
  const [studentNameError, setStudentNameError] = useState("");
  const [studentEmailError, setStudentEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [levelError, setLevelError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

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

      }else{

        toast.error(data.detail || "Couldn't load students.");

      }

    }

    catch(error){

      console.log(error);

      toast.error("Couldn't connect to server.");

    }

  }

  async function submitStudent(e){

    e.preventDefault();

    if (
  studentNameError &&
  studentNameError !== "Looks good."
) {
  return;
}
if(
studentNameError!=="Looks good."||
studentEmailError!=="Looks good."||
phoneError!=="Looks good."||
levelError!=="Looks good."
){
return;
}

    setLoading(true);

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

        toast.success(

          editingId

          ?

          "Student updated successfully! 🎉"

          :

          "Student added successfully! 🎉"

        );

        clearForm();

        fetchStudents();

      }

      else{

        const data=await response.json();

        toast.error(

          data.detail || "Operation failed."

        );

      }

    }

    catch(error){

      console.log(error);

      toast.error("Server error.");

    }

    finally{

      setLoading(false);

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

      toast.success("Student deleted.");

      fetchStudents();

    }

    else{

      toast.error("Delete failed.");

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
      maxLength={50}
      onChange={(e) => {
        const value = e.target.value.replace(/^\s+/, "");

        if (!/^[A-Za-z\s'-]*$/.test(value)) {
          setStudentNameError(
            "Only letters, spaces, apostrophes (') and hyphens (-) are allowed."
          );
          return;
        }

        setStudentName(value.replace(/\s{2,}/g, " "));

        if (value === "") {
          setStudentNameError("");
        } else if (value.trim().length < 3) {
          setStudentNameError(
            "Student name must be at least 3 characters."
          );
        } else {
          setStudentNameError("Looks good.");
        }
      }}
    />

    {studentNameError && (
      <p
        style={{
          color:
            studentNameError === "Looks good."
              ? "#22c55e"
              : "#ef4444",
          fontSize: "14px",
          marginTop: "5px",
        }}
      >
        {studentNameError}
      </p>
    )}

    <label>Email</label>

   <input
type="email"
value={studentEmail}
onChange={(e)=>{

const value=e.target.value.replace(/\s/g,"");

setStudentEmail(value);

if(value===""){

setStudentEmailError("");

}
else if(!/\S+@\S+\.\S+/.test(value)){

setStudentEmailError("Invalid email address.");

}
else{

setStudentEmailError("Looks good.");

}

}}
required
/>
{studentEmailError&&(
<p
style={{
color:studentEmailError==="Looks good."?"#22c55e":"#ef4444",
fontSize:"14px",
marginTop:"5px"
}}
>
{studentEmailError}
</p>
)}

    <label>Phone</label>

  <input
value={phoneNumber}
maxLength={11}
onChange={(e)=>{

const value=e.target.value.replace(/\D/g,"");

setPhoneNumber(value);

if(value===""){

setPhoneError("");

}
else if(value.length!==11){

setPhoneError("Phone number must be exactly 11 digits.");

}
else if(!/^0[789]\d{9}$/.test(value)){

setPhoneError("Phone number must start with 07, 08 or 09.");

}
else{

setPhoneError("Looks good.");

}

}}
required
/>
{phoneError&&(
<p
style={{
color:phoneError==="Looks good."?"#22c55e":"#ef4444",
fontSize:"14px",
marginTop:"5px"
}}
>
{phoneError}
</p>
)}
    <label>Level</label>

    <input
type="number"
min="100"
max="800"
value={studentLevel}
onChange={(e)=>{

const value=e.target.value;

setStudentLevel(value);

if(value===""){

setLevelError("");

}
else if(Number(value)<100||Number(value)>800){

setLevelError("Level must be between 100 and 800.");

}
else{

setLevelError("Looks good.");

}

}}
required
/>
{levelError&&(
<p
style={{
color:levelError==="Looks good."?"#22c55e":"#ef4444",
fontSize:"14px",
marginTop:"5px"
}}
>
{levelError}
</p>
)}

    <button

      className="counter"

      type="submit"

      disabled={loading}

    >

      {

        loading

        ?

        (

          editingId

          ?

          "Saving..."

          :

          "Adding..."

        )

        :

        (

          editingId

          ?

          "💾 Save Changes"

          :

          "➕ Add Student"

        )

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

  <div className="search-bar">

    <input

      placeholder="🔍 Search students..."

      value={search}

      onChange={e=>setSearch(e.target.value)}

    />

  </div>
<DashboardChart students={students} />

  <h2>Your Students</h2>

  {

    filteredStudents.length===0

    ?

    (

      <div className="empty-state">

        <h2>📚 No Students Yet</h2>

        <p>Start by adding your first student.</p>

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

                      <h3>{student.student_name}</h3>

                      <p>📧 {student.student_email}</p>

                      <p>📞 {student.student_phone_no}</p>

                      <p>🎓 Level {student.student_level}</p>

                    </div>

                  </div>

                </div>

                <div className="student-actions">

                  <button

                    className="counter"

                    onClick={()=>editStudent(student)}

                  >

                    ✏ Edit

                  </button>

                  {

                    role==="admin" &&

                    <button

                      className="counter"

                      onClick={()=>deleteStudent(student.id)}

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