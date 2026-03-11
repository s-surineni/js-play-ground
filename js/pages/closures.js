// Closures page JavaScript
import { closuresExample } from '../concepts/closures.js';
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
window.runClosuresExample = () => {
  logger.info("Starting Closures Example", "closures");
  console.log("Running Closures Example...");
  const result = closuresExample();
  updateOutput("closures-output", result);
  logger.info("Closures Example completed", "closures", { result });
};

// Initialize the page
console.log("🔒 Closures page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Closures page initialized", "system");
