const hasAnomalies = (matrix: string[][], sequenceLength: number): boolean => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Verificar horizontalmente
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - sequenceLength; col++) {
      let consecutiveCount = 1; // Inicia en 1 porque ya tenemos al menos una letra
      for (let i = col + 1; i < col + sequenceLength; i++) {
        if (matrix[row][i] === matrix[row][i - 1]) {
          consecutiveCount++;
        } else {
          break;
        }
      }
      if (consecutiveCount >= sequenceLength) {
        return true;
      }
    }
  }

  // Verificar verticalmente
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - sequenceLength; row++) {
      let consecutiveCount = 1;
      for (let i = row + 1; i < row + sequenceLength; i++) {
        if (matrix[i][col] === matrix[i - 1][col]) {
          consecutiveCount++;
        } else {
          break;
        }
      }
      if (consecutiveCount >= sequenceLength) {
        return true;
      }
    }
  }

  // Verificar diagonalmente (superior izquierda a inferior derecha)
  for (let row = 0; row <= rows - sequenceLength; row++) {
    for (let col = 0; col <= cols - sequenceLength; col++) {
      let consecutiveCount = 1;
      for (let i = 1; i < sequenceLength; i++) {
        if (matrix[row + i][col + i] === matrix[row + i - 1][col + i - 1]) {
          consecutiveCount++;
        } else {
          break;
        }
      }
      if (consecutiveCount >= sequenceLength) {
        return true;
      }
    }
  }

  // Verificar diagonalmente (superior derecha a inferior izquierda)
  for (let row = 0; row <= rows - sequenceLength; row++) {
    for (let col = sequenceLength - 1; col < cols; col++) {
      let consecutiveCount = 1;
      for (let i = 1; i < sequenceLength; i++) {
        if (matrix[row + i][col - i] === matrix[row + i - 1][col - i + 1]) {
          consecutiveCount++;
        } else {
          break;
        }
      }
      if (consecutiveCount >= sequenceLength) {
        return true;
      }
    }
  }

  return false;
};

export default hasAnomalies;
