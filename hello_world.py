import re

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name):
    """
    Validates the user's name.
    - Not empty
    - <= 50 characters
    - No digits
    - Only letters, spaces, hyphens, and apostrophes
    Returns (True, "") if valid, else (False, error_message)
    """
    if not name:
        return False, "Error: Name cannot be empty."
    if len(name) > 50:
        return False, "Error: Name is too long. It should be less than 50 characters."
    if any(char.isdigit() for char in name):
        return False, "Error: Name should not contain numbers."
    if not re.match(r"^[a-zA-Z\s\-']+$", name):
        return False, "Error: Name should only contain letters, spaces, hyphens, or apostrophes."
    return True, ""

def main():
    """Main function to get user input and greet them."""
    while True:
        user_name = input("Enter your name: ").strip()
        is_valid, error_message = validate_name(user_name)
        if is_valid:
            break
        print(error_message)
    greeting_message = greet(user_name)
    print(greeting_message)

if __name__ == "__main__":
    main()