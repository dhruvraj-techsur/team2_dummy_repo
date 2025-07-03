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

async function promptNumber(rl, promptText) {
  while (true) {
    const input = (await askQuestion(rl, promptText)).trim();
    const num = validateNumber(input);
    if (num !== null) {
      return num;
    }
    console.log('Error: Please enter a valid number.');
  }
}

async function promptOperation(rl, a, b) {
  const validOps = Object.keys(operations);
  while (true) {
    const opInput = (await askQuestion(
      rl,
      `Choose operation (${validOps.join(', ')}): `
    )).trim().toLowerCase();
    const operation = operations[opInput];
    if (!operation) {
      console.log('Error: Invalid operation. Please choose from:', validOps.join(', '));
      continue;
    }
    if (opInput === 'divide' && b === 0) {
      console.log('Error: Division by zero is not allowed. Please enter a different operation or change the second number.');
      continue;
    }
    return { opInput, operation };
  }
}

async function main() {
  const rl = createReadlineInterface();

  try {
    const a = await promptNumber(rl, 'Enter first number: ');
    const b = await promptNumber(rl, 'Enter second number: ');
    const { opInput, operation } = await promptOperation(rl, a, b);

    const result = operation(a, b);
    console.log(`Result: ${result}`);
  } finally {
    rl.close();
  }
}

main();