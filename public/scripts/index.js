import { generateNodesForContent } from "./nodeGenerator.mjs";
import { updateViewContent } from "./validate.mjs";

let SHIFT_HELD_DOWN = false;

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
    setTimeout(() => element.classList.remove("clicked"), 50);
}

window.addEventListener('keyup', (event) => {
    const pressedKey = event.key
    const pressedKeyLocation = event.location

    // udpate data for shift key
    updateSpecialKeysStatesOnKeyUp(event);

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyUp(event);
});

window.addEventListener('keydown', (event) => {
    const pressedKey = event.key
    const pressedKeyLocation = event.location

    // udpate data for shift key
    updateSpecialKeysStatesOnKeyDown(event);

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyDown(event);

    // update the view's text with validation
    const pressedKeyValue = evaluateKeyPressedValue(pressedKey)
    console.log(pressedKeyValue)
    if (pressedKeyValue)
        updateViewContent(pressedKeyValue);
});

function evaluateKeyPressedValue(pressedKeyStr) {
    if (pressedKeyStr.length === 1) {
        // if value is an alphabet    
        if (pressedKeyStr >= 'a' && pressedKeyStr <= 'z') {
            // capitalize if shift is held down
            if (SHIFT_HELD_DOWN) {
                pressedKeyStr = pressedKeyStr.toUpperCase()
            }
            return pressedKeyStr;
        } else {
            // TODO: for the other keys like number and other character keys
        }
    } else {
        return null;
    }
}

function updateSpecialKeysStatesOnKeyUp(keyPressedStr) {
    switch (keyPressedStr) {
        case 'Shift':
            SHIFT_HELD_DOWN = false
            break;

        default:
            break;
    }
}

function updateKeyboardOnKeyPressOnKeyUp(pressedKeyStr, keyUpEventLocation) {
    if (pressedKeyStr >= 'a' && pressedKeyStr <= 'z') {
        onKeyPress(pressedKeyStr)
    } else {
        if (keyUpEventLocation == 2)
            pressedKeyStr = pressedKeyStr + '-R'
        if (classNames[pressedKeyStr] != undefined) {
            onKeyPress(classNames[pressedKeyStr])
        }
    }
}

// Special keys like Shift, Capslock, Enter, Backspace
function updateSpecialKeysStatesOnKeyDown(keyPressedStr) {
    switch (keyPressedStr) {
        case 'Shift':
            SHIFT_HELD_DOWN = true
            break;

        default:
            break;
    }
}

function updateKeyboardOnKeyPressOnKeyDown(keyPressedStr) {

}

// keep keyboard key hightlighted on held down
window.addEventListener('keydown', (event) => {
    let keyStr = event.key
    if (keyStr >= 'a' && keyStr <= 'z') {
        document.querySelector('.' + keyStr).classList.add("clicked");
    } else {
        if (event.location == 2) // for right side keys
            keyStr = keyStr + '-R'
        if (classNames[keyStr] != undefined) {
            document.querySelector('.' + classNames[keyStr]).classList.add("clicked");
        }
    }
});

// event listeners for mouse clicks on all keys
document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
});

// ---
const contentTxtElement = document.querySelector('.content');

let contentValue = `AutoHotkey is a free and open-source custom scripting language for Microsoft Windows,
initially aimed at providing easy keyboard shortcuts or hotkeys, fast macro-creation and software automation 
that allows users of most levels of computer skill to automate repetitive tasks in any Windows application.
User interfaces can easily be extended or modified by AutoHotkey (for example, overriding the default 
Windows control key commands with their Emacs equivalents).`;

generateNodesForContent(contentTxtElement, contentValue)
