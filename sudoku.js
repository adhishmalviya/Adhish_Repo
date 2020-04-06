var matrix = [
    [0,0,8,4,0,3,5,0,6],
    [0,0,3,1,0,2,0,0,4],
    [0,4,5,7,0,0,0,9,0],
    [6,9,0,0,0,5,0,0,7],
    [0,8,0,0,0,0,0,5,0],
    [4,0,0,3,0,0,0,1,8],
    [0,7,0,0,0,6,2,4,0],
    [1,0,0,5,0,7,8,0,0],
    [8,0,6,9,0,1,3,0,0]
];

matrix=[  [3,0,6,5,0,8,4,0,0], 
          [5,2,0,0,0,0,0,0,0], 
          [0,8,7,0,0,0,0,3,1], 
          [0,0,3,0,1,0,0,8,0], 
          [9,0,0,8,6,3,0,0,5], 
          [0,5,0,0,9,0,6,0,0], 
          [1,3,0,0,0,0,2,5,0], 
          [0,0,0,0,0,0,0,7,4], 
          [0,0,5,2,0,6,3,0,0]] ;

function Sudoku(matrix, row, col) {
var cell = findEmptyCell(matrix, row, col);
row = cell[0];
col = cell[1];

// base case  
if (row == -1) {
    return true;
}

for (var num = 1; num <= 9; num++) {

    if ( checkValidMove(matrix, row, col, num) ) {   
        matrix[row][col] = num;

        if ( Sudoku(matrix, row, col) ) {                
            return true;// Recursion succeded 
        }

                    
        matrix[row][col] = 0;//Reseting the number if Recursion fails 
    }
}


return false;
}


function findEmptyCell(matrix, row, col) {
var done = false;
var res = [-1, -1];

while (!done) {
    if (row == 9) {
        done = true;
    }
    else {
        if (matrix[row][col] == 0) {
            res[0] = row;
            res[1] = col;
            done = true;
        }
        else {
            if (col < 8) {
                col++;
            }
            else {
                row++;
                col = 0;
            }
        }
    }
}

return res;
}

function checkValidMove(matrix, row, col, num) {
return checkRow(matrix, row, num) && checkColumn(matrix, col, num) && checkBox(matrix, row, col, num);
}

function checkRow(matrix, row, num) {
for (var col = 0; col < 9; col++)
    if (matrix[row][col] == num)
        return false;

return true;
}
function checkColumn(matrix, col, num) {
for (var row = 0; row < 9; row++)
if (matrix[row][col] == num)
    return false;

return true;    
}
function checkBox(matrix, row, col, num) {
row = Math.floor(row / 3) * 3;
col = Math.floor(col / 3) * 3;

for (var r = 0; r < 3; r++)
    for (var c = 0; c < 3; c++)
        if (matrix[row + r][col + c] == num)
            return false;

return true;
}

function printMatrix(matrix) {
var res = "";

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        res += matrix[i][j];
    }
    res += "\n";
}
console.log(res);
}

Sudoku(matrix,0,0);
printMatrix(matrix);