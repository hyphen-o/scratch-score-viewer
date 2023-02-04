(async() => {
    const src = chrome.runtime.getURL("src/search.js");
    const contentMain = await import(src);
})()