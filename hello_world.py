def greet(name: str) -> None:
    """
    Prints a greeting message to the user.

    Parameters:
    name (str): The name of the user.

    Returns:
    None
    """
    if not isinstance(name, str):
        raise ValueError("Name must be a string.")
    print(f"Hello, {name}! Your name has {len(name)} characters.")

def main():
    user_name = input("Enter your name: ")
    greet(user_name)

if __name__ == "__main__":
    main()