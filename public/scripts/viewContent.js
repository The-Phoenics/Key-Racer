import { generateNodesForContent } from "./nodeGenerator.mjs";
import { initInfoDataG, initLinesDataG } from "./validate.mjs";

let contentValue = `AutoHotkey is a free and open-source custom scripting language for Microsoft Windows,
initially aimed at providing easy keyboard shortcuts or hotkeys, fast macro-creation and software automation 
that allows users of most levels of computer skill to automate repetitive tasks in any Windows application.
User interfaces can easily be extended or modified by AutoHotkey.`;

function changeViewText(textData) {
    generateNodesForContent(document.querySelector('.content'), contentValue)
    // update info object when view's text changes
    initLinesDataG()
    initInfoDataG()
}

async function fetchData() {
    // TODO: random text for view content
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
        .then(response => response.json())
        .then(json => console.log(json))
}
fetchData()

changeViewText(contentValue)
