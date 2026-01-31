// state.js
// This variable is private to the module but shared via the functions below
let count = 0;

export const increment = () => {
  count++;
  console.log(`Count is now: ${count}`);
};

export const getCount = () => count;