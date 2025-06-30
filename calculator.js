const readline = require('readline');

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function validateNumber(num) {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    console.log('Error: Input is not a valid number');
    return null;
  }
  return parsedNum;
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
  divide: (a, b) => a / b
};

function validateOperation(op) {
  const operation = operations[op];
  if (!operation) {
    console.log('Error: Invalid operation. Choose from add, subtract, multiply, divide');
    return null;
  }
  return operation;
}

function executeOperation(operation, a, b) {
  if (operation === operations.divide && b === 0) {
    console.log('Error: Division by zero is not allowed');
    return null;
  }
  return operation(a, b);
}

async function main() {
  const rl = createReadlineInterface();

  const num1 = await askQuestion(rl, 'Enter first number: ');
  const a = validateNumber(num1);
  if (a === null) {
    rl.close();
    return;
  }

  const num2 = await askQuestion(rl, 'Enter second number: ');
  const b = validateNumber(num2);
  if (b === null) {
    rl.close();
    return;
  }

  const op = await askQuestion(rl, 'Choose operation (add, subtract, multiply, divide): ');
  const operation = validateOperation(op);
  if (!operation) {
    rl.close();
    return;
  }

  const result = executeOperation(operation, a, b);
  if (result !== null) {
    console.log(`Result: ${result}`);
  }
  rl.close();
}

main();