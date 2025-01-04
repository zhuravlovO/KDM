//функція (map)

function asyncMapWithCallback(array, callback, finalCallback) {
  const results = [];
  let completed = 0;
  let hasError = false;

  array.forEach((item, index) => {
    if (item <= 0) {
      hasError = true;
      return finalCallback(`Error: Array element ${item} must be greater than 0`);
    }

    callback(item, (error, value) => {
      if (hasError) return;
      if (error) {
        hasError = true;
        return finalCallback(error);
      }
      results[index] = value;
      completed++;
      if (completed === array.length) {
        finalCallback(null, results);
      }
    });
  });
}

// використання
asyncMapWithCallback(
  [1, 2, 3],
  (item, cb) => setTimeout(() => cb(null, item * 2), 100),
  (err, result) => {
    if (err) console.error('Callback Error:', err);
    else console.log('Callback Results:', result); // [2, 4, 6]
  }
);

asyncMapWithCallback(
  [1, 2, 3, -1], // помилка
  (item, cb) => setTimeout(() => cb(null, item * 2), 100),
  (err, result) => {
    if (err) console.error('Callback Error:', err); // Error: Array element -1 must be greater than 0
    else console.log('Callback Results:', result);
  }
);

asyncMapWithCallback(
  [5, 6, 7], // інший масив
  (item, cb) => setTimeout(() => cb(null, item * 2), 100),
  (err, result) => {
    if (err) console.error('Callback Error:', err);
    else console.log('Callback Results:', result); // [10, 12, 14]
  }
);
