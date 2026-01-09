const _privateCount = new WeakMap();

class CounterModule {
    constructor() {
        _privateCount.set(this, 0);
    }
    increment() {
        _privateCount.set(this, _privateCount.get(this) + 1);
    }
    decrement() {
        _privateCount.set(this, _privateCount.get(this) - 1);
    }
    getCount() {
        return _privateCount.get(this);
    }
}

const moduleA = new CounterModule();

moduleA.increment();
console.log(moduleA.getCount());
moduleA.decrement();
console.log(moduleA.getCount());