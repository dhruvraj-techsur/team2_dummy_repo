def greet(name: str) -> None:
    """
    Prints a greeting message to the user and informs them about the number of characters in their name.

    Args:
        name (str): The name of the user.
    """
    if not name:
        raise ValueError("Name cannot be empty.")
    if len(name) > 50:
        raise ValueError("Name cannot exceed 50 characters.")
    if not name.isalpha():
        raise ValueError("Name can only contain letters.")

    greeting = f"Hello, {name}!"
    print(greeting)
    print(f"Your name has {len(name)} characters.")

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    try:
        greet(user_name)
    except ValueError as e:
        print(e)