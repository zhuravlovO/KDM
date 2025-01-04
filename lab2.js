function asyncMapPromise(array, asyncOperation) {
  return Promise.all(
    array.map((item) => {
      if (item <= 0) {
        return Promise.reject(`Error: Array element ${item} must be greater than 0`);
      }
      return new Promise((resolve) => {
         asyncOperation(item).then(resolve);
      });
    })
  );
}

// використання
asyncMapPromise(
  [1, 2, 3],
  (item) => new Promise(resolve => setTimeout(() => resolve(item * 2), 100))
)
  .then((result) => console.log('Promise Results:', result))
  .catch((err) => console.error('Promise Error:', err));

asyncMapPromise(
  [1, -2, 3],
   (item) => new Promise((resolve, reject) => setTimeout(() => resolve(item * 2), 100))
)
  .then((result) => console.log('Promise Results:', result))
  .catch((err) => console.error('Promise Error:', err));

// приклади await
async function demoAwait() {
  try {
    const result = await asyncMapPromise(
      [1, 2, 3],
      (item) => new Promise(resolve => setTimeout(() => resolve(item * 2), 100))
    );
    console.log('Await Results:', result); // [2, 4, 6]
  } catch (err) {
    console.error('Await Error:', err);
  }

  //з помилкою
  try {
    const result = await asyncMapPromise(
      [1, -2, 3],
        (item) => new Promise(resolve => setTimeout(() => resolve(item * 2), 100))
    );
    console.log('Await Results:', result);
  } catch (err) {
    console.error('Await Error:', err); // Error: Array element -2 must be greater than 0
  }
}

demoAwait();
