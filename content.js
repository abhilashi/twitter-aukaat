// This script runs in the context of Twitter web pages.
// It should find Twitter profiles and extract the necessary information.
//

function changeFontSizeForUserTweets(username) {
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
            console.log(text);
            console.log(handle);
            chrome.runtime.sendMessage({ type: "FoundHandle", data: handle });
        });

    });
}

var mObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            changeFontSizeForUserTweets('a');
        }
    });
});

mObserver.observe(document.body, { childList: true, subtree: true });
