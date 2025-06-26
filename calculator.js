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

readline.question('Enter first number: ', (num1) => {
  const a = parseFloat(num1);
  if (isNaN(a)) {
    console.log('Invalid number');
    readline.close();
    return;
  }

  readline.question('Enter second number: ', (num2) => {
    const b = parseFloat(num2);
    if (isNaN(b)) {
      console.log('Invalid number');
      readline.close();
      return;
    }

    readline.question('Choose operation (add, subtract, multiply, divide): ', (op) => {
      let result;
      switch(op) {
        case 'add':
          result = calculator.add(a, b);
          break;
        case 'subtract':
          result = calculator.subtract(a, b);
          break;
        case 'multiply':
          result = calculator.multiply(a, b);
          break;
        case 'divide':
          result = calculator.divide(a, b);
          break;
        default:
          result = 'Invalid operation';
      }
      console.log('Result:', result);
      readline.close();
    });
  });
});