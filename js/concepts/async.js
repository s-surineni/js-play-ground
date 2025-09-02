// Async Programming Examples
export async function asyncExample() {
    let output = '=== ASYNC & PROMISES ===\n\n';
    
    // 1. Callbacks (old way)
    output += '1. Callbacks (Old Way):\n';
    
    function simulateAsyncOperation(callback, delay = 1000) {
        setTimeout(() => {
            callback(`Operation completed after ${delay}ms`);
        }, delay);
    }
    
    // This would normally be async, but we'll simulate it
    output += '   Simulating async operation with callback...\n';
    
    // 2. Promises
    output += '\n2. Promises:\n';
    
    function createPromise(shouldResolve = true, delay = 500) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldResolve) {
                    resolve(`Promise resolved after ${delay}ms`);
                } else {
                    reject(new Error(`Promise rejected after ${delay}ms`));
                }
            }, delay);
        });
    }
    
    // Promise that resolves
    try {
        const result = await createPromise(true, 100);
        output += `   Resolved promise: ${result}\n`;
    } catch (error) {
        output += `   Error: ${error.message}\n`;
    }
    
    // Promise that rejects
    try {
        await createPromise(false, 100);
    } catch (error) {
        output += `   Rejected promise: ${error.message}\n`;
    }
    
    // 3. Promise methods
    output += '\n3. Promise Methods:\n';
    
    // Promise.all
    const promises = [
        createPromise(true, 200),
        createPromise(true, 300),
        createPromise(true, 100)
    ];
    
    try {
        const allResults = await Promise.all(promises);
        output += `   Promise.all results: ${JSON.stringify(allResults)}\n`;
    } catch (error) {
        output += `   Promise.all error: ${error.message}\n`;
    }
    
    // Promise.race
    try {
        const raceResult = await Promise.race([
            createPromise(true, 500),
            createPromise(true, 100)
        ]);
        output += `   Promise.race result: ${raceResult}\n`;
    } catch (error) {
        output += `   Promise.race error: ${error.message}\n`;
    }
    
    // 4. Async/Await
    output += '\n4. Async/Await:\n';
    
    async function fetchUserData(userId) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));
        return {
            id: userId,
            name: `User ${userId}`,
            email: `user${userId}@example.com`
        };
    }
    
    async function fetchUserPosts(userId) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 150));
        return [
            { id: 1, title: `Post 1 by User ${userId}` },
            { id: 2, title: `Post 2 by User ${userId}` }
        ];
    }
    
    try {
        const user = await fetchUserData(1);
        const posts = await fetchUserPosts(1);
        
        output += `   User: ${JSON.stringify(user)}\n`;
        output += `   Posts: ${JSON.stringify(posts)}\n`;
    } catch (error) {
        output += `   Error fetching data: ${error.message}\n`;
    }
    
    // 5. Parallel execution
    output += '\n5. Parallel Execution:\n';
    
    try {
        const startTime = Date.now();
        
        const [user1, user2] = await Promise.all([
            fetchUserData(1),
            fetchUserData(2)
        ]);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output += `   Parallel fetch duration: ${duration}ms\n`;
        output += `   User 1: ${user1.name}\n`;
        output += `   User 2: ${user2.name}\n`;
    } catch (error) {
        output += `   Parallel execution error: ${error.message}\n`;
    }
    
    // 6. Error handling with async/await
    output += '\n6. Error Handling:\n';
    
    async function riskyOperation() {
        const random = Math.random();
        if (random < 0.5) {
            throw new Error('Random failure occurred');
        }
        return 'Operation succeeded';
    }
    
    try {
        const result = await riskyOperation();
        output += `   Risky operation: ${result}\n`;
    } catch (error) {
        output += `   Risky operation failed: ${error.message}\n`;
    }
    
    // 7. Real-world example: Fetching data
    output += '\n7. Real-world Example:\n';
    
    async function simulateDataFetch() {
        output += '   Simulating real-world data fetching...\n';
        
        // Simulate multiple API calls
        const results = await Promise.allSettled([
            fetchUserData(1),
            fetchUserData(999), // This might fail
            fetchUserPosts(1)
        ]);
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                output += `   API call ${index + 1}: Success\n`;
            } else {
                output += `   API call ${index + 1}: Failed - ${result.reason.message}\n`;
            }
        });
    }
    
    await simulateDataFetch();
    
    return output;
}

