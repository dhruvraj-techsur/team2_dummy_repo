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

def main():
    """Main function to run the temperature converter"""
    print("Temperature Converter")
    print("====================")
    
    try:
        # Get temperature and unit from user
        temp = float(input("Enter temperature: "))
        unit = input("Enter unit (C/F/K): ").upper()
        
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
            
        else:
            print("Invalid unit! Please use C, F, or K.")
            
    except ValueError:
        print("Invalid temperature! Please enter a number.")

if __name__ == "__main__":
    main() 