console.log("✅ Content script loaded");

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message) => {
    console.log("📩 Message received in content script:", message);
    if (message.action === "copyURL") {
        console.log("🔹 Copying URL...");
        copyCurrentURL();
    }
});

function copyCurrentURL() {
    const url = window.location.href;

    try {
        document.execCommand("copy");
        console.log("✅ URL copied:", url);
        showToast("✅ URL copied:" + url);
    } catch (err) {
        console.error("❌ Clipboard copy method failed:", err);
        showToast("❌ Clipboard copy blocked! Check Javascript console for details.");
    }

    document.body.removeChild(textArea);
}


// Function to show a toast notification using Shadow DOM
function showToast(message) {
    let existingToast = document.getElementById("custom-toast-container");
    if (existingToast) existingToast.remove(); // Remove any existing toasts

    // Create an isolated container
    let container = document.createElement("div");
    container.id = "custom-toast-container";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.pointerEvents = "none"; // Prevents blocking interactions
    container.style.zIndex = "2147483647"; // Maximum z-index

    // Create shadow root
    let shadow = container.attachShadow({ mode: "open" });

    // Create toast element
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#333" : "#f0f0f0";
    toast.style.color = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#fff" : "#000";
    toast.style.padding = "10px 18px";
    toast.style.borderRadius = "8px";
    toast.style.fontFamily = "Arial, sans-serif";
    toast.style.fontSize = "14px";
    toast.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.2s ease-out";
    toast.style.pointerEvents = "none"; // Ensure it doesn't interfere with clicks
    toast.style.border = "3px solid transparent";
    toast.style.animation = "border-glow 1.5s infinite alternate ease-in-out";

    // Attach styles inside Shadow DOM
    let style = document.createElement("style");
    style.textContent = `
        @keyframes border-glow {
            0% {
                border-color: rgba(0, 120, 255, 1);
                box-shadow: 0px 0px 8px rgba(0, 120, 255, 0.5);
            }
            100% {
                border-color: rgba(0, 200, 255, 1);
                box-shadow: 0px 0px 15px rgba(0, 200, 255, 0.8);
            }
        }
        div {
            z-index: 2147483647;
        }
    `;

    shadow.appendChild(style);
    shadow.appendChild(toast);
    document.documentElement.appendChild(container);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => container.remove(), 500);
    }, 2000);
}
