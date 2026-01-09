// basic obect module with counter and increment and decrement methods

const counterModule = {
    count: 0,
    increment: function() {
        this.count++;
    },
    decrement: function() {
        this.count--;
    },
}

counterModule.increment();
console.log(counterModule.count);
counterModule.decrement();
console.log(counterModule.count);
counterModule.count = 10;
console.log(counterModule.count);