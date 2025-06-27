import re

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name):
    """Validates the user's name according to the specified rules."""
    if not name:
        return "Error: Name cannot be empty."
    if len(name) > 50:
        return "Error: Name is too long. It should be less than 50 characters."
    if not re.fullmatch("^[a-zA-Z]*$", name):
        return "Error: Name should only contain alphabetic characters."
    return None

def main():
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ")

    error_message = validate_name(user_name)
    if error_message:
        print(error_message)
        return

    greeting_message = greet(user_name)
    print(greeting_message)

if __name__ == "__main__":
    main()