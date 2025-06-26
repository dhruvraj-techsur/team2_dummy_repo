import re

def greet(name):
    """
    This function takes a name as input and prints a greeting message.
    It also prints the number of characters in the name.
    """
    greeting = f"""Hello, {name}!
Your name has {len(name)} characters."""
    print(greeting)

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    if not user_name:
        print("Name cannot be empty.")
    elif len(user_name) > 50:
        print("Name is too long.")
    elif not re.match("^[a-zA-Z]*$", user_name):
        print("Name should only contain letters.")
    else:
        greet(user_name)