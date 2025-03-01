document.addEventListener("keydown", async (event) => {
    if (event.metaKey && event.shiftKey && event.code === "KeyC") {
        event.preventDefault();

        if (!window.__copyInProgress) {
            window.__copyInProgress = true;
            await copyCurrentURL();
            window.__copyInProgress = false;
        } else {
            console.log("🚫 Copy already in progress, skipping.");
        }
    }
});

async function copyCurrentURL() {
    const url = window.location.href;

    try {
        console.log("🔹 Checking clipboard permissions...");

        // ✅ Ensure clipboard API is available
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            throw new Error("Clipboard API not supported in this browser.");
        }

        console.log("🔹 Attempting to copy...");

        // ✅ Use writeText() instead of ClipboardItem (which Safari does not support well)
        await navigator.clipboard.writeText(url);

        console.log("✅ URL copied successfully:", url);
        showToast("✅ URL copied: " + url);
    } catch (err) {
        console.error("❌ Clipboard API failed:", err);
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    console.warn("⚠️ Attempting fallback clipboard copy method...");

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
        if (document.execCommand("copy")) {
            console.log("✅ URL copied using fallback method:", text);
            showToast("✅ URL copied: " + text);
        } else {
            throw new Error("ExecCommand copy failed");
        }
    } catch (err) {
        console.error("❌ Both clipboard methods failed:", err);
        alert("❌ Clipboard copy blocked! Try manually selecting and copying.");
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
    toast.style.padding = "5px 18px";
    toast.style.borderRadius = "8px";
    toast.style.fontFamily = "Arial, sans-serif";
    toast.style.fontSize = "13px";
    toast.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
    toast.style.opacity = "0.9";
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
