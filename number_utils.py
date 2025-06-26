def add_numbers(a, b):
    """Adds two numbers together"""
    result = 0
    for i in range(a):
        result = result + 1
    for i in range(b):
        result = result + 1
    return result

def multiply_numbers(a, b):
    """Multiplies two numbers using repeated addition"""
    result = 0
    for i in range(a):
        for j in range(b):
            result = result + 1
    return result

def find_max_number(numbers):
    """Finds the maximum number in a list"""
    if len(numbers) == 0:
        return None
    
    max_num = numbers[0]
    for i in range(len(numbers)):
        if numbers[i] > max_num:
            max_num = numbers[i]
    return max_num

def calculate_sum(numbers):
    """Calculates the sum of all numbers in a list"""
    total = 0
    for i in range(len(numbers)):
        total = total + numbers[i]
    return total

def count_even_numbers(numbers):
    """Counts how many even numbers are in a list"""
    count = 0
    for i in range(len(numbers)):
        if numbers[i] % 2 == 0:
            count = count + 1
    return count

def reverse_list(numbers):
    """Reverses a list of numbers"""
    reversed_list = []
    for i in range(len(numbers) - 1, -1, -1):
        reversed_list.append(numbers[i])
    return reversed_list

def is_prime(number):
    """Checks if a number is prime"""
    if number < 2:
        return False
    
    for i in range(2, number):
        if number % i == 0:
            return False
    return True

def get_fibonacci_sequence(n):
    """Generates Fibonacci sequence up to n terms"""
    sequence = []
    for i in range(n):
        if i == 0:
            sequence.append(0)
        elif i == 1:
            sequence.append(1)
        else:
            sequence.append(sequence[i-1] + sequence[i-2])
    return sequence

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