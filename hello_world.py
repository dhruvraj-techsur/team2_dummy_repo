import re

def greet(name):
    """Returns a greeting message to the user."""
    return f"Hello, {name}! Your name has {len(name)} characters."

def main():
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ")

    if not user_name:
        print("Error: Name cannot be empty.")
        return

    if len(user_name) > 50:
        print("Error: Name is too long. It should be less than 50 characters.")
        return

    if any(char.isdigit() for char in user_name):
        print("Error: Name should not contain numbers.")
        return

    if not re.match("^[a-zA-Z]*$", user_name):
        print("Error: Name should not contain special characters.")
        return

    greeting_message = greet(user_name)
    print(greeting_message)

if __name__ == "__main__":
    main()