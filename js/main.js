// Main JavaScript file for the learning playground
import { variablesExample } from './concepts/variables.js';
import { functionsExample } from './concepts/functions.js';
import { arraysExample } from './concepts/arrays.js';
import { asyncExample } from './concepts/async.js';
import { domExample } from './concepts/dom.js';
import { closuresExample } from "./concepts/closures.js";
import { promisesExample } from "./concepts/promises.js";
import { modernModulePatternExample } from "./concepts/modern-module-pattern.js";
import { logger } from "./utils/logger.js";

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

window.runFunctionsExample = () => {
  logger.info("Starting Functions Example", "functions");
  console.log("Running Functions Example...");
  const result = functionsExample();
  updateOutput("functions-output", result);
  logger.info("Functions Example completed", "functions", { result });
};

window.runArraysExample = () => {
  logger.info("Starting Arrays Example", "arrays");
  console.log("Running Arrays Example...");
  const result = arraysExample();
  updateOutput("arrays-output", result);
  logger.info("Arrays Example completed", "arrays", { result });
};

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

window.runDOMExample = () => {
  logger.info("Starting DOM Example", "dom");
  console.log("Running DOM Example...");
  const result = domExample();
  updateOutput("dom-output", result);
  logger.info("DOM Example completed", "dom", { result });
};

window.runClosuresExample = () => {
  logger.info("Starting Closures Example", "closures");
  console.log("Running Closures Example...");
  const result = closuresExample();
  updateOutput("closures-output", result);
  logger.info("Closures Example completed", "closures", { result });
};

window.runPromisesExample = () => {
  logger.info("Starting Promises Example", "promises");
  console.log("Running Promises Example...");
  const result = promisesExample();
  updateOutput("promises-output", result);
  logger.info("Promises Example completed", "promises", { result });
};

window.runModernModulePatternExample = () => {
  logger.info("Starting Modern Module Pattern Example", "modern-module-pattern");
  console.log("Running Modern Module Pattern Example...");
  const result = modernModulePatternExample();
  updateOutput("modern-module-pattern-output", result);
  logger.info("Modern Module Pattern Example completed", "modern-module-pattern", { result });
};

window.runFetchUserData = async () => {
  logger.info("Starting Fetch User Data", "promises");
  console.log("Running Fetch User Data...");
  try {
    if (typeof window.fetchUserData !== "function") {
      throw new Error(
        "fetchUserData function not available. Please run the Promises Example first."
      );
    }
    const result = await window.fetchUserData();
    updateOutput(
      "promises-output",
      `User Data: ${result.name} - ${result.email}`
    );
    logger.info("Fetch User Data completed", "promises", { result });
  } catch (error) {
    logger.error("Fetch User Data failed", "promises", {
      error: error.message,
    });
    updateOutput("promises-output", `Error: ${error.message}`);
  }
};

window.runFetchMultipleData = async () => {
  logger.info("Starting Fetch Multiple Data", "promises");
  console.log("Running Fetch Multiple Data...");
  try {
    if (typeof window.fetchMultipleData !== "function") {
      throw new Error(
        "fetchMultipleData function not available. Please run the Promises Example first."
      );
    }
    const result = await window.fetchMultipleData();
    updateOutput(
      "promises-output",
      `Multiple Data: Post - ${
        result.userData.title
      }, Cat Fact - ${result.catFact.fact.substring(
        0,
        50
      )}..., Quote - ${result.quote.content.substring(0, 50)}...`
    );
    logger.info("Fetch Multiple Data completed", "promises", { result });
  } catch (error) {
    logger.error("Fetch Multiple Data failed", "promises", {
      error: error.message,
    });
    updateOutput("promises-output", `Error: ${error.message}`);
  }
};

window.runChainAPICalls = async () => {
  logger.info("Starting Chain API Calls", "promises");
  console.log("Running Chain API Calls...");
  try {
    if (typeof window.chainAPICalls !== "function") {
      throw new Error(
        "chainAPICalls function not available. Please run the Promises Example first."
      );
    }
    const result = await window.chainAPICalls();
    updateOutput(
      "promises-output",
      `Chained API: User - ${result.user.name}, Posts - ${result.posts.length}, Comments - ${result.comments.length}`
    );
    logger.info("Chain API Calls completed", "promises", { result });
  } catch (error) {
    logger.error("Chain API Calls failed", "promises", {
      error: error.message,
    });
    updateOutput("promises-output", `Error: ${error.message}`);
  }
};


// Logger control functions
window.clearAllLogs = () => {
  logger.clear();
  logger.info("All logs cleared", "system");
};

window.exportAllLogs = () => {
  const logs = logger.exportLogs();
  const blob = new Blob([logs], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `logs-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  logger.info("Logs exported", "system", { logCount: logger.getLogs().length });
};

// Add logger controls to the page
function addLoggerControls() {
  const controlsHTML = `
    <div class="logger-controls">
      <button onclick="clearAllLogs()" class="clear-logs">Clear All Logs</button>
      <button onclick="exportAllLogs()" class="export-logs">Export Logs</button>
    </div>
  `;

  // Add controls to the footer
  const footer = document.querySelector("footer");
  if (footer) {
    footer.insertAdjacentHTML("beforeend", controlsHTML);
  }
}

// Initialize the playground
console.log("🚀 JavaScript Learning Playground loaded!");
console.log("💡 Open the console (F12) to see detailed output");
console.log("🔧 Edit the JavaScript files to see live changes!");

// Initialize logger and add controls
logger.info("JavaScript Learning Playground initialized", "system");
addLoggerControls();

