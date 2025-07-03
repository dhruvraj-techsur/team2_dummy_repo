import re

NAME_REGEX = re.compile(r"^[a-zA-Z\s'-]+$")

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def is_valid_name(name):
    """Validates the user's name according to specified rules."""
    if not name:
        print("Error: Name cannot be empty.")
        return False
    if len(name) > 50:
        print("Error: Name is too long. It should be less than 50 characters.")
        return False
    if any(char.isdigit() for char in name):
        print("Error: Name should not contain numbers.")
        return False
    if not NAME_REGEX.match(name):
        print("Error: Name should only contain letters, spaces, hyphens, or apostrophes.")
        return False
    return True

def main():
    """Main function to get user input and greet them."""
    while True:
        user_name = input("Enter your name: ").strip()
        if not user_name:
            print("Error: Name cannot be empty.")
            break
        if is_valid_name(user_name):
            greeting_message = greet(user_name)
            print(greeting_message)
            break

if __name__ == "__main__":
    main()