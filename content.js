// This script runs in the context of Twitter web pages.
// It should find Twitter profiles and extract the necessary information.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "AdjustAukaat") {
        console.log("running AdjustAukaat");
        changeFontSizeForUserTweets(
            message.data["handle"],
            message.data["aukaat"],
        );
    }
});


function showHandlesInPopup() {
    chrome.storage.sync.get(['aukaat'], function (result) {
        const localAukaat = result.aukaat || {};
        var tweets = document.querySelectorAll('article'); 
        console.log("running showHandlesInPopup");

        tweets.forEach(tweet => {
            // console.log("running for each tweet");
            let text = tweet.querySelector("div[data-testid='tweetText']")
            let photo = tweet.querySelector("div[data-testid='tweetPhoto']")
            let video = tweet.querySelector("div[data-testid='videoComponent']")
            let handle = tweet.querySelector("a").getAttribute("href").substring(1);
            let importance = localAukaat[handle];

            // console.log(text);
            console.log(handle);
            chrome.runtime.sendMessage({ type: "AddHandleToPopup", data: handle });
        });

    });
}

function changeFontSizeForUserTweets(username, aukaat) {
    chrome.storage.sync.get(['aukaat'], function (result) {
        const localAukaat = result.aukaat || {};
        var tweets = document.querySelectorAll('article'); 
        console.log("running changeFontSize");

        tweets.forEach(tweet => {
            console.log(tweet);
            console.log("running for each tweet");
            let text = tweet.querySelector("div[data-testid='tweetText']")
            let photo = tweet.querySelector("div[data-testid='tweetPhoto']")
            let video = tweet.querySelector("div[data-testid='videoComponent']")
            let handle = tweet.querySelector("a").getAttribute("href").substring(1);
            let importance = localAukaat[handle];

            console.log(handle);
            console.log(username);
            console.log(aukaat);
            if (handle == username) {
                text.style.fontSize = aukaat + "px";
            }
        });

    });
}


var mObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            showHandlesInPopup();
        }
    });
});

mObserver.observe(document.body, { childList: true, subtree: true });
