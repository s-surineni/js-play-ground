/**
 * JavaScript Promises - Comprehensive Guide and Examples
 * 
 * A Promise is an object representing the eventual completion or failure of an asynchronous operation.
 * It provides a cleaner way to handle asynchronous code compared to callbacks.
 */

import { logger } from '../utils/logger.js';

export function promisesExample() {
    logger.info('Starting JavaScript Promises - Complete Guide', 'promises');
    console.log('=== JavaScript Promises - Complete Guide ===\n');

    // ============================================================================
    // 1. BASIC PROMISE CREATION AND USAGE
    // ============================================================================

    logger.info('Demonstrating basic promise creation', 'promises');
    console.log('1. Basic Promise Creation:');

    // Creating a simple promise
    const basicPromise = new Promise((resolve, reject) => {
        const success = true; // Simulate some condition
        
        if (success) {
            resolve('Promise resolved successfully!');
        } else {
            reject('Promise rejected!');
        }
    });

    // Using the promise
    basicPromise
        .then(result => {
            logger.info('Basic promise resolved', 'promises', { result });
            console.log('Success:', result);
        })
        .catch(error => {
            logger.error('Basic promise rejected', 'promises', { error });
            console.log('Error:', error);
        });

    console.log();

    // ============================================================================
    // 2. PROMISE STATES AND LIFECYCLE
    // ============================================================================

    console.log('2. Promise States:');

    // Pending state
    const pendingPromise = new Promise((resolve, reject) => {
        console.log('Promise is in pending state');
        // Don't resolve or reject immediately
    });

    // Fulfilled state
    const fulfilledPromise = Promise.resolve('This promise is fulfilled');
    fulfilledPromise.then(value => {
        console.log('Fulfilled promise value:', value);
    });

    // Rejected state
    const rejectedPromise = Promise.reject('This promise is rejected');
    rejectedPromise.catch(error => {
        console.log('Rejected promise error:', error);
    });

    console.log();

    // ============================================================================
    // 3. PROMISE CHAINING
    // ============================================================================

    console.log('3. Promise Chaining:');

    const chainedPromise = Promise.resolve(10)
        .then(value => {
            console.log('Step 1 - Initial value:', value);
            return value * 2; // Return value for next .then()
        })
        .then(value => {
            console.log('Step 2 - Doubled value:', value);
            return value + 5; // Return value for next .then()
        })
        .then(value => {
            console.log('Step 3 - Final value:', value);
            return value;
        })
        .catch(error => {
            console.log('Error in chain:', error);
        });

    console.log();

    // ============================================================================
    // 4. ASYNC/AWAIT SYNTAX
    // ============================================================================

    console.log('4. Async/Await Syntax:');

    // Simulate an async operation
    function simulateAsyncOperation(data, delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Processed: ${data}`);
            }, delay);
        });
    }

    // Using async/await
    async function asyncExample() {
        try {
            console.log('Starting async operation...');
            const result1 = await simulateAsyncOperation('Data 1', 100);
            console.log('Result 1:', result1);
            
            const result2 = await simulateAsyncOperation('Data 2', 200);
            console.log('Result 2:', result2);
            
            return 'All operations completed';
        } catch (error) {
            console.log('Error in async function:', error);
            throw error;
        }
    }

    // Call the async function
    asyncExample().then(result => {
        console.log('Async function result:', result);
    });

    console.log();

    // ============================================================================
    // 5. PROMISE.ALL() - PARALLEL EXECUTION
    // ============================================================================

    console.log('5. Promise.all() - Parallel Execution:');

    const promise1 = simulateAsyncOperation('Task 1', 300);
    const promise2 = simulateAsyncOperation('Task 2', 200);
    const promise3 = simulateAsyncOperation('Task 3', 100);

    Promise.all([promise1, promise2, promise3])
        .then(results => {
            console.log('All promises resolved:', results);
        })
        .catch(error => {
            console.log('One or more promises rejected:', error);
        });

    console.log();

    // ============================================================================
    // 6. PROMISE.ALLSETTLED() - WAIT FOR ALL TO COMPLETE
    // ============================================================================

    console.log('6. Promise.allSettled() - Wait for All:');

    const mixedPromises = [
        Promise.resolve('Success 1'),
        Promise.reject('Error 1'),
        Promise.resolve('Success 2'),
        Promise.reject('Error 2')
    ];

    Promise.allSettled(mixedPromises)
        .then(results => {
            console.log('All promises settled:');
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    console.log(`Promise ${index + 1}: Fulfilled with`, result.value);
                } else {
                    console.log(`Promise ${index + 1}: Rejected with`, result.reason);
                }
            });
        });

    console.log();

    // ============================================================================
    // 7. PROMISE.RACE() - FIRST TO COMPLETE
    // ============================================================================

    console.log('7. Promise.race() - First to Complete:');

    const racePromise1 = new Promise(resolve => setTimeout(() => resolve('Fast promise'), 100));
    const racePromise2 = new Promise(resolve => setTimeout(() => resolve('Slow promise'), 500));

    Promise.race([racePromise1, racePromise2])
        .then(result => {
            console.log('Race winner:', result);
        });

    console.log();

    // ============================================================================
    // 8. PROMISE.ANY() - FIRST TO FULFILL
    // ============================================================================

    console.log('8. Promise.any() - First to Fulfill:');

    const anyPromise1 = Promise.reject('Error 1');
    const anyPromise2 = new Promise(resolve => setTimeout(() => resolve('Success 1'), 200));
    const anyPromise3 = Promise.reject('Error 2');

    Promise.any([anyPromise1, anyPromise2, anyPromise3])
        .then(result => {
            console.log('First fulfilled promise:', result);
        })
        .catch(error => {
            console.log('All promises rejected:', error);
        });

    console.log();

    // ============================================================================
    // 9. ERROR HANDLING PATTERNS
    // ============================================================================

    console.log('9. Error Handling Patterns:');

    // Pattern 1: .catch() at the end
    function errorHandlingPattern1() {
        return simulateAsyncOperation('Data', 100)
            .then(result => {
                if (result.includes('error')) {
                    throw new Error('Simulated error');
                }
                return result;
            })
            .catch(error => {
                console.log('Pattern 1 - Caught error:', error.message);
                return 'Default value';
            });
    }

    // Pattern 2: try/catch with async/await
    async function errorHandlingPattern2() {
        try {
            const result = await simulateAsyncOperation('Data', 100);
            if (result.includes('error')) {
                throw new Error('Simulated error');
            }
            return result;
        } catch (error) {
            console.log('Pattern 2 - Caught error:', error.message);
            return 'Default value';
        }
    }

    // Pattern 3: Multiple catch blocks
    function errorHandlingPattern3() {
        return simulateAsyncOperation('Data', 100)
            .then(result => {
                throw new Error('Network error');
            })
            .catch(error => {
                if (error.message === 'Network error') {
                    console.log('Pattern 3 - Network error handled');
                    return 'Retry with fallback';
                }
                throw error; // Re-throw if not handled
            })
            .catch(error => {
                console.log('Pattern 3 - Final catch:', error.message);
            });
    }

    errorHandlingPattern1();
    errorHandlingPattern2();
    errorHandlingPattern3();

    console.log();

    // ============================================================================
    // 10. REAL-WORLD EXAMPLES
    // ============================================================================

    console.log('10. Real-World Examples:');

    // Example 1: API Call Simulation
    function fetchUserData(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId > 0) {
                    resolve({
                        id: userId,
                        name: `User ${userId}`,
                        email: `user${userId}@example.com`
                    });
                } else {
                    reject(new Error('Invalid user ID'));
                }
            }, 200);
        });
    }

    // Example 2: File Processing Simulation
    function processFile(filename) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (filename.endsWith('.txt')) {
                    resolve(`Processed ${filename}`);
                } else {
                    reject(new Error('Unsupported file type'));
                }
            }, 150);
        });
    }

    // Example 3: Database Operation Simulation
    function saveToDatabase(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data && data.name) {
                    resolve({ id: Math.random(), ...data });
                } else {
                    reject(new Error('Invalid data'));
                }
            }, 100);
        });
    }

    // Chaining real-world operations
    async function realWorldExample() {
        try {
            console.log('Starting real-world example...');
            
            // Fetch user data
            const user = await fetchUserData(1);
            console.log('User fetched:', user);
            
            // Process a file
            const processedFile = await processFile('document.txt');
            console.log('File processed:', processedFile);
            
            // Save to database
            const savedData = await saveToDatabase({ name: user.name, file: processedFile });
            console.log('Data saved:', savedData);
            
            return 'All operations completed successfully';
        } catch (error) {
            console.log('Error in real-world example:', error.message);
            throw error;
        }
    }

    realWorldExample();

    console.log();

    // ============================================================================
    // 11. PROMISE UTILITIES AND HELPERS
    // ============================================================================

    console.log('11. Promise Utilities:');

    // Utility: Delay function
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Utility: Timeout wrapper
    function withTimeout(promise, timeoutMs) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
        });
        
        return Promise.race([promise, timeoutPromise]);
    }

    // Utility: Retry mechanism
    async function retry(fn, maxAttempts = 3, delayMs = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error.message);
                if (attempt === maxAttempts) {
                    throw error;
                }
                await delay(delayMs);
            }
        }
    }

    // Example usage of utilities
    const flakyOperation = () => {
        return new Promise((resolve, reject) => {
            const success = Math.random() > 0.5; // 50% chance of success
            setTimeout(() => {
                if (success) {
                    resolve('Operation succeeded');
                } else {
                    reject(new Error('Operation failed'));
                }
            }, 100);
        });
    };

    retry(flakyOperation, 3, 200)
        .then(result => {
            logger.info('Retry operation succeeded', 'promises', { result });
            console.log('Retry success:', result);
        })
        .catch(error => {
            logger.error('Retry operation failed after all attempts', 'promises', { error: error.message });
            console.log('Retry failed after all attempts:', error.message);
        });

    console.log();

    // ============================================================================
    // 12. COMMON PROMISE ANTI-PATTERNS
    // ============================================================================

    console.log('12. Common Anti-patterns:');

    // Anti-pattern 1: Promise constructor anti-pattern
    function antiPattern1() {
        // DON'T DO THIS - wrapping a promise-returning function
        return new Promise((resolve, reject) => {
            simulateAsyncOperation('data', 100)
                .then(resolve)
                .catch(reject);
        });
    }

    // Better approach
    function betterApproach1() {
        return simulateAsyncOperation('data', 100);
    }

    // Anti-pattern 2: Not handling errors
    function antiPattern2() {
        // DON'T DO THIS - unhandled promise rejection
        simulateAsyncOperation('data', 100)
            .then(result => {
                if (result.includes('error')) {
                    throw new Error('Error occurred');
                }
                console.log('Success:', result);
            });
        // Missing .catch() - this will cause unhandled promise rejection
    }

    // Better approach
    function betterApproach2() {
        return simulateAsyncOperation('data', 100)
            .then(result => {
                if (result.includes('error')) {
                    throw new Error('Error occurred');
                }
                console.log('Success:', result);
            })
            .catch(error => {
                console.log('Error handled:', error.message);
            });
    }

    // Anti-pattern 3: Nested promises (callback hell with promises)
    function antiPattern3() {
        // DON'T DO THIS - nested promises
        simulateAsyncOperation('data1', 100)
            .then(result1 => {
                simulateAsyncOperation('data2', 100)
                    .then(result2 => {
                        simulateAsyncOperation('data3', 100)
                            .then(result3 => {
                                console.log('All results:', result1, result2, result3);
                            });
                    });
            });
    }

    // Better approach
    async function betterApproach3() {
        try {
            const result1 = await simulateAsyncOperation('data1', 100);
            const result2 = await simulateAsyncOperation('data2', 100);
            const result3 = await simulateAsyncOperation('data3', 100);
            console.log('All results:', result1, result2, result3);
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

    console.log('Anti-patterns demonstrated. Check console for better approaches.');
    console.log();

    logger.info('Promises examples completed successfully', 'promises');
    console.log('\n=== End of Promises Examples ===');
    
    return 'Promises examples completed! Check the console and HTML logs for detailed output.';
}
