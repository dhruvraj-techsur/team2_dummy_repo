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
            raise ValueError("Invalid unit! Please use C, F, or K.")
        return temp, unit
    except ValueError as e:
        print(e)
        return None, None

def print_converted_temperatures(temp, unit, conversions):
    """Print the converted temperatures"""
    f = conversions[unit]['toF'](temp)
    c = conversions[unit]['toC'](temp)
    k = conversions[unit]['toK'](temp)
    print(f"{temp}{unit} = {c:.2f}°C = {f:.2f}°F = {k:.2f}K")

def main():
    """Main function to run the temperature converter"""
    print("Temperature Converter")
    print("====================")
    
    conversions = {
        'C': {'toF': celsius_to_fahrenheit, 'toC': lambda x: x, 'toK': celsius_to_kelvin},
        'F': {'toF': lambda x: x, 'toC': fahrenheit_to_celsius, 'toK': fahrenheit_to_kelvin},
        'K': {'toF': kelvin_to_fahrenheit, 'toC': kelvin_to_celsius, 'toK': lambda x: x}
    }
    
    temp = input("Enter temperature: ")
    unit = input("Enter unit (C/F/K): ")
    temp, unit = validate_input(temp, unit)
    
    if temp is not None and unit is not None:
        print_converted_temperatures(temp, unit, conversions)

if __name__ == "__main__":
    main()