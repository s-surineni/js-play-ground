/**
 * Modern Module Pattern with WeakMap - Examples
 * 
 * The Modern Module Pattern uses WeakMap to store private data associated with
 * object instances. This approach provides true privacy and automatic memory management.
 * 
 * Key Benefits:
 * - True privacy (data cannot be accessed from outside)
 * - Automatic garbage collection (WeakMap doesn't prevent GC)
 * - No memory leaks (keys are weakly referenced)
 * - Works with any object as a key
 */

export function modernModulePatternExample() {
    console.log('=== Modern Module Pattern with WeakMap ===\n');

// ============================================================================
// 1. UNDERSTANDING WEAKMAP BASICS
// ============================================================================

console.log('1. WeakMap Basics:');

// WeakMap can only use objects as keys (not primitives)
const privateData = new WeakMap();

const obj1 = {};
const obj2 = {};

// Store private data associated with objects
privateData.set(obj1, { secret: 'data1', count: 0 });
privateData.set(obj2, { secret: 'data2', count: 0 });

console.log('obj1 private data:', privateData.get(obj1)); // { secret: 'data1', count: 0 }
console.log('obj2 private data:', privateData.get(obj2)); // { secret: 'data2', count: 0 }

// Cannot access WeakMap keys directly (no .keys(), .values(), .entries())
// This provides true privacy - you need the object reference to access data
console.log('WeakMap size:', privateData); // WeakMap { <items unknown> }
console.log();

// ============================================================================
// 2. BASIC MODERN MODULE PATTERN - COUNTER
// ============================================================================

console.log('2. Basic Modern Module Pattern - Counter:');

const Counter = (function() {
    // Private WeakMap to store instance data
    const privateData = new WeakMap();
    
    // Constructor function
    function Counter(initialValue = 0) {
        // Store private data for this instance
        privateData.set(this, {
            count: initialValue,
            history: [],
            createdAt: new Date()
        });
    }
    
    // Public methods
    Counter.prototype.increment = function(amount = 1) {
        const data = privateData.get(this);
        data.count += amount;
        data.history.push({ action: 'increment', amount, timestamp: new Date() });
        return data.count;
    };
    
    Counter.prototype.decrement = function(amount = 1) {
        const data = privateData.get(this);
        data.count -= amount;
        data.history.push({ action: 'decrement', amount, timestamp: new Date() });
        return data.count;
    };
    
    Counter.prototype.getValue = function() {
        return privateData.get(this).count;
    };
    
    Counter.prototype.getHistory = function() {
        return [...privateData.get(this).history]; // Return a copy
    };
    
    Counter.prototype.reset = function() {
        const data = privateData.get(this);
        data.count = 0;
        data.history.push({ action: 'reset', timestamp: new Date() });
    };
    
    return Counter;
})();

const counter1 = new Counter(10);
const counter2 = new Counter(5);

console.log('Counter 1 initial value:', counter1.getValue()); // 10
console.log('Counter 2 initial value:', counter2.getValue()); // 5

counter1.increment(3);
counter1.increment(2);
counter2.increment(10);

console.log('Counter 1 after increments:', counter1.getValue()); // 15
console.log('Counter 2 after increment:', counter2.getValue()); // 15

console.log('Counter 1 history:', counter1.getHistory().length, 'entries');
console.log('Counter 1 private data access:', counter1.count); // undefined (truly private!)
console.log();

// ============================================================================
// 3. USER MODULE WITH PRIVATE DATA
// ============================================================================

console.log('3. User Module with Private Data:');

const User = (function() {
    const privateData = new WeakMap();
    
    function User(name, email, password) {
        privateData.set(this, {
            name,
            email,
            passwordHash: btoa(password), // Simple encoding (not secure, just for demo)
            loginAttempts: 0,
            lastLogin: null,
            preferences: {}
        });
    }
    
    User.prototype.getName = function() {
        return privateData.get(this).name;
    };
    
    User.prototype.getEmail = function() {
        return privateData.get(this).email;
    };
    
    User.prototype.verifyPassword = function(password) {
        const data = privateData.get(this);
        const isValid = btoa(password) === data.passwordHash;
        
        if (isValid) {
            data.loginAttempts = 0;
            data.lastLogin = new Date();
        } else {
            data.loginAttempts++;
        }
        
        return isValid;
    };
    
    User.prototype.getLoginAttempts = function() {
        return privateData.get(this).loginAttempts;
    };
    
    User.prototype.getLastLogin = function() {
        return privateData.get(this).lastLogin;
    };
    
    User.prototype.setPreference = function(key, value) {
        const data = privateData.get(this);
        data.preferences[key] = value;
    };
    
    User.prototype.getPreference = function(key) {
        return privateData.get(this).preferences[key];
    };
    
    // Password is truly private - cannot be accessed
    User.prototype.getPassword = function() {
        throw new Error('Password cannot be accessed!');
    };
    
    return User;
})();

const user1 = new User('John Doe', 'john@example.com', 'secret123');
const user2 = new User('Jane Smith', 'jane@example.com', 'password456');

console.log('User 1 name:', user1.getName());
console.log('User 1 email:', user1.getEmail());
console.log('Password verification (correct):', user1.verifyPassword('secret123')); // true
console.log('Password verification (wrong):', user1.verifyPassword('wrong')); // false
console.log('Login attempts:', user1.getLoginAttempts());
console.log('Last login:', user1.getLastLogin());

user1.setPreference('theme', 'dark');
user1.setPreference('language', 'en');
console.log('User 1 theme preference:', user1.getPreference('theme'));

// Try to access private data
console.log('Direct password access:', user1.password); // undefined
console.log('Direct passwordHash access:', user1.passwordHash); // undefined
try {
    user1.getPassword();
} catch (e) {
    console.log('Password access error:', e.message);
}
console.log();

// ============================================================================
// 4. BANK ACCOUNT MODULE WITH TRANSACTION HISTORY
// ============================================================================

console.log('4. Bank Account Module:');

const BankAccount = (function() {
    const privateData = new WeakMap();
    
    function BankAccount(accountNumber, initialBalance = 0) {
        privateData.set(this, {
            accountNumber,
            balance: initialBalance,
            transactions: [],
            isActive: true,
            overdraftLimit: 0
        });
    }
    
    BankAccount.prototype.getAccountNumber = function() {
        return privateData.get(this).accountNumber;
    };
    
    BankAccount.prototype.getBalance = function() {
        return privateData.get(this).balance;
    };
    
    BankAccount.prototype.deposit = function(amount) {
        const data = privateData.get(this);
        if (!data.isActive) {
            throw new Error('Account is inactive');
        }
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        data.balance += amount;
        data.transactions.push({
            type: 'deposit',
            amount,
            balance: data.balance,
            timestamp: new Date()
        });
        
        return data.balance;
    };
    
    BankAccount.prototype.withdraw = function(amount) {
        const data = privateData.get(this);
        if (!data.isActive) {
            throw new Error('Account is inactive');
        }
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        const availableBalance = data.balance + data.overdraftLimit;
        if (amount > availableBalance) {
            throw new Error('Insufficient funds');
        }
        
        data.balance -= amount;
        data.transactions.push({
            type: 'withdrawal',
            amount,
            balance: data.balance,
            timestamp: new Date()
        });
        
        return data.balance;
    };
    
    BankAccount.prototype.getTransactionHistory = function() {
        return [...privateData.get(this).transactions];
    };
    
    BankAccount.prototype.setOverdraftLimit = function(limit) {
        const data = privateData.get(this);
        data.overdraftLimit = limit;
    };
    
    BankAccount.prototype.deactivate = function() {
        privateData.get(this).isActive = false;
    };
    
    BankAccount.prototype.activate = function() {
        privateData.get(this).isActive = true;
    };
    
    return BankAccount;
})();

const account1 = new BankAccount('ACC-001', 1000);
const account2 = new BankAccount('ACC-002', 500);

console.log('Account 1 number:', account1.getAccountNumber());
console.log('Account 1 initial balance:', account1.getBalance());

account1.deposit(200);
account1.withdraw(150);
account1.setOverdraftLimit(100);
account1.withdraw(50); // Uses overdraft

console.log('Account 1 balance after transactions:', account1.getBalance());
console.log('Account 1 transaction count:', account1.getTransactionHistory().length);

// Private data is truly inaccessible
console.log('Direct balance access:', account1.balance); // undefined
console.log('Direct transactions access:', account1.transactions); // undefined
console.log();

// ============================================================================
// 5. CACHE MODULE WITH AUTOMATIC CLEANUP
// ============================================================================

console.log('5. Cache Module with Automatic Cleanup:');

const Cache = (function() {
    const privateData = new WeakMap();
    const cacheInstances = new WeakSet(); // Track instances
    
    function Cache(maxSize = 100, ttl = 60000) { // Default 60 seconds TTL
        privateData.set(this, {
            data: new Map(),
            maxSize,
            ttl,
            accessCount: 0,
            hitCount: 0,
            missCount: 0
        });
        cacheInstances.add(this);
    }
    
    Cache.prototype.set = function(key, value) {
        const data = privateData.get(this);
        
        // Remove oldest entry if cache is full
        if (data.data.size >= data.maxSize && !data.data.has(key)) {
            const firstKey = data.data.keys().next().value;
            data.data.delete(firstKey);
        }
        
        data.data.set(key, {
            value,
            timestamp: Date.now(),
            accessCount: 0
        });
    };
    
    Cache.prototype.get = function(key) {
        const data = privateData.get(this);
        data.accessCount++;
        
        if (!data.data.has(key)) {
            data.missCount++;
            return null;
        }
        
        const entry = data.data.get(key);
        const age = Date.now() - entry.timestamp;
        
        // Check if entry has expired
        if (age > data.ttl) {
            data.data.delete(key);
            data.missCount++;
            return null;
        }
        
        entry.accessCount++;
        data.hitCount++;
        return entry.value;
    };
    
    Cache.prototype.has = function(key) {
        const data = privateData.get(this);
        if (!data.data.has(key)) {
            return false;
        }
        
        const entry = data.data.get(key);
        const age = Date.now() - entry.timestamp;
        
        if (age > data.ttl) {
            data.data.delete(key);
            return false;
        }
        
        return true;
    };
    
    Cache.prototype.clear = function() {
        const data = privateData.get(this);
        data.data.clear();
        data.hitCount = 0;
        data.missCount = 0;
        data.accessCount = 0;
    };
    
    Cache.prototype.getStats = function() {
        const data = privateData.get(this);
        return {
            size: data.data.size,
            maxSize: data.maxSize,
            accessCount: data.accessCount,
            hitCount: data.hitCount,
            missCount: data.missCount,
            hitRate: data.accessCount > 0 
                ? (data.hitCount / data.accessCount * 100).toFixed(2) + '%'
                : '0%'
        };
    };
    
    return Cache;
})();

const cache = new Cache(5, 5000); // Max 5 entries, 5 second TTL

cache.set('user:1', { name: 'John', id: 1 });
cache.set('user:2', { name: 'Jane', id: 2 });
cache.set('product:1', { name: 'Laptop', price: 999 });

console.log('Cache stats:', cache.getStats());
console.log('Get user:1:', cache.get('user:1'));
console.log('Get user:999:', cache.get('user:999')); // null (not found)
console.log('Cache has product:1:', cache.has('product:1'));

// Fill cache to test max size
cache.set('item:1', 'value1');
cache.set('item:2', 'value2');
cache.set('item:3', 'value3'); // Should remove oldest entry

console.log('Cache stats after filling:', cache.getStats());
console.log();

// ============================================================================
// 6. COMPARISON: WEAKMAP vs CLOSURE vs SYMBOL
// ============================================================================

console.log('6. Comparison: WeakMap vs Closure vs Symbol:');

// Approach 1: WeakMap (Modern Module Pattern)
const WeakMapModule = (function() {
    const privateData = new WeakMap();
    
    function WeakMapModule(value) {
        privateData.set(this, { value });
    }
    
    WeakMapModule.prototype.getValue = function() {
        return privateData.get(this).value;
    };
    
    return WeakMapModule;
})();

// Approach 2: Closure (Traditional)
const ClosureModule = (function() {
    function ClosureModule(value) {
        let privateValue = value; // Private via closure
        
        this.getValue = function() {
            return privateValue;
        };
    }
    
    return ClosureModule;
})();

// Approach 3: Symbol (Pseudo-private)
const symbolKey = Symbol('private');
const SymbolModule = (function() {
    function SymbolModule(value) {
        this[symbolKey] = { value };
    }
    
    SymbolModule.prototype.getValue = function() {
        return this[symbolKey].value;
    };
    
    return SymbolModule;
})();

const wmInstance = new WeakMapModule('WeakMap value');
const closureInstance = new ClosureModule('Closure value');
const symbolInstance = new SymbolModule('Symbol value');

console.log('WeakMap approach:');
console.log('  Value:', wmInstance.getValue());
console.log('  Private access:', wmInstance.value); // undefined
console.log('  Object.keys():', Object.keys(wmInstance)); // []

console.log('Closure approach:');
console.log('  Value:', closureInstance.getValue());
console.log('  Private access:', closureInstance.privateValue); // undefined
console.log('  Object.keys():', Object.keys(closureInstance)); // ['getValue']

console.log('Symbol approach:');
console.log('  Value:', symbolInstance.getValue());
console.log('  Private access:', symbolInstance[symbolKey]); // Can access if you know the symbol!
console.log('  Object.keys():', Object.keys(symbolInstance)); // []
console.log('  Object.getOwnPropertySymbols():', Object.getOwnPropertySymbols(symbolInstance).length); // 1

console.log('\nKey Differences:');
console.log('  WeakMap: True privacy, automatic GC, no memory leaks');
console.log('  Closure: Privacy, but methods recreated per instance (memory overhead)');
console.log('  Symbol: Pseudo-private (can access with getOwnPropertySymbols)');
console.log();

// ============================================================================
// 7. ADVANCED: MIXIN PATTERN WITH WEAKMAP
// ============================================================================

console.log('7. Advanced: Mixin Pattern with WeakMap:');

// EventEmitter mixin using WeakMap
const EventEmitterMixin = (function() {
    const eventData = new WeakMap();
    
    return {
        on: function(event, handler) {
            const data = eventData.get(this) || { listeners: {} };
            if (!data.listeners[event]) {
                data.listeners[event] = [];
            }
            data.listeners[event].push(handler);
            eventData.set(this, data);
        },
        
        off: function(event, handler) {
            const data = eventData.get(this);
            if (!data || !data.listeners[event]) return;
            
            data.listeners[event] = data.listeners[event].filter(h => h !== handler);
            eventData.set(this, data);
        },
        
        emit: function(event, ...args) {
            const data = eventData.get(this);
            if (!data || !data.listeners[event]) return;
            
            data.listeners[event].forEach(handler => {
                try {
                    handler.apply(this, args);
                } catch (error) {
                    console.error('Event handler error:', error);
                }
            });
        }
    };
})();

// Apply mixin to any object
function createEventEmitter() {
    const emitter = {};
    Object.assign(emitter, EventEmitterMixin);
    return emitter;
}

const emitter = createEventEmitter();

emitter.on('user:login', (username) => {
    console.log('  User logged in:', username);
});

emitter.on('user:logout', (username) => {
    console.log('  User logged out:', username);
});

console.log('Emitting events:');
emitter.emit('user:login', 'john_doe');
emitter.emit('user:logout', 'john_doe');

// Event listeners are private
console.log('  Direct listener access:', emitter.listeners); // undefined
console.log();

// ============================================================================
// 8. MEMORY MANAGEMENT BENEFITS
// ============================================================================

console.log('8. Memory Management Benefits:');

const MemoryDemo = (function() {
    const privateData = new WeakMap();
    
    function MemoryDemo(id) {
        privateData.set(this, {
            id,
            largeArray: new Array(1000).fill(0).map((_, i) => i),
            metadata: { created: new Date() }
        });
    }
    
    MemoryDemo.prototype.getId = function() {
        return privateData.get(this).id;
    };
    
    return MemoryDemo;
})();

// Create instances
let instance1 = new MemoryDemo('instance-1');
let instance2 = new MemoryDemo('instance-2');

console.log('Created 2 instances');
console.log('Instance 1 ID:', instance1.getId());
console.log('Instance 2 ID:', instance2.getId());

// When instance is garbage collected, its WeakMap entry is automatically removed
// This prevents memory leaks that could occur with regular Maps
instance1 = null; // Can be garbage collected
instance2 = null; // Can be garbage collected

console.log('Instances set to null - WeakMap entries will be automatically cleaned up');
console.log('This is the key benefit: automatic memory management!');
console.log();

// ============================================================================
// 9. REAL-WORLD EXAMPLE: API CLIENT WITH RATE LIMITING
// ============================================================================

console.log('9. Real-World Example: API Client with Rate Limiting:');

const APIClient = (function() {
    const privateData = new WeakMap();
    
    function APIClient(baseURL, rateLimit = 10) {
        privateData.set(this, {
            baseURL,
            rateLimit,
            requestQueue: [],
            requestHistory: [],
            currentRequests: 0,
            lastRequestTime: 0,
            minRequestInterval: 1000 / rateLimit // ms between requests
        });
    }
    
    APIClient.prototype._canMakeRequest = function() {
        const data = privateData.get(this);
        const now = Date.now();
        const timeSinceLastRequest = now - data.lastRequestTime;
        
        return timeSinceLastRequest >= data.minRequestInterval && 
               data.currentRequests < data.rateLimit;
    };
    
    APIClient.prototype._recordRequest = function(endpoint) {
        const data = privateData.get(this);
        data.currentRequests++;
        data.lastRequestTime = Date.now();
        data.requestHistory.push({
            endpoint,
            timestamp: new Date(),
            count: data.currentRequests
        });
        
        // Reset counter after interval
        setTimeout(() => {
            data.currentRequests = Math.max(0, data.currentRequests - 1);
        }, 1000);
    };
    
    APIClient.prototype.request = async function(endpoint) {
        const data = privateData.get(this);
        const url = `${data.baseURL}${endpoint}`;
        
        // Wait if rate limit exceeded
        while (!this._canMakeRequest()) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        this._recordRequest(endpoint);
        
        // Simulate API call
        console.log(`  Making request to: ${url}`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: `Response from ${endpoint}`, status: 200 });
            }, 100);
        });
    };
    
    APIClient.prototype.getRequestHistory = function() {
        return [...privateData.get(this).requestHistory];
    };
    
    APIClient.prototype.getStats = function() {
        const data = privateData.get(this);
        return {
            totalRequests: data.requestHistory.length,
            currentRequests: data.currentRequests,
            rateLimit: data.rateLimit
        };
    };
    
    return APIClient;
})();

const apiClient = new APIClient('https://api.example.com', 5); // 5 requests per second

// Simulate multiple requests
console.log('Making multiple API requests:');
apiClient.request('/users').then(res => console.log('  Response:', res.data));
apiClient.request('/posts').then(res => console.log('  Response:', res.data));
apiClient.request('/comments').then(res => console.log('  Response:', res.data));

setTimeout(() => {
    console.log('API Client stats:', apiClient.getStats());
    console.log('Request history length:', apiClient.getRequestHistory().length);
}, 500);
console.log();

    console.log('\n=== End of Modern Module Pattern Examples ===');
    
    return 'Modern Module Pattern examples completed! Check the console for detailed output.';
}

