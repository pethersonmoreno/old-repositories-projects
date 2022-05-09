const cssUpdates = document.createElement("style");
const defaultRetriesToPreparePageToReadCard = 20
const defaultFontSizeAkRendererDocument = "1.8em"
const defaultFontSizeIssueLineCardElementAnchor = "18px";
const preparePageToReadCard = (retries) => {
    if (retries < 0) {
        return;
    }
    try {
        const navigationClassNameList = document.querySelector("#ak-side-navigation").parentElement.className.split(" ");
        const navigationClassName = navigationClassNameList[navigationClassNameList.length - 1];
        const rightColumnClassNameList = document.querySelector("#jira-issue-header-actions").parentElement.parentElement.className.split(" ")
        const rightColumnClassName = rightColumnClassNameList[rightColumnClassNameList.length - 1];
        const headerClassName = document.querySelector("header").parentElement.className;
        const contentElement = document.querySelector("#jira-issue-header").parentElement.parentElement
        let separatorElement = contentElement.nextElementSibling;
        while (separatorElement !== null) {
            if (separatorElement.getAttribute("role") === "separator") {
                break;
            }
            separatorElement = contentElement.nextElementSibling;
        }
        const issueLineCardElementAnchorID = document.querySelector("[data-testid='issue-line-card.card-container'] > [role='presentation'] > a");
        const issueLineCardElementAnchorTitle = document.querySelector("[data-testid='issue-line-card.card-container'] > div > [role='presentation'] > a");
        const contentClassNameList = contentElement.className.split(" ");
        const contentClassName = contentClassNameList[contentClassNameList.length - 1];
        cssUpdates.innerHTML = "";
        cssUpdates.innerHTML += "body { --leftSidebarWidth:0px; --topNavigationHeight: 0px; }";
        cssUpdates.innerHTML += "."+navigationClassName+" { with:0; overflow: hidden; position: absolute; left:-200px;top:0px; }";
        cssUpdates.innerHTML += "."+navigationClassName+" > div > div button[data-resize-button]  { opacity: 0; display: none }";
        cssUpdates.innerHTML += "."+headerClassName+" { height:0; overflow: hidden }";
        cssUpdates.innerHTML += "."+contentClassName+" { padding-left:0 }";
        const localFontSizeAkRendererDocument = window.fontSizeAkRendererDocument ? window.fontSizeAkRendererDocument : defaultFontSizeAkRendererDocument;
        cssUpdates.innerHTML += ".ak-renderer-document { font-size:"+localFontSizeAkRendererDocument+" }";
        const localFontSizeIssueLineCardElementAnchor = window.fontSizeIssueLineCardElementAnchor ? window.fontSizeIssueLineCardElementAnchor : defaultFontSizeIssueLineCardElementAnchor;
        if (issueLineCardElementAnchorID !== null) {
            const issueLineCardElementAnchorIDClassNameList = issueLineCardElementAnchorID.className.split(" ");
            const issueLineCardElementAnchorIDClassName = issueLineCardElementAnchorIDClassNameList[issueLineCardElementAnchorIDClassNameList.length - 1];
            cssUpdates.innerHTML += "."+issueLineCardElementAnchorIDClassName+" { font-size:"+localFontSizeIssueLineCardElementAnchor+" }"
        }
        if (issueLineCardElementAnchorTitle !== null) {
            const issueLineCardElementAnchorTitleClassNameList = issueLineCardElementAnchorTitle.className.split(" ");
            const issueLineCardElementAnchorTitleClassName = issueLineCardElementAnchorTitleClassNameList[issueLineCardElementAnchorTitleClassNameList.length - 1];
            cssUpdates.innerHTML += "."+issueLineCardElementAnchorTitleClassName+" { font-size:"+localFontSizeIssueLineCardElementAnchor+" }"
        }
        if (separatorElement !== null) {
            const separatorClassNameList = separatorElement.className.split(" ");
            const separatorClassName = separatorClassNameList[separatorClassNameList.length - 1];
            cssUpdates.innerHTML += "."+separatorClassName+" { width:0 }"
        }
        cssUpdates.innerHTML += "."+rightColumnClassName+" { width:0; min-width:0; flex:none !important; padding:0 }";
        if (cssUpdates !== document.head) {
            document.head.appendChild(cssUpdates);
        }
        document.querySelector("#ak-side-navigation > div > div > button").setAttribute ("onmousemove", null);
    } catch { }
    setTimeout(()=>{
        preparePageToReadCard(retries-1);
    }, 500);
};
const preparePageToReadCardDefault = () => {
    preparePageToReadCard(defaultRetriesToPreparePageToReadCard);
};
const simplePreparePageToReadCard = () => {
    preparePageToReadCard(0);
};
const consoleLogStylePreparePageToReadCard = () => {
    console.log(cssUpdates);
};
window.preparePageToReadCard = preparePageToReadCard;
window.preparePageToReadCardDefault = preparePageToReadCardDefault;
window.simplePreparePageToReadCard = simplePreparePageToReadCard;
window.consoleLogStylePreparePageToReadCard = consoleLogStylePreparePageToReadCard;
preparePageToReadCardDefault();
console.log("You can configure font size applied to document using this change before load prepare page to read card function:\n"+
            "window.fontSizeAkRendererDocument = \"1.8em\";\n"+
            "You can also configure font size applied to subtasks and related itens this change before load prepare page to read card function:\n"+
            "window.fontSizeIssueLineCardElementAnchor = \"18px\";\n"+
            "Then to you test it now, you can just run:\n"+
            "simplePreparePageToReadCard();\n"+
            "Now together to be more useful:\n"+
            "window.fontSizeAkRendererDocument = \"1.8em\";\n"+
            "window.fontSizeIssueLineCardElementAnchor = \"18px\";\n"+
            "simplePreparePageToReadCard();\n"+
            "If you want see the style changes applied to document, just run:\n"+
            "consoleLogStylePreparePageToReadCard();")