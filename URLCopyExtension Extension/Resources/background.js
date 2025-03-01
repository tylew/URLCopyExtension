//
//  background.js
//  URLCopyExtension
//
//  Created by fsl-dev on 2/28/25.
//

chrome.commands.onCommand.addListener((command) => {
    if (command === "copy-url") {
        console.log("✅ Command received: Copy URL");

        // Get the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("❌ No active tab found");
                return;
            }

            const tabId = tabs[0].id;

            // Inject `content.js` if needed before sending a message
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["content.js"]
            }).then(() => {
                console.log("✅ Content script injected, sending message...");
                chrome.tabs.sendMessage(tabId, { action: "copyURL" });
            }).catch((error) => {
                console.error("❌ Error injecting content script:", error);
            });
        });
    }
});
