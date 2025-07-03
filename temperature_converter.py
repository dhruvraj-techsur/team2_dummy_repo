VALID_UNITS = {'C': 'Celsius', 'F': 'Fahrenheit', 'K': 'Kelvin'}

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
    return celsius_to_kelvin(fahrenheit_to_celsius(fahrenheit))

def kelvin_to_fahrenheit(kelvin):
    """Convert Kelvin to Fahrenheit."""
    return celsius_to_fahrenheit(kelvin_to_celsius(kelvin))

def get_temperature_input():
    """Prompt user for temperature and unit, with validation."""
    while True:
        try:
            temp_str = input("Enter temperature: ").strip()
            temp = float(temp_str)
        except ValueError:
            print("Invalid temperature! Please enter a numeric value.")
            continue

        unit = input("Enter unit (C/F/K): ").strip().upper()
        if unit not in VALID_UNITS:
            print("Invalid unit! Please use C, F, or K.")
            continue

        if unit == 'K' and temp < 0:
            print("Invalid temperature! Kelvin cannot be negative.")
            continue

        return temp, unit

def convert_and_display(temp, unit):
    """Convert temperature to other units and display the result."""
    if unit == 'C':
        if temp < -273.15:
            print("Invalid temperature! Celsius cannot be below -273.15.")
            return
        f = celsius_to_fahrenheit(temp)
        k = celsius_to_kelvin(temp)
        print(f"{temp:.2f}°C = {f:.2f}°F = {k:.2f}K")
    elif unit == 'F':
        c = fahrenheit_to_celsius(temp)
        if c < -273.15:
            print("Invalid temperature! Fahrenheit cannot be below -459.67.")
            return
        k = fahrenheit_to_kelvin(temp)
        print(f"{temp:.2f}°F = {c:.2f}°C = {k:.2f}K")
    elif unit == 'K':
        if temp < 0:
            print("Invalid temperature! Kelvin cannot be negative.")
            return
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
            print("Goodbye!")
            break

if __name__ == "__main__":
    main()