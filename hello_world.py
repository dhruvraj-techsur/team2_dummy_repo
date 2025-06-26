def greet(name):
    """
    Function to greet the user and inform them about the number of characters in their name.
    """
    greeting = f"Hello, {name}!"
    print(greeting)
    print(f"Your name has {len(name)} characters.")

if __name__ == "__main__":
    """
    Main execution block that prompts the user to enter their name and then greets them.
    """
    user_name = input("Enter your name: ").strip()
    while not user_name:
        print("Name cannot be empty or just spaces. Please enter a valid name.")
        user_name = input("Enter your name: ").strip()
    greet(user_name)