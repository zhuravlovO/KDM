//Task 3
//Integrate AbortController
// Можливість вирубити програму , написавши ex
const AbortController = global.AbortController || require('abort-controller');
const readline = require('readline');

function asyncMapPromise(array, asyncOperation, signal) {
  return Promise.all(
    array.map((item) => asyncOperation(item, signal))
  );
}


function asyncOperation(item, signal) {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(item * 2);
    }, 3000); 

    signal.addEventListener('abort', () => {
      clearTimeout(timeoutId); 
    });
  });
}

function asyncMapWithAbort(array) {
  const controller = new AbortController();
  const signal = controller.signal;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'ex') {
      console.log('Manual exit');
      controller.abort();
      rl.close();
    }
  });

  // Запуск обробки
  return asyncMapPromise(array, asyncOperation, signal)
    .then((results) => {
      console.log('Results:', results);
      rl.close();
    })
    .finally(() => {
      process.exit(0);
    });
}

const numbers = [1, 2, 7, 4, 9, 6, 1]; 
asyncMapWithAbort(numbers);
