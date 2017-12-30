var bgs = browser.runtime.getBackgroundPage();

function enableInjectScriptInBg(page){
    page.enableInject();
}

function disableInjectScriptInBg(page){
    page.disableInject();
}

function injectScript(e)
{
    if (e.target.classList.contains("start")){
        browser.browserAction.setIcon({path: "/icons/icon1-96.png"});
        bgs.then(enableInjectScriptInBg);
    }else if (e.target.classList.contains("stop")){
        browser.browserAction.setIcon({path: "/icons/icon2-96.png"});
        bgs.then(disableInjectScriptInBg);
    }
    window.close();
}

document.addEventListener("click", injectScript);


