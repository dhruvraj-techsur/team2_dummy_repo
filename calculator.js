const readline = require('readline');

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function validateAndParseNumber(rl, question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (num) => {
      const parsedNum = parseFloat(num);
      if (isNaN(parsedNum)) {
        console.log('Error: Invalid number');
        reject();
      } else {
        resolve(parsedNum);
      }
    });
  });
}

function executeOperation(rl, operation, a, b) {
  if (typeof operation !== 'function') {
    console.log('Error: Invalid operation');
    rl.close();
    return;
  }

  const result = operation(a, b);
  console.log(`Result: ${result}`);
  rl.close();
}

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      return 'Error: Division by zero';
    }
    return a / b;
  }
};

async function main() {
  const rl = createReadlineInterface();

  try {
    const a = await validateAndParseNumber(rl, 'Enter first number: ');
    const b = await validateAndParseNumber(rl, 'Enter second number: ');
    const op = await askQuestion(rl, 'Choose operation (add, subtract, multiply, divide): ');
    const operation = operations[op];
    executeOperation(rl, operation, a, b);
  } catch {
    rl.close();
  }
}

main();