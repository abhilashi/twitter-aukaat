// In popup.js

function isHandleInList(handle, list) {
    const listItems = list.getElementsByTagName('li');
    for (let item of listItems) {
        if (item.textContent === handle) {
            return true; // Handle found in the list
        }
    }
    return false; // Handle not found in the list
}


function addHandleToList(handle) {
    // Get the list element
    var list = document.getElementById('handlesList');

    if (isHandleInList(handle, list)) {
        return;
    }

    // Create a new list item
    var listItem = document.createElement('li');
    listItem.textContent = handle; // Set the text content to the handle

    // Append the list item to the list
    list.appendChild(listItem);
}

// Example usage
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "FoundHandle") {
        addHandleToList(message.data);
    }
});

