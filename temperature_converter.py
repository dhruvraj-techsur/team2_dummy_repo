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
        return False, "Temperature in Kelvin cannot be negative."
    return True, ""

def get_temperature_input():
    """Prompt user for temperature and unit, with validation."""
    while True:
        try:
            temp_str = input("Enter temperature value: ").strip()
            temp = float(temp_str)
        except ValueError:
            print("Invalid input! Please enter a numeric temperature value.")
            continue

        unit = input("Enter unit (C for Celsius, F for Fahrenheit, K for Kelvin): ").strip().upper()
        if unit not in VALID_UNITS:
            print("Invalid unit! Please enter C, F, or K.")
            continue

        is_valid, error_msg = validate_temperature(temp, unit)
        if not is_valid:
            print(error_msg)
            continue

        return temp, unit

def convert_and_display(temp, unit):
    """Convert temperature to other units and display results."""
    if unit == 'C':
        f = celsius_to_fahrenheit(temp)
        k = celsius_to_kelvin(temp)
        print(f"{temp:.2f}°C = {f:.2f}°F = {k:.2f}K")
    elif unit == 'F':
        c = fahrenheit_to_celsius(temp)
        k = fahrenheit_to_kelvin(temp)
        print(f"{temp:.2f}°F = {c:.2f}°C = {k:.2f}K")
    elif unit == 'K':
        c = kelvin_to_celsius(temp)
        f = kelvin_to_fahrenheit(temp)
        print(f"{temp:.2f}K = {c:.2f}°C = {f:.2f}°F")

def main():
    """Main function to run the temperature converter."""
    print("Temperature Converter")
    print("====================")
    while True:
        temp, unit = get_temperature_input()
        convert_and_display(temp, unit)
        again = input("Do you want to convert another temperature? (y/n): ").strip().lower()
        if again != 'y':
            print("Thank you for using the Temperature Converter!")
            break

if __name__ == "__main__":
    main()