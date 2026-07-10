import "./App.css";
import { getStudentData } from "./data/schoolData";

function StudentPortal({
  openAssignments,
  openTimetable,
  openResults,
  openNotes
}) {
  const fullName = localStorage.getItem("full_name") || "Student";
  const studentId = localStorage.getItem("user_id");

const student = getStudentData(studentId);
 const studentData = student;

  return (
    <div id="center" className="fade">

      <div className="hero">

        <h1 className="base">
          🎓 Student Portal
        </h1>

        <p>
          Welcome back, <strong>{fullName}</strong> 👋
        </p>
        <div className="student-info">

  <p><strong>Level:</strong> {student.level}</p>

  <p><strong>Department:</strong> {student.department}</p>

  <p><strong>Semester:</strong> {student.semester}</p>

  <p><strong>Adviser:</strong> {student.adviser}</p>

</div>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="stats-grid">

        <div className="stat-card">
  <h3>📝 Assignments</h3>
  <h1>{studentData.assignments.length}</h1>
  <span>Pending assignments</span>
</div>
       <div className="stat-card">
  <h3>📅 Timetable</h3>
  <h1>{studentData.timetable.length}</h1>
  <span>Classes this week</span>
</div>
   <div className="stat-card">
  <h3>📊 GPA</h3>
  <h1>{studentData.gpa}</h1>
  <span>CGPA: {studentData.cgpa}</span>
</div>
   <div className="stat-card">
  <h3>📈 Attendance</h3>
  <h1>{studentData.attendance.present}%</h1>
  <span>Present</span>
</div>
<div className="stat-card">
  <h3>📊 Results</h3>

  <h1>{studentData.results.length}</h1>

  <p>
    GPA: <strong>{studentData.gpa}</strong>
  </p>

  <p>
    CGPA: <strong>{studentData.cgpa}</strong>
  </p>

  <span>
    Average: {studentData.average}%
  </span>
</div>

<div className="stat-card">
  <h3>📝 Notes</h3>
  <h1>{studentData.notes.length}</h1>
  <span>School announcements</span>
</div>

      </div>

      {/* QUICK ACCESS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px"
        }}
      >
<button

  className="counter"

  onClick={openAssignments}

>

  📝 My Assignments

</button>

       <button
  className="counter"
  onClick={openTimetable}
>
  📅 My Timetable
</button>

<button
  className="counter"
  onClick={openResults}
>
  📊 My Results
</button>

<button
  className="counter"
  onClick={openNotes}
>
  📝 My Notes
</button>

      </div>

      {/* EMPTY STATE */}

      <div
        className="empty-state"
        style={{ marginTop: "40px" }}
      >

        <h2>
          🚀 Welcome to Student Farm
        </h2>

        <p>
          Your personal student workspace is ready.
        </p>

        <p>
          Soon you'll be able to manage assignments,
          organize your timetable, keep notes,
          track results and much more.
        </p>

      </div>

    </div>
  );
}

export default StudentPortal;