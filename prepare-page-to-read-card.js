const navigationClassNameList = document.querySelector("#ak-side-navigation").parentElement.className.split(" ");
const navigationClassName = navigationClassNameList[navigationClassNameList.length - 1];
const rightColumnClassNameList = document.querySelector("div[data-test-id='issue.views.issue-details.issue-layout.right-most-column']").parentElement.className.split(" ")
const rightColumnClassName = rightColumnClassNameList[rightColumnClassNameList.length - 1];
const headerClassName = document.querySelector("header").parentElement.className;
const cssUpdates = document.createElement("style");
cssUpdates.innerHTML = ""
cssUpdates.innerHTML += "body { --leftSidebarWidth:0px; --topNavigationHeight: 0px; }"
cssUpdates.innerHTML += "."+navigationClassName+" { with:0; overflow: hidden }"
cssUpdates.innerHTML += "."+rightColumnClassNameList+" { with:0; overflow: hidden }"
cssUpdates.innerHTML += "."+headerClassName+" { height:0; overflow: hidden }"
cssUpdates.innerHTML += "."+rightColumnClassName+" { width:0; flex-grow:0 }"
cssUpdates.innerHTML += ".ak-renderer-document { font-size:1.5em }"
document.head.appendChild(cssUpdates);
document.querySelector("[data-testid='ContextualNavigation-grab-area']").onmousemove = null;