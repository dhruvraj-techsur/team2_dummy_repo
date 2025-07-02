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

def get_temperature():
    """Prompt user for a temperature value and validate input."""
    while True:
        temp_input = input("Enter temperature: ").strip()
        try:
            temp = float(temp_input)
            return temp
        except ValueError:
            print("Invalid temperature! Please enter a numeric value.")

def get_unit():
    """Prompt user for a temperature unit and validate input."""
    valid_units = {'C', 'F', 'K'}
    while True:
        unit = input("Enter unit (C/F/K): ").strip().upper()
        if unit in valid_units:
            return unit
        print("Invalid unit! Please use C, F, or K.")

def validate_temperature(temp, unit):
    """Validate temperature based on the unit."""
    if unit == 'K' and temp < 0:
        print("Invalid temperature! Kelvin cannot be negative.")
        return False
    if unit == 'C' and temp < -273.15:
        print("Invalid temperature! Celsius cannot be below -273.15.")
        return False
    if unit == 'F' and temp < -459.67:
        print("Invalid temperature! Fahrenheit cannot be below -459.67.")
        return False
    return True

def convert_and_display(temp, unit):
    """Convert temperature to other units and display the result."""
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
        temp = get_temperature()
        unit = get_unit()
        if validate_temperature(temp, unit):
            convert_and_display(temp, unit)
        else:
            continue
        again = input("Do you want to convert another temperature? (y/n): ").strip().lower()
        if again != 'y':
            print("Goodbye!")
            break

if __name__ == "__main__":
    main()