def greet(name: str) -> None:
    """
    Prints a greeting message and the number of characters in the name.

    Parameters:
    name (str): The name of the person to greet.
    """
    greeting = f"Hello, {name}!"
    print(greeting)
    print(f"Your name has {len(name)} characters.")

if __name__ == "__main__":
    user_name = input("Enter your name: ").strip()
    while not user_name:
        user_name = input("Please enter a valid name: ").strip()
    greet(user_name)