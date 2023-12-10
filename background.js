chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab updated');
    console.log('Tab ID:', tabId);
    console.log('Tab changed:', changeInfo);
    console.log('New tab Info:', tab);
    if (tab.active === true && tab.url.startsWith('https://twitter.com/')) {
        chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
            console.log('Content script injected');
            // Retrieve categorized handles from localStorage
            const localAukaat = JSON.parse(localStorage.getItem("aukaat")) || {};

            console.log('Stored Data:', localAukaat);

            chrome.tabs.sendMessage(tabId, { action: "applyAukaat" });
        });
    }
});

// background.js

const Gun = window.Gun;
gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

// Function to update scores
/*
function updateAukaat(username, aukaat) {
    gun.get('loserBoard').get(username).put({ username, aukaat }, ack => {
        if (ack.err) {
            // Handle the error
            console.error('Put operation failed:', ack.err);
        } else {
            // Operation succeeded
            console.log('Put operation succeeded:', ack);
        }
    });

}
*/

// Listener for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "AdjustAukaat") {
        updateAukaat(request.handle, request.aukaat);
        sendResponse({ status: "Score updated" });
    }
});


// detect tab change
chrome.tabs.onActivated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab activated');
    console.log('Active Info:', changeInfo);
    console.log('New tab Info:', tab);
});
