const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      return 'Error: Division by zero';
    }
    return a / b;
  }
}

const calculator = new Calculator();
const operations = {
  'add': calculator.add,
  'subtract': calculator.subtract,
  'multiply': calculator.multiply,
  'divide': calculator.divide
};

function getNumberInput(promptText) {
  readline.question(promptText, (num) => {
    const parsedNum = parseFloat(num);
    if (isNaN(parsedNum)) {
      console.log('Invalid number. Please try again.');
      getNumberInput(promptText);
    } else {
      return parsedNum;
    }
  });
}

const num1 = getNumberInput('Enter first number: ');
const num2 = getNumberInput('Enter second number: ');

readline.question('Choose operation (add, subtract, multiply, divide): ', (op) => {
  if (!operations.hasOwnProperty(op)) {
    console.log('Invalid operation. Please try again.');
    readline.question('Choose operation (add, subtract, multiply, divide): ', op);
  } else {
    const result = operations[op](num1, num2);
    console.log('Result:', result);
    readline.close();
  }
});