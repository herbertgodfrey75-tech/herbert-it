import "./App.css";
import { getStudentData } from "./data/schoolData";

function Timetable({ goBack }) {

  const studentId = localStorage.getItem("user_id");

  const student = getStudentData(studentId);

  return (

    <div id="center">

      <h1>📅 My Timetable</h1>

      <p>
        <strong>{student.level}</strong> • {student.department}
      </p>

      <table className="table">

        <thead>

          <tr>

            <th>Day</th>

            <th>Time</th>

            <th>Subject</th>

          </tr>

        </thead>

        <tbody>

          {student.timetable.map((lesson, index) => (

            <tr key={index}>

              <td>{lesson.day}</td>

              <td>{lesson.time}</td>

              <td>{lesson.subject}</td>

            </tr>

          ))}

        </tbody>

      </table>

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

export default Timetable;