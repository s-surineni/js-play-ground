/**
 * Logger Utility Module
 * 
 * Provides logging functionality that outputs to both console and HTML
 * Supports different log levels and can be configured per section
 */

class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 100; // Maximum number of logs to keep in memory
    }

    /**
     * Add a log entry with timestamp and level
     * @param {string} level - Log level (info, warn, error, debug)
     * @param {string} message - Log message
     * @param {string} section - Optional section identifier
     * @param {any} data - Optional additional data
     */
    log(level, message, section = 'general', data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            section,
            data
        };

        // Add to logs array
        this.logs.push(logEntry);
        
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Console logging with colors
        this.logToConsole(logEntry);
        
        // HTML logging
        this.logToHTML(logEntry);
    }

    /**
     * Log to console with appropriate styling
     * @param {Object} logEntry - Log entry object
     */
    logToConsole(logEntry) {
        const { timestamp, level, message, section, data } = logEntry;
        const timeStr = new Date(timestamp).toLocaleTimeString();
        const prefix = `[${timeStr}] [${level.toUpperCase()}] [${section}]`;
        
        // Console styling based on level
        const styles = {
            info: 'color: #2196F3; font-weight: bold;',
            warn: 'color: #FF9800; font-weight: bold;',
            error: 'color: #F44336; font-weight: bold;',
            debug: 'color: #9C27B0; font-weight: bold;'
        };

        if (data) {
            console.log(`%c${prefix} ${message}`, styles[level] || '', data);
        } else {
            console.log(`%c${prefix} ${message}`, styles[level] || '');
        }
    }

    /**
     * Log to HTML output area
     * @param {Object} logEntry - Log entry object
     */
    logToHTML(logEntry) {
        const { timestamp, level, message, section, data } = logEntry;
        const timeStr = new Date(timestamp).toLocaleTimeString();
        
        // Create log element
        const logElement = document.createElement('div');
        logElement.className = `log-entry log-${level}`;
        
        // Format the log message
        let logText = `[${timeStr}] [${level.toUpperCase()}] [${section}] ${message}`;
        if (data) {
            logText += `\nData: ${JSON.stringify(data, null, 2)}`;
        }
        
        logElement.textContent = logText;
        
        // Add to appropriate section or create a general log area
        this.addToHTMLOutput(logElement, section);
    }

    /**
     * Add log element to HTML output
     * @param {HTMLElement} logElement - The log element to add
     * @param {string} section - Section identifier
     */
    addToHTMLOutput(logElement, section) {
        // Try to find existing log container for this section
        let logContainer = document.getElementById(`${section}-logs`);
        
        if (!logContainer) {
            // Create new log container
            logContainer = document.createElement('div');
            logContainer.id = `${section}-logs`;
            logContainer.className = 'log-container';
            logContainer.innerHTML = `<h4>Logs for ${section}</h4>`;
            
            // Try to add to the section's output area
            const sectionOutput = document.getElementById(`${section}-output`);
            if (sectionOutput) {
                sectionOutput.appendChild(logContainer);
            } else {
                // Fallback: add to body or create a general logs area
                let generalLogs = document.getElementById('general-logs');
                if (!generalLogs) {
                    generalLogs = document.createElement('div');
                    generalLogs.id = 'general-logs';
                    generalLogs.className = 'log-container';
                    generalLogs.innerHTML = '<h4>General Logs</h4>';
                    document.body.appendChild(generalLogs);
                }
                generalLogs.appendChild(logContainer);
            }
        }
        
        // Add the log entry
        logContainer.appendChild(logElement);
        
        // Auto-scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
        
        // Limit number of log entries in HTML (keep last 20)
        const entries = logContainer.querySelectorAll('.log-entry');
        if (entries.length > 20) {
            entries[0].remove();
        }
    }

    /**
     * Convenience methods for different log levels
     */
    info(message, section = 'general', data = null) {
        this.log('info', message, section, data);
    }

    warn(message, section = 'general', data = null) {
        this.log('warn', message, section, data);
    }

    error(message, section = 'general', data = null) {
        this.log('error', message, section, data);
    }

    debug(message, section = 'general', data = null) {
        this.log('debug', message, section, data);
    }

    /**
     * Clear all logs
     */
    clear() {
        this.logs = [];
        // Clear HTML logs
        const logContainers = document.querySelectorAll('.log-container');
        logContainers.forEach(container => {
            const entries = container.querySelectorAll('.log-entry');
            entries.forEach(entry => entry.remove());
        });
    }

    /**
     * Get all logs
     * @returns {Array} Array of log entries
     */
    getLogs() {
        return [...this.logs];
    }

    /**
     * Get logs for a specific section
     * @param {string} section - Section identifier
     * @returns {Array} Array of log entries for the section
     */
    getLogsForSection(section) {
        return this.logs.filter(log => log.section === section);
    }

    /**
     * Export logs as JSON
     * @returns {string} JSON string of all logs
     */
    exportLogs() {
        return JSON.stringify(this.logs, null, 2);
    }
}

// Create a global logger instance
const logger = new Logger();

// Export the logger instance and class
export { logger, Logger };

// Also make logger available globally for easy access
window.logger = logger;
