(async() => {
    const src = chrome.runtime.getURL("src/viewer.js");
    const contentMain = await import(src);
})()