const readline = require('readline');

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function validateAndParseNumber(rl, question) {
  return new Promise(async (resolve) => {
    const num = await askQuestion(rl, question);
    const parsedNum = parseFloat(num);
    if (isNaN(parsedNum)) {
      console.log('Error: Invalid number');
      resolve(null);
    }
    resolve(parsedNum);
  });
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
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

function executeOperationAndPrintResult(rl, a, b) {
  return new Promise(async (resolve) => {
    const op = await askQuestion(rl, 'Choose operation (add, subtract, multiply, divide): ');
    const operation = operations[op];
    if (typeof operation !== 'function') {
      console.log('Error: Invalid operation');
      resolve(false);
    }
    const result = operation(a, b);
    console.log(`Result: ${result}`);
    resolve(true);
  });
}

async function main() {
  const rl = createReadlineInterface();

  const a = await validateAndParseNumber(rl, 'Enter first number: ');
  if (a === null) {
    rl.close();
    return;
  }

  const b = await validateAndParseNumber(rl, 'Enter second number: ');
  if (b === null) {
    rl.close();
    return;
  }

  const operationSuccessful = await executeOperationAndPrintResult(rl, a, b);
  if (!operationSuccessful) {
    rl.close();
    return;
  }

  rl.close();
}

main();