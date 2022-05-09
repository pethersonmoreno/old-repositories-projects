# jira-scripts-to-style-updates
Scripts to update style of Jira, it can be used to update a page of card to read with more space in the screen and with higher font size :)


## Javascript to run to use Prepare Page to Read Card

```javascript
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = resolve;
    script.onerror = reject;
    script.setAttribute("type", "application/javascript");
    fetch(url).then(resp => resp.text()).then(jsContent => {
        script.innerHTML = jsContent;
        document.body.appendChild(script);
    });
  });
};
// Configure the number of retries that is tried waiting 500 ms between each trying changing this value 20
window.defaultRetriesToPreparePageToReadCard = 20;
// Configure the font-size you want apply changing this value 1.8em
window.fontSizeAkRendererDocument = "1.8em";
// Configure the font-size you want apply changing this value 18px
window.fontSizeIssueLineCardElementAnchor = "18px";
runScript("https://raw.githubusercontent.com/pethersonmoreno/jira-scripts-to-style-updates/1.0/prepare-page-to-read-card.js")
```

## Running directly on Chrome Console

First of all, you have to open Chrome and use the shortcut F12 (in Linux), and then open console tab:

![Image of Chrome with open console tab](images/chrome-open-console-tab.png)

As showed in the image where is the text `{PASTE JS CODE HERE}` you paste the code in the section `Javascript to run to use Prepare Page to Read Card`, an then press Enter.

Remember that you can customize the font size applied updating the values:

 - `window.fontSizeAkRendererDocument`
 - `window.fontSizeIssueLineCardElementAnchor`