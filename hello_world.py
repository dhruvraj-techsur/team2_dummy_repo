import re

MAX_NAME_LENGTH = 50
NAME_PATTERN = re.compile(r"^[a-zA-Z\s\-]+$")

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def get_valid_name():
    """Prompt user for a valid name, re-prompting on invalid input."""
    while True:
        user_name = input("Enter your name: ").strip()

        if not user_name:
            print("Error: Name cannot be empty.")
            continue

        if len(user_name) > MAX_NAME_LENGTH:
            print(f"Error: Name is too long. It should be less than {MAX_NAME_LENGTH} characters.")
            continue

        if any(char.isdigit() for char in user_name):
            print("Error: Name should not contain numbers.")
            continue

        if not NAME_PATTERN.match(user_name):
            print("Error: Name should only contain letters, spaces, or hyphens.")
            continue

        return user_name

def main():
    """Main function to get user input and greet them."""
    try:
        user_name = get_valid_name()
        greeting_message = greet(user_name)
        print(greeting_message)
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")

if __name__ == "__main__":
    main()