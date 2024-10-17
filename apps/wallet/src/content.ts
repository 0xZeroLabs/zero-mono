function triggerExtensionFunction() {
  window?.postMessage(
    {
      type: "AUTH_OMID",
      value: 3000,
    },
    "*"
  );
}

document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    chrome.runtime.sendMessage({ action: "openPopup" });
    setInterval(() => triggerExtensionFunction(), 3000);

    chrome.runtime.sendMessage({
      type: "AUTH_OMID",
      value: 3000,
    });
  }
});
