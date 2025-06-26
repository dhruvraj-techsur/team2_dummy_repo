const readline = require('readline');

class Calculator {
  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

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

  async prompt(question) {
    return new Promise((resolve, reject) => {
      this.readline.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async calculate() {
    try {
      const num1 = parseFloat(await this.prompt('Enter first number: '));
      const num2 = parseFloat(await this.prompt('Enter second number: '));
      const op = await this.prompt('Choose operation (add, subtract, multiply, divide): ');

      let result;
      switch(op) {
        case 'add':
          result = this.add(num1, num2);
          break;
        case 'subtract':
          result = this.subtract(num1, num2);
          break;
        case 'multiply':
          result = this.multiply(num1, num2);
          break;
        case 'divide':
          result = this.divide(num1, num2);
          break;
        default:
          throw new Error('Invalid operation');
      }

      console.log(`Result: ${result}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      this.readline.close();
    }
  }
}

const calculator = new Calculator();
calculator.calculate();