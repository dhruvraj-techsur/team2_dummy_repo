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
      throw new Error('Division by zero');
    }
    return a / b;
  }
};

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
      const operation = operations[op];
      if (!operation) {
        console.log('Invalid operation');
        readline.close();
        return;
      }

      try {
        const result = operation(a, b);
        console.log('Result:', result);
      } catch (error) {
        console.log('Error:', error.message);
      } finally {
        readline.close();
      }
    });
  });
});