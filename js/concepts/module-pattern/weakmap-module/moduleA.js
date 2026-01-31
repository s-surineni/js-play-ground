// moduleA.js
import { increment } from './state.js';

export const actionA = () => {
  console.log("Module A is incrementing...");
  increment();
};