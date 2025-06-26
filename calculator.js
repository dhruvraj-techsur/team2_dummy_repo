const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error: Division by zero';
  }
  return a / b;
}

function calculate(a, b, op) {
  switch(op) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    default:
      return 'Invalid operation';
  }
}

readline.question('Enter first number: ', (num1) => {
  const a = parseFloat(num1);
  if (isNaN(a)) {
    console.log('Error: Invalid number');
    readline.close();
    return;
  }

  readline.question('Enter second number: ', (num2) => {
    const b = parseFloat(num2);
    if (isNaN(b)) {
      console.log('Error: Invalid number');
      readline.close();
      return;
    }

    readline.question('Choose operation (add, subtract, multiply, divide): ', (op) => {
      const result = calculate(a, b, op);
      console.log(`Result: ${result}`);
      readline.close();
    });
  });
});