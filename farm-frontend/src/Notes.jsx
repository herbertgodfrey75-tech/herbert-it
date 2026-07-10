import "./App.css";
import { getStudentData } from "./data/schoolData";

function Notes({ goBack }) {

  const studentId = localStorage.getItem("user_id");

  const student = getStudentData(studentId);

  return (

    <div id="center">

      <h1>📝 School Notes</h1>

      <div className="stats-grid">

        {student.notes.map((note, index) => (

          <div
            className="stat-card"
            key={index}
          >

            <p>{note}</p>

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

export default Notes;