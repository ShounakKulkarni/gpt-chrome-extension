// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text) {
      console.log("Received text:", request.text);
      insertTextToChatGPT(request.text);
    }
  });
  
  function insertTextToChatGPT(text) {
    function fillInputField() {
      const inputField = document.getElementById('prompt-textarea');
      const submitButton = document.querySelector('[data-testid="fruitjuice-send-button"]');
      if (inputField) {
        // Directly set the value
        inputField.value = text;
  
        // Create and dispatch events
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        const changeEvent = new Event('change', { bubbles: true, cancelable: true });
  
        inputField.dispatchEvent(inputEvent);
        inputField.dispatchEvent(changeEvent);
  
        console.log("Text inserted into ChatGPT input field");
  
        // Optional: Try to submit the form
        // Implement the form submission function.
        if(submitButton){
            submitButton.click();
        }
      } else {
        console.log("Input field not found, retrying...");
      }
    }
  
    // Ensure the DOM is fully loaded
    if (document.readyState === 'complete') {
      fillInputField();
    } else {
      window.addEventListener('load', fillInputField);
    }
  }