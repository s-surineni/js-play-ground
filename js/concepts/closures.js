/**
 * JavaScript Closures - Use Cases and Examples
 * 
 * A closure is a function that has access to variables in its outer (enclosing) scope
 * even after the outer function has returned. This is a powerful feature of JavaScript.
 */

export function closuresExample() {
    console.log('=== JavaScript Closures - Use Cases ===\n');

// ============================================================================
// 1. BASIC CLOSURE CONCEPT
// ============================================================================

function outerFunction(x) {
    // This variable is in the outer function's scope
    const outerVariable = x;
    
    // Inner function has access to outerVariable
    function innerFunction(y) {
        return outerVariable + y;
    }
    
    // Return the inner function (not execute it)
    return innerFunction;
}

// Create a closure
const addFive = outerFunction(5);
console.log('1. Basic Closure:');
console.log('addFive(3):', addFive(3)); // 8
console.log('addFive(10):', addFive(10)); // 15
console.log();

// ============================================================================
// 2. DATA PRIVACY / ENCAPSULATION
// ============================================================================

function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log('2. Data Privacy / Encapsulation:');
console.log('counter.getCount():', counter.getCount()); // 0
console.log('counter.increment():', counter.increment()); // 1
console.log('counter.increment():', counter.increment()); // 2
console.log('counter.decrement():', counter.decrement()); // 1
console.log('counter.count:', counter.count); // undefined (private)
console.log();

// ============================================================================
// 3. FUNCTION FACTORIES
// ============================================================================

function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log('3. Function Factories:');
console.log('double(5):', double(5)); // 10
console.log('triple(5):', triple(5)); // 15
console.log('quadruple(5):', quadruple(5)); // 20
console.log();

// ============================================================================
// 4. CALLBACK FUNCTIONS AND EVENT HANDLERS
// ============================================================================

function createButtonHandler(buttonName) {
    return function() {
        console.log(`Button ${buttonName} was clicked!`);
    };
}

// Simulate button creation
const button1Handler = createButtonHandler('Submit');
const button2Handler = createButtonHandler('Cancel');

console.log('4. Event Handlers:');
button1Handler(); // Button Submit was clicked!
button2Handler(); // Button Cancel was clicked!
console.log();

// ============================================================================
// 5. MODULE PATTERN
// ============================================================================

const userModule = (function() {
    let users = []; // Private data
    
    return {
        addUser: function(name, email) {
            users.push({ name, email, id: users.length + 1 });
        },
        getUsers: function() {
            return [...users]; // Return a copy
        },
        getUserCount: function() {
            return users.length;
        }
    };
})();

console.log('5. Module Pattern:');
userModule.addUser('John Doe', 'john@example.com');
userModule.addUser('Jane Smith', 'jane@example.com');
console.log('User count:', userModule.getUserCount()); // 2
console.log('Users:', userModule.getUsers());
console.log('Direct access to users:', userModule.users); // undefined
console.log();

// ============================================================================
// 6. CURRYING
// ============================================================================

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);
console.log('6. Currying:');
console.log('curriedAdd(1)(2)(3):', curriedAdd(1)(2)(3)); // 6
console.log('curriedAdd(1, 2)(3):', curriedAdd(1, 2)(3)); // 6
console.log('curriedAdd(1)(2, 3):', curriedAdd(1)(2, 3)); // 6
console.log();

// ============================================================================
// 7. MEMOIZATION / CACHING
// ============================================================================

function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache[key]) {
            console.log('Cache hit for:', key);
            return cache[key];
        }
        
        console.log('Cache miss for:', key);
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

function expensiveCalculation(n) {
    console.log(`Computing for ${n}...`);
    // Simulate expensive operation
    return n * n * n;
}

const memoizedCalculation = memoize(expensiveCalculation);

console.log('7. Memoization:');
console.log('memoizedCalculation(5):', memoizedCalculation(5));
console.log('memoizedCalculation(5):', memoizedCalculation(5)); // From cache
console.log('memoizedCalculation(3):', memoizedCalculation(3));
console.log();

// ============================================================================
// 8. PARTIAL APPLICATION
// ============================================================================

function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

function greet(greeting, name, punctuation) {
    return `${greeting} ${name}${punctuation}`;
}

const sayHello = partial(greet, 'Hello');
const sayGoodbye = partial(greet, 'Goodbye');

console.log('8. Partial Application:');
console.log('sayHello("John", "!"):', sayHello('John', '!')); // Hello John!
console.log('sayGoodbye("Jane", "."):', sayGoodbye('Jane', '.')); // Goodbye Jane.
console.log();

// ============================================================================
// 9. ASYNC OPERATIONS WITH CLOSURES
// ============================================================================

function createAsyncOperation(delay) {
    return function(callback) {
        setTimeout(() => {
            callback(`Operation completed after ${delay}ms`);
        }, delay);
    };
}

const quickOperation = createAsyncOperation(100);
const slowOperation = createAsyncOperation(1000);

console.log('9. Async Operations:');
quickOperation((result) => console.log('Quick:', result));
slowOperation((result) => console.log('Slow:', result));
console.log('Operations started...');
console.log();

// ============================================================================
// 10. ITERATOR PATTERN
// ============================================================================

function createIterator(array) {
    let index = 0;
    
    return {
        next: function() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            } else {
                return { done: true };
            }
        },
        hasNext: function() {
            return index < array.length;
        }
    };
}

const numbers = [1, 2, 3, 4, 5];
const iterator = createIterator(numbers);

console.log('10. Iterator Pattern:');
while (iterator.hasNext()) {
    const item = iterator.next();
    console.log('Next item:', item.value);
}
console.log();

// ============================================================================
// 11. CONFIGURATION OBJECTS
// ============================================================================

function createLogger(config) {
    const { prefix, timestamp, level } = config;
    
    return function(message) {
        const time = timestamp ? new Date().toISOString() : '';
        const logMessage = `${prefix} ${time} [${level}] ${message}`;
        console.log(logMessage);
    };
}

const errorLogger = createLogger({
    prefix: '[ERROR]',
    timestamp: true,
    level: 'ERROR'
});

const infoLogger = createLogger({
    prefix: '[INFO]',
    timestamp: false,
    level: 'INFO'
});

console.log('11. Configuration Objects:');
errorLogger('Something went wrong!');
infoLogger('Application started successfully');
console.log();

// ============================================================================
// 12. COMMON CLOSURE PITFALLS AND SOLUTIONS
// ============================================================================

console.log('12. Common Pitfalls:');

// Pitfall: Loop variable in closure
console.log('Pitfall - Loop variable:');
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log('var i:', i); // Prints 3, 3, 3
    }, 100);
}

// Solution 1: Use let instead of var
setTimeout(() => {
    console.log('Solution 1 - Using let:');
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log('let i:', i); // Prints 0, 1, 2
        }, 200);
    }
}, 150);

// Solution 2: Use IIFE (Immediately Invoked Function Expression)
setTimeout(() => {
    console.log('Solution 2 - Using IIFE:');
    for (var i = 0; i < 3; i++) {
        (function(j) {
            setTimeout(() => {
                console.log('IIFE j:', j); // Prints 0, 1, 2
            }, 300);
        })(i);
    }
}, 250);

// Solution 3: Use bind
setTimeout(() => {
    console.log('Solution 3 - Using bind:');
    for (var i = 0; i < 3; i++) {
        setTimeout(function(j) {
            console.log('bind j:', j); // Prints 0, 1, 2
        }.bind(null, i), 400);
    }
}, 350);

    console.log('\n=== End of Closures Examples ===');
    
    return 'Closures examples completed! Check the console for detailed output.';
}
