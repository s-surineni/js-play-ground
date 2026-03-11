// Variables page JavaScript
import { variablesExample } from '../concepts/variables.js';
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
window.runVariablesExample = () => {
  logger.info("Starting Variables Example", "variables");
  console.log("Running Variables Example...");
  const result = variablesExample();
  updateOutput("variables-output", result);
  logger.info("Variables Example completed", "variables", { result });
};

// Initialize the page
console.log("📊 Variables & Data Types page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Variables & Data Types page initialized", "system");
