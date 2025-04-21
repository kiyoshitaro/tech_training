function multiplyMatrices(a, b) {
  const size = a.length;
  const result = Array.from({ length: size }, () => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          let sum = 0;
          for (let k = 0; k < size; k++) {
              sum += a[i][k] * b[k][j];
          }
          result[i][j] = sum;
      }
  }
  return result;
}

// Example usage
const size = 500;
const a = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.floor(Math.random() * 100)));
const b = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.floor(Math.random() * 100)));

console.time('Matrix multiplication without concurrency');
const result = multiplyMatrices(a, b);
console.timeEnd('Matrix multiplication without concurrency');

console.log(`Number of elements in result matrix: ${result.length * result.length}`);
