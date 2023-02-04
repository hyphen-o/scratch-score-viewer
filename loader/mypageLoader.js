(async() => {
    const src = chrome.runtime.getURL("src/mypage.js");
    const contentMain = await import(src);
})()