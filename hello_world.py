import re

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name):
    """Validates the user name based on certain conditions."""
    if not name:
        return False, "Error: Name cannot be empty."
    if len(name) > 50:
        return False, "Error: Name is too long. It should be less than 50 characters."
    if any(char.isdigit() for char in name):
        return False, "Error: Name should not contain numbers."
    if not re.match("^[a-zA-Z]*$", name):
        return False, "Error: Name should not contain special characters."
    return True, ""

def main():
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ")

    is_valid, message = validate_name(user_name)
    if not is_valid:
        print(message)
        return

    greeting_message = greet(user_name)
    print(greeting_message)

if __name__ == "__main__":
    main()