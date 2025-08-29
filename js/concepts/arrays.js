// Arrays and Objects Examples
export function arraysExample() {
    let output = '=== ARRAYS & OBJECTS ===\n\n';
    
    // 1. Array creation and manipulation
    output += '1. Array Creation & Manipulation:\n';
    
    const fruits = ['apple', 'banana', 'orange'];
    fruits.push('grape');
    fruits.unshift('strawberry');
    
    output += `   Original: [${fruits}]\n`;
    output += `   Length: ${fruits.length}\n`;
    output += `   First element: ${fruits[0]}\n`;
    output += `   Last element: ${fruits[fruits.length - 1]}\n`;
    
    // 2. Array methods
    output += '\n2. Array Methods:\n';
    
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Map
    const doubled = numbers.map(num => num * 2);
    output += `   map (double): [${doubled}]\n`;
    
    // Filter
    const evens = numbers.filter(num => num % 2 === 0);
    output += `   filter (evens): [${evens}]\n`;
    
    // Reduce
    const sum = numbers.reduce((total, num) => total + num, 0);
    output += `   reduce (sum): ${sum}\n`;
    
    // Find
    const firstEven = numbers.find(num => num % 2 === 0);
    output += `   find (first even): ${firstEven}\n`;
    
    // Some
    const hasEven = numbers.some(num => num % 2 === 0);
    output += `   some (has even): ${hasEven}\n`;
    
    // Every
    const allPositive = numbers.every(num => num > 0);
    output += `   every (all positive): ${allPositive}\n`;
    
    // 3. Array destructuring
    output += '\n3. Array Destructuring:\n';
    
    const [first, second, ...rest] = numbers;
    output += `   [first, second, ...rest] = [${numbers}]\n`;
    output += `   first: ${first}, second: ${second}\n`;
    output += `   rest: [${rest}]\n`;
    
    // 4. Object creation and properties
    output += '\n4. Object Creation & Properties:\n';
    
    const person = {
        name: 'John Doe',
        age: 30,
        city: 'New York',
        hobbies: ['reading', 'swimming'],
        address: {
            street: '123 Main St',
            zipCode: '10001'
        }
    };
    
    output += `   Person object: ${JSON.stringify(person, null, 2)}\n`;
    
    // 5. Object methods and computed properties
    output += '\n5. Object Methods & Computed Properties:\n';
    
    const dynamicKey = 'dynamicProperty';
    const obj = {
        [dynamicKey]: 'This is dynamic',
        regularProperty: 'This is regular',
        method() {
            return `Hello from ${this.regularProperty}`;
        }
    };
    
    output += `   Dynamic key: ${obj[dynamicKey]}\n`;
    output += `   Method call: ${obj.method()}\n`;
    
    // 6. Object destructuring
    output += '\n6. Object Destructuring:\n';
    
    const { name, age, city, ...otherProps } = person;
    output += `   Destructured: name=${name}, age=${age}, city=${city}\n`;
    output += `   Other props: ${JSON.stringify(otherProps)}\n`;
    
    // 7. Spread operator
    output += '\n7. Spread Operator:\n';
    
    const originalArray = [1, 2, 3];
    const spreadArray = [...originalArray, 4, 5];
    const originalObject = { a: 1, b: 2 };
    const spreadObject = { ...originalObject, c: 3, d: 4 };
    
    output += `   Array spread: [${originalArray}] → [${spreadArray}]\n`;
    output += `   Object spread: ${JSON.stringify(originalObject)} → ${JSON.stringify(spreadObject)}\n`;
    
    // 8. Object methods
    output += '\n8. Object Methods:\n';
    
    const keys = Object.keys(person);
    const values = Object.values(person);
    const entries = Object.entries(person);
    
    output += `   Object.keys(): [${keys}]\n`;
    output += `   Object.values(): [${values}]\n`;
    output += `   Object.entries(): ${JSON.stringify(entries)}\n`;
    
    // 9. Array and Object combination
    output += '\n9. Array & Object Combination:\n';
    
    const users = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
    ];
    
    const userNames = users.map(user => user.name);
    const adults = users.filter(user => user.age >= 30);
    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    
    output += `   Users: ${JSON.stringify(users)}\n`;
    output += `   Names: [${userNames}]\n`;
    output += `   Adults: ${JSON.stringify(adults)}\n`;
    output += `   Total age: ${totalAge}\n`;
    
    return output;
}
