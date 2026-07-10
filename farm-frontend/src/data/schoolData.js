// =======================
// SUBJECTS
// =======================

const subjects = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Geography",
  "Agricultural Science",
  "Government",
  "Literature",
  "Civic Education",
  "Further Mathematics",
  "Commerce",
  "CRS"
];

// =======================
// DAYS
// =======================

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

// =======================
// TIMES
// =======================

const times = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "1:00 PM - 2:00 PM"
];

// =======================
// LEVELS
// =======================

const levels = [
  "100 Level",
  "200 Level",
  "300 Level",
  "400 Level",
  "500 Level"
];

// =======================
// DEPARTMENTS
// =======================

const departments = [
  "Computer Science",
  "Software Engineering",
  "Cyber Security",
  "Information Technology",
  "Data Science",
  "Computer Engineering",
  "Business Administration",
  "Accounting",
  "Economics",
  "Mass Communication",
  "Law",
  "Medicine",
  "Nursing",
  "Pharmacy",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Architecture"
];

// =======================
// HOUSES
// =======================

const houses = [
  "Red House",
  "Blue House",
  "Green House",
  "Yellow House"
];

// =======================
// ADVISERS
// =======================

const advisers = [
  "Mr. Johnson",
  "Mrs. Williams",
  "Mr. Okafor",
  "Mrs. Musa",
  "Mr. Ibrahim",
  "Mrs. Grace"
];

// =======================
// SCHOOL NOTES
// =======================

const schoolNotes = [
  "📢 Midterm examinations begin next week.",
  "🏀 Inter-house sports competition is on Friday.",
  "📚 Return all borrowed library books.",
  "💻 Computer practical starts tomorrow.",
  "🎉 Cultural Day will hold next month.",
  "🧪 Science Fair registration is now open.",
  "📖 Continuous Assessment starts on Monday.",
  "🎓 Graduation rehearsal is this Friday."
];

// =======================
// HELPERS
// =======================

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// =======================
// GET STUDENT DATA
// =======================

export function getStudentData(studentId) {

  const storageKey = `studentData_${studentId}`;

  const existing = localStorage.getItem(storageKey);

  if (existing) {
    return JSON.parse(existing);
  }

  const pickedSubjects = shuffle(subjects).slice(0, 5);

  // Timetable
  const timetable = days.map((day, index) => ({
    day,
    subject: pickedSubjects[index],
    time: times[index]
  }));

  // Assignments
  const assignments = pickedSubjects.map(subject => ({
    subject,
    title: `${subject} Assignment`,
    due: `${Math.floor(Math.random() * 7) + 1} days left`
  }));

  // Results
  const results = pickedSubjects.map(subject => {

    const score = Math.floor(Math.random() * 41) + 60;

    let grade = "C";

    if (score >= 90) grade = "A+";
    else if (score >= 80) grade = "A";
    else if (score >= 70) grade = "B";
    else if (score >= 60) grade = "C";

    return {
      subject,
      score,
      grade
    };

  });

  // Average
  const average =
    results.reduce((sum, item) => sum + item.score, 0) /
    results.length;

  // GPA
  let GPA = 2.0;

  if (average >= 90) GPA = 4.0;
  else if (average >= 80) GPA = 3.7;
  else if (average >= 70) GPA = 3.3;
  else if (average >= 60) GPA = 2.8;
  else if (average >= 50) GPA = 2.3;
  else GPA = 1.5;

  // Previous GPAs
  const previousGPAs = [
    +(Math.random() * 1.5 + 2.5).toFixed(2),
    +(Math.random() * 1.5 + 2.5).toFixed(2),
    +(Math.random() * 1.5 + 2.5).toFixed(2)
  ];

  // CGPA
  const CGPA = (
    (previousGPAs.reduce((a, b) => a + b, 0) + GPA) / 4
  ).toFixed(2);

  // Attendance
  const attendance = {
    present: Math.floor(Math.random() * 20) + 80,
    absent: Math.floor(Math.random() * 10),
    late: Math.floor(Math.random() * 5)
  };

  // Final data
  const data = {

    studentId,

    level: randomItem(levels),

    department: randomItem(departments),

    house: randomItem(houses),

    adviser: randomItem(advisers),

    admissionYear: 2022 + Math.floor(Math.random() * 5),

    semester:
      Math.random() > 0.5
        ? "First Semester"
        : "Second Semester",

    average: average.toFixed(1),

    gpa: GPA.toFixed(2),

    cgpa: CGPA,

    attendance,

    timetable,

    assignments,

    results,

    notes: shuffle(schoolNotes).slice(0, 4)

  };

  localStorage.setItem(
    storageKey,
    JSON.stringify(data)
  );

  return data;

}

// =======================
// REGENERATE DATA
// =======================

export function regenerateStudentData(studentId) {

  localStorage.removeItem(
    `studentData_${studentId}`
  );

  return getStudentData(studentId);

}