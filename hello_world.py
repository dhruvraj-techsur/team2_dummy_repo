import re

NAME_REGEX = re.compile(r"^[a-zA-Z\s'-]{1,50}$")

def greet(name: str) -> str:
    """Return a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def is_valid_name(name: str) -> bool:
    """
    Validate the user's name.
    Allows letters, spaces, hyphens, and apostrophes. Length 1-50.
    """
    return bool(NAME_REGEX.fullmatch(name))

def main() -> None:
    """Main function to get user input and greet them."""
    while True:
        user_name = input("Enter your name: ").strip()

        if not user_name:
            print("Error: Name cannot be empty.")
            continue

        if not is_valid_name(user_name):
            print("Error: Name should only contain letters, spaces, hyphens, or apostrophes (max 50 characters).")
            continue

        print(greet(user_name))
        break

if __name__ == "__main__":
    main()