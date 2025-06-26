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
    console.log('Error: Invalid number');
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
  divide: (a, b) => {
    if (b === 0) {
      return 'Error: Division by zero';
    }
    return a / b;
  }
};

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
  const operation = operations[op];
  if (!operation) {
    console.log('Error: Invalid operation');
    rl.close();
    return;
  }

  const result = operation(a, b);
  console.log(`Result: ${result}`);
  rl.close();
}

main();