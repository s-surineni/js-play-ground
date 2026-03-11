// Async page JavaScript
import { asyncExample } from '../concepts/async.js';
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
window.runAsyncExample = async () => {
  logger.info("Starting Async Example", "async");
  console.log("Running Async Example...");
  try {
    const result = await asyncExample();
    updateOutput("async-output", result);
    logger.info("Async Example completed", "async", { result });
  } catch (error) {
    logger.error("Async Example failed", "async", { error: error.message });
    updateOutput("async-output", `Error: ${error.message}`);
  }
};

// Initialize the page
console.log("⏱️ Async & Promises page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Async & Promises page initialized", "system");
