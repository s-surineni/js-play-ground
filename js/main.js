// Main JavaScript file for the learning playground
import { variablesExample } from './concepts/variables.js';
import { functionsExample } from './concepts/functions.js';
import { arraysExample } from './concepts/arrays.js';
import { asyncExample } from './concepts/async.js';
import { domExample } from './concepts/dom.js';
import { closuresExample } from "./concepts/closures.js";

// Utility function to update output with animation
function updateOutput(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = content;
    element.classList.add("updated");

    // Remove animation class after animation completes
    setTimeout(() => {
      element.classList.remove("updated");
    }, 500);
  }
}

// Global functions for HTML onclick handlers
window.runVariablesExample = () => {
  console.log("Running Variables Example...");
  const result = variablesExample();
  updateOutput("variables-output", result);
};

window.runFunctionsExample = () => {
  console.log("Running Functions Example...");
  const result = functionsExample();
  updateOutput("functions-output", result);
};

window.runArraysExample = () => {
  console.log("Running Arrays Example...");
  const result = arraysExample();
  updateOutput("arrays-output", result);
};

window.runAsyncExample = async () => {
  console.log("Running Async Example...");
  const result = await asyncExample();
  updateOutput("async-output", result);
};

window.runDOMExample = () => {
  console.log("Running DOM Example...");
  const result = domExample();
  updateOutput("dom-output", result);
};

window.runClosuresExample = () => {
  console.log("Running Closures Example...");
  const result = closuresExample();
  updateOutput("closures-output", result);
};

// Initialize the playground
console.log('🚀 JavaScript Learning Playground loaded!');
console.log('💡 Open the console (F12) to see detailed output');
console.log('🔧 Edit the JavaScript files to see live changes!');

