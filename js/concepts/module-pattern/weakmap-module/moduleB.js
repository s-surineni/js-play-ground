// moduleB.js
import { getCount, increment } from './state.js';

export const actionB = () => {
  console.log(`Module B sees the count as: ${getCount()}`);
  increment();
};