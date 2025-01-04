//Task 3
//Integrate AbortController
// Можливість вирубити програму , написавши ex
const AbortController = global.AbortController || require('abort-controller');
const readline = require('readline');

function asyncOperation(item, delay, signal) {
  return new Promise((resolve, reject) => {
    if (item <= 0) {
      reject(new Error(`Invalid number: ${item}`));
      return;
    }

    const timeoutId = setTimeout(() => {
      resolve(item * 2); 
    }, delay);

    signal.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new Error(`Operation aborted `));
    });
  });
}

function asyncMap(array, delay) {
  const controller = new AbortController();
  const signal = controller.signal;

  // Можливість ручного завершення
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'ex') {
      console.log('Manual exit ');
      controller.abort();
      rl.close(); 
    }
  });

  return Promise.all(
    array.map((item) => asyncOperation(item, delay, signal))
  )
    .then((results) => {
      console.log('Results:', results);
      console.log('Processing complete.');
      rl.close(); 
    })
    .catch((err) => {
      console.error('Error:', err.message); 
      console.log('Processing complete.');
      rl.close(); 
    });
}

// Використання
const numbers = [1, 2, 3, 4, 5, 6, 7]; 
asyncMap(numbers, 3000).finally(() => {
  process.exit(0); 
});
