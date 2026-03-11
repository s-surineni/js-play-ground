// Arrays page JavaScript
import { arraysExample } from '../concepts/arrays.js';
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
window.runArraysExample = () => {
  logger.info("Starting Arrays Example", "arrays");
  console.log("Running Arrays Example...");
  const result = arraysExample();
  updateOutput("arrays-output", result);
  logger.info("Arrays Example completed", "arrays", { result });
};

// Initialize the page
console.log("📚 Arrays & Objects page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Arrays & Objects page initialized", "system");
