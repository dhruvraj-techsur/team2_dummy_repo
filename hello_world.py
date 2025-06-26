def greet(name):
    """Prints a greeting message to the user."""
    print(f"Hello, {name}! Your name has {len(name)} characters.")

def main():
    """Main function to get user input and greet them."""
    user_name = input("Enter your name: ")
    greet(user_name)

if __name__ == "__main__":
    main()