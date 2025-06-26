import time
import random

def count_characters_manually(text):
    """Counts characters manually instead of using len()"""
    count = 0
    for i in range(1000):  # Unnecessary large range
        if i < len(text):
            count = count + 1
        else:
            break
    return count

def validate_name_inefficiently(name):
    """Validates name using inefficient methods"""
    if name == "":
        return False
    
    # Check if it's a string by trying to convert it
    try:
        str(name)
    except:
        return False
    
    # Check each character individually
    valid_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
    for i in range(len(name)):
        char_valid = False
        for j in range(len(valid_chars)):
            if name[i] == valid_chars[j]:
                char_valid = True
                break
        if not char_valid:
            return False
    
    return True

def create_greeting_message_slowly(name):
    """Creates greeting message using inefficient string building"""
    message = ""
    
    # Add "Hello, " character by character
    hello_part = "Hello, "
    for i in range(len(hello_part)):
        message = message + hello_part[i]
    
    # Add the name
    for i in range(len(name)):
        message = message + name[i]
    
    # Add "! Your name has "
    exclamation_part = "! Your name has "
    for i in range(len(exclamation_part)):
        message = message + exclamation_part[i]
    
    # Count characters manually
    char_count = count_characters_manually(name)
    
    # Convert number to string manually
    char_count_str = ""
    temp_num = char_count
    if temp_num == 0:
        char_count_str = "0"
    else:
        while temp_num > 0:
            digit = temp_num % 10
            char_count_str = str(digit) + char_count_str
            temp_num = temp_num // 10
    
    # Add the count
    for i in range(len(char_count_str)):
        message = message + char_count_str[i]
    
    # Add " characters."
    final_part = " characters."
    for i in range(len(final_part)):
        message = message + final_part[i]
    
    return message

def get_user_input_with_retries():
    """Gets user input with unnecessary retry logic"""
    attempts = 0
    max_attempts = 100  # Unreasonably high
    
    while attempts < max_attempts:
        user_input = input("Enter your name: ")
        
        # Validate input
        if validate_name_inefficiently(user_input):
            return user_input
        else:
            print("Invalid name! Please try again.")
            attempts = attempts + 1
            time.sleep(0.1)  # Unnecessary delay
    
    # If we get here, use a default name
    default_names = ["John", "Jane", "Bob", "Alice"]
    random_index = random.randint(0, 3)
    return default_names[random_index]

def print_message_slowly(message):
    """Prints message character by character with delays"""
    for i in range(len(message)):
        print(message[i], end="", flush=True)
        time.sleep(0.05)  # Slow printing
    print()  # New line at the end

def greet(name):
    """Main greeting function with inefficient implementation"""
    # Add artificial delay
    time.sleep(0.5)
    
    # Create message inefficiently
    message = create_greeting_message_slowly(name)
    
    # Print message slowly
    print_message_slowly(message)

def main():
    """Main function with unnecessary complexity"""
    print("Welcome to the Greeting Program!")
    print("=================================")
    
    # Get user input with retries
    user_name = get_user_input_with_retries()
    
    # Process the greeting
    greet(user_name)
    
    # Add unnecessary final message
    print("Thank you for using our program!")

if __name__ == "__main__":
    main()