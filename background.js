chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab updated');
    console.log('Tab ID:', tabId);
    console.log('Tab changed:', changeInfo);
    console.log('New tab Info:', tab);
    if (tab.active === true && tab.url.startsWith('https://twitter.com/')) {
        chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
            console.log('Content script injected');
            // Retrieve categorized handles from localStorage
            const storedData = JSON.parse(localStorage.getItem("aukaat")) || {};

            console.log('Stored Data:', storedData);

            chrome.tabs.sendMessage(tabId, { action: "applyAukaat" });
        });
    }
});


// detect tab change
chrome.tabs.onActivated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab activated');
    console.log('Active Info:', changeInfo);
    console.log('New tab Info:', tab);
});
