// In popup.js

function isHandleInList(handle, list) {
    const listItems = list.getElementsByTagName('li');
    for (let item of listItems) {
        if (item.textContent.startsWith(handle)) {
            return true; // Handle found in the list
        }
    }
    return false; // Handle not found in the list
}


function addHandleToList(handle) {
    var list = document.getElementById('handlesList');

    if (!isHandleInList(handle, list)) {
        var listItem = document.createElement('li');
        listItem.textContent = handle + ": 15"; // Initial value

        // Create plus button
        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = function() { adjustAukaat(listItem, 3); }; // Increment

        // Create minus button
        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = function() { adjustAukaat(listItem, -3); }; // Decrement

        // Append buttons to list item
        listItem.appendChild(plusButton);
        listItem.appendChild(minusButton);

        // Append list item to list
        list.appendChild(listItem);
    }
}

function adjustAukaat(listItem, adjustment) {
    var parts = listItem.textContent.split(": ");
    var currentAukaat = parseInt(parts[1], 10);
    var newAukaat = currentAukaat + adjustment;

    listItem.textContent = parts[0] + ": " + newAukaat;
    // Create plus button
    var plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.onclick = function() { adjustAukaat(listItem, 3); }; // Increment

    // Create minus button
    var minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.onclick = function() { adjustAukaat(listItem, -3); }; // Decrement

    // Append buttons to list item
    listItem.appendChild(plusButton);
    listItem.appendChild(minusButton);
}

// Example usage
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "FoundHandle") {
        addHandleToList(message.data);
    }
});

