// Configure the number of retries that is tried waiting 500 ms between each trying changing this value 20
window.defaultRetriesToPreparePageToReadCard = 20;
// Configure the font-size you want apply changing this value 1.8em
window.fontSizeAkRendererDocument = "1.8em";
// Configure the font-size you want apply changing this value 18px
window.fontSizeIssueLineCardElementAnchor = "18px";
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
    const localDefaultRetriesToPreparePageToReadCard = window.defaultRetriesToPreparePageToReadCard ? window.defaultRetriesToPreparePageToReadCard : defaultRetriesToPreparePageToReadCard;
    preparePageToReadCard(localDefaultRetriesToPreparePageToReadCard);
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
            "At initial load, you can also configure the number of retries that is tried waiting 500 ms between each trying:\n"+
            "window.defaultRetriesToPreparePageToReadCard = 20;\n"+
            "Then to you test it now, you can just run:\n"+
            "simplePreparePageToReadCard();\n"+
            "Now together to be more useful:\n"+
            "window.fontSizeAkRendererDocument = \"1.8em\";\n"+
            "window.fontSizeIssueLineCardElementAnchor = \"18px\";\n"+
            "simplePreparePageToReadCard();\n"+
            "If you want see the style changes applied to document, just run:\n"+
            "consoleLogStylePreparePageToReadCard();")


const keycodeHome = 36;
const keycodeEnd = 35;
const keycodeUpArrow = 38;
const keycodeDownArrow = 40;
const stepOneTimeInPixels = 50;
const stepTwoTimesInPixels = 100;
const stepThreeTimesInPixels = 150;
const stepFourTimesInPixels = 200;
const stepEightTimesInPixels = 400;
const getJiraCardElement = () => document.body.querySelector("#jira-issue-header").parentElement.parentElement;
const getJiraCardElementMaxScrollValue = () => document.body.querySelector("#jira-issue-header").parentElement.offsetHeight;
const scrollJiraCard = (pixels) => {
  let newScrollTop = getJiraCardElement().scrollTop+pixels;
  if (newScrollTop < 0) {
    newScrollTop = 0;
  }
  getJiraCardElement().scrollTop=newScrollTop
};
document.body.addEventListener("keyup", function(e) {
  console.log(e.which)
  if (e.which == keycodeHome) {
    getJiraCardElement().scrollTop=0;
  }
  if (e.which == keycodeEnd) {
    getJiraCardElement().scrollTop=getJiraCardElementMaxScrollValue();
  }
  if (e.which != keycodeUpArrow && e.which != keycodeDownArrow){
    return;
  }
  let stepInPixels = stepOneTimeInPixels;
  if (e.shiftKey && !e.ctrlKey && !e.altKey) {
    stepInPixels = stepTwoTimesInPixels;
  } else if (!e.shiftKey && e.ctrlKey && !e.altKey) {
    stepInPixels = stepThreeTimesInPixels;
  } else if (e.shiftKey && e.ctrlKey && !e.altKey) {
    stepInPixels = stepFourTimesInPixels;
  } else if (!e.shiftKey && !e.ctrlKey && e.altKey) {
    stepInPixels = stepEightTimesInPixels;
  }
  const stepInPixelsWithDirection = (e.which == keycodeUpArrow?-stepInPixels:stepInPixels);
  scrollJiraCard(stepInPixelsWithDirection);
});
