// DOM page JavaScript
import { domExample } from '../concepts/dom.js';
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
window.runDOMExample = () => {
  logger.info("Starting DOM Example", "dom");
  console.log("Running DOM Example...");
  const result = domExample();
  updateOutput("dom-output", result);
  logger.info("DOM Example completed", "dom", { result });
};

// Initialize the page
console.log("🎨 DOM Manipulation page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("DOM Manipulation page initialized", "system");
