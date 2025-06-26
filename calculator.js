const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

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

readline.question('Enter first number: ', (num1) => {
  const a = parseFloat(num1);
  if (isNaN(a)) {
    console.log('Error: First number is not a valid number');
    readline.close();
    return;
  }

  readline.question('Enter second number: ', (num2) => {
    const b = parseFloat(num2);
    if (isNaN(b)) {
      console.log('Error: Second number is not a valid number');
      readline.close();
      return;
    }

    readline.question('Choose operation (add, subtract, multiply, divide): ', (op) => {
      if (!operations[op]) {
        console.log('Error: Invalid operation');
        readline.close();
        return;
      }

      const result = operations[op](a, b);
      console.log('Result:', result);
      readline.close();
    });
  });
});