// no this
// no prototype

function simplePrivate() {
    let privateData = [];

    return {
        add: function(item) {
            privateData.push(item);
        },
        get: function() {
            return privateData;
        }
    }
}

const myModule = simplePrivate();
console.log(myModule.get());
myModule.add('item1');
console.log(myModule.get());
myModule.add('item2');
console.log(myModule.get());

const myModule2 = new simplePrivate();
console.log(myModule2.get());
myModule2.add('item1');
console.log(myModule2.get());
myModule2.add('item2');
console.log(myModule2.get());

function simplePrivatePrototype() {
    let privateData = [];

    simplePrivatePrototype.prototype.add = function(item) {
        privateData.push(item);
    }
    simplePrivatePrototype.prototype.get = function() {
        return privateData;
    }
    // Don't return the constructor - let `new` return the instance
}

const myModule3 = new simplePrivatePrototype();

console.log("myModule3", myModule3.get());
myModule3.add('item1');
console.log("myModule3", myModule3.get());
myModule3.add('item2');
console.log("myModule3", myModule3.get());

const myModule4 = new simplePrivatePrototype();
console.log("myModule3", myModule3.get());
console.log("myModule4", myModule4.get());
myModule4.add('item1');
console.log("myModule4", myModule4.get());
myModule4.add('item2');
console.log("myModule4", myModule4.get());


const simplePrivateClosure = (function() {
    let privateData = new Map();

    function simplePrivateClosure() {
        privateData.set(this, []);
    }

    simplePrivateClosure.prototype.add = function(item) {
        privateData.get(this).push(item);
    }
    simplePrivateClosure.prototype.get = function() {
        return privateData.get(this);
    }
    return simplePrivateClosure;
})();

const myModule5 = new simplePrivateClosure();
console.log("myModule5", myModule5.get());
myModule5.add('item1');
console.log("myModule5", myModule5.get());
myModule5.add('item2');
console.log("myModule5", myModule5.get());

const myModule6 = new simplePrivateClosure();
console.log("myModule6", myModule6.get());
myModule6.add('item1');
console.log("myModule6", myModule6.get());
myModule6.add('item2');
console.log("myModule6", myModule6.get());