import { makeLetterPending, isAlphabet, KEY_CLASSNAMES_MAPPING } from "./utils.mjs";
import { INFO, updateViewContentG } from "./validate.mjs";
import { startTimer } from "./header.mjs";

let has_started = false;
function start_timer_on_key_press() {
    if (!has_started) {
        startTimer();
    }
    has_started = true
}

/*
* Keyboard event listeners
*/
window.addEventListener('keyup', (event) => {
    const pressedKey = event.key
    const pressedKeyLocation = event.location

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyUp(pressedKey, pressedKeyLocation);
});

window.addEventListener('keydown', (event) => {
    start_timer_on_key_press()
    const pressedKey = event.key
    const pressedKeyLocation = event.location
    
    if (pressedKey == 'Backspace') {
        updateOnBackSpace()
    }

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyDown(pressedKey, pressedKeyLocation);

    // update the view's text with validation
    const pressedKeyValue = evaluateKeyPressedValue(pressedKey)
    if (pressedKeyValue)
        updateViewContentG(pressedKeyValue);
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
        if (KEY_CLASSNAMES_MAPPING[pressedKeyStr] != undefined) {
            onKeyPress(KEY_CLASSNAMES_MAPPING[pressedKeyStr])
        }
    }
}

function updateKeyboardOnKeyPressOnKeyDown(pressedKeyStr, keyUpEventLocation) {
    if (isAlphabet(pressedKeyStr)) {
        document.querySelector('.' + pressedKeyStr).classList.add("clicked");
    } else {
        if (keyUpEventLocation == 2)
            pressedKeyStr = pressedKeyStr + '-R'
        if (KEY_CLASSNAMES_MAPPING[pressedKeyStr] != undefined) {
            document.querySelector('.' + KEY_CLASSNAMES_MAPPING[pressedKeyStr]).classList.add("clicked");
        }
    }
}

/* 
* Backspace key press update
*/ 
function updateOnBackSpace() {
    if (!INFO.isAtFirstLetterFirstLine()) {
        if (INFO.isAtFirstLetterOfCurrentLine()) {
            //...
        }
        else if (INFO.isAtFirstLetterOfWord()) {
            INFO.currentWord--
            INFO.updateCurrentWordElement()
            INFO.currentLetter = INFO.lettersInCurrentWord - 1
            makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])
            // reduce the words typed count
            INFO.wordsTypedCount--
        }
        else {
            INFO.currentLetter--
            makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])
            // reduce the letters typed count
            INFO.lettersTypedCount--
        }
    }
}

// event listeners for mouse clicks on all keys
document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
})