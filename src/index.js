module.exports = function solveSudoku(matrix) {
  const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function getEmpty(matrix) {
    let empty = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 0) {
          empty.push([i, j]);
        }
      }
    }
    return empty;
  }

  function isSolved() {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  function getVal(i, j, startValue) {
    let row = matrix[i];
    let col = [];
    let square = [];
    let val = 0;

    for (let step = 0; step < matrix.length; step++) {
      col.push(matrix[step][j]);
    }

    let posRow = Math.floor(i / 3) * 3;
    let posCol = Math.floor(j / 3) * 3;
    let rowEnd = posRow + 3;
    let colEnd = posCol + 3;


    for (posRow; posRow < rowEnd; posRow++) {
      for (posCol; posCol < colEnd; posCol++) {
        square.push(Number(matrix[posRow][posCol]));
      }
      posCol = Math.floor(j / 3) * 3;
    }

    for (let pos = startValue - 1; pos < possibleValues.length; pos++) {
      if (!row.includes(possibleValues[pos])
        && !col.includes(possibleValues[pos])
        && !square.includes(possibleValues[pos])) {
        val = possibleValues[pos];
        break;
      }
    }
    return val;
  }

  let emptyIndex = 0;
  let startValue = 1;
  let empty = getEmpty(matrix);

  while (isSolved() === false) {
    let rowIndex = empty[emptyIndex][0];
    let colIndex = empty[emptyIndex][1];
    let res = getVal(rowIndex, colIndex, startValue);
    if (res === 0) {
      matrix[rowIndex][colIndex] = 0;
      emptyIndex--;
      rowIndex = empty[emptyIndex][0];
      colIndex = empty[emptyIndex][1];
      startValue = matrix[rowIndex][colIndex];
    } else {
      matrix[rowIndex][colIndex] = res;
      startValue = 1;
      emptyIndex++;
    }
  }

  return matrix;
}
