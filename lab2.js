// Реалізація asyncMapPromise
function asyncMapPromise(array, asyncOperation) {
  return Promise.all(array.map(asyncOperation));
}

// Використання з Promise
asyncMapPromise(
  [1, 2, 3],
  (item) => new Promise((resolve) => setTimeout(() => resolve(item * 2), 100))
).then((result) => console.log('Promise Results:', result)); // [2, 4, 6]

asyncMapPromise(
  [50 , -2, 7, 7, 7, 9],
  (item) => new Promise((resolve) => setTimeout(() => resolve(item * 2), 100))
).then((result) => console.log('Promise Results:', result)); // [2, -4, 6]

// Використання з async/await
async function demoAwait() {
  const result = await asyncMapPromise(
    [1, 2, 3],
    (item) => new Promise((resolve) => setTimeout(() => resolve(item * 2), 100))
  );
  console.log('Await Results:', result); // [2, 4, 6]
}

demoAwait();
