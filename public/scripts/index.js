import isAlphabet from "./utils.mjs";
import { updateViewContent } from "./validate.mjs";

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

// Keyboard event listeners
window.addEventListener('keyup', (event) => {
    const pressedKey = event.key
    const pressedKeyLocation = event.location

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyUp(pressedKey, pressedKeyLocation);
});

window.addEventListener('keydown', (event) => {
    const pressedKey = event.key
    const pressedKeyLocation = event.location

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyDown(pressedKey, pressedKeyLocation);

    // update the view's text with validation
    const pressedKeyValue = evaluateKeyPressedValue(pressedKey)
    if (pressedKeyValue)
        updateViewContent(pressedKeyValue);
});

function onKeyPress(className) {
    let keyClassSelector = '.' + className;
    const element = document.querySelector(keyClassSelector);
    keyClickEffect(element);
}

function keyClickEffect(element) {
    element.classList.add("clicked");
    setTimeout(() => element.classList.remove("clicked"), 50);
}

// evaluate the valid key press and string value of the pressed key
function evaluateKeyPressedValue(pressedKeyStr) {
    if (pressedKeyStr.length === 1) {
        return pressedKeyStr;
    } else {
        return null;
    }
}

function updateKeyboardOnKeyPressOnKeyUp(pressedKeyStr, keyUpEventLocation) {
    if (isAlphabet(pressedKeyStr)) {
        onKeyPress(pressedKeyStr)
    } else {
        if (keyUpEventLocation == 2)
            pressedKeyStr = pressedKeyStr + '-R'
        if (classNames[pressedKeyStr] != undefined) {
            onKeyPress(classNames[pressedKeyStr])
        }
    }
}

function updateKeyboardOnKeyPressOnKeyDown(pressedKeyStr, keyUpEventLocation) {
    if (isAlphabet(pressedKeyStr)) {
        document.querySelector('.' + pressedKeyStr).classList.add("clicked");
    } else {
        if (keyUpEventLocation == 2)
            pressedKeyStr = pressedKeyStr + '-R'
        if (classNames[pressedKeyStr] != undefined) {
            document.querySelector('.' + classNames[pressedKeyStr]).classList.add("clicked");
        }
    }
}

// event listeners for mouse clicks on all keys
document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
});