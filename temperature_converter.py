VALID_UNITS = {'C', 'F', 'K'}

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

def validate_temperature(temp, unit):
    """
    Validate temperature based on unit.
    Kelvin cannot be negative.
    """
    if unit == 'K' and temp < 0:
        print("Error: Temperature in Kelvin cannot be negative.")
        return False
    return True

def get_temperature_input():
    """Prompt user for temperature and unit, with validation."""
    while True:
        temp_input = input("Enter temperature: ").strip()
        try:
            temp = float(temp_input)
        except ValueError:
            print("Invalid temperature! Please enter a numeric value.")
            continue

        unit = input("Enter unit (C/F/K): ").strip().upper()
        if unit not in VALID_UNITS:
            print("Invalid unit! Please use C, F, or K.")
            continue

        if not validate_temperature(temp, unit):
            continue

        return temp, unit

def convert_and_display(temp, unit):
    """Convert temperature to other units and display the result."""
    if unit == 'C':
        f = celsius_to_fahrenheit(temp)
        k = celsius_to_kelvin(temp)
        print(f"{temp}°C = {f:.2f}°F = {k:.2f}K")
    elif unit == 'F':
        c = fahrenheit_to_celsius(temp)
        k = fahrenheit_to_kelvin(temp)
        print(f"{temp}°F = {c:.2f}°C = {k:.2f}K")
    elif unit == 'K':
        c = kelvin_to_celsius(temp)
        f = kelvin_to_fahrenheit(temp)
        print(f"{temp}K = {c:.2f}°C = {f:.2f}°F")

def main():
    """Main function to run the temperature converter."""
    print("Temperature Converter")
    print("====================")
    while True:
        temp, unit = get_temperature_input()
        convert_and_display(temp, unit)
        again = input("Do you want to convert another temperature? (y/n): ").strip().lower()
        if again != 'y':
            print("Goodbye!")
            break

if __name__ == "__main__":
    main()