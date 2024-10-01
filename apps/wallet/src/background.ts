// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.tabs.onUpdated.addListener((tabId, info, _tab) => {
  if (info.status === "loading") {
    if (chrome.scripting) {
      chrome.scripting.executeScript({
        files: ["content.js"],
        target: { tabId },
      });
    } else {
      chrome.tabs.executeScript(tabId, {
        file: "content.js",
      });
    }
  }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.action === "openPopup") {
    chrome.action.openPopup();
  }
});
