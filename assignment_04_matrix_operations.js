// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');
function readMatrix(rows, cols, label) {
  const matrix = [];
  console.log(`\nEnter matrix ${label} (${rows} row(s), ${cols} column(s)):`);
  for (let i = 0; i < rows; i++) {
    let row;
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1}: `);
      row = line.trim().split(/\s+/).map(Number);
      if (row.length !== cols || row.some(isNaN)) {
        console.log(`  Please enter exactly ${cols} numeric value(s), separated by spaces.`);
      } else {
        break;
      }
    }
    matrix.push(row);
  }
  return matrix;
}

function readPositiveInt(prompt) {
  let value;
  while (true) {
    value = parseInt(readlineSync.question(prompt), 10);
    if (Number.isInteger(value) && value > 0) break;
    console.log('  Please enter a positive integer.');
  }
  return value;
}


function printMatrix(matrix, label) {
  if (label) console.log(`\n${label}:`);

  // Determine the widest value so all columns line up.
  let maxWidth = 0;
  for (const row of matrix) {
    for (const value of row) {
      maxWidth = Math.max(maxWidth, String(value).length);
    }
  }

  for (const row of matrix) {
    const line = row.map(value => String(value).padStart(maxWidth)).join('  ');
    console.log(line);
  }
}


function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}


function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}


function multiplyMatrices(a, b) {
  const rowsA = a.length;
  const colsA = a[0].length; // == rowsB
  const colsB = b[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}


function runTranspose() {
  console.log('\n=== PART A: Transpose a Matrix ===');
  const rows = readPositiveInt('Enter number of rows: ');
  const cols = readPositiveInt('Enter number of columns: ');
  const matrix = readMatrix(rows, cols, 'A');

  const transposed = transposeMatrix(matrix);

  printMatrix(matrix, 'Original Matrix');
  printMatrix(transposed, 'Transposed Matrix');
}


function runAddition() {
  console.log('\n=== PART B: Add Two Matrices ===');
  const rows = readPositiveInt('Enter number of rows (for both matrices): ');
  const cols = readPositiveInt('Enter number of columns (for both matrices): ');

  const matrixA = readMatrix(rows, cols, 'A');
  const matrixB = readMatrix(rows, cols, 'B');

  const sum = addMatrices(matrixA, matrixB);

  printMatrix(matrixA, 'Matrix A');
  printMatrix(matrixB, 'Matrix B');
  printMatrix(sum, 'A + B');
}


function runMultiplication() {
  console.log('\n=== PART C: Multiply Two Matrices ===');
  console.log('(Matrix A is M x N, Matrix B is N x P. Columns of A must equal rows of B.)');

  const m = readPositiveInt('Enter number of rows for Matrix A (M): ');
  const n = readPositiveInt('Enter number of columns for Matrix A / rows for Matrix B (N): ');
  const p = readPositiveInt('Enter number of columns for Matrix B (P): ');

  const matrixA = readMatrix(m, n, 'A');
  const matrixB = readMatrix(n, p, 'B');

  const product = multiplyMatrices(matrixA, matrixB);

  printMatrix(matrixA, 'Matrix A');
  printMatrix(matrixB, 'Matrix B');
  printMatrix(product, 'A x B');
}

function main() {
  console.log('=================================================');
  console.log(' Matrix Operations: Transpose, Add, Multiply');
  console.log('=================================================');

  const options = [
    'Transpose a Matrix (Part A)',
    'Add Two Matrices (Part B)',
    'Multiply Two Matrices (Part C)',
    'Exit'
  ];

  while (true) {
    console.log('\nChoose an operation:');
    options.forEach((opt, idx) => console.log(`  ${idx + 1}. ${opt}`));

    const choice = readPositiveInt('Enter choice (1-4): ');

    switch (choice) {
      case 1:
        runTranspose();
        break;
      case 2:
        runAddition();
        break;
      case 3:
        runMultiplication();
        break;
      case 4:
        console.log('\nGoodbye!');
        return;
      default:
        console.log('  Invalid choice, please select 1-4.');
    }
  }
}

main();


