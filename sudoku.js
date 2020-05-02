var fs = require("fs");

fs.readFile("sudoku_test.txt", "utf8", (err, contents) => {
  var matrix = JSON.parse(contents);
  Sudoku(matrix, 0, 0);
  console.log(matrix);
});

function Sudoku(matrix, row, col) {
  var cell = findEmptyCell(matrix, row, col);
  row = cell[0];
  col = cell[1];

  // base case
  if (row == -1) {
    return true;
  }

  for (var num = 1; num <= 9; num++) {
    if (checkValidMove(matrix, row, col, num)) {
      matrix[row][col] = num;

      if (Sudoku(matrix, row, col)) {
        return true; // Recursion succeded
      }

      matrix[row][col] = 0; //Reseting the number if Recursion fails
    }
  }

  return false;
}

function findEmptyCell(matrix, row, col) {
  var found = false;
  var res = [-1, -1];

  while (!found) {
    if (row == 9) {
      found = true;
    } else {
      if (matrix[row][col] == 0) {
        res[0] = row;
        res[1] = col;
        found = true;
      } else {
        if (col < 8) {
          col++;
        } else {
          row++;
          col = 0;
        }
      }
    }
  }

  return res;
}

function checkValidMove(matrix, row, col, num) {
  return (
    checkRow(matrix, row, num) &&
    checkColumn(matrix, col, num) &&
    checkBox(matrix, row, col, num)
  );
}

function checkRow(matrix, row, num) {
  for (var col = 0; col < 9; col++) if (matrix[row][col] == num) return false;

  return true;
}
function checkColumn(matrix, col, num) {
  for (var row = 0; row < 9; row++) if (matrix[row][col] == num) return false;

  return true;
}
function checkBox(matrix, row, col, num) {
  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (var r = 0; r < 3; r++)
    for (var c = 0; c < 3; c++)
      if (matrix[row + r][col + c] == num) return false;

  return true;
}
