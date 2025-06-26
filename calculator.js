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
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      if (answer === '') {
        reject('Error: No input provided');
      } else {
        resolve(answer);
      }
    });
  });
}

async function validateAndAskQuestion(rl, question) {
  const num = await askQuestion(rl, question);
  const validatedNum = validateNumber(num);
  if (validatedNum === null) {
    rl.close();
    throw 'Error: Invalid number';
  }
  return validatedNum;
}

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw 'Error: Division by zero';
    }
    return a / b;
  }
};

function executeOperation(a, b, op) {
  const operation = operations[op];
  if (!operation) {
    throw 'Error: Invalid operation';
  }
  const result = operation(a, b);
  console.log(`Result: ${result}`);
}

async function main() {
  try {
    const rl = createReadlineInterface();
    const a = await validateAndAskQuestion(rl, 'Enter first number: ');
    const b = await validateAndAskQuestion(rl, 'Enter second number: ');
    const op = await askQuestion(rl, 'Choose operation (add, subtract, multiply, divide): ');
    executeOperation(a, b, op);
    rl.close();
  } catch (error) {
    console.log(error);
  }
}

main();