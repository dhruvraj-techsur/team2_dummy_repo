def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9

def celsius_to_kelvin(celsius):
    """Convert Celsius to Kelvin"""
    return celsius + 273.15

def kelvin_to_celsius(kelvin):
    """Convert Kelvin to Celsius"""
    return kelvin - 273.15

def fahrenheit_to_kelvin(fahrenheit):
    """Convert Fahrenheit to Kelvin"""
    celsius = fahrenheit_to_celsius(fahrenheit)
    return celsius_to_kelvin(celsius)

def kelvin_to_fahrenheit(kelvin):
    """Convert Kelvin to Fahrenheit"""
    celsius = kelvin_to_celsius(kelvin)
    return celsius_to_fahrenheit(celsius)

def validate_input(temp, unit):
    """Validate user input for temperature and unit"""
    try:
        temp = float(temp)
        unit = unit.upper()
        if unit not in ['C', 'F', 'K']:
            raise ValueError
        return temp, unit
    except ValueError:
        print("Invalid input! Please enter a number for temperature and C, F, or K for unit.")
        return None, None

def print_converted_temperatures(temp, unit, conversions):
    """Print the converted temperatures"""
    for symbol, conversion in conversions.items():
        if symbol != unit:
            print(f"{temp}{unit} = {conversion(temp):.2f}{symbol}")

def main():
    """Main function to run the temperature converter"""
    print("Temperature Converter")
    print("====================")
    
    conversions = {
        'C': {
            'F': celsius_to_fahrenheit,
            'K': celsius_to_kelvin
        },
        'F': {
            'C': fahrenheit_to_celsius,
            'K': fahrenheit_to_kelvin
        },
        'K': {
            'C': kelvin_to_celsius,
            'F': kelvin_to_fahrenheit
        }
    }
    
    temp, unit = validate_input(input("Enter temperature: "), input("Enter unit (C/F/K): "))
    
    if temp is not None and unit is not None:
        print_converted_temperatures(temp, unit, conversions[unit])

if __name__ == "__main__":
    main()