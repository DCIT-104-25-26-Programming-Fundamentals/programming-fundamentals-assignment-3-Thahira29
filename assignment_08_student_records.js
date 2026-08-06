// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

let students = [];


function findStudentById(id) {
  return students.find((student) => student.id === id);
}

function calculateAverage(scores) {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
}

function addStudent() {
  const name = readlineSync.question("Student name: ").trim();

  let id;
  while (true) {
    const idInput = readlineSync.question("Student ID: ").trim();
    id = Number(idInput);
    if (idInput === "" || isNaN(id)) {
      console.log("Invalid ID. Please enter a numeric ID.");
      continue;
    }
    if (findStudentById(id)) {
      console.log(`A student with ID ${id} already exists. Please use a different ID.`);
      continue;
    }
    break;
  }

  let numScores;
  while (true) {
    const numInput = readlineSync.question("How many scores? ").trim();
    numScores = parseInt(numInput, 10);
    if (isNaN(numScores) || numScores < 0) {
      console.log("Please enter a valid non-negative number.");
      continue;
    }
    break;
  }

  const scores = [];
  for (let i = 1; i <= numScores; i++) {
    let score;
    while (true) {
      const scoreInput = readlineSync.question(`Enter score ${i}: `).trim();
      score = Number(scoreInput);
      if (scoreInput === "" || isNaN(score)) {
        console.log("Invalid score. Please enter a number.");
        continue;
      }
      break;
    }
    scores.push(score);
  }

  const student = { name, id, scores };
  students.push(student);

  console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents() {
  if (students.length === 0) {
    console.log("No students have been added yet.");
    return;
  }

  console.log("\n" + "-".repeat(70));
  console.log(
    padRight("Name", 20) +
      padRight("ID", 12) +
      padRight("Scores", 22) +
      "Average"
  );
  console.log("-".repeat(70));

  students.forEach((student) => {
    const average = calculateAverage(student.scores).toFixed(2);
    console.log(
      padRight(student.name, 20) +
        padRight(String(student.id), 12) +
        padRight(student.scores.join(", "), 22) +
        average
    );
  });

  console.log("-".repeat(70) + "\n");
}

function padRight(str, length) {
  str = String(str);
  return str.length >= length ? str + " " : str + " ".repeat(length - str.length);
}

function calculateStudentAverage() {
  const idInput = readlineSync.question("Enter student ID: ").trim();
  const id = Number(idInput);

  if (idInput === "" || isNaN(id)) {
    console.log("Invalid ID entered.");
    return;
  }

  const student = findStudentById(id);
  if (!student) {
    console.log(`No student found with ID ${id}.`);
    return;
  }

  const average = calculateAverage(student.scores);
  console.log(`${student.name}'s average score: ${average.toFixed(2)}`);
}

function printMenu() {
  console.log("================================");
  console.log("   STUDENT RECORD SYSTEM MENU");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}

function main() {
  let running = true;

  while (running) {
    printMenu();
    const choice = readlineSync.question("Enter your choice (1-4): ").trim();

    switch (choice) {
      case "1":
        addStudent();
        break;
      case "2":
        displayAllStudents();
        break;
      case "3":
        calculateStudentAverage();
        break;
      case "4":
        console.log("Goodbye!");
        running = false;
        break;
      default:
        console.log("Invalid choice. Please enter a number between 1 and 4.");
    }

    console.log(""); // blank line for readability between loops
  }
}

main();



