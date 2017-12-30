var injectable = false;
var tabIds = [];

function injectall(tabs)
{
    for (let tab of tabs){
        
        if (injectable && !tabIds.find((id) => {return id == tab.id})){
            browser.tabs.executeScript(tab.id, {file: "/content_script/content_script.js"});
            tabIds.push(tab.id);
        }
    }
}

function startAll()
{
    for (var i = 0; i < tabIds.length; i ++){
        browser.tabs.sendMessage(tabIds[i],{EnableFlagTjHwbMx6i: true});
    }
}

function enableInject()
{
    injectable = true;
    startAll();
    var querying = browser.tabs.query({});
    querying.then(injectall);
    
}

function disableInject()
{
    injectable = false;
    //stop all
    for (var i = 0; i < tabIds.length; i ++){
        browser.tabs.sendMessage(tabIds[i],{EnableFlagTjHwbMx6i: false});
    }
    tabIds = [];
}

//reinject after update
function onLoadAction(tabId, changeInfo)
{
    if (changeInfo.status == "complete"){
        if (injectable /*&& !tabIds.find((id) => {return id == tab.id})*/){
            browser.tabs.executeScript(tabId, {file: "/content_script/content_script.js"});
            browser.tabs.sendMessage(tabId,{EnableFlagTjHwbMx6i: true});
            tabIds.push(tabId);
        }
    }
}

browser.tabs.onUpdated.addListener(onLoadAction);


