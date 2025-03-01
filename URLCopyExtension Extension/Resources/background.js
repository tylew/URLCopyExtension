browser.commands.onCommand.addListener((command) => {
    console.log("✅ Command received: Copy URL")
    if (command === "copy-url") {
        console.log("✅ Command received: Copy URL");

        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            if (tabs.length === 0) {
                console.error("❌ No active tab found");
                return;
            }

            const tabId = tabs[0].id;

            console.log("✅ Sending message to content script...");
            browser.tabs.sendMessage(tabId, { action: "copyURL" }).catch((error) => {
                console.error("❌ Error sending message to content script:", error);
            });
        });
    }
});
