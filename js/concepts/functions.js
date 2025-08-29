// Functions Examples
export function functionsExample() {
    let output = '=== FUNCTIONS ===\n\n';
    
    // 1. Function declarations
    output += '1. Function Declarations:\n';
    
    function greet(name) {
        return `Hello, ${name}!`;
    }
    
    output += `   greet('Alice'): ${greet('Alice')}\n`;
    
    // 2. Function expressions
    output += '\n2. Function Expressions:\n';
    
    const add = function(a, b) {
        return a + b;
    };
    
    output += `   add(5, 3): ${add(5, 3)}\n`;
    
    // 3. Arrow functions
    output += '\n3. Arrow Functions:\n';
    
    const multiply = (a, b) => a * b;
    const square = x => x * x;
    const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;
    
    output += `   multiply(4, 6): ${multiply(4, 6)}\n`;
    output += `   square(7): ${square(7)}\n`;
    output += `   getFullName('Bob', 'Smith'): ${getFullName('Bob', 'Smith')}\n`;
    
    // 4. Default parameters
    output += '\n4. Default Parameters:\n';
    
    function createUser(name, age = 18, city = 'Unknown') {
        return { name, age, city };
    }
    
    output += `   createUser('Charlie'): ${JSON.stringify(createUser('Charlie'))}\n`;
    output += `   createUser('Diana', 25): ${JSON.stringify(createUser('Diana', 25))}\n`;
    
    // 5. Rest parameters
    output += '\n5. Rest Parameters:\n';
    
    function sum(...numbers) {
        return numbers.reduce((total, num) => total + num, 0);
    }
    
    output += `   sum(1, 2, 3, 4, 5): ${sum(1, 2, 3, 4, 5)}\n`;
    
    // 6. Destructuring in functions
    output += '\n6. Destructuring in Functions:\n';
    
    function processUser({ name, age, email = 'N/A' }) {
        return `User: ${name}, Age: ${age}, Email: ${email}`;
    }
    
    const user = { name: 'Eve', age: 28 };
    output += `   processUser(user): ${processUser(user)}\n`;
    
    // 7. Higher-order functions
    output += '\n7. Higher-Order Functions:\n';
    
    function createMultiplier(factor) {
        return function(number) {
            return number * factor;
        };
    }
    
    const double = createMultiplier(2);
    const triple = createMultiplier(3);
    
    output += `   double(8): ${double(8)}\n`;
    output += `   triple(8): ${triple(8)}\n`;
    
    // 8. Immediately Invoked Function Expression (IIFE)
    output += '\n8. IIFE (Immediately Invoked Function Expression):\n';
    
    const result = (function() {
        const secret = 'This is private';
        return `IIFE executed: ${secret}`;
    })();
    
    output += `   ${result}\n`;
    
    // 9. Callback functions
    output += '\n9. Callback Functions:\n';
    
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(num => num * 2);
    const evens = numbers.filter(num => num % 2 === 0);
    
    output += `   Original: [${numbers}]\n`;
    output += `   Doubled: [${doubled}]\n`;
    output += `   Evens: [${evens}]\n`;
    
    return output;
}
