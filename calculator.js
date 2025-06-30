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
    console.log(`Error: Invalid number - ${num}`);
    return null;
  }
  return parsedNum;
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function validateOperation(op) {
  const operations = ['add', 'subtract', 'multiply', 'divide'];
  if (!operations.includes(op)) {
    console.log(`Error: Invalid operation - ${op}`);
    return null;
  }
  return op;
}

function executeOperation(a, b, op) {
  switch (op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        console.log('Error: Division by zero');
        return null;
      }
      return a / b;
    default:
      return null;
  }
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
  if (operation === null) {
    rl.close();
    return;
  }

  const result = executeOperation(a, b, operation);
  if (result === null) {
    rl.close();
    return;
  }

  console.log(`Result: ${result}`);
  rl.close();
}

main();