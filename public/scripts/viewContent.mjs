import { initInfoDataG, initLinesDataG, updateViewContentG } from "./validate.mjs";
import { generateNodesForContent } from "./nodeGenerator.mjs"

let contentValue = `AutoHotkey is a free and open-source custom scripting language for Microsoft Windows,
initially aimed at providing easy keyboard shortcuts or hotkeys, fast macro-creation and software automation 
that allows users of most levels of computer skill to automate repetitive tasks in any Windows application.
User interfaces can easily be extended or modified by AutoHotkey`;

// Function for replacing all the text content with new random text
export function changeViewText(contentValue) {
    clearNodes(document.querySelector('.content'))
    generateNodesForContent(document.querySelector('.content'), contentValue)
}

function clearNodes(contentNode) {
    while (contentNode.firstChild) {
        contentNode.removeChild(contentNode.lastChild);
    }
}

window.onload = () => {
    changeViewText(contentValue)
    initLinesDataG()
    initInfoDataG()
}
