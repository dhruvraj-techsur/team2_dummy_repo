const readline = require('readline');

/**
 * Creates a readline interface for user input.
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Prompts the user with a question and returns the input as a string.
 * @param {readline.Interface} rl 
 * @param {string} question 
 * @returns {Promise<string>}
 */
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

/**
 * Validates if the input is a valid number.
 * @param {string} num 
 * @returns {number|null}
 */
function validateNumber(num) {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    console.log('Error: Invalid number. Please enter a valid number.');
    return null;
  }
  return parsedNum;
}

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      return { error: 'Error: Division by zero' };
    }
    return { result: a / b };
  }
};

/**
 * Prompts the user until a valid number is entered.
 * @param {readline.Interface} rl 
 * @param {string} prompt 
 * @returns {Promise<number>}
 */
async function promptForNumber(rl, prompt) {
  while (true) {
    const input = await askQuestion(rl, prompt);
    const num = validateNumber(input);
    if (num !== null) {
      return num;
    }
  }
}

/**
 * Prompts the user until a valid operation is entered.
 * @param {readline.Interface} rl 
 * @returns {Promise<string>}
 */
async function promptForOperation(rl) {
  const validOps = Object.keys(operations);
  while (true) {
    const input = await askQuestion(
      rl,
      `Choose operation (${validOps.join(', ')}): `
    );
    const op = input.toLowerCase();
    if (validOps.includes(op)) {
      return op;
    }
    console.log('Error: Invalid operation. Please choose a valid operation.');
  }
}

/**
 * Main calculator logic.
 */
async function main() {
  const rl = createReadlineInterface();

  try {
    const a = await promptForNumber(rl, 'Enter first number: ');
    const b = await promptForNumber(rl, 'Enter second number: ');
    let op;
    let result;

    while (true) {
      op = await promptForOperation(rl);
      if (op === 'divide') {
        const division = operations.divide(a, b);
        if (division.error) {
          console.log(division.error);
          // Optionally, allow user to re-enter numbers for division
          // For now, just prompt for operation again
          continue;
        } else {
          result = division.result;
        }
      } else {
        result = operations[op](a, b);
      }
      break;
    }

    console.log(`Result: ${result}`);
  } catch (err) {
    console.error('An unexpected error occurred:', err.message);
  } finally {
    rl.close();
  }
}

main();