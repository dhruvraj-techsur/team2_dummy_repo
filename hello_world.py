import re

def greet(name):
    """Returns a greeting message to the user."""
    if name is None:
        return "Invalid name provided."
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name):
    """Validates the user's name according to the specified rules."""
    if not name:
        print("Error: Name cannot be empty.")
        return None

    if len(name) > 50:
        print("Error: Name is too long. It should be less than 50 characters.")
        return None

    if any(char.isdigit() for char in name):
        print("Error: Name should not contain numbers.")
        return None

    if not re.match("^[a-zA-Z]*$", name):
        print("Error: Name should not contain special characters.")
        return None

    return name

def main():
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ")
    valid_name = validate_name(user_name)
    greeting_message = greet(valid_name)
    print(greeting_message)

if __name__ == "__main__":
    main()