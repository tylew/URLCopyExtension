document.addEventListener("keydown", function (event) {
    if (event.metaKey && event.shiftKey && event.code === "KeyC") {
        event.preventDefault();
        const url = window.location.href;

        // Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showToast("URL copied: " + url);
        }).catch(err => console.error("Copy failed", err));
    }
});

// Function to show a toast notification
function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "1000";
    toast.style.opacity = "1";
    toast.style.transition = "opacity 0.5s ease-out";
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}
