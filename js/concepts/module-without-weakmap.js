/**
 * Module Pattern WITHOUT WeakMap - Demonstrating Problems
 * 
 * This file shows the same examples as modern-module-pattern.js but using
 * traditional approaches (closures, regular Maps, Symbols) to demonstrate
 * the problems that WeakMap solves.
 * 
 * Key Problems Demonstrated:
 * - Memory leaks (regular Map prevents garbage collection)
 * - Privacy issues (Symbol-based "private" data can be accessed)
 * - Performance overhead (closures recreate methods per instance)
 * - Manual cleanup required
 */

export function moduleWithoutWeakMapExample() {
    console.log('=== Module Pattern WITHOUT WeakMap - Problems Demonstrated ===\n');

    // ============================================================================
    // 1. PROBLEM: REGULAR MAP CAUSES MEMORY LEAKS
    // ============================================================================

    console.log('1. PROBLEM: Regular Map Causes Memory Leaks:');

    const RegularMapModule = (function () {
        // PROBLEM: Regular Map holds strong references - prevents garbage collection!
        // IMPORTANT: This Map is created ONCE and shared by ALL instances!
        // Each instance does NOT get its own copy - they all share the same Map.
        const privateData = new Map(); // ❌ Strong reference, shared by all instances
        let instanceId = 0;

        function RegularMapModule(value) {
            this.id = ++instanceId;
            // Store reference to 'this' in Map - prevents GC even if instance is deleted
            privateData.set(this, { value, id: this.id });
            console.log(`  Created instance ${this.id}, Map size: ${privateData.size}`);
        }

        RegularMapModule.prototype.getValue = function () {
            return privateData.get(this).value;
        };

        // PROBLEM: Need manual cleanup method
        RegularMapModule.prototype.destroy = function () {
            privateData.delete(this);
            console.log(`  Destroyed instance ${this.id}, Map size: ${privateData.size}`);
        };

        // PROBLEM: Can access all instances (privacy issue)
        RegularMapModule.getAllInstances = function () {
            return privateData.size;
        };

        return RegularMapModule;
    })();

    console.log('Creating instances with Regular Map:');
    let mapInstance1 = new RegularMapModule('value1');
    let mapInstance2 = new RegularMapModule('value2');
    let mapInstance3 = new RegularMapModule('value3');

    console.log('Total instances in Map:', RegularMapModule.getAllInstances()); // 3
    console.log('⚠️  KEY POINT: All instances share the SAME Map!');
    console.log('⚠️  Each instance does NOT get its own copy of privateData.');

    // Even if we remove the reference (set to null), Map still holds it!
    // In a real scenario, if mapInstance1 went out of scope, Map would still prevent GC
    mapInstance1 = null;
    console.log('After setting mapInstance1 to null:');
    console.log('Total instances in Map:', RegularMapModule.getAllInstances()); // Still 3! ❌

    // Must manually clean up
    mapInstance2.destroy();
    console.log('After manual destroy:');
    console.log('Total instances in Map:', RegularMapModule.getAllInstances()); // 2

    console.log('\n⚠️  PROBLEM: Regular Map prevents garbage collection!');
    console.log('⚠️  PROBLEM: Must manually clean up or memory leaks occur!');
    console.log('⚠️  PROBLEM: Can access all instances (privacy issue)!');
    console.log();

    // ============================================================================
    // 2. PROBLEM: SYMBOL-BASED "PRIVATE" DATA CAN BE ACCESSED
    // ============================================================================

    console.log('2. PROBLEM: Symbol-Based "Private" Data Can Be Accessed:');

    const SymbolModule = (function () {
        // PROBLEM: Symbol is not truly private - can be discovered!
        const privateKey = Symbol('private');
        const passwordKey = Symbol('password');

        function SymbolModule(name, password) {
            // Store "private" data using Symbol
            this[privateKey] = { name };
            this[passwordKey] = password;
        }

        SymbolModule.prototype.getName = function () {
            return this[privateKey].name;
        };

        SymbolModule.prototype.verifyPassword = function (password) {
            return this[passwordKey] === password;
        };

        return SymbolModule;
    })();

    const symbolUser = new SymbolModule('John Doe', 'secret123');

    console.log('Normal access:');
    console.log('  Name:', symbolUser.getName()); // Works
    console.log('  Password check:', symbolUser.verifyPassword('secret123')); // Works

    console.log('\n⚠️  PRIVACY BREACH: Can access "private" data!');
    // PROBLEM: Can get all Symbol keys and access "private" data!
    const symbols = Object.getOwnPropertySymbols(symbolUser);
    console.log('  Found symbols:', symbols.length); // 2

    symbols.forEach(symbol => {
        const value = symbolUser[symbol];
        console.log(`  Symbol value:`, typeof value === 'object' ? JSON.stringify(value) : value);
        // ❌ Can see password: "secret123"
    });

    console.log('\n⚠️  PROBLEM: Symbol-based privacy is NOT secure!');
    console.log('⚠️  PROBLEM: Anyone can use Object.getOwnPropertySymbols() to access data!');
    console.log();

    // ============================================================================
    // 3. PROBLEM: CLOSURE APPROACH - MEMORY OVERHEAD
    // ============================================================================

    console.log('3. PROBLEM: Closure Approach - Memory Overhead:');

    const ClosureModule = (function () {
        function ClosureModule(value) {
            // PROBLEM: Each instance creates new function closures
            // This means each method is recreated per instance = memory overhead!
            let privateValue = value;
            let accessCount = 0;

            // ❌ Each instance gets its own copy of these functions
            this.getValue = function () {
                accessCount++;
                return privateValue;
            };

            this.getAccessCount = function () {
                return accessCount;
            };

            this.setValue = function (newValue) {
                privateValue = newValue;
            };
        }

        // ❌ Cannot add methods to prototype (they need closure access)
        // This means all methods are instance methods = more memory per instance

        return ClosureModule;
    })();

    const closure1 = new ClosureModule('value1');
    const closure2 = new ClosureModule('value2');

    console.log('Closure instances:');
    console.log('  Instance 1 value:', closure1.getValue());
    console.log('  Instance 2 value:', closure2.getValue());

    // Check if methods are the same (they're not - each instance has its own!)
    console.log('\n⚠️  MEMORY OVERHEAD:');
    console.log('  closure1.getValue === closure2.getValue:',
        closure1.getValue === closure2.getValue); // false ❌
    console.log('  Each instance has its own method copies!');

    // Estimate memory: if you have 1000 instances, you have 1000 copies of each method
    console.log('  With 1000 instances: 1000 copies of getValue, getAccessCount, setValue');
    console.log('  This is inefficient compared to prototype methods!');
    console.log();

    // ============================================================================
    // 4. PROBLEM: CLOSURE + MAP HYBRID - WORST OF BOTH WORLDS
    // ============================================================================

    console.log('4. PROBLEM: Closure + Map Hybrid - Worst of Both Worlds:');

    const HybridModule = (function () {
        const dataMap = new Map(); // ❌ Regular Map = memory leak
        let counter = 0;

        function HybridModule(value) {
            const id = ++counter;
            const privateData = { value, id, created: new Date() };

            // Store in Map (memory leak)
            dataMap.set(this, privateData);

            // Also use closure (memory overhead)
            this.getId = function () {
                return privateData.id; // Closure access
            };

            this.getValue = function () {
                return dataMap.get(this).value; // Map access
            };
        }

        // PROBLEM: Can access all data
        HybridModule.getAllData = function () {
            const allData = [];
            dataMap.forEach((data, instance) => {
                allData.push(data);
            });
            return allData;
        };

        return HybridModule;
    })();

    const hybrid1 = new HybridModule('data1');
    const hybrid2 = new HybridModule('data2');

    console.log('Hybrid instances:');
    console.log('  Instance 1:', hybrid1.getValue());
    console.log('  Instance 2:', hybrid2.getValue());

    console.log('\n⚠️  PROBLEMS:');
    console.log('  All data accessible:', HybridModule.getAllData().length, 'instances');
    console.log('  Memory leak: Map prevents garbage collection');
    console.log('  Memory overhead: Closure methods per instance');
    console.log();

    // ============================================================================
    // 5. REAL-WORLD PROBLEM: USER MODULE WITHOUT WEAKMAP
    // ============================================================================

    console.log('5. Real-World Problem: User Module Without WeakMap:');

    const UserModuleWithoutWeakMap = (function () {
        // ❌ Using regular Map - memory leak risk
        const userData = new Map();
        // ❌ Using Symbol - can be accessed
        const passwordSymbol = Symbol('password');

        function UserModuleWithoutWeakMap(name, email, password) {
            // Store in Map
            userData.set(this, {
                name,
                email,
                loginAttempts: 0,
                lastLogin: null
            });

            // Store password with Symbol (not secure!)
            this[passwordSymbol] = password;
        }

        UserModuleWithoutWeakMap.prototype.getName = function () {
            return userData.get(this).name;
        };

        UserModuleWithoutWeakMap.prototype.verifyPassword = function (password) {
            // ❌ Password accessible via Symbol!
            const storedPassword = this[passwordSymbol];
            const data = userData.get(this);

            if (password === storedPassword) {
                data.loginAttempts = 0;
                data.lastLogin = new Date();
                return true;
            }

            data.loginAttempts++;
            return false;
        };

        // ❌ Can access all users!
        UserModuleWithoutWeakMap.getAllUsers = function () {
            const users = [];
            userData.forEach((data, instance) => {
                users.push({
                    name: data.name,
                    email: data.email,
                    // ❌ Can even get password if we have the instance!
                    hasPassword: instance[passwordSymbol] !== undefined
                });
            });
            return users;
        };

        return UserModuleWithoutWeakMap;
    })();

    const user1 = new UserModuleWithoutWeakMap('John', 'john@example.com', 'secret123');
    const user2 = new UserModuleWithoutWeakMap('Jane', 'jane@example.com', 'password456');

    console.log('Users created:');
    console.log('  User 1:', user1.getName());
    console.log('  User 2:', user2.getName());

    console.log('\n⚠️  SECURITY ISSUES:');
    // Can access all users
    const allUsers = UserModuleWithoutWeakMap.getAllUsers();
    console.log('  All users accessible:', allUsers.length);

    // Can access password via Symbol
    const userSymbols = Object.getOwnPropertySymbols(user1);
    userSymbols.forEach(symbol => {
        console.log(`  User 1 password exposed: "${user1[symbol]}"`); // ❌ SECURITY BREACH!
    });

    console.log('\n⚠️  MEMORY ISSUES:');
    console.log('  Even if users are deleted, Map keeps them in memory');
    console.log('  Must manually clean up or memory leaks occur');
    console.log();

    // ============================================================================
    // 6. MEMORY LEAK DEMONSTRATION
    // ============================================================================

    console.log('6. Memory Leak Demonstration:');

    const LeakyModule = (function () {
        const data = new Map(); // ❌ Regular Map
        const largeDataCache = new Map(); // ❌ Another regular Map

        function LeakyModule(id) {
            this.id = id;
            // Store large data
            const largeArray = new Array(10000).fill(0).map((_, i) => ({
                id: i,
                data: `Item ${i}`,
                metadata: { created: new Date(), index: i }
            }));

            data.set(this, { id, largeArray });
            largeDataCache.set(this, { cached: true, size: largeArray.length });

            console.log(`  Created instance ${id}, Maps size: ${data.size}`);
        }

        LeakyModule.prototype.getData = function () {
            return data.get(this);
        };

        LeakyModule.getTotalInstances = function () {
            return data.size;
        };

        LeakyModule.getTotalMemory = function () {
            let total = 0;
            data.forEach((value) => {
                total += value.largeArray.length;
            });
            return total;
        };

        return LeakyModule;
    })();

    console.log('Creating instances with large data:');
    let leaky1 = new LeakyModule(1);
    let leaky2 = new LeakyModule(2);
    let leaky3 = new LeakyModule(3);

    console.log('Total instances:', LeakyModule.getTotalInstances()); // 3
    console.log('Total array items in memory:', LeakyModule.getTotalMemory()); // 30000

    // Remove references (set to null)
    // In a real scenario, if these variables went out of scope, Map would still prevent GC
    console.log('\nRemoving references to instances (setting to null):');
    leaky1 = null;
    leaky2 = null;
    leaky3 = null;

    // But Map still holds them!
    console.log('After removing references:');
    console.log('Total instances:', LeakyModule.getTotalInstances()); // Still 3! ❌
    console.log('Total array items in memory:', LeakyModule.getTotalMemory()); // Still 30000! ❌

    console.log('\n⚠️  MEMORY LEAK:');
    console.log('  - 30,000 array items still in memory');
    console.log('  - 3 instances still referenced by Map');
    console.log('  - Cannot be garbage collected');
    console.log('  - Memory usage keeps growing!');
    console.log();

    // ============================================================================
    // 7. COMPARISON: WEAKMAP vs REGULAR MAP vs SYMBOL vs CLOSURE
    // ============================================================================

    console.log('7. Side-by-Side Comparison:');

    console.log('\n📊 Feature Comparison Table:');
    console.log('┌─────────────────┬──────────┬──────────┬──────────┬──────────┐');
    console.log('│ Feature         │ WeakMap  │ Map      │ Symbol   │ Closure  │');
    console.log('├─────────────────┼──────────┼──────────┼──────────┼──────────┤');
    console.log('│ True Privacy    │    ✅    │    ❌    │    ❌    │    ✅    │');
    console.log('│ Auto GC         │    ✅    │    ❌    │    ✅    │    ✅    │');
    console.log('│ No Memory Leak  │    ✅    │    ❌    │    ✅    │    ✅    │');
    console.log('│ Prototype Methods│   ✅    │    ✅    │    ✅    │    ❌    │');
    console.log('│ Memory Efficient│    ✅    │    ❌    │    ✅    │    ❌    │');
    console.log('│ No Manual Cleanup│   ✅    │    ❌    │    ✅    │    ✅    │');
    console.log('└─────────────────┴──────────┴──────────┴──────────┴──────────┘');

    console.log('\n✅ WeakMap Advantages:');
    console.log('  1. True privacy - data cannot be accessed from outside');
    console.log('  2. Automatic garbage collection - no memory leaks');
    console.log('  3. Can use prototype methods - memory efficient');
    console.log('  4. No manual cleanup required');
    console.log('  5. Best of all worlds!');

    console.log('\n❌ Regular Map Problems:');
    console.log('  1. Memory leaks - prevents garbage collection');
    console.log('  2. Can access all instances');
    console.log('  3. Requires manual cleanup');

    console.log('\n❌ Symbol Problems:');
    console.log('  1. Not truly private - can be discovered');
    console.log('  2. Security risk - data can be accessed');
    console.log('  3. Object.getOwnPropertySymbols() exposes everything');

    console.log('\n❌ Closure Problems:');
    console.log('  1. Memory overhead - methods recreated per instance');
    console.log('  2. Cannot use prototype methods efficiently');
    console.log('  3. More memory per instance');

    console.log();

    // ============================================================================
    // 8. PERFORMANCE COMPARISON
    // ============================================================================

    console.log('8. Performance Comparison:');

    // Test closure approach (methods per instance)
    function createClosureInstances(count) {
        const instances = [];
        for (let i = 0; i < count; i++) {
            const instance = (function (value) {
                let privateValue = value;
                return {
                    getValue: function () { return privateValue; },
                    setValue: function (v) { privateValue = v; },
                    increment: function () { privateValue++; }
                };
            })(i);
            instances.push(instance);
        }
        return instances;
    }

    // Test WeakMap approach (prototype methods)
    const WeakMapModule = (function () {
        const privateData = new WeakMap();

        function WeakMapModule(value) {
            privateData.set(this, { value });
        }

        WeakMapModule.prototype.getValue = function () {
            return privateData.get(this).value;
        };

        WeakMapModule.prototype.setValue = function (value) {
            privateData.get(this).value = value;
        };

        WeakMapModule.prototype.increment = function () {
            privateData.get(this).value++;
        };

        return WeakMapModule;
    })();

    function createWeakMapInstances(count) {
        const instances = [];
        for (let i = 0; i < count; i++) {
            instances.push(new WeakMapModule(i));
        }
        return instances;
    }

    const testCount = 1000;

    console.log(`Creating ${testCount} instances with each approach:`);

    // Test closure
    const startClosure = performance.now();
    const closureInstances = createClosureInstances(testCount);
    const endClosure = performance.now();
    const closureTime = endClosure - startClosure;

    // Test WeakMap
    const startWeakMap = performance.now();
    const weakMapInstances = createWeakMapInstances(testCount);
    const endWeakMap = performance.now();
    const weakMapTime = endWeakMap - startWeakMap;

    console.log(`  Closure approach: ${closureTime.toFixed(2)}ms`);
    console.log(`  WeakMap approach: ${weakMapTime.toFixed(2)}ms`);

    // Check method sharing
    console.log('\nMethod sharing (memory efficiency):');
    console.log(`  Closure - methods are unique: ${closureInstances[0].getValue !== closureInstances[1].getValue}`);
    console.log(`  WeakMap - methods are shared: ${weakMapInstances[0].getValue === weakMapInstances[1].getValue}`);

    console.log('\n⚠️  PERFORMANCE:');
    console.log('  Closure: Each instance has its own method copies');
    console.log('  WeakMap: All instances share prototype methods (more efficient)');
    console.log();

    // ============================================================================
    // 9. SUMMARY: WHY WEAKMAP IS BETTER
    // ============================================================================

    console.log('9. Summary: Why WeakMap is Better:');

    console.log('\n🎯 Key Advantages of WeakMap:');
    console.log('  1. ✅ TRUE PRIVACY');
    console.log('     - Data cannot be accessed from outside the module');
    console.log('     - No way to enumerate or discover private data');
    console.log('     - More secure than Symbol-based approaches');

    console.log('\n  2. ✅ AUTOMATIC MEMORY MANAGEMENT');
    console.log('     - Weak references allow garbage collection');
    console.log('     - No memory leaks when instances are deleted');
    console.log('     - No manual cleanup required');

    console.log('\n  3. ✅ MEMORY EFFICIENT');
    console.log('     - Can use prototype methods (shared across instances)');
    console.log('     - No method duplication per instance');
    console.log('     - Lower memory footprint than closure approach');

    console.log('\n  4. ✅ CLEAN API');
    console.log('     - No need for destroy() or cleanup() methods');
    console.log('     - No need to track instances manually');
    console.log('     - Simpler, more maintainable code');

    console.log('\n📝 Best Practice:');
    console.log('   Use WeakMap for the Modern Module Pattern when you need:');
    console.log('   - True privacy for instance data');
    console.log('   - Automatic memory management');
    console.log('   - Memory-efficient implementations');
    console.log('   - Production-ready, maintainable code');
    console.log();

    console.log('\n=== End of Module Pattern WITHOUT WeakMap Examples ===');
    console.log('💡 Compare this with modern-module-pattern.js to see the advantages!');

    return 'Module Pattern WITHOUT WeakMap examples completed! Check the console to see the problems.';
}

