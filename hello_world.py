def greet(name):
    greeting = f"Hello, {name}!"
    print(greeting)
    print(f"Your name has {len(name)} characters.")

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    greet(user_name) 