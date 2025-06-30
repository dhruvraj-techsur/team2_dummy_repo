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

def convert_temperature(temp, unit):
    """Convert temperature based on the provided unit"""
    conversion_functions = {
        'C': {'F': celsius_to_fahrenheit, 'K': celsius_to_kelvin},
        'F': {'C': fahrenheit_to_celsius, 'K': fahrenheit_to_kelvin},
        'K': {'C': kelvin_to_celsius, 'F': kelvin_to_fahrenheit}
    }
    return {unit_to: func(temp) for unit_to, func in conversion_functions[unit].items()}

def print_converted_temperatures(temp, unit, converted_temps):
    """Print the converted temperatures"""
    for unit_to, converted_temp in converted_temps.items():
        print(f"{temp}{unit} = {converted_temp:.2f}{unit_to}")

def main():
    """Main function to run the temperature converter"""
    print("Temperature Converter")
    print("====================")
    
    try:
        # Get temperature and unit from user
        temp = float(input("Enter temperature: "))
        unit = input("Enter unit (C/F/K): ").upper()
        
        if unit in ['C', 'F', 'K']:
            converted_temps = convert_temperature(temp, unit)
            print_converted_temperatures(temp, unit, converted_temps)
        else:
            print("Invalid unit! Please use C, F, or K.")
            
    except ValueError:
        print("Invalid temperature! Please enter a number.")

if __name__ == "__main__":
    main()