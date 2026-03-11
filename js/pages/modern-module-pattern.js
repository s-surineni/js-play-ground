// Modern Module Pattern page JavaScript
import { modernModulePatternExample } from '../concepts/modern-module-pattern.js';
import { moduleWithoutWeakMapExample } from '../concepts/module-without-weakmap.js';
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
window.runModernModulePatternExample = () => {
  logger.info("Starting Modern Module Pattern Example", "modern-module-pattern");
  console.log("Running Modern Module Pattern Example...");
  const result = modernModulePatternExample();
  updateOutput("modern-module-pattern-output", result);
  logger.info("Modern Module Pattern Example completed", "modern-module-pattern", { result });
};

window.runModuleWithoutWeakMapExample = () => {
  logger.info("Starting Module Without WeakMap Example", "module-without-weakmap");
  console.log("Running Module Without WeakMap Example...");
  const result = moduleWithoutWeakMapExample();
  updateOutput("module-without-weakmap-output", result);
  logger.info("Module Without WeakMap Example completed", "module-without-weakmap", { result });
};

// Initialize the page
console.log("🏗️ Modern Module Pattern page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Modern Module Pattern page initialized", "system");
