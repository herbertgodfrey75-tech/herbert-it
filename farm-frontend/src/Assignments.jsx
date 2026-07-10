import "./App.css";
import { getStudentData } from "./data/schoolData";

function Assignments({ goBack }) {

  const studentId = localStorage.getItem("user_id");

  const student = getStudentData(studentId);

  return (

    <div id="center">

      <h1>📝 My Assignments</h1>

      <div className="stats-grid">

        {student.assignments.map((assignment, index) => (

          <div
            className="stat-card"
            key={index}
          >

            <h3>{assignment.subject}</h3>

            <p>{assignment.title}</p>

            <strong>{assignment.due}</strong>

          </div>

        ))}

      </div>

      <br />

      <button
        className="counter"
        onClick={goBack}
      >
        ⬅ Back
      </button>

    </div>

  );

}

export default Assignments;