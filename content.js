// This script runs in the context of Twitter web pages.
// It should find Twitter profiles and extract the necessary information.

function extractTwitterProfiles() {
    // Example: Find elements that contain profile images and handles.
    // Note: Twitter's actual class names and structure will differ.
    let profiles = document.querySelectorAll('.profile');
    profiles.forEach(profile => {
        let imgSrc = profile.querySelector('img').src;
        let handle = profile.querySelector('.handle').innerText;

        console.log('Profile found:', handle, imgSrc);
        // You'll need to send this data to your popup, perhaps using chrome.runtime.sendMessage
    });
}

// Run the function to extract profiles
extractTwitterProfiles();

