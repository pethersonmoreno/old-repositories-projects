const preparePageToReadCard = (retries) => {
    if (retries < 0) {
        return;
    }
    const navigationClassNameList = document.querySelector("#ak-side-navigation").parentElement.className.split(" ");
    const navigationClassName = navigationClassNameList[navigationClassNameList.length - 1];
    const rightColumnClassNameList = document.querySelector("#jira-issue-header-actions").parentElement.parentElement.className.split(" ")
    const rightColumnClassName = rightColumnClassNameList[rightColumnClassNameList.length - 1];
    const headerClassName = document.querySelector("header").parentElement.className;
    const cssUpdates = document.createElement("style");
    cssUpdates.innerHTML = ""
    cssUpdates.innerHTML += "body { --leftSidebarWidth:0px; --topNavigationHeight: 0px; }"
    cssUpdates.innerHTML += "."+navigationClassName+" { with:0; overflow: hidden; position: absolute; left:-200px;top:0px; }"
    cssUpdates.innerHTML += "."+navigationClassName+" > div > div button[data-resize-button]  { opacity: 0; display: none }"
    cssUpdates.innerHTML += "."+headerClassName+" { height:0; overflow: hidden }"
    cssUpdates.innerHTML += "."+rightColumnClassName+" { width:0; flex-grow:0 }"
    cssUpdates.innerHTML += ".ak-renderer-document { font-size:1.5em }"
    document.head.appendChild(cssUpdates);
    document.querySelector("#ak-side-navigation > div > div > button").setAttribute ("onmousemove", null);
    setTimeout(()=>{
        preparePageToReadCard(retries-1);
    }, 500);
};
preparePageToReadCard(3);