const readline = require('readline');

function createReadlineInterface() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    console.log('\nExiting calculator.');
    rl.close();
    process.exit(0);
  });
  return rl;
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
  divide: (a, b) => a / b
};

async function promptForNumber(rl, promptText) {
  while (true) {
    const input = await askQuestion(rl, promptText);
    const num = validateNumber(input);
    if (num !== null) {
      return num;
    }
    console.log('Error: Please enter a valid number.');
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
    console.log('Error: Invalid operation. Please choose from:', validOps.join(', '));
  }
}

async function main() {
  const rl = createReadlineInterface();

  const a = await promptForNumber(rl, 'Enter first number: ');
  const b = await promptForNumber(rl, 'Enter second number: ');
  const op = await promptForOperation(rl);

  if (op === 'divide' && b === 0) {
    console.log('Error: Division by zero is not allowed.');
    rl.close();
    return;
  }

  const result = operations[op](a, b);
  console.log(`Result: ${result}`);
  rl.close();
}

main();