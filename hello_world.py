import re

def greet(name):
    """Returns a greeting message to the user."""
    if not name:
        return "Error: Name cannot be empty."
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name):
    """Validates the user's name."""
    if not name:
        return "Error: Name cannot be empty."
    if len(name) > 50:
        return "Error: Name is too long. It should be less than 50 characters."
    if any(char.isdigit() for char in name):
        return "Error: Name should not contain numbers."
    if not re.match("^[a-zA-Z]*$", name):
        return "Error: Name should not contain special characters."
    return None

def main():
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ")
    validation_error = validate_name(user_name)
    if validation_error:
        print(validation_error)
        return
    greeting_message = greet(user_name)
    print(greeting_message)

if __name__ == "__main__":
    main()