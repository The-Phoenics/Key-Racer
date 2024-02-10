import { generateNodesForContent } from "./nodeGenerator.mjs";
import { updateViewContent } from "./validate.mjs";

const keys = document.querySelectorAll(".key");

const classNames = {
    '`': 'tilde',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '0': 'zero',
    '-': 'hyphen',
    '=': 'plus',
    'Backspace': 'backspace',
    'Tab': 'tab',
    '[': 'left-curly-brace',
    ']': 'right-curly-brace',
    '\\': 'pipe',
    'CapsLock': 'caps-lock',
    ';': 'semicolon',
    "'": 'double-quotes',
    'Enter': 'enter',
    'Shift': 'shift-left',
    ',': 'left-angle-bracket',
    '.': 'right-angle-bracket',
    '/': 'question-mark',
    'Control': 'ctrl-left',
    'Meta': 'win-right',
    'Alt': 'alt-left',
    ' ': 'space',

    // right side keys
    'Alt-R': 'alt-right',
    'Control-R': 'ctrl-right',
    'Shift-R': 'shift-right',
    'Meta-R': 'win-right'
};

function onKeyPress(className) {
    let keyClassSelector = '.' + className;
    const element = document.querySelector(keyClassSelector);
    keyClickEffect(element);
}

function keyClickEffect(element) {
    element.classList.add("clicked");
    setTimeout(() => element.classList.remove("clicked"), 100);
}

// event listeners for keyboard clicks for all keys
window.addEventListener('keydown', (event) => {
    let keyStr = event.key
    console.log(keyStr)
    if (keyStr >= 'a' && keyStr <= 'z') {
        onKeyPress(keyStr)
    } else {
        if (event.location == 2) // for right side keys
            keyStr = keyStr + '-R'
        if (classNames[keyStr] != undefined) {
            console.log(keyStr)
            onKeyPress(classNames[keyStr])
        }
    }
});

// event listeners for mouse clicks on all keys
keys.forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
});

// ---
const contentTxtElement = document.querySelector('.content');

let contentValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed ornare ipsum, a eleifend nisi.
Donec ultrices mi elit, fermentum ultrices mi dignissim eget. Phasellus dapibus felis non nisl luctus laoreet.
Nunc urna massa, ultricies nec aliquam at, eleifend ornare ante. In vitae leo ultricies, blandit mauris vitae, consectetur nulla.
Pellentesque convallis iaculis tristique. Sed in dapibus purus, sed cursus enim. Sed vitae tellus lorem. Duis a venenatis erat.
Phasellus sed varius lectus. Cras vulputate eros tellus, eu molestie justo egestas id. Nam ut lacus vel felis scelerisque accumsan in ornare quam.`;

contentValue = `AutoHotkey is a free and open-source custom scripting language for Microsoft Windows,
initially aimed at providing easy keyboard shortcuts or hotkeys, fast macro-creation and software automation 
that allows users of most levels of computer skill to automate repetitive tasks in any Windows application.
User interfaces can easily be extended or modified by AutoHotkey (for example, overriding the default 
Windows control key commands with their Emacs equivalents). 
The AutoHotkey installation includes its own extensive help file, and web-based documentation is also available.`

generateNodesForContent(contentTxtElement, contentValue)

updateViewContent()