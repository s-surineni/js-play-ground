// closure module with counter and increment and decrement methods

const counterModule = (function() {
    let count = 0;

    return {
        increment: function() {
            count++;
        },
        decrement: function() {
            count--;
        },
        getCount: function() {
            return count;
        },
    }
})();

counterModule.increment();
console.log(counterModule.getCount());
counterModule.decrement();
console.log(counterModule.getCount());
counterModule.count = 10;
console.log(counterModule.getCount());