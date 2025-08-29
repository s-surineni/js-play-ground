// Variables and Data Types Examples
export function variablesExample() {
    let output = '=== VARIABLES & DATA TYPES ===\n\n';
    
    // 1. Variable declarations
    output += '1. Variable Declarations:\n';
    let message = 'Hello World';
    const PI = 3.14159;
    var oldWay = 'Legacy var declaration';
    
    output += `   let message: ${message}\n`;
    output += `   const PI: ${PI}\n`;
    output += `   var oldWay: ${oldWay}\n\n`;
    
    // 2. Data types
    output += '2. Data Types:\n';
    
    // String
    const firstName = 'John';
    const lastName = "Doe";
    const fullName = `${firstName} ${lastName}`;
    output += `   String: ${fullName}\n`;
    
    // Number
    const age = 25;
    const height = 5.9;
    const isAdult = age >= 18;
    output += `   Number: age=${age}, height=${height}\n`;
    output += `   Boolean: isAdult=${isAdult}\n`;
    
    // Array
    const colors = ['red', 'green', 'blue'];
    output += `   Array: ${JSON.stringify(colors)}\n`;
    
    // Object
    const person = {
        name: 'Jane',
        age: 30,
        city: 'New York'
    };
    output += `   Object: ${JSON.stringify(person, null, 2)}\n`;
    
    // 3. Type checking
    output += '\n3. Type Checking:\n';
    output += `   typeof firstName: ${typeof firstName}\n`;
    output += `   typeof age: ${typeof age}\n`;
    output += `   typeof colors: ${typeof colors}\n`;
    output += `   Array.isArray(colors): ${Array.isArray(colors)}\n`;
    
    // 4. Type conversion
    output += '\n4. Type Conversion:\n';
    const numString = '42';
    const convertedNum = Number(numString);
    const backToString = String(convertedNum);
    
    output += `   String to Number: "${numString}" → ${convertedNum} (${typeof convertedNum})\n`;
    output += `   Number to String: ${convertedNum} → "${backToString}" (${typeof backToString})\n`;
    
    // 5. Template literals
    output += '\n5. Template Literals:\n';
    const temperature = 72;
    const weather = 'sunny';
    const forecast = `Today's weather is ${weather} with a temperature of ${temperature}°F`;
    output += `   ${forecast}\n`;
    
    return output;
}
