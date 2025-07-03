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
    console.log('Error: Invalid number. Please enter a valid number.');
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

async function promptForNumber(rl, promptText) {
  while (true) {
    const input = await askQuestion(rl, promptText);
    const trimmed = input.trim();
    const num = validateNumber(trimmed);
    if (num !== null) {
      return num;
    }
    // Loop again for valid input
  }
}

async function promptForOperation(rl) {
  const validOps = Object.keys(operations);
  while (true) {
    const input = await askQuestion(
      rl,
      `Choose operation (${validOps.join(', ')}): `
    );
    const op = input.trim().toLowerCase();
    if (validOps.includes(op)) {
      return op;
    }
    console.log('Error: Invalid operation. Please choose a valid operation.');
  }
}

async function main() {
  const rl = createReadlineInterface();
  try {
    const a = await promptForNumber(rl, 'Enter first number: ');
    const b = await promptForNumber(rl, 'Enter second number: ');

    let op;
    let result;
    while (true) {
      op = await promptForOperation(rl);
      result = operations[op](a, b);
      if (result === 'Error: Division by zero') {
        console.log(result);
        continue;
      }
      break;
    }

    console.log(`Result: ${result}`);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
  } finally {
    rl.close();
  }
}

main();