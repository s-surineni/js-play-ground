// Functions page JavaScript
import { functionsExample } from '../concepts/functions.js';
import { logger } from '../utils/logger.js';

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
window.runFunctionsExample = () => {
  logger.info("Starting Functions Example", "functions");
  console.log("Running Functions Example...");
  const result = functionsExample();
  updateOutput("functions-output", result);
  logger.info("Functions Example completed", "functions", { result });
};

// Initialize the page
console.log("⚡ Functions page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Functions page initialized", "system");
