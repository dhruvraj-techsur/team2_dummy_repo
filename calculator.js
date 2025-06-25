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

readline.question('Enter first number: ', (num1) => {
  readline.question('Enter second number: ', (num2) => {
    readline.question('Choose operation (add, subtract, multiply, divide): ', (op) => {
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let result;
      switch(op) {
        case 'add':
          result = add(a, b);
          break;
        case 'subtract':
          result = subtract(a, b);
          break;
        case 'multiply':
          result = multiply(a, b);
          break;
        case 'divide':
          result = divide(a, b);
          break;
        default:
          result = 'Invalid operation';
      }
      console.log('Result:', result);
      readline.close();
    });
  });
}); 