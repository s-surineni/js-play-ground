// DOM Manipulation Examples
export function domExample() {
    let output = '=== DOM MANIPULATION ===\n\n';
    
    // 1. DOM Selection
    output += '1. DOM Selection:\n';
    
    // Get elements by ID
    const variablesOutput = document.getElementById('variables-output');
    const functionsOutput = document.getElementById('functions-output');
    
    output += `   Found variables output element: ${variablesOutput ? 'Yes' : 'No'}\n`;
    output += `   Found functions output element: ${functionsOutput ? 'Yes' : 'No'}\n`;
    
    // Get elements by class
    const conceptSections = document.querySelectorAll('.concept-section');
    output += `   Found ${conceptSections.length} concept sections\n`;
    
    // Get elements by tag
    const buttons = document.querySelectorAll('button');
    output += `   Found ${buttons.length} buttons\n`;
    
    // 2. DOM Traversal
    output += '\n2. DOM Traversal:\n';
    
    if (variablesOutput) {
        const parent = variablesOutput.parentElement;
        const nextSibling = variablesOutput.nextElementSibling;
        
        output += `   Variables output parent: ${parent.tagName}\n`;
        output += `   Variables output next sibling: ${nextSibling ? nextSibling.tagName : 'None'}\n`;
    }
    
    // 3. DOM Content Manipulation
    output += '\n3. DOM Content Manipulation:\n';
    
    // Text content
    const header = document.querySelector('header h1');
    if (header) {
        const originalText = header.textContent;
        output += `   Original header text: ${originalText}\n`;
        
        // Temporarily change the text
        header.textContent = '🚀 JS Learning Playground (Modified!)';
        output += `   Modified header text: ${header.textContent}\n`;
        
        // Restore original text
        header.textContent = originalText;
        output += `   Restored header text: ${header.textContent}\n`;
    }
    
    // 4. Creating and Adding Elements
    output += '\n4. Creating and Adding Elements:\n';
    
    // Create a new element
    const newDiv = document.createElement('div');
    newDiv.className = 'dynamic-element';
    newDiv.textContent = 'This is a dynamically created element!';
    newDiv.style.cssText = 'background: #e3f2fd; padding: 10px; margin: 10px 0; border-radius: 5px;';
    
    // Add it to the page
    const container = document.querySelector('.container');
    if (container) {
        container.appendChild(newDiv);
        output += `   Created and added new div element\n`;
        
        // Remove it after a delay
        setTimeout(() => {
            if (newDiv.parentNode) {
                newDiv.parentNode.removeChild(newDiv);
                output += `   Removed dynamic element\n`;
            }
        }, 3000);
    }
    
    // 5. Event Handling
    output += '\n5. Event Handling:\n';
    
    // Add event listener to a button
    const firstButton = buttons[0];
    if (firstButton) {
        const originalText = firstButton.textContent;
        
        // Add click event
        firstButton.addEventListener('click', function() {
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
            this.textContent = 'Button Clicked!';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.style.background = '';
                this.textContent = originalText;
            }, 2000);
        });
        
        output += `   Added click event to first button\n`;
    }
    
    // 6. CSS Manipulation
    output += '\n6. CSS Manipulation:\n';
    
    // Change styles
    const conceptSection = conceptSections[0];
    if (conceptSection) {
        const originalBackground = conceptSection.style.background;
        
        // Add a subtle animation
        conceptSection.style.transition = 'all 0.3s ease';
        conceptSection.style.transform = 'scale(1.02)';
        conceptSection.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.3)';
        
        output += `   Applied CSS transformations to first concept section\n`;
        
        // Reset after 2 seconds
        setTimeout(() => {
            conceptSection.style.transform = '';
            conceptSection.style.boxShadow = '';
        }, 2000);
    }
    
    // 7. Form Handling
    output += '\n7. Form Handling:\n';
    
    // Create a simple form
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="nameInput" placeholder="Enter your name" style="padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px;">
        <button type="submit" style="padding: 8px 16px; margin: 5px;">Submit</button>
    `;
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('nameInput');
        const name = nameInput.value.trim();
        
        if (name) {
            output += `   Form submitted with name: ${name}\n`;
            nameInput.value = '';
        } else {
            output += `   Form submitted with empty name\n`;
        }
    });
    
    // Add form to the page
    if (container) {
        container.appendChild(form);
        output += `   Created and added form element\n`;
    }
    
    // 8. Local Storage
    output += '\n8. Local Storage:\n';
    
    // Save data
    const data = {
        lastVisit: new Date().toISOString(),
        visitCount: (parseInt(localStorage.getItem('visitCount') || '0') + 1)
    };
    
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('visitCount', data.visitCount.toString());
    
    // Retrieve data
    const savedData = JSON.parse(localStorage.getItem('userData') || '{}');
    output += `   Saved to localStorage: visitCount=${data.visitCount}\n`;
    output += `   Retrieved from localStorage: ${JSON.stringify(savedData)}\n`;
    
    // 9. DOM Querying with CSS Selectors
    output += '\n9. Advanced CSS Selectors:\n';
    
    // Complex selectors
    const allButtons = document.querySelectorAll('button:not([type="submit"])');
    const conceptTitles = document.querySelectorAll('.concept-section h2');
    const outputBoxes = document.querySelectorAll('[id$="-output"]');
    
    output += `   Buttons (excluding submit): ${allButtons.length}\n`;
    output += `   Concept titles: ${conceptTitles.length}\n`;
    output += `   Output boxes: ${outputBoxes.length}\n`;
    
    // 10. Performance Considerations
    output += '\n10. Performance Tips:\n';
    output += `   - Use querySelector/querySelectorAll for complex selectors\n`;
    output += `   - Cache DOM elements when reusing them\n`;
    output += `   - Use documentFragment for multiple DOM operations\n`;
    output += `   - Avoid reading DOM properties in loops\n`;
    
    return output;
}

