import re

def greet(name: str) -> str:
    """Return a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def is_valid_name(name: str) -> (bool, str):
    """
    Validate the user's name.
    Allows letters, spaces, hyphens, and apostrophes.
    Returns (is_valid, error_message).
    """
    if not name:
        return False, "Error: Name cannot be empty."
    if len(name) > 50:
        return False, "Error: Name is too long. It should be less than 50 characters."
    if not re.match(r"^[a-zA-Z\s'-]+$", name):
        return False, "Error: Name should only contain letters, spaces, hyphens, or apostrophes."
    return True, ""

def main() -> None:
    """Main function to get user input and greet them."""
    while True:
        try:
            user_name = input("Enter your name: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nAborted.")
            return

        is_valid, error_message = is_valid_name(user_name)
        if is_valid:
            print(greet(user_name))
            break
        else:
            print(error_message)

if __name__ == "__main__":
    main()