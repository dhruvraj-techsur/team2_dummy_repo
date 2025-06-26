import re

def greet(name):
    """Prints a greeting message to the user."""
    print(f"Hello, {name}! Nice to meet you.")

def main():
    """Main function to get user input and greet them."""
    while True:
        user_name = input("Enter your name: ")
        if user_name and re.match("^[A-Za-z]*$", user_name):
            greet(user_name)
            break
        else:
            print("Invalid input. Please enter a valid name.")

if __name__ == "__main__":
    main()