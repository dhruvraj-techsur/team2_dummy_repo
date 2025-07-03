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
    return celsius_to_kelvin(fahrenheit_to_celsius(fahrenheit))

def kelvin_to_fahrenheit(kelvin):
    """Convert Kelvin to Fahrenheit."""
    return celsius_to_fahrenheit(kelvin_to_celsius(kelvin))

def validate_temperature(temp, unit):
    """
    Validate temperature based on unit.
    Kelvin cannot be negative.
    """
    if unit == 'K' and temp < 0:
        return False, "Kelvin temperature cannot be negative."
    return True, ""

def convert_temperature(temp, unit):
    """
    Convert temperature to all units and return a dict.
    """
    if unit == 'C':
        c = temp
        f = celsius_to_fahrenheit(c)
        k = celsius_to_kelvin(c)
        return {'C': c, 'F': f, 'K': k}
    elif unit == 'F':
        f = temp
        c = fahrenheit_to_celsius(f)
        k = fahrenheit_to_kelvin(f)
        return {'C': c, 'F': f, 'K': k}
    elif unit == 'K':
        k = temp
        c = kelvin_to_celsius(k)
        f = kelvin_to_fahrenheit(k)
        return {'C': c, 'F': f, 'K': k}
    else:
        raise ValueError("Invalid unit.")

def prompt_temperature():
    """Prompt user for temperature and validate input."""
    while True:
        temp_input = input("Enter temperature: ").strip()
        try:
            temp = float(temp_input)
            return temp
        except ValueError:
            print("Invalid temperature! Please enter a numeric value.")

def prompt_unit():
    """Prompt user for unit and validate input."""
    while True:
        unit = input("Enter unit (C for Celsius, F for Fahrenheit, K for Kelvin): ").strip().upper()
        if unit in VALID_UNITS:
            return unit
        print("Invalid unit! Please enter C, F, or K.")

def main():
    """Main function to run the temperature converter."""
    print("Temperature Converter")
    print("====================")
    while True:
        temp = prompt_temperature()
        unit = prompt_unit()
        is_valid, error_msg = validate_temperature(temp, unit)
        if not is_valid:
            print(f"Error: {error_msg}")
            continue

        try:
            conversions = convert_temperature(temp, unit)
            print(
                f"\nResult: "
                f"{conversions['C']:.2f}°C = {conversions['F']:.2f}°F = {conversions['K']:.2f}K\n"
            )
        except Exception as e:
            print(f"Conversion error: {e}")

        again = input("Do you want to convert another temperature? (y/n): ").strip().lower()
        if again != 'y':
            print("Goodbye!")
            break

if __name__ == "__main__":
    main()