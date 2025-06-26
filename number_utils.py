def add_numbers(a, b):
    """Adds two numbers together"""
    return a + b

def multiply_numbers(a, b):
    """Multiplies two numbers"""
    return a * b

def find_max_number(numbers):
    """Finds the maximum number in a list"""
    return max(numbers) if numbers else None

def calculate_sum(numbers):
    """Calculates the sum of all numbers in a list"""
    return sum(numbers)

def count_even_numbers(numbers):
    """Counts how many even numbers are in a list"""
    return len([num for num in numbers if num % 2 == 0])

def reverse_list(numbers):
    """Reverses a list of numbers"""
    return numbers[::-1]

def is_prime(number):
    """Checks if a number is prime"""
    if number < 2:
        return False
    for i in range(2, int(number**0.5) + 1):
        if number % i == 0:
            return False
    return True

def get_fibonacci_sequence(n):
    """Generates Fibonacci sequence up to n terms"""
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

def main():
    """Main function to test all utilities"""
    print("Number Utilities Test")
    print("===================")
    
    # Test numbers
    test_numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6]
    
    print(f"Test numbers: {test_numbers}")
    print(f"Sum: {calculate_sum(test_numbers)}")
    print(f"Maximum: {find_max_number(test_numbers)}")
    print(f"Even numbers count: {count_even_numbers(test_numbers)}")
    print(f"Reversed: {reverse_list(test_numbers)}")
    
    print(f"\n5 + 3 = {add_numbers(5, 3)}")
    print(f"4 * 6 = {multiply_numbers(4, 6)}")
    
    print(f"\nIs 17 prime? {is_prime(17)}")
    print(f"Is 24 prime? {is_prime(24)}")
    
    print(f"\nFibonacci sequence (10 terms): {get_fibonacci_sequence(10)}")

if __name__ == "__main__":
    main()