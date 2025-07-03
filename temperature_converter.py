def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9 / 5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius."""
    return (fahrenheit - 32) * 5 / 9

def celsius_to_kelvin(celsius):
    """Convert Celsius to Kelvin."""
    return celsius + 273.15

def kelvin_to_celsius(kelvin):
    """Convert Kelvin to Celsius."""
    return kelvin - 273.15

def fahrenheit_to_kelvin(fahrenheit):
    """Convert Fahrenheit to Kelvin."""
    celsius = fahrenheit_to_celsius(fahrenheit)
    return celsius_to_kelvin(celsius)

def kelvin_to_fahrenheit(kelvin):
    """Convert Kelvin to Fahrenheit."""
    celsius = kelvin_to_celsius(kelvin)
    return celsius_to_fahrenheit(celsius)

def get_temperature_input(unit):
    """Prompt user for a temperature value and validate input."""
    while True:
        try:
            temp = float(input(f"Enter temperature in {unit}: "))
            if unit == 'Kelvin' and temp < 0:
                print("Error: Temperature in Kelvin cannot be negative.")
                continue
            return temp
        except ValueError:
            print("Invalid temperature! Please enter a valid number.")

def get_unit_input():
    """Prompt user for a temperature unit and validate input."""
    valid_units = {'C': 'Celsius', 'F': 'Fahrenheit', 'K': 'Kelvin'}
    while True:
        unit = input("Enter unit (C for Celsius, F for Fahrenheit, K for Kelvin): ").strip().upper()
        if unit in valid_units:
            return unit, valid_units[unit]
        print("Invalid unit! Please use C, F, or K.")

def main():
    """Main function to run the temperature converter."""
    print("Temperature Converter")
    print("====================")
    while True:
        unit_code, unit_name = get_unit_input()
        temp = get_temperature_input(unit_name)

        if unit_code == 'C':
            f = celsius_to_fahrenheit(temp)
            k = celsius_to_kelvin(temp)
            print(f"{temp:.2f}°C = {f:.2f}°F = {k:.2f}K")
        elif unit_code == 'F':
            c = fahrenheit_to_celsius(temp)
            k = fahrenheit_to_kelvin(temp)
            print(f"{temp:.2f}°F = {c:.2f}°C = {k:.2f}K")
        elif unit_code == 'K':
            c = kelvin_to_celsius(temp)
            f = kelvin_to_fahrenheit(temp)
            print(f"{temp:.2f}K = {c:.2f}°C = {f:.2f}°F")

        again = input("Do you want to convert another temperature? (y/n): ").strip().lower()
        if again != 'y':
            print("Goodbye!")
            break

if __name__ == "__main__":
    main()