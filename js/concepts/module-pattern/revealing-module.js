const ClassicCart = (function () {
    const items = [10, 20, 30];

    return {
        // === PROBLEM 1: Object Literal Syntax ===
        // You are forced to write code in "key: value" format,
        // which feels different than standard function definitions.
        getTotal: function () {
            return items.reduce((a, b) => a + b, 0);
        },

        checkout: function () {
            console.log("Processing payment...");

            // === PROBLEM 2: Dependency on "this" ===
            // We cannot just call getTotal(). We MUST use 'this.getTotal()'.
            // If we copy this function to another object, 'this' might change context.
            const total = this.getTotal();

            console.log("Charged: $" + total);
        }
    };
})();

ClassicCart.checkout(); // Works: "Charged: $60"

// === PROBLEM 3: Fragility ===
// If we rename 'getTotal' to 'calcSum' later...
ClassicCart.calcSum = ClassicCart.getTotal;
delete ClassicCart.getTotal;

// This now CRASHES because 'checkout' is still trying to call 'this.getTotal()'
// ClassicCart.checkout(); // ❌ TypeError: this.getTotal is not a function


const RevealingCart = (function () {
    const items = [10, 20, 30];

    // === SOLUTION 1: Standard Syntax ===
    // We define functions normally. No "key: value" awkwardness.
    function getTotal() {
        return items.reduce((a, b) => a + b, 0);
    }

    function checkout() {
        console.log("Processing payment...");

        // === SOLUTION 2: Direct References ===
        // We call 'getTotal()' directly.
        // We don't care about 'this' or what the public name is.
        const total = getTotal();

        console.log("Charged: $" + total);
    }

    // === SOLUTION 3: The Reveal ===
    // We map public names to private pointers.
    return {
        sum: getTotal,    // We can rename the public API to 'sum'...
        buy: checkout     // ...and rename 'checkout' to 'buy'...
    };
})();

RevealingCart.buy(); // Works: "Charged: $60"

// Even if we mess with the public object, the internal link is unbreakable
// because 'checkout' captured 'getTotal' via closure, not via 'this'.
const stolenBuyMethod = RevealingCart.buy;
stolenBuyMethod(); // ✅ Still works! (In the classic pattern, this would fail)

const Robot = (function () {
    // 1. Private/Internal definitions
    function getName() {
        return "Wall-E";
    }

    function greet() {
        // 🔒 LOCKED REFERENCE: 
        // This calls the local 'getName' function directly.
        // It does NOT check 'Robot.getName'.
        const name = getName();
        console.log("Hello, I am " + name);
    }

    // 2. The Reveal
    return {
        getName: getName,
        greet: greet
    };
})();

// --- SCENARIO: We want to patch the name ---

// Initial behavior
Robot.greet(); // Output: "Hello, I am Wall-E"

// ❌ WE TRY TO PATCH IT
// We overwrite the public 'getName' method with a new one.
Robot.getName = function () {
    return "Terminator";
};

// We verify the patch works directly:
console.log(Robot.getName()); // Output: "Terminator" (The patch looks successful)

// 💥 BUT HERE IS THE FAILURE:
// When we call 'greet', it still uses the OLD internal 'getName'.
Robot.greet(); // Output: "Hello, I am Wall-E"