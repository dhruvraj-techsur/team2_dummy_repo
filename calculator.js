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
    throw new Error('Invalid number');
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
      throw new Error('Division by zero');
    }
    return a / b;
  }
};

async function main() {
  const rl = createReadlineInterface();

  try {
    const num1 = await askQuestion(rl, 'Enter first number: ');
    const a = validateNumber(num1);

    const num2 = await askQuestion(rl, 'Enter second number: ');
    const b = validateNumber(num2);

    const op = await askQuestion(rl, 'Choose operation (add, subtract, multiply, divide): ');
    const operation = operations[op];
    if (!operation) {
      throw new Error('Invalid operation');
    }

    const result = operation(a, b);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
}

main();