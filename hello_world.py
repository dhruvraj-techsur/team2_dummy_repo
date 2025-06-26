import re

def greet(name):
    if not name:
        print("Name cannot be empty.")
        return
    if not re.match("^[A-Za-z]*$", name):
        print("Name can only contain letters.")
        return
    greeting = f"Hello, {name}!"
    print(greeting)
    print(f"Your name has {len(name)} characters.")

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    greet(user_name)