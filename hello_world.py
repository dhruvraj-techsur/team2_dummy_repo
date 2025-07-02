import re
import sys

def greet(name: str) -> str:
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def validate_name(name: str) -> str:
    """
    Validates the user's name.
    Allows letters, spaces, hyphens, and apostrophes.
    Returns an error message if invalid, else returns an empty string.
    """
    if not name:
        return "Error: Name cannot be empty."
    if len(name) > 50:
        return "Error: Name is too long. It should be less than 50 characters."
    if any(char.isdigit() for char in name):
        return "Error: Name should not contain numbers."
    # Allow letters, spaces, hyphens, and apostrophes
    if not re.match(r"^[a-zA-Z\s\-']+$", name):
        return "Error: Name should only contain letters, spaces, hyphens, or apostrophes."
    return ""

def main() -> None:
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ").strip()
    error = validate_name(user_name)
    if error:
        print(error)
        sys.exit(1)
    greeting_message = greet(user_name)
    print(greeting_message)

if __name__ == "__main__":
    main()