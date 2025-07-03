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
    console.log('Error: Please enter a valid number.');
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
      return null;
    }
    return a / b;
  }
};

async function promptForNumber(rl, promptText) {
  while (true) {
    const input = await askQuestion(rl, promptText);
    const num = validateNumber(input);
    if (num !== null) {
      return num;
    }
  }
}

async function promptForOperation(rl, a, b) {
  while (true) {
    const opInput = await askQuestion(
      rl,
      'Choose operation (add, subtract, multiply, divide): '
    );
    const opKey = opInput.trim().toLowerCase();
    const operation = operations[opKey];
    if (!operation) {
      console.log('Error: Invalid operation. Please choose from add, subtract, multiply, divide.');
      continue;
    }
    if (opKey === 'divide' && b === 0) {
      console.log('Error: Division by zero is not allowed. Please choose a different operation or change the second number.');
      continue;
    }
    return { operation, opKey };
  }
}

async function main() {
  const rl = createReadlineInterface();
  try {
    const a = await promptForNumber(rl, 'Enter first number: ');
    const b = await promptForNumber(rl, 'Enter second number: ');
    const { operation, opKey } = await promptForOperation(rl, a, b);

    const result = operation(a, b);
    if (result === null && opKey === 'divide') {
      // This should not occur due to earlier check, but just in case
      console.log('Error: Division by zero.');
    } else {
      console.log(`Result: ${result}`);
    }
  } catch (err) {
    console.log('An unexpected error occurred:', err.message);
  } finally {
    rl.close();
  }
}

main();