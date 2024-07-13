// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "searchChatGPT",
      title: "Search in ChatGPT",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchChatGPT") {
      const selectedText = info.selectionText;
      chrome.tabs.create({
        url: "https://www.chatgpt.com",
        active: true
      }, (newTab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === newTab.id && info.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tabId, {text: selectedText});
          }
        });
      });
    }
  });