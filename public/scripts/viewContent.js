import { generateNodesForContent } from "./nodeGenerator.mjs";

let contentValue = `AutoHotkey is a free and open-source custom scripting language for Microsoft Windows,
initially aimed at providing easy keyboard shortcuts or hotkeys, fast macro-creation and software automation 
that allows users of most levels of computer skill to automate repetitive tasks in any Windows application.
User interfaces can easily be extended or modified by AutoHotkey.`;

generateNodesForContent(document.querySelector('.content'), contentValue)