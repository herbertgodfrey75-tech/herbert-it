import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ students = [] }) {
  const levels = {};

  students.forEach((student) => {
    const level = student.student_level ?? "Unknown";
    levels[level] = (levels[level] || 0) + 1;
  });

  const data = {
    labels: Object.keys(levels).map((level) => `Level ${level}`),
    datasets: [
      {
        label: "Students",
        data: Object.values(levels),
        backgroundColor: "#22c55e",
        borderColor: "#16a34a",
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "#15803d",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-card">
      <h2>📊 Students by Level</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DashboardChart;