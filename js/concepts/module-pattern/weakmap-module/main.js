import { actionA } from './moduleA.js';
import { actionB } from './moduleB.js';

actionA(); // Output: "Module A is incrementing..." -> "Count is now: 1"
actionB(); // Output: "Module B sees the count as: 1" -> "Count is now: 2"