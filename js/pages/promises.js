// Promises page JavaScript
import { promisesExample } from '../concepts/promises.js';
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
window.runPromisesExample = () => {
  logger.info("Starting Promises Example", "promises");
  console.log("Running Promises Example...");
  const result = promisesExample();
  updateOutput("promises-output", result);
  logger.info("Promises Example completed", "promises", { result });
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

// Initialize the page
console.log("🎯 Promises page loaded!");
console.log("💡 Open the console (F12) to see detailed output!");
logger.info("Promises page initialized", "system");
