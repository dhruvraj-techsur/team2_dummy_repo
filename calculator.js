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
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

const calculator = new Calculator();

const question = (query) => {
  return new Promise(resolve => readline.question(query, resolve));
};

(async function main() {
  try {
    const num1 = parseFloat(await question('Enter first number: '));
    const num2 = parseFloat(await question('Enter second number: '));
    const op = await question('Choose operation (add, subtract, multiply, divide): ');

    if (isNaN(num1) || isNaN(num2)) {
      throw new Error('Invalid number input');
    }

    let result;
    switch(op) {
      case 'add':
        result = calculator.add(num1, num2);
        break;
      case 'subtract':
        result = calculator.subtract(num1, num2);
        break;
      case 'multiply':
        result = calculator.multiply(num1, num2);
        break;
      case 'divide':
        result = calculator.divide(num1, num2);
        break;
      default:
        throw new Error('Invalid operation');
    }

    console.log('Result:', result);
  } catch (error) {
    console.error(error.message);
  } finally {
    readline.close();
  }
})();