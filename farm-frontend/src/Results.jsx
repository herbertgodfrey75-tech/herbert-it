import "./App.css";
import { getStudentData } from "./data/schoolData";

function Results({ goBack }) {

  const studentId = localStorage.getItem("user_id");

  const student = getStudentData(studentId);

  return (

    <div id="center">

      <h1>📊 My Results</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Average</h3>
          <h1>{student.average}%</h1>
        </div>

        <div className="stat-card">
          <h3>GPA</h3>
          <h1>{student.gpa}</h1>
        </div>

        <div className="stat-card">
          <h3>CGPA</h3>
          <h1>{student.cgpa}</h1>
        </div>

      </div>

      <br />

      <table className="table">

        <thead>

          <tr>

            <th>Subject</th>

            <th>Score</th>

            <th>Grade</th>

          </tr>

        </thead>

        <tbody>

          {student.results.map((result, index) => (

            <tr key={index}>

              <td>{result.subject}</td>

              <td>{result.score}%</td>

              <td>{result.grade}</td>

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

export default Results;