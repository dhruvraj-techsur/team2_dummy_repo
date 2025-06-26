import re

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name):
    """Validates the user's name according to the specified rules."""
    if not name:
        return "Name cannot be empty."
    if len(name) > 50:
        return "Name is too long. It should be less than 50 characters."
    if any(char.isdigit() for char in name):
        return "Name should not contain numbers."
    if not re.match("^[a-zA-Z]*$", name):
        return "Name should not contain special characters."
    return None

def main():
    """Main function to get user input and greet them."""
    try:
        user_name = input("Enter your name: ")
        validation_error = validate_name(user_name)
        if validation_error:
            print(f"Error: {validation_error}")
            return
        greeting_message = greet(user_name)
        print(greeting_message)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()